# FORMA OPUS — Mandatory Full-Site Review Artifact Contract

Status: ACTIVE from Architecture v2 RC4.

Every code-changing FORMA OPUS development update must ship a browser-openable full-site review HTML generated from the current Architecture v2 working state. This is a QA/review artifact, not the production architecture and not a replacement for Astro/TypeScript packages.

Minimum review navigation:
- FORMA OPUS Entry / 01 WORKS / 02 ACADEMIA
- GREA → EXERCITUS / FABER / VESTIS
- PARVUS → KEEP / PLAY / PLACE
- MACHINA → OBJECTS / SYSTEMS
- ACADEMIA → HISTORY / CAD

The review artifact must reflect the current patch. It must not be a copied DEV 1.7 portable. Complex islands that cannot be reproduced standalone must be identified as limited rather than faked or removed.

Required final-delivery file name pattern:
`FORMA_OPUS_FULL_REVIEW_<PATCH-OR-RC>.html`

The artifact should allow desktop and resize-based responsive inspection and should preserve primary navigation, domain identity, and the patch's core interactions as far as a standalone file permits.


## RC5 parity amendment

FULL-SITE REVIEW means user-experience parity, not coverage-only navigation. Do not replace existing motion graphics, visual density, content, or complex domain presentation with placeholder cards, text labels, schematic boxes, or static stand-ins. If exact runtime generation is impossible, use the frozen parity baseline with additive approved patch overlays and state the limitation.
