# CSS analysis-only splits

These files are **not runtime imports**. They were produced while classifying the DEV 1.7 monolithic stylesheet by domain and sub-feature.

Runtime uses the ordered `packages/<domain>/src/domain.css` extraction for HISTORY and EXERCITUS because their late DEV overrides depend on source order. Keeping the ordered extraction protects visual/cascade parity until browser regression testing permits a second, internal CSS split.

Do not import these analysis files into production without a visual regression pass.
