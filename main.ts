// Midnight Fridge Roast — writes one roast line to /output/entry.txt.
//
// The joke: a smart fridge that locks itself at midnight, told as if the
// leftovers hired nightclub security and the owner failed the door check.
// One premise (locked fridge at midnight), one twist (the pizza's bouncer),
// nothing else competing for the laugh.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My smart fridge locks at midnight, so the leftover pizza has a bouncer and I'm not on the list.";

function gate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) throw new Error("entry must not have leading/trailing whitespace");
  const words = text.split(/\s+/).length;
  if (words < 5 || words > 40) throw new Error(`entry word count out of range: ${words}`);
}

function main(): void {
  gate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
}

main();
