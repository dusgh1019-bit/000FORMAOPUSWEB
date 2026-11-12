# FORMA OPUS | PARVUS FIVE STATES v2 / approved-source merge

User decision: 2026-11-11, promote v2 to current main update.

**Base:** FORMA_OPUS_RC9_APPROVED_SOURCE_PATCH.zip (Drive ID 1mtWJ6SXnijts_MggM-UsEMJiU52hkc_x), derived from RC9. ALL earlier approved changes retained.

**Changes:**
- `apps/web/public/parvus-five-states-v2.html`: exact standalone HTML/CSS/JS from user-approved Five States v2.
- `apps/web/src/pages/parvus/index.astro`: v2 experience isolated in a full-screen iframe. Project index and WIP render inside v2 study.
- `packages/shell/src/scene-controller.ts`: WORKS → PARVUS full-screen dark fade (plus earlier approved intro code preserved).
- `review/FORMA_OPUS_FULL_REVIEW_LATEST.html`: latest tested HTML preview updated to v2 integrated review; previous review backed up.

Previous site clean-directory `apps/web/src/pages/parvus/projects/index.astro` is UNCHANGED and independently accessible. No old KEEP/PLAY/PLACE hierarchy restored. Other domains and HISTORY untouched.

QA: archive CRC PASS; route parity and boundaries tests PASS. Previously approved original HTML browser QA PASS. New Astro build, iframe route and full-site visual QA NOT complete because this environment cannot navigate Chromium page (ERR_BLOCKED_BY_ADMINISTRATOR) and pnpm dependencies are unavailable. No deployment.

**GitHub:** Draft PR #2 updates static full-site review only, not full Astro sources. This ZIP is the authoritative derived SOURCE package for subsequent CI/build. Original approved ZIP is preserved.
