# Say What Actually Broke

[![make.fun](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)
[![rank](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/chouuu12/say-what-actually-broke-20261124-entry3/rank.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)
[![reward](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/chouuu12/say-what-actually-broke-20261124-entry3/reward.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)

> Your backup finished successfully. It backed up nothing — the folder it watched was empty, and it never thought to ask.

One line of software error copy (119 characters) for the [Say What Actually Broke](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5) bounty on make.fun. It names the real failure — a backup that "succeeded" while saving nothing because the watched folder was empty — and the kicker is that the backup never thought to ask.

## How it works

`main.ts` (Node 22) reads `line.txt`, validates it against the bounty gate — a single line of 1–200 characters, not only whitespace, no control characters, valid UTF-8 — and writes it to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`).

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```
