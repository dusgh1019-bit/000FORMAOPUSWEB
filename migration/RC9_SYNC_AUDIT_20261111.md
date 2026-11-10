# RC9 synchronization audit | 2026-11-11

Status: PARTIAL, NOT SYNCHRONIZED. Do not deploy or merge.

Approved source of truth: Google Drive RC9 ZIP (ID 1tWEmWVddxmnyLhFpKguRluCkA1Q7qLwA). Proposed patched Astro source: Google Drive ZIP ID 1mtWJ6SXnijts_MggM-UsEMJiU52hkc_x.

Repository baseline before work: default branch claude/web-dev-migration-zfl0kt, commit 88ccaaa87afd22b40cb3212d368d7c152b5fe18e (2026-09-13). Recovery branch: backup/pre-rc9-sync-20261111 at that SHA. This repo contains a legacy portable HTML and HISTORY package, not the full Astro RC9 tree.

ZIP comparison by relative file paths: RC9 306 files, patched 313 files, 33 modified files, 7 added, zero removed. No removal of RC9 source files was detected. Existing GitHub-only files must be classified before any deletion.

Local checks on patched ZIP: check:boundaries PASS; check:routes PASS (33 preserved + 2 approved); check:legacy PASS; check:migration PASS (2 declared content drifts, 0 undeclared).

Outstanding: transfer complete source tree to this sync branch; reconcile GitHub-only paths; install pnpm dependencies; run Astro build and browser regression QA; create review PR. Do not call this branch synced until these steps pass.

User approved modifications: HISTORY blank return view; PARVUS flat project listing; GREA/PARVUS/MACHINA WIP directory; approved intro. The separate 15 motion HTML samples are not approved for site integration.

60-second film: not started because P0 site synchronization/build incomplete.
