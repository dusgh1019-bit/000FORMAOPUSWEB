# FORMA OPUS Web — DEV 1.6

Current implementation scope:
- `/` Entry → in-place Brand Selection crossfade
- `/grea` GREA Product System: EXERCITUS / FABER / VESTIS + cross-line INSIGNIA / CUSTOM
- `/grea/exercitus` curated rotating sample garment; purchase modal opens only after shirt click/touch
- `/grea/exercitus/customize` front/back-independent DTG editor scaffold
- GREA project/index/archive shells
- PARVUS AFFECTION / BRICK / KEEP·PLAY·PLACE with interaction-as-assembly, PRODUCT / PROJECT / CUSTOM content types and subject-first inquiry
- MACHINA OBJECTS / SYSTEMS / B2B engineering
- ACADEMIA HISTORY Archive V1 Revised + CAD HOLD

Stack: Next.js 16.3.3 + React 19.2.7 + TypeScript + plain CSS/design tokens.

## Run
```bash
npm install
npm run dev
```

## DEV 0.5 changes

- Inspector ranges now use the full working range without replacing the active slider DOM: scale 0.10×–5.00×, rotation 0–360°, simplification 0–100%.
- Customer typography updates live on the garment with font family, font size, letter spacing and word spacing controls.
- Selected layers support Send to Back / Send Backward / Bring Forward / Bring to Front.
- The garment stage has 50–200% zoom with step controls and FIT/100% reset.
- 3D equipment capture now includes a live flattened 2D preview; the converted layer visibly preserves capture orientation/perspective metadata.
- GREA Home was changed from editorial hero/featured flow to a FORMA OPUS-style three-panel project selector. EXERCITUS is one panel, not a GREA landing takeover.
- EXERCITUS entry no longer opens any modal on arrival. A white garment auto-rotates and swaps curated sample graphics after each half-turn. Purchase mode opens only when the shirt is activated.
- Bulk order flow now uses exactly M / XL / 3XL / 6XL horizontal size selectors. A selected size reveals its quantity input; `다음` remains disabled until every selected size has a positive quantity.
- Seed library now includes 2 unit marks, 2 equipment 3D proxies and 2 typography samples (fixed + customer-input).
- Front and back keep separate layer arrays by `surface`; switching surfaces never mirrors the layer automatically.
- Asset cards support drag-and-drop into the print zone. Re-adding or duplicating an asset creates a new independent layer.
- Selected layers can be dragged directly on the garment and resized with PPT-like eight transform nodes. Corner nodes change proportional size; side nodes change horizontal/vertical ratio. The right-side scale/rotation/simplification controls operate on the same layer state.
- Breadcrumb hierarchy is implemented as individual links: FORMA OPUS → brand → project. The same rule is shared by GREA, PARVUS, MACHINA and EXERCITUS surfaces.

## Production notes
- Current garment/equipment visuals remain structural proxies. Replace them with canonical GLB/SVG/PNG assets and calibrated physical print-zone data.
- Planned production 3D adapter: React Three Fiber / Three.js for GLB garment/equipment.
- The current in-house transform scaffold can later be replaced by a purpose-built canvas layer such as Konva if complex selection/grouping/snap behavior grows substantially.

## DEV 0.7 — EXERCITUS Commerce Scaffold
- Adds COLLECTION editorial catalogue and product detail routes.
- Adds CUSTOM Final Proof, Design ID, Coverage Grade and STANDARD / CUSTOM PREMIUM service selection.
- Adds Naver SmartStore handoff as a development simulation only; no merchant credentials or live payment URLs are bundled.
- Guest-first commerce boundary: no account/password/card database is introduced by this build.
- Naver order option matching and production-state synchronization are architecture placeholders pending the seller account/API setup.
- Corrects the editor back-view interaction orientation and allows viewport zoom up to 400%.


