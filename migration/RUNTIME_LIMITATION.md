# Runtime verification limitation

Source migration reached the runtime parity gate, but this execution environment cannot currently install the pinned pnpm/Astro dependency graph.

Attempted command:

```text
pnpm install --offline --frozen-lockfile=false
```

Corepack attempted to obtain `pnpm@10.15.1` from `registry.npmjs.org` and failed with DNS/network error `EAI_AGAIN`.

Consequences:

- `astro build` was **not** executed.
- Browser-level regression against the Astro output was **not** executed.
- A generated `pnpm-lock.yaml` could not be produced here.

What *was* verified without network dependencies:

- package/content dependency boundaries
- 33/33 route-shape parity
- frozen DEV 1.7 integrity
- migrated content byte parity
- 38/38 migrated React domain components exact after boundary-only import substitutions
- import resolution audit
- TypeScript/TSX/Astro parse audit
- strict static TypeScript semantic check using local stubs
- CSS declaration parity
- ZIP integrity

DEV 1.7 must remain the rollback source until a network-enabled environment passes install/build and browser regression gates.
