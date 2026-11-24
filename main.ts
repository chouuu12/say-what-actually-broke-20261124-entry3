// Say What Actually Broke — entry 3.
// Reads the one-line error message from line.txt, validates it against the
// bounty gate (single line, 1-200 characters, not only whitespace, no control
// characters, valid UTF-8), and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const linePath = join(here, "line.txt");

const raw = readFileSync(linePath);
const line = raw.toString("utf8");

// UTF-8 round-trip: the bytes must decode and re-encode identically.
if (!Buffer.from(line, "utf8").equals(raw)) {
  throw new Error("line.txt is not valid UTF-8");
}

// No carriage returns or newlines anywhere in the file.
if (line.includes("\r") || line.includes("\n")) {
  throw new Error("line.txt must contain exactly one line (no \\r or \\n)");
}

const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`line must be 1-200 characters, got ${length}`);
}
if (line.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

// No control characters (U+0000-U+001F, U+007F).
for (const ch of line) {
  const code = ch.codePointAt(0);
  if (code !== undefined && ((code < 0x20) || code === 0x7f)) {
    throw new Error(`line contains a control character U+${code.toString(16).padStart(4, "0")}`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, line, "utf8");
console.log(`wrote ${length} chars to ${outPath}`);
