import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

/**
 * First leg of the GitHub OAuth handshake Decap CMS's `github` backend expects.
 * Decap opens this endpoint in a popup (config.yml: backend.auth_endpoint);
 * we redirect straight to GitHub's authorize screen. See src/app/api/decap/callback
 * for the second leg and docs/decap-cms-setup.md for the GitHub OAuth App setup.
 */

const STATE_COOKIE = "decap-oauth-state";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GITHUB_OAUTH_CLIENT_ID is not configured. See docs/decap-cms-setup.md." },
      { status: 500 }
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const redirectUri = new URL("/api/decap/callback", req.url).toString();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(authorizeUrl);
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
