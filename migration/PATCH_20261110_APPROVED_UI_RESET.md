# FORMA OPUS | 2026-11-10 APPROVED UI RESET

Source of Truth: Google Drive RC9 ZIP (id 1tWEmWVddxmnyLhFpKguRluCkA1Q7qLwA), preserved unchanged.

## User-approved work
- ACADEMIA/HISTORY: Blank white canvas with back-navigation only; disable history entry bridge.
- PARVUS: Remove KEEP/PLAY/PLACE from active navigation; use flat project index.
- GREA/PARVUS/MACHINA: White background, black type, one-line project entries; project destinations say WORK IN PROGRESS.
- Main intro: Copy approved HTML intro motion, update manual readiness and remove fail-open timeout and demo placeholder; connect to existing root scene controller through isolated `srcdoc` frame to avoid style leaks.
- 15 alternate self-contained HTML concepts as external exploratory previews, not auto-merged into approved site.

## Browser QA (portable HTML)
Chromium 1440 desktop and 390 mobile: intro LOADING → READY → WORKS; WORKS↔ACADEMIA, HISTORY blank/back, PARVUS directory, WIP; no JS page errors. 15 variants: ENTER project directory and project WIP passed.

## Source checks
node scripts/check-boundaries.mjs : PASS
node scripts/check-routes.mjs : PASS (33 previous preserved + 2 new approved)
node scripts/check-legacy-integrity.mjs : PASS
node scripts/check-migration-parity.mjs : PASS

## Still required
Astro dependency install, `pnpm build` and browser screenshots of the native built Astro pages. This was NOT completed in the isolated environment; mark BLOCKED until verified. GitHub independent branch sync/commit and Drive upload readback are separate actions. Public deployment is NOT approved.

## Restore
Original Drive RC9 ZIP is immutable baseline. GitHub existing default branch must be backed up before attempting to sync this candidate. Do not force-push over default branch.
