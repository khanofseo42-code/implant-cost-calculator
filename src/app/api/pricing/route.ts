import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sectionSchemas, invalidatePricingConfigCache, type PricingSectionName } from "@/lib/pricing-engine/defaults";
import { SECTION_FILENAMES, readSectionFromDisk, writeSectionToDisk } from "@/lib/pricing-engine/configFiles.server";

const sectionNames = Object.keys(SECTION_FILENAMES) as PricingSectionName[];

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section") as PricingSectionName | null;

  if (section) {
    if (!sectionNames.includes(section)) {
      return NextResponse.json({ error: "Unknown section" }, { status: 400 });
    }
    const data = await readSectionFromDisk(section);
    return NextResponse.json({ section, data });
  }

  const all = Object.fromEntries(
    await Promise.all(sectionNames.map(async (name) => [name, await readSectionFromDisk(name)]))
  );
  return NextResponse.json(all);
}

const putSchema = z.object({
  section: z.string(),
  data: z.unknown(),
});

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = putSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { section, data } = parsed.data;
  if (!sectionNames.includes(section as PricingSectionName)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const schema = sectionSchemas[section as PricingSectionName];
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: validated.error.issues },
      { status: 422 }
    );
  }

  await writeSectionToDisk(section as PricingSectionName, validated.data);
  invalidatePricingConfigCache();

  return NextResponse.json({ ok: true });
}
