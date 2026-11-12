# Browser Storage Compatibility Contracts — DEV 1.7

Do not rename or discard these during route migration without a versioned adapter.

- `forma-opus-root-state`
- `exercitus-design-id`
- `exercitus-size-quantities`
- `exercitus-purchase-mode`
- `exercitus-mock-order`
- `exercitus-cart-line`
- `exercitus-design-draft-v2` (legacy read fallback)
- current Customizer `DRAFT_KEY` defined in `CustomizerWorkspace.tsx`
- `exercitus-revision-*`

Architecture v2 service boundaries must not turn these DEV-only stores into a production PII store.
