# FORMA OPUS — RC6 HISTORY Fresh Restart / Blank State Reset

## Scope

Local HISTORY domain reset only. No new HISTORY concept is introduced.

## Active result

- `/academia/history` exists and renders an intentionally empty HISTORY content area.
- Existing `/academia/history/:slug` static routes remain valid and render the same empty state.
- `content/history/` is preserved and not rendered.
- HISTORY Timeline, Master Timeline, semantic zoom, event nodes, archive index, author note UI, lenses, relation layers, sticky/scroll interception, wheel remapping and HISTORY-only motion runtime are removed from the active HISTORY package.
- HISTORY-specific domain CSS is removed.
- HISTORY-only rules that had leaked into Shared UI CSS are removed without redesigning Shared UI.
- `@forma-opus/web` no longer depends on `@forma-opus/history` at runtime.
- `@forma-opus/history` remains as an empty domain boundary for future redesign.

## Non-target preservation

GREA / EXERCITUS / PARVUS / MACHINA / CAD / CORE / SHELL / SERVICES and their content remain outside this reset. The full-site review continues to use the accumulated UX-parity artifact for those domains; only HISTORY is blanked.

## Data preservation

RC5 → RC6 recursive diff of `content/history/` is empty. Historical source data is not destroyed.

## Validation model

The migration guards are reset-aware: component parity is intentionally skipped for the explicitly reset `history` domain, while all other migrated domain parity rules remain active. Frozen DEV 1.7 integrity remains enforced.
