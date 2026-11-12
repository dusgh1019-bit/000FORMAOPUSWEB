# FORMA OPUS — BUILD PAPER MESH V10

Approval: user requested immediate patch to main FORMA OPUS on 2026-11-11.

Source baseline: RC9 approved + PARVUS pointer v3. This patch changes PARVUS study 04 only.

- Interactive paper grid from PARVUS_BUILD_PAPER_MESH_V10.html embedded as isolated srcdoc canvas.
- 5-study PARVUS four-second cycle, project-index overlay, routing and all other studies preserved.
- Direct parent pointer forwarding to original BUILD v10 controller; horizontal, diagonal, mixed movement preserved.
- Parent calls gust() on scene entry/exit and preserves full-screen click-to-index behavior.
- Embedding disables independent wind timer and pauses canvas while offscreen.
- Canonical app file: apps/web/public/parvus-five-states-v2.html
- Review file: review/FORMA_OPUS_FULL_REVIEW_LATEST.html
- Preview: FORMA_OPUS_WEB_BUILD_MESH_V10.html

This is a non-deployment source patch. Do not overwrite RC9 original or production automatically.
