import { NextRequest, NextResponse } from "next/server";

/**
 * Second leg of the GitHub OAuth handshake. GitHub redirects here with a
 * `code`; we exchange it server-side for an access token (the client secret
 * never reaches the browser) and hand the token back to the Decap CMS popup
 * via the postMessage handshake it expects.
 */

const STATE_COOKIE = "decap-oauth-state";

function renderPopupResponse(status: "success" | "error", payload: Record<string, unknown>) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

  return `<!DOCTYPE html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
}

function htmlResponse(body: string, status: number) {
  return new NextResponse(body, { status, headers: { "Content-Type": "text/html" } });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = req.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !cookieState || state !== cookieState) {
    return htmlResponse(
      renderPopupResponse("error", { message: "Invalid or expired OAuth state. Please try logging in again." }),
      400
    );
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse(
      renderPopupResponse("error", { message: "GitHub OAuth is not configured on the server." }),
      500
    );
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: new URL("/api/decap/callback", req.url).toString(),
    }),
  });

  const tokenJson = await tokenRes.json().catch(() => null);

  if (!tokenRes.ok || !tokenJson?.access_token) {
    return htmlResponse(
      renderPopupResponse("error", {
        message: tokenJson?.error_description ?? "Failed to obtain a GitHub access token.",
      }),
      400
    );
  }

  const res = htmlResponse(
    renderPopupResponse("success", { token: tokenJson.access_token, provider: "github" }),
    200
  );
  res.cookies.delete(STATE_COOKIE);
  return res;
}
