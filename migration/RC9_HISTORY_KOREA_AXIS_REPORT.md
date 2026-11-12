# RC9 — HISTORY / KOREA / AXIS

Patch ID remains `TBD` because no authoritative numeric registry has been recovered.

## Intent

RC9 is a HISTORY-local feature patch on the post-RC6 clean state. It does **not** restore legacy timeline content or migrate unrelated domains.

Implemented sequence:

`ACADEMIA HISTORY CELL → FULLSCREEN → CENTERED HISTORY → CONTROLLED PARTICLE DISSOLUTION → BLACK FIELD / ACCENT SEAM → ABSTRACT KOREAN LACQUER + NACRE GATE → USER OPEN → LIGHT ADAPTATION → 基軸 / KOREA / AXIS → VERTICAL BRUSH MASTER AXIS → PROTOTYPE SUMMARY → DETAIL HOOK`

## Important boundaries

- `content/history/**` remains preserved and disconnected.
- No era population, event population, archive, Study Mode, Lecture Mode, CONFLICT/POWER/CONTEST, parallel polity timeline, Goryeo layers, Joseon branch, or Modern lens is implemented.
- Gate, particles, nacre, channel identity, brush axis, and prototype response states remain owned by `packages/history`.
- Shell change is limited to the ACADEMIA HISTORY cell fullscreen bridge.
- No CORE or shared UI redesign.

## UX implementation

- HISTORY cell bridge uses the existing HISTORY panel palette and moves the HISTORY wordmark to the center while expanding to viewport.
- Particle paths are generated from a controlled per-entry seeded PRNG. Optional `?historySeed=<number>` exists for repeatable development inspection.
- Gate is an abstract bilateral Korean gate: dark lacquer planes, minimal frame, nacre-like SVG traces, pearl/metal ring handles, central light seam.
- Desktop pointer movement subtly changes door/nacre response. Mobile press previews and release commits through Pointer Events.
- Gate activation remains the decisive user action; the sequence does not auto-open.
- Light transition is smooth and non-strobing.
- `基軸` is atmospheric background typography; `KOREA / AXIS` is the primary channel identity.
- Master axis is rendered by a lightweight Canvas brush with pressure variation, wet-core density, split bristles, and dry-brush paper gaps. It is drawn at center and then settles left.
- A single prototype node validates `first response = summary/structure` and `second explicit response = detail hook` without adding historical content.
- Reduced motion compresses particles, anticipation, and brush flourish while preserving gate activation and final interface.

## Review artifact rule

RC9 Full-Site Review is based on the accumulated UX-parity artifact, not a reduced mock. HISTORY is replaced with the RC9 experience while WORKS, GREA, PARVUS, MACHINA, ACADEMIA, and CAD remain navigable for regression review.
