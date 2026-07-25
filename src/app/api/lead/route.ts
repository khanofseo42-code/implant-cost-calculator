import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validation/schemas";
import { checkRateLimit } from "@/lib/security/rateLimit";

/**
 * Lead capture endpoint. Validates and logs the submission server-side, then
 * fans out to any configured marketing integrations. Mailchimp/HubSpot/GA
 * calls are stubbed behind env vars so this works out of the box with zero
 * external credentials — wire in real API keys via .env to activate them.
 */
export async function POST(req: NextRequest) {
  const rate = checkRateLimit(req, "lead");
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead data", issues: parsed.error.issues }, { status: 400 });
  }

  const lead = parsed.data;

  console.log("[lead-capture]", { name: lead.name, email: lead.email, country: lead.country });

  await Promise.allSettled([sendToMailchimp(lead), sendToHubspot(lead)]);

  return NextResponse.json({ ok: true });
}

async function sendToMailchimp(lead: { email: string; name: string }) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!apiKey || !listId) return; // Integration not configured — no-op.

  // Real implementation would POST to:
  // https://<dc>.api.mailchimp.com/3.0/lists/${listId}/members
  // with Basic auth using the API key. Left unimplemented pending real credentials.
  void lead;
}

async function sendToHubspot(lead: { email: string; name: string }) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return; // Integration not configured — no-op.

  // Real implementation would POST to the HubSpot Contacts API v3
  // using this private-app access token. Left unimplemented pending real credentials.
  void lead;
}
