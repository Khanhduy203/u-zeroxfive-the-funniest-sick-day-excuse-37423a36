// The Funniest Sick-Day Excuse — make.fun entry (program/v1).
//
// Writes a single original sick-day excuse line to entry.txt inside the
// output directory named by MAKEFUN_OUTPUT_DIR (default ./output).
// Node standard library only: no dependencies, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The entry: one breath, half believable, fresh idea, twist at the end.
const ENTRY =
  "Sorry, can't make it in today — I tried to jump-start my neighbour's car this morning, and my back has now filed a formal complaint with HR.";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "./output");

// Gate checks, mirroring the competition gate: 1-200 chars, single line,
// not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  fail(`entry is ${ENTRY.length} characters, must be 1-${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

console.log(`Wrote ${outPath}`);
console.log(`Entry (${ENTRY.length} chars): ${ENTRY}`);
