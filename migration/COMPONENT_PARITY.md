# Component parity

All migrated domain components are compared against frozen DEV 1.7 after applying only the planned import-boundary substitutions (`next/link`, `next/navigation`, shared breadcrumb, and content aliases).

| Domain | Component | Result |
|---|---|---|
| grea | `FaberLanding.tsx` | EXACT |
| grea | `FaberStudy.tsx` | EXACT |
| grea | `GreaCustomSystem.tsx` | EXACT |
| grea | `GreaLanding.tsx` | EXACT |
| grea | `GreaNav.tsx` | EXACT |
| grea | `InsigniaLanding.tsx` | EXACT |
| grea | `VestisLanding.tsx` | EXACT |
| exercitus | `CollectionIndex.tsx` | EXACT |
| exercitus | `CollectionProduct.tsx` | EXACT |
| exercitus | `CustomFinalProof.tsx` | EXACT |
| exercitus | `CustomizerWorkspace.tsx` | EXACT |
| exercitus | `EquipmentCaptureModal.tsx` | EXACT |
| exercitus | `ExercitusEntry.tsx` | EXACT |
| exercitus | `OrderStatus.tsx` | EXACT |
| exercitus | `PurchaseModeModal.tsx` | EXACT |
| exercitus | `TShirtStage.tsx` | EXACT |
| parvus | `ParvusInquiry.tsx` | EXACT |
| parvus | `ParvusLanding.tsx` | EXACT |
| parvus | `ParvusNav.tsx` | EXACT |
| parvus | `ParvusProjectDetail.tsx` | EXACT |
| parvus | `ParvusProjectsIndex.tsx` | EXACT |
| parvus | `ParvusThemePanel.tsx` | EXACT |
| parvus | `ParvusVisual.tsx` | EXACT |
| machina | `CapabilitiesPage.tsx` | EXACT |
| machina | `ContactPage.tsx` | EXACT |
| machina | `InquiryForm.tsx` | EXACT |
| machina | `MachinaLanding.tsx` | EXACT |
| machina | `MachinaNav.tsx` | EXACT |
| machina | `ObjectDetail.tsx` | EXACT |
| machina | `ObjectStudyCard.tsx` | EXACT |
| machina | `ObjectsIndex.tsx` | EXACT |
| machina | `ProjectDetail.tsx` | EXACT |
| machina | `SystemsIndex.tsx` | EXACT |
| machina | `TechnicalMeta.tsx` | EXACT |
| machina | `TechnicalVisual.tsx` | EXACT |
| history | `AuthorsNote.tsx` | EXACT |
| history | `HistoryArchiveIndex.tsx` | EXACT |
| history | `HistoryTimelineExperience.tsx` | EXACT |

**Result: 38/38 exact after boundary codemod.**
