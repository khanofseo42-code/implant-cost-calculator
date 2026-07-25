import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, checkAdminPassword, createAdminSessionToken } from "@/lib/security/adminAuth";
import { checkRateLimit } from "@/lib/security/rateLimit";

const loginSchema = z.object({ password: z.string().min(1) });

export async function POST(req: NextRequest) {
  const rate = checkRateLimit(req, "admin-login");
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many attempts. Please wait and try again." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PASSWORD in your environment." },
      { status: 503 }
    );
  }

  if (!checkAdminPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
