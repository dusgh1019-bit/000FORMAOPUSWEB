# FORMA OPUS — Current Source Audit

Source of truth inspected: `legacy/next-dev-1.7` (DEV 1.7).

## Measured shape

- Files: **93** excluding `tsconfig.tsbuildinfo`.
- Route pages: **33**.
- TypeScript/TSX: **88** files.
- Client components: **28**.
- `app/globals.css`: **247,602 bytes / 1,361 lines**.
- Historical/version CSS comment sections: **27**.
- Media-query declarations: **37** with fragmented thresholds including 1100 / 1050 / 900 / 780 / 760 / 700 / 650 / 620 / 560 px.
- Approximate unique CSS class tokens: **716**.
- External framework coupling: `next/link` 31 imports, `next/navigation` 10 imports, `react` 24 imports.

## What is already healthy

1. Route wrappers are generally thin. Domain logic is already concentrated under `components/<domain>` and `content/<domain>.ts`.
2. Cross-domain component imports are rare; the main deliberate aggregator is `app/sitemap.ts`.
3. GREA / PARVUS / MACHINA / HISTORY / EXERCITUS already have recognizable content ownership boundaries.
4. Existing TypeScript content files are a strong bridge toward a data-first content layer.

## Primary coupling / regression risks

### R1 — Global CSS is the real monolith
`app/globals.css` contains CORE tokens, SHELL, every domain, responsive overrides, and historical patch layers from DEV 0.x through DEV 1.7. Later rules override earlier rules by source order. Moving a block without preserving cascade order can silently alter visual behavior.

**Migration rule:** split CSS only with a selector ownership map and screenshot/behavior parity gate. Keep a temporary `legacy-cascade.css` fallback until each domain is signed off.

### R2 — Interaction hydration is broader than necessary
28 client-marked components exist. Several shared/navigation components are client-marked primarily because of Next routing or tiny session-state behavior, while complex islands are concentrated in HISTORY and EXERCITUS.

**Migration rule:** Astro static by default; use small DOM controllers for shell/simple hover/state. Preserve a framework island only where state complexity justifies it (notably EXERCITUS Customizer if parity cost is lower than rewriting it immediately).

### R3 — Breakpoints are not constitutional tokens
Responsive thresholds accumulated per feature. This is the most likely source of future cross-domain media-query drift.

**Migration rule:** new Architecture v2 code uses 1440 / 1280 / 1024 / 780 / 620 policy. Legacy thresholds remain untouched until the owning module is migrated and visually checked.

### R4 — Browser state has implicit contracts
`sessionStorage` controls root scene entry and EXERCITUS purchase/design flow; `localStorage` holds draft/revision/cart data. Those keys are behavioral APIs even though they are not formal services.

**Migration rule:** record storage keys as compatibility contracts before replacing routing/state implementation.

### R5 — Portable preview is not maintainable source
The single-file Portable preview is useful for visual QA but duplicates CSS/JS/markup into a large artifact. It must be generated from modular source, never become the canonical implementation.

### R6 — HISTORY needs a renderer/data boundary
`HistoryTimelineExperience.tsx` and `history-timeline.ts` are already separate, which is good, but the renderer still owns many era-specific presentation branches. A future engine should expose one common Timeline coordinate/state model plus era dialect renderers.

### R7 — EXERCITUS is the highest interaction-risk module
`CustomizerWorkspace.tsx` and `TShirtStage.tsx` contain direct pointer transforms, local/session storage, z-order, front/back state, zoom, typography, and capture flow. Rewriting this during foundation migration would create unnecessary regression risk.

**Migration rule:** isolate first, port later. Treat it as an island with an explicit storage/commerce boundary.

## Migration-risk order

1. CORE token extraction — low risk.
2. SHELL / Root scenes — medium risk, small surface, high shared value.
3. Shared UI primitives — medium risk; must preserve variant behavior.
4. PARVUS / MACHINA / GREA static/editorial surfaces — medium risk.
5. HISTORY engine — high interaction/information-architecture risk.
6. EXERCITUS editor — highest pointer/state/commerce regression risk; migrate last among active domains or retain scoped React island.
