# CSS parity — DEV 1.7 → Architecture v2 RC1

The frozen `legacy/next-dev-1.7/app/globals.css` was classified and extracted by ownership rather than redesigned.

Runtime ownership:

- `packages/shell/src/shell.css`
- `packages/ui/src/ui.css`
- `packages/grea/src/domain.css`
- `packages/exercitus/src/domain.css`
- `packages/parvus/src/domain.css`
- `packages/machina/src/domain.css`
- `packages/history/src/domain.css`
- `packages/cad/src/domain.css`

Comparison of non-core legacy declaration signatures against the new runtime ownership CSS:

- Legacy non-core declarations: **7,950**
- Legacy unique non-core declaration signatures: **7,945**
- New runtime declarations: **7,985**
- New runtime unique declaration signatures: **7,976**
- **Missing legacy signatures: 0**
- New-only signatures: **31**

The new-only declarations are Architecture v2 helpers such as reduced-motion hardening and shared breadcrumb/focus presentation. No legacy non-core declaration signature is missing.

## Important cascade decision

HISTORY and EXERCITUS had accumulated late-version overrides whose behavior depends on source order. Their runtime CSS is therefore kept as one **domain-owned, ordered `domain.css`** each for RC1. Experimental sub-feature splits were moved to `migration/css-analysis/` and are deliberately not imported.

This is intentional: Architecture v2 removes the **site-wide** CSS monolith now, while a second internal split of the two high-risk domains waits for browser visual-regression evidence.
