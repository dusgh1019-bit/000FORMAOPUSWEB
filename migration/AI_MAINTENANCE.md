# AI maintenance contract

Use `config/ai-context-map.json` as the first context selector. Do not scan the whole repository by default.

Examples:

- “HISTORY Timeline 수정” → `history-timeline` only, plus CORE/UI only when the requested behavior is shared.
- “MACHINA REQUEST 수정” → MACHINA + service boundary; do not load GREA/PARVUS/HISTORY.
- “EXERCITUS CUSTOM 수정” → EXERCITUS customizer + EXERCITUS content + service boundary; GREA is parent navigation only.
- “전체 색/타이포 수정” → CORE first, then affected variants.

A domain may link to another domain but may not import sibling implementation code.
