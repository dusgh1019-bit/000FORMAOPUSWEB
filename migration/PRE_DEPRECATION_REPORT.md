# FORMA OPUS — Architecture v2 Pre-Deprecation Report

Status: **RC1 / SOURCE MIGRATION COMPLETE / RUNTIME PARITY GATE PENDING**

The migration has been pushed to the point immediately before DEV 1.7 can responsibly be deprecated.

## What is migrated

### Platform
- Astro static-first application shell
- TypeScript
- Vite through Astro
- pnpm Workspace layout
- no site-wide SPA
- React retained only as scoped compatibility islands where existing interaction complexity warrants it

### Architecture
- L0 `packages/core`
- L1 `packages/shell`
- L2 `packages/ui`
- independent GREA / EXERCITUS / PARVUS / MACHINA / HISTORY / CAD packages
- independent `content/` ownership layer
- independent `public/` asset ownership layer
- service interfaces without premature backend implementation

### Route parity
- 33 DEV 1.7 application routes
- 33 Architecture v2 routes
- 0 missing
- 0 extra

### Component parity
- 38 migrated domain React components
- 38/38 exact after only planned import-boundary substitutions

### Content parity
The following canonical content files are byte-identical copies of DEV 1.7 source data:
- site model
- GREA
- EXERCITUS
- PARVUS
- MACHINA
- HISTORY Archive
- HISTORY Timeline

### CSS migration
The 247 KB site-wide `globals.css` no longer exists as an Architecture v2 runtime dependency.
CSS is now owned by shell/shared UI/domain packages.
A declaration-signature audit found **0 missing legacy non-core signatures**.

### AI maintainability
`config/ai-context-map.json` defines narrow read scopes for:
- root scenes
- GREA
- EXERCITUS entry/collection
- EXERCITUS customizer
- PARVUS
- MACHINA
- HISTORY timeline
- HISTORY archive
- CAD
- tokens
- shared UI
- services

A future request such as “HISTORY Timeline만 수정” can start from its mapped files instead of rescanning all domains.

### Service boundary
Interfaces exist for Storage / Upload / API / Database / Authentication / Commerce / Payment / Analytics. There are no fake live implementations and no new user-data backend.

## Validation passed
- Architecture package/content boundary checker: PASS
- Critical-route checker: PASS
- Frozen DEV 1.7 integrity: PASS
- Migration ownership/content parity: PASS
- Import resolver: **109 imports / 0 unresolved**
- Parser audit: **103 units / 0 errors**
- Static TypeScript semantic check: PASS
- CSS non-core legacy signature loss: **0**

## Why DEV 1.7 is not deleted yet

Deleting DEV 1.7 would be premature until these runtime gates pass in a network/browser-capable environment:

1. dependency install + committed lockfile
2. `astro build`
3. desktop visual regression at 1920 / 1440 / 1280 / 1024 widths
4. tablet/mobile touch regression
5. EXERCITUS Customizer pointer/front-back/zoom/layer regression
6. HISTORY Timeline wheel/touch/focus/detail regression
7. final production domain/sitemap replacement

At that point Architecture v2 becomes the canonical source and the frozen DEV 1.7 tree may be archived or removed.

## Deprecation decision

**Current recommendation: KEEP DEV 1.7 FROZEN, DO NOT DEVELOP ON IT.**

All new feature development should target Architecture v2 RC1. DEV 1.7 now serves only as parity/rollback evidence until the runtime gate is signed off.
