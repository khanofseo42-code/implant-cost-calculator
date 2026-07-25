import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/schemas";
import { checkRateLimit } from "@/lib/security/rateLimit";

export async function POST(req: NextRequest) {
  const rate = checkRateLimit(req, "contact");
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message", issues: parsed.error.issues }, { status: 400 });
  }

  console.log("[contact-form]", parsed.data);

  return NextResponse.json({ ok: true });
}
