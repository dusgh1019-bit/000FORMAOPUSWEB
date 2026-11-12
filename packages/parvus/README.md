# PARVUS

Architecture v2 domain boundary. Phase 01 creates the dependency and ownership boundary only.
Existing production behavior remains authoritative in `legacy/next-dev-1.7` until the domain passes parity regression.

Allowed dependencies: `@forma-opus/core`, `@forma-opus/ui`, `@forma-opus/services`.
Direct imports from sibling domains are prohibited. Cross-domain links use URLs or explicit public contracts.
