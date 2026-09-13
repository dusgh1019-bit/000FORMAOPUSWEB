# FORMA OPUS — CLAUDE.md

## Source of truth
The full design/product rulebook lives at `docs/rulebook/`:
- `FORMA OPUS - Brand System Master (Claude Working Copy).xlsx` — canonical, 28 sheets (00_MASTER ... 99_CHANGELOG)
- `RULEBOOK.md` — full plaintext export of every sheet/row, generated from the xlsx for grep/reference. If the two ever disagree, the xlsx wins; regenerate `RULEBOOK.md` from it.

Per `26_AI_COLLAB_CHARTER` (CORE, "Continuity"): this rulebook, not chat history, is canonical across sessions. Re-read `01_CONSTITUTION` and `26_AI_COLLAB_CHARTER` before any non-trivial FORMA OPUS work.

## 01_CONSTITUTION — key CORE rules (see RULEBOOK.md for full table + prohibitions)
- Governance priority: CORE > SYSTEM > FLEX > page-level request. Any CORE change is a constitution revision, not a local page tweak.
- Brand hierarchy: FORMA OPUS → GREA → EXERCITUS / PARVUS / MACHINA, always visibly separated; higher level = more neutral.
- Atmosphere before explanation; entry asks for one action; portfolio before commerce.
- Motion has meaning: one dominant motion concept per screen; all major transitions mean moving deeper; minimize scroll hijacking.
- Mobile is recomposed, not scaled; touch cannot depend on hover.
- Legibility outranks artistic treatment.
- Every exception must be documented (reason, scope, end condition, repeatability) in `99_CHANGELOG` (in the xlsx).

## 26_AI_COLLAB_CHARTER — how Claude and the user work together (CORE unless noted)
- Never assert rendered/visual quality without actually seeing it (screenshot/render). State the limitation plainly if you can't observe output.
- Do not repeat a debugging method that already failed — change approach, don't re-tune the same broken logic.
- Never silently overwrite the only copy of a load-bearing file (this repo's canonical assets, production code, live config) — work on a duplicate unless told otherwise, and state which file is now canonical.
- Disclose environment/tool limits up front (no network, no browser/renderer, read-only, missing creds, etc.) since they change what "verified" means.
- (SYSTEM) Log what changed and why, not just "done" — for the rulebook itself, via `99_CHANGELOG` in the xlsx; for code, via commit messages / diff summaries.
- (SYSTEM) Non-trivial patches get concrete, checkable acceptance criteria stated before/alongside implementation.
- (SYSTEM) When a request is underspecified, pick the most reasonable default, state the assumption in one line, and proceed — don't stall with multi-question interrogation on low-risk tasks.
- (SYSTEM) Prefer targeted diffs over silent full-file rewrites.
- (SYSTEM) Separate confirmed fact ("I read the code / ran the test / saw the screenshot") from inference, in the same message.
- (FLEX) For large builds, share inspectable intermediate checkpoints rather than one final black-box drop.
- Every CORE/SYSTEM change to the Master rulebook gets a `99_CHANGELOG` row (Date / Version / Area / Change / Reason / Level affected / Status).

## Planning vs. execution split
- 우선순위/범위 결정, CORE·FROZEN 규칙 준수 판단, 이 세션 밖에서 들어온 변경사항의 규칙 검증
  → claude.ai에서 진행하는 기획/스펙 작성 세션이 담당
- Claude Code 세션(이 세션)은 실행 + 순수 기술 구현 판단(라이브러리 세부 선택, 코드 구조 등)을 담당
- 합의된 범위를 벗어나는 새 착수는 스스로 결정하지 말고, 발견 사실을 보고하고 대기
- 이 세션 밖에서 이미 적용된 것으로 보이는 변경은 "적용됨"으로 그냥 넘기지 말고
  diff 요약을 항상 보고에 포함 (기획 세션이 아직 규칙 준수를 확인 못했을 수 있음)

## Repo state (as of this migration)
This repo was empty when this session started. Current contents were migrated in from a prior direct-development session ("00.0") whose full site scaffold was not available — only the rulebook and one component package were recovered:
- `packages/history/` — the `@forma-opus/history` HISTORY-channel cinematic entry patch (RC8+, gate/nacre/dust/brush-axis sequence). See `packages/history/README.md` for its own changelog. Per the kickoff instructions, this patch's *content* is not to be silently expanded or judged as approved — the plan/spec session (00.1) has not confirmed it against `01_CONSTITUTION` yet.
- **Missing**: the root Astro app / site scaffold (no `astro.config`, no root `package.json`, no other routes). `pnpm install && pnpm dev` (PATCH 0) cannot run until that scaffold exists or is recovered — flag this rather than fabricating one.

## Rules for this session
- 값 불확실 → MISSING으로 표시, 지어내지 않음
- 실패한 방식 반복 안 함
- 큰 작업은 스크린샷/중간 결과로 먼저 확인받고 다음 단계
- CORE/FROZEN 규칙과 어긋나는 부분 발견 시 조용히 고치지 말고 보고
- 합의된 범위를 벗어나는 새 작업 착수는 보고 후 대기