## DEV 0.8 — EXERCITUS Commerce UI Refinement
- Removes the lower COLLECTION / CUSTOM entry cards. The rotating tee window is clean by default; desktop hover/click or mobile touch reveals a translucent blurred in-stage choice overlay.
- COLLECTION opens directly from the overlay; CUSTOM opens the existing single/bulk purchase flow.
- Replaces the large stacked COLLECTION issue feed with an ISSUED rail of thin, elongated product strips tilted about 28–30 degrees. Selecting a strip expands it in place.
- Adds ACTIVE INDEX below ISSUED for the full product catalogue, using CollectionIssue DB attributes instead of a marketplace table.
- ACTIVE INDEX filters by SERIES / COVERAGE / STATUS and renders staggered kinetic product strips.
- Mobile reduces the ISSUE strip angle and recomposes the rail as horizontal scrolling; filters remain tap-accessible.

## DEV 1.0 — HISTORY ARCHIVE V1

- Root scene label parity: `01 — WORKS` now uses the same top-right scene-meta grammar as `02 — ACADEMIA`.
- EXERCITUS COLLECTION ISSUED now uses a graphic-first square gallery with ~3s FRONT / BACK / MATERIAL rotation and inverse-information overlay. ACTIVE INDEX filter headings are bilingual.
- ACADEMIA / HISTORY is now an extensible Historical Knowledge Archive with 12 realistic Korean-history sample records, independent CATEGORY / FORMAT / PERIOD metadata, restrained search/filter, an archive ledger, timeline access, dynamic detail routes, modular document sections, related archives and cross-link-ready data.
- CAD remains present but intentionally HOLD: `ARCHIVE IN PREPARATION`.
- No payment, credit, LMS, account or paid-access features were added to HISTORY.

## DEV 1.1 — MACHINA SYSTEM V1

- MACHINA now presents sibling OBJECTS / SYSTEMS business areas under one precision-oriented brand.
- OBJECTS provides technical product catalogue/detail/inquiry surfaces; SYSTEMS provides B2B project evidence, capabilities and inquiry flow.
- Sample projects remain explicitly marked SAMPLE; inquiry/file upload is non-transmitting in DEV.

## DEV 1.2 — HISTORY ARCHIVE V1 REVISED

- Extends HISTORY metadata with optional SERIES / sub-series, people, related events, Author's Note and Print Edition state without changing the root WORKS/ACADEMIA scene system.
- Adds `MY OWN HISTORY / 내 좋대로 한국사` as a working-title SERIES registry entry rather than hard-coding the label into UI logic.
- Adds a scrollable HORIZONTAL HISTORY MAP, first demonstrated with Goryeo–Khitan / Jurchen / Mongol / late-Goryeo relations.
- Adds restrained RELATION INDEX cross-link visualization and makes SERIES searchable/filterable.
- Adds clearly separated Author's Note panels for mnemonic/personal study commentary and a non-downloadable Print Edition reservation state when no actual PDF exists.
- Expands the UI-validation sample archive to 15 records while preserving existing sample slugs.


## DEV 1.3 — PARVUS SYSTEM V1

- Reframes PARVUS around `AFFECTION` and the core action `BUILD`: “THINGS YOU WANT TO KEEP CLOSE.”
- Treats BRICK as the current medium rather than the permanent product category. Project data separates THEME (`KEEP / PLAY / PLACE`), STRUCTURE (`OBJECT / MODULE`) and MEDIUM (`BRICK`).
- Adds a warm modular landing system with a restrained GRID / UNIT / STACK / CONNECT assembly motion rather than toy-store visual language.
- Adds KEEP / PLAY / PLACE as customer-facing emotional themes, each with distinct motion behavior and B2B translation.
- Adds PROJECTS index, dynamic project detail routes and the SUBJECT → INTERPRETATION → BUILD → OBJECT → DELIVERY evidence sequence.
- Adds 6 explicit SAMPLE records until verified Valmite Block project evidence is connected. Historical work must not be presented as current or fabricated.
- Adds a human-reviewed B2B project inquiry surface. DEV 1.3 does not transmit/store inquiry PII or files.
- Preserves GREA / MACHINA / ACADEMIA / EXERCITUS structures.


