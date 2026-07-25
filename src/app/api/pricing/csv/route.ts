import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sectionSchemas, invalidatePricingConfigCache, type PricingSectionName } from "@/lib/pricing-engine/defaults";
import { SECTION_FILENAMES, readSectionFromDisk, writeSectionToDisk } from "@/lib/pricing-engine/configFiles.server";
import { toCsv, fromCsv } from "@/lib/utils/csv";

const sectionNames = Object.keys(SECTION_FILENAMES) as PricingSectionName[];

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section") as PricingSectionName | null;
  if (!section || !sectionNames.includes(section)) {
    return NextResponse.json({ error: "Unknown or missing section" }, { status: 400 });
  }

  const data = (await readSectionFromDisk(section)) as Record<string, unknown>[];
  const csv = toCsv(data);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${section}.csv"`,
    },
  });
}

const importSchema = z.object({ section: z.string(), csv: z.string() });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = importSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { section, csv } = parsed.data;
  if (!sectionNames.includes(section as PricingSectionName)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const rows = fromCsv(csv);
  const schema = sectionSchemas[section as PricingSectionName];
  const validated = schema.safeParse(rows);
  if (!validated.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: validated.error.issues },
      { status: 422 }
    );
  }

  await writeSectionToDisk(section as PricingSectionName, validated.data);
  invalidatePricingConfigCache();

  return NextResponse.json({ ok: true, count: rows.length });
}
