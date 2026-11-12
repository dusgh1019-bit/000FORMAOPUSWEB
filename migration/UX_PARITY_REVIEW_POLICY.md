# UX Parity Review Policy — RC5

## Non-negotiable rule

Architecture refactoring may compact the development surface. It may **not** compact the user experience.

A review artifact is valid only when it preserves the accumulated visible experience: visual composition, motion graphics, content density, navigation, hover/tap behavior, responsive behavior, and domain-specific interaction character. A schematic mock, wireframe, route map, or textual substitute is not acceptable parity evidence.

## Current bridge rule

Until `pnpm install -> astro build -> browser regression` is available in the execution environment, use the frozen DEV 1.7 full portable artifact as the visual/motion/content parity substrate and apply current approved feature patches additively. The modular Architecture v2 source remains the development source; DEV 1.7 remains read-only.

## Patch rule

User-facing patches continue forward. They must be represented in the review artifact without deleting prior motion/content unless the user explicitly requests that deletion.

## Promotion gate

Architecture v2 may replace this bridge review only after a real built runtime demonstrates equivalent-or-better UX across root, GREA, EXERCITUS, PARVUS, MACHINA, HISTORY and CAD on desktop/narrow/mobile views.
