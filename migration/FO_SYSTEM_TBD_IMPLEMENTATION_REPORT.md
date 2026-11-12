# FO-SYSTEM-TBD — Implementation Report

## Title
Cross-Domain Entry Interaction + PARVUS Theme Focus + GREA Line Identity Rebalance

## Base
- Input architecture: Architecture v2 Pre-Deprecation RC1
- Output architecture: Architecture v2 Pre-Deprecation RC2
- Frozen rollback source: DEV 1.7 remains unchanged

## Patch ID
`FO-SYSTEM-TBD`

No authoritative numbered Patch Registry was present in the available project source/context. The number was therefore not inferred.

## Change surface

### L2 — Shared UI
Added `packages/ui/src/react/VisualEntrySurface.tsx`.

It standardizes only:
- full-media/panel navigation hit area
- anchor semantics
- keyboard focus target
- accessible label

It does **not** standardize domain motion, mask, typography, color or transition character.

Applied to:
- GREA primary line panels
- PARVUS KEEP / PLAY / PLACE landing panels
- MACHINA OBJECTS / SYSTEMS landing panels

### L3 — PARVUS
Reworked `/parvus/projects` into an explicit single-theme exploration surface.

Rules now enforced:
- KEEP / PLAY / PLACE are selected explicitly
- only the active theme's records render in the exploration rail
- switching theme is a user action through the sticky selector
- scroll cannot automatically transition KEEP → PLAY → PLACE
- current theme stays visible near the top of the viewport
- project scenes use large visible media as entry surfaces
- current-theme related works are prioritized in project detail
- no Product / Project data records were removed or rewritten

Native sticky positioning is used for the large visual stage. No wheel lock or one-wheel-per-scene hijack was introduced.

### L3 / L4 — GREA
Primary line entry was rebalanced.

Before:
- EXERCITUS received ~1.8fr of landing width
- FABER and VESTIS received ~0.75fr each

RC2:
- EXERCITUS / FABER / VESTIS each receive equal primary entry width
- content maturity can remain asymmetric
- each full panel is directly clickable/tappable
- INSIGNIA / CUSTOM remain secondary cross-line systems

Line data now carries:
- philosophy
- accent
- accentRole
- motionCharacter

Prototype identities:
- EXERCITUS — DEDICATION / SYMBOL / deep oxblood family
- FABER — FUNCTION + SAFETY / SIGNAL / muted safety amber
- VESTIS — DISCIPLINED FREEDOM / EXPRESSION / controlled artwork-derived prototype accent

These are line-scoped aliases, not new global FORMA OPUS themes.

### L3 — MACHINA
OBJECTS and SYSTEMS landing visuals now act as direct entry surfaces.

Desktop:
- hover/focus still drives FOCUS/REVEAL response
- click enters the destination

Mobile:
- tap enters directly

No MACHINA project/request/evidence model was changed.

## Architecture protection

`config/patch-surface.json` declares intentional drift.
Migration guards were upgraded so that:
- declared patch files may differ from DEV 1.7
- undeclared component/content drift still fails the source gate

This avoids disabling parity protection merely because feature development has begun on Architecture v2.

## Explicit non-target preservation

No intentional changes were made to:
- HISTORY package/content
- CAD package/content
- EXERCITUS components
- EXERCITUS canonical content
- Services contracts
- MACHINA project/request data
- PARVUS canonical Product/Project records

## Acceptance mapping

### Shared entry
PASS by static implementation:
- GREA primary visual panel -> full entry anchor
- PARVUS theme visual -> full entry anchor
- MACHINA OBJECTS/SYSTEMS visual -> full entry anchor
- shared anchor is keyboard focusable
- no parent click overlay was added to ObjectStudyCard because its media contains an independent compare control

### PARVUS
PASS by structure:
- active Theme state = one of KEEP / PLAY / PLACE
- only `parvusProjects.filter(project.theme === activeTheme)` renders in the active rail
- selector changes theme explicitly
- hash keeps explicit theme navigation compatible with existing `/parvus/projects#keep|play|place` URLs
- current-theme related work is prioritized
- mobile uses normal vertical scroll and tap navigation

### GREA
PASS by structure:
- equal primary grid columns
- all three line panels direct-entry
- line philosophy/accent/motion data separated from component code
- EXERCITUS subdomain functionality untouched
- INSIGNIA / CUSTOM remain below primary lines

### MACHINA
PASS by structure:
- visible landing panels navigate directly
- existing focus response remains
- no internal systems/project/request behavior changed

## Runtime limitation

The execution environment still cannot resolve `registry.npmjs.org`, so `pnpm install` / real Astro build / browser visual regression cannot be completed here.

The result remains:

`SOURCE-GATE PASS / RUNTIME-QA PENDING`
