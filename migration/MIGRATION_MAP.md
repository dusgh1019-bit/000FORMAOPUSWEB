# FORMA OPUS — Architecture v2 Migration Map

## Decision

Architecture v2 will be a **parallel, incremental migration**, not a rewrite. `legacy/next-dev-1.7` remains the behavior/visual source of truth until each route passes parity checks. Astro becomes the target shell and static renderer. Interactive code is added only as islands/controllers.

## Target layers

```text
L0 CORE
  tokens / typography / spacing / grid / breakpoints / motion / z-index
        ↓
L1 SHELL
  Root Entry / 01 WORKS / 02 ACADEMIA / global nav / scene transition
        ↓
L2 SHARED UI
  SplitPanelScene / Breadcrumb / SectionLabel / Reveal / Overlay / Modal / Gallery / Timeline primitives
        ↓
DOMAIN MODULES
  GREA ───────┐
    EXERCITUS │
  PARVUS      │  may depend only on CORE + UI + SERVICE CONTRACTS
  MACHINA     │
  HISTORY     │
  CAD         │
              ┘
        ↓
CONTENT LAYER + ASSET LAYER + SERVICE BOUNDARY
```

## Dependency law

- `core` imports nothing from product domains.
- `ui` → `core` only.
- `shell` → `core`, `ui` only.
- Domain → `core`, `ui`, `services` only.
- Domain A may not import Domain B implementation.
- GREA may link to EXERCITUS routes, but does not import EXERCITUS internals.
- App route composition may import multiple domains; shared packages may not.
- Content never imports UI.
- Services never import UI/domain presentation.

The repository includes `scripts/check-boundaries.mjs` to enforce this rule without an external linter.

## Current → target mapping

| Current DEV 1.7 | Target owner | Migration action |
|---|---|---|
| `app/globals.css` root tokens | `packages/core` | Extract first; no visual value changes |
| Root Entry / scene logic | `packages/shell` | Port to Astro + small TS controller |
| `SplitPanelScene.tsx` | `packages/ui/SplitPanelScene.astro` | Static Astro component; no React needed |
| Breadcrumb / section labels | `packages/ui` | Static shared primitives |
| GREA components/content | `packages/grea` + `content/grea` | Move route-by-route after shell parity |
| EXERCITUS components/content | `packages/exercitus` + `content/grea/exercitus` | Isolate; complex editor can remain scoped React island during transition |
| PARVUS | `packages/parvus` + `content/parvus` | Mostly static Astro + small interaction controllers |
| MACHINA | `packages/machina` + `content/machina` | Static catalogue/evidence pages + inquiry boundary |
| HISTORY renderer | `packages/history` | Engine/controller + era dialect renderers |
| HISTORY data | `content/history/*` | Data only; UI never contains historical records |
| CAD HOLD | `packages/cad` + `content/cad` | Keep empty independent domain boundary |
| local/session storage | service/compat contract | Preserve key compatibility during migration |
| Portable HTML | generated QA artifact | Never source of truth |

## Phased migration

### PHASE 01 — AUDIT / DEPENDENCY MAP — COMPLETE IN THIS PATCH
- Frozen legacy source copied to `legacy/next-dev-1.7`.
- File classification and import map generated.
- Global CSS, browser-state and breakpoint risks documented.

### PHASE 02 — CORE — STARTED / FOUNDATION COMPLETE
- Constitutional tokens extracted to `packages/core`.
- Canonical Architecture v2 breakpoint/motion policy created.
- Legacy CSS is not deleted yet.

### PHASE 03 — SHELL — STARTED
- Root Entry + WORKS/ACADEMIA scene system ported to Astro static markup + a small TypeScript controller.
- Existing session key `forma-opus-root-state`, wheel/touch thresholds, 760 ms scene lock and split-panel behavior are preserved.
- This is the first parity slice to test before more routes move.

### PHASE 04 — SHARED UI — STARTED
- `SplitPanelScene`, `BreadcrumbTrail`, `SectionLabel`, `HoverReveal`, `BlurOverlay` boundaries created.
- Remaining Gallery / Modal / MediaViewer / Timeline primitives are extracted only when a second real consumer proves the abstraction.

### PHASE 05 — DOMAIN EXTRACTION
Recommended order: PARVUS → MACHINA → GREA shell/product lines → EXERCITUS non-editor pages → EXERCITUS editor.
Reason: migrate lower-risk editorial routes first and leave pointer-heavy editor state until boundaries are stable.

### PHASE 06 — ACADEMIA
- Keep HISTORY active and CAD HOLD.
- Root ACADEMIA split remains SHELL; domain contents live independently.

### PHASE 07 — HISTORY ENGINE / CONTENT
- Keep one canonical Timeline coordinate/state model.
- Separate engine state from era dialect renderers and from historical data.
- Target internal split:
  - `engine/coordinate.ts`
  - `engine/semanticZoom.ts`
  - `engine/relation.ts`
  - `dialects/evidence.ts`
  - `dialects/parallel-polities.ts`
  - `dialects/dual-polities.ts`
  - `dialects/layered-period.ts`
  - `dialects/hierarchical-power.ts`
  - `dialects/core-spine-lens.ts`
  - `content/history/...`
- Timeline data addition must not edit renderer code.

### PHASE 08 — CAD
- Preserve current HOLD UI.
- Keep route/package/content space ready for future education collaboration without inventing categories.

### PHASE 09 — ASSETS
- Move canonical delivery media under domain folders.
- Do not public-serve authoring masters.
- Add responsive image policy and GLB only where intrinsically needed.

### PHASE 10 — CSS DE-DUPLICATION
- Delete legacy cascade only after every selector group has an owner.
- Consolidate repeated media queries into domain-local responsive files using shared breakpoint policy.

### PHASE 11 — LAZY LOAD / CODE SPLIT
- Shell loads at root.
- Domain JS loads only on domain routes.
- HISTORY timeline interaction loads only in HISTORY.
- EXERCITUS editor dependencies load only on `/grea/exercitus/customize`.

### PHASE 12 — REGRESSION
- Desktop widths: 1920 / 1440 / 1280 / 1024.
- Tablet / mobile.
- Keyboard / touch / reduced motion.
- Root scene state/back navigation.
- EXERCITUS front/back independence and 400% zoom.
- HISTORY timeline semantics and archive deep links.

## Definition of “migrated”
A route is migrated only when:
1. canonical content is outside UI code;
2. domain has no forbidden sibling-domain import;
3. visual parity is accepted;
4. keyboard/touch/reduced-motion parity is accepted;
5. direct/deep route loads correctly;
6. old route can be removed without another domain breaking.

## AI maintenance contract
Every domain should eventually contain a short `AI_SCOPE.md` listing:
- owned routes;
- owned content paths;
- owned CSS;
- public contracts;
- forbidden dependencies;
- regression checks.

A future request such as “MACHINA REQUEST 수정” should require opening only MACHINA + shared UI contract files, not HISTORY/GREA/PARVUS implementation.
