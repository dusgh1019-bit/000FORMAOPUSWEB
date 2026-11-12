# RC8 — HISTORY Entry Route Repair + Tactile Brush Axis Upgrade

## User-facing fixes

1. **Full-site review route handoff repaired**
   - Root cause: the standalone review's ACADEMIA→HISTORY fullscreen bridge remained as a fixed `z-index:99999` overlay after the hash route changed.
   - Fix: bridge is tagged, removed before route handoff, stale bridges are cleared on every route render, and the source panel opacity is restored.
   - Expected review path: `FORMA OPUS → 02 ACADEMIA → HISTORY → RC8 HISTORY channel`.

2. **Master axis changed from clean vector line to tactile brush stroke**
   - Lightweight 2D Canvas renderer.
   - Pressure variation along the stroke.
   - Deterministic edge fibres / bristle jitter.
   - Dry-brush channels that reveal the page through the ink body.
   - Organic centerline wobble; no calligraphy glyph imitation.
   - Stroke is drawn top→bottom, then the completed axis settles from center to the left UI position.
   - SVG remains only a low-opacity fallback/reduced-motion scaffold.

## Scope preserved

- HISTORY only plus review-artifact route glue.
- Historical content remains disconnected.
- No era/event/archive systems reintroduced.
- GREA / EXERCITUS / PARVUS / MACHINA / CAD unchanged by this repair.

## Validation

- Review JavaScript syntax: PASS.
- Package/content boundaries: PASS.
- Route parity: PASS 33/33.
- Frozen DEV 1.7 integrity: PASS.
- Migration/component guards: PASS.
- Architecture static TypeScript check: PASS.
- Targeted strict TypeScript check for `entry-controller.ts`: PASS.
- Pre-deprecation source gate: PASS.
- HISTORY CSS brace balance: PASS.
- Chromium runtime screenshot remains unavailable in this environment because headless Chromium stalls on DBus/zygote initialization; user-facing HTML is provided for manual UX QA.
