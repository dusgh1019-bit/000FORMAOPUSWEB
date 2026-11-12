# DEV 1.7 deprecation gate

Architecture v2 has reached the **pre-deprecation RC**. New feature work should target Architecture v2. **Do not delete DEV 1.7 yet.**

## Source / architecture gates — passed
- [x] Core extracted
- [x] Shell extracted
- [x] Shared UI extracted
- [x] All 33 application route shapes recreated
- [x] Domain source ownership separated
- [x] Content separated from UI implementations
- [x] Canonical content copied byte-identically
- [x] Service boundaries isolated
- [x] Site-wide monolithic CSS removed from new runtime imports
- [x] Legacy non-core CSS signature loss = 0
- [x] 38/38 migrated domain components parity after boundary-only codemod
- [x] AI context map added
- [x] Package/content dependency checker passes
- [x] Import resolution audit passes
- [x] Parser/static semantic checks pass
- [x] Frozen DEV 1.7 integrity passes

## Runtime / browser gates — must pass before deletion
- [ ] Network-enabled `pnpm install`
- [ ] Generate and commit `pnpm-lock.yaml`
- [ ] `astro build`
- [ ] Desktop visual regression: 1920 / 1440 / 1280 / 1024
- [ ] Tablet/mobile touch regression
- [ ] Root WORKS↔ACADEMIA wheel/touch/session regression
- [ ] GREA/PARVUS/MACHINA interaction regression
- [ ] EXERCITUS entry/collection flow regression
- [ ] EXERCITUS pointer editing, front/back, layer, 400% zoom regression
- [ ] HISTORY timeline wheel/touch/focus/detail regression
- [ ] Reduced-motion/accessibility regression
- [ ] Production domain / sitemap finalization

## Gate meaning

When every unchecked item passes, Architecture v2 may become the canonical production source and DEV 1.7 may be archived/deprecated. Until then DEV 1.7 is frozen rollback evidence, not an active development branch.
