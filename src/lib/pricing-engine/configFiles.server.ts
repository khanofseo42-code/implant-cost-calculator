import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { PricingSectionName } from "./defaults";

const CONFIG_DIR = path.join(process.cwd(), "src", "config", "pricing");

export const SECTION_FILENAMES: Record<PricingSectionName, string> = {
  countries: "countries.json",
  cities: "cities.json",
  brands: "brands.json",
  treatments: "treatments.json",
  procedures: "procedures.json",
  insurance: "insurance.json",
  finance: "finance.json",
  campaigns: "campaigns.json",
};

function filePathFor(section: PricingSectionName) {
  return path.join(CONFIG_DIR, SECTION_FILENAMES[section]);
}

export async function readSectionFromDisk(section: PricingSectionName): Promise<unknown> {
  const raw = await readFile(filePathFor(section), "utf-8");
  return JSON.parse(raw);
}

export async function writeSectionToDisk(section: PricingSectionName, data: unknown): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";
  await writeFile(filePathFor(section), json, "utf-8");
}
