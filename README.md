# FORMA OPUS — Architecture v2 / Pre-Deprecation RC9

This repository is the active Architecture v2 candidate built from frozen **FORMA OPUS DEV 1.7**.

## Status

**FEATURE DEVELOPMENT ACTIVE / SOURCE GATES PASS TARGET / RUNTIME PARITY GATE PENDING**

DEV 1.7 remains frozen under `legacy/next-dev-1.7/` for rollback/parity evidence only.

## Stack

- Astro static-first
- TypeScript
- Vite through Astro
- pnpm Workspace
- scoped client logic only where interaction requires it

## RC9 — HISTORY / KOREA / AXIS

RC9 keeps the RC6 fresh-reset boundary and builds only the first new channel foundation:

`ACADEMIA HISTORY CELL → FULLSCREEN → HISTORY → PARTICLE DISSOLUTION → KOREAN LACQUER/NACRE GATE → USER OPEN → LIGHT ADAPTATION → 基軸 / KOREA / AXIS → VERTICAL BRUSH MASTER AXIS → SUMMARY / DETAIL CONTRACT`

Historical source data remains preserved under `content/history/` and remains disconnected from the page.
No era system, populated events, archive UI, CONFLICT/POWER/CONTEST, Study Mode, or Lecture Mode is reintroduced.

## UX parity delivery rule

Architecture refactoring may compact the development surface. It may **not** compact the user experience.
Every code-changing update includes a current full-site review artifact in `review/`.

## Validation commands

```bash
node scripts/check-boundaries.mjs
node scripts/check-routes.mjs
node scripts/check-legacy-integrity.mjs
node scripts/check-migration-parity.mjs
node scripts/check-component-parity.mjs
tsc -p migration/tsconfig.static-check.json --noEmit
node scripts/verify-pre-deprecation.mjs
```

A network-enabled environment must still run `pnpm install`, `pnpm build`, and browser regression before DEV 1.7 deprecation.
