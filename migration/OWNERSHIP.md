# Architecture v2 ownership

| Scope | Owner | May depend on | Must not import |
|---|---|---|---|
| L0 design constitution | `packages/core` | none | domains |
| root scenes / transitions | `packages/shell` | core, ui | domains |
| reusable presentation | `packages/ui` | core | domain internals |
| GREA | `packages/grea` | core, ui, services, `content/grea` | PARVUS/MACHINA/HISTORY |
| EXERCITUS | `packages/exercitus` | core, ui, services, `content/grea/exercitus` | PARVUS/MACHINA/HISTORY |
| PARVUS | `packages/parvus` | core, ui, services, `content/parvus` | other domain implementations |
| MACHINA | `packages/machina` | core, ui, services, `content/machina` | other domain implementations |
| HISTORY | `packages/history` | core, ui, services, `content/history` | other domain implementations |
| CAD | `packages/cad` | core, ui, services, `content/cad` | HISTORY implementation |

A domain may link to another route. It may not import another domain's implementation.