## DEV 1.4 — MACHINA REFINED SYSTEM

- Refines MACHINA around `PRECISION / STRUCTURE / ENGINEERING / TRUST` without changing the FORMA OPUS root scene architecture.
- Landing follows `RESPOND, DON'T PERFORM.` and limits expressive interaction to FOCUS / REVEAL / COMPARE / SEQUENCE / DETAIL.
- OBJECTS are grouped by Domain (`NAVAL / VEHICLE / ARCHITECTURE / INDUSTRIAL / MECHANICAL / CUSTOM`); Medium (`BRICK / 3D_PRINT / RESIN / METAL / MIXED`) is metadata, never the top-level identity.
- Provides six explicit OBJECT SAMPLE records, including BRICK and NON-BRICK studies under one `OBJECT STUDY` art direction.
- SYSTEMS uses `PUBLIC / RESTRICTED / ANONYMIZED / CONFIDENTIAL` disclosure levels and `OWNED / CLIENT_APPROVED / CONFIDENTIAL_EXPERIENCE` evidence classes.
- Provides four explicit SYSTEM SAMPLE records and prevents the confidential sample from rendering invented client geometry, images, specifications or process details.
- `SHOW WHAT PROVES. PROTECT WHAT MATTERS.` is treated as a rendering/data-governance rule, not decorative copy.
- Inquiry remains a non-transmitting DEV UI. Production upload requires private storage, validation, malware inspection and access control.


## DEV 1.5 — GREA SYSTEM V2

- GREA is expanded from a three-project selector into three Primary Product Lines: EXERCITUS / FABER / VESTIS.
- INSIGNIA and CUSTOM are cross-line systems/capabilities, not peer product lines.
- EXERCITUS Collection/Custom routes and behavior are preserved.
- FABER adds a concept-only field-product evidence flow: PROBLEM → OBJECT → SOLUTION → PROOF. No untested dimensions, materials, loads, durability or field results are invented.
- INSTRUMENTA remains a reserved future system name until a real modular mounting standard exists.
- GREA production methods remain product metadata/infrastructure, not brand identity.


## DEV 1.6 — MOTION / PRODUCT MECHANISM

- PARVUS: interaction-as-assembly; landing SCATTER→ALIGN→CONNECT→GRID, KEEP/PLAY/PLACE theme verbs, content-type separation, subject-first CUSTOM inquiry.
- GREA: interaction-as-use; customer motivation, product ecosystem, relation/custom capability data, FABER NORMAL/FUNCTION/CONFIGURE, VESTIS ARTWORK/PLACEMENT/GARMENT, INSIGNIA SELECT/POSITION/ATTACH/LOCK.
- Guardrails: unconfirmed relationships are not public compatibility; FIELD TEST stays NOT TESTED until verified; EXERCITUS existing COLLECTION/CUSTOM is preserved.
- Motion: micro/state/panel/brand timing hierarchy, mobile tap equivalents, prefers-reduced-motion fallbacks.


## DEV 1.7 — HISTORY TIMELINE SYSTEM V2
- HISTORY primary navigation is now MASTER TIMELINE → LENS/LAYER → PERIOD → EVENT → ARCHIVE.
- Era dialect prototypes: GOJOSEON evidence-first, THREE KINGDOMS parallel polity split/lenses/transition, NORTH–SOUTH continuity+emergence, GORYEO layered periods, JOSEON hierarchical power branches, MODERN core spine+lenses.
- Existing HISTORY Archive V1 data remains intact below the timeline.
- Timeline data is educator-editable and periodization fields retain WHY_GROUPED / author-note semantics.
- Reduced-motion and mobile horizontal timeline patterns are included.
