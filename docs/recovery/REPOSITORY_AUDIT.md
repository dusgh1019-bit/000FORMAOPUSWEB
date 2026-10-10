# 저장소 복구 진단 — 2026-10-10

TYPE: REPOSITORY MAINTENANCE / Scope: repository documentation and verification only.

## 결론

이 저장소는 **기존 미리보기 + HISTORY 부분 소스 + 룰북**을 보존하고 있습니다.
전체 Architecture v2의 개발 기준점으로 확정할 근거는 부족합니다.
기존 10개 파일을 수정하지 않고 복구 증거로 유지하는 것이 현재 권장 기준입니다.

## 확인한 기준점

- 저장소: `dusgh1019-bit/000FORMAOPUSWEB`
- 조사 시 기본/유일 브랜치: `claude/web-dev-migration-zfl0kt`
- 조사 시 HEAD: `88ccaaa87afd22b40cb3212d368d7c152b5fe18e`
- 최신 커밋 시각: 2026-09-13 20:02:48 KST (11:02:48 UTC)
- 커밋 2개: 룰북·HISTORY 이관 → 전체 단일 HTML 추가.
- 조사 시 열린 PR: 0개. 브랜치 응답의 `protected`: false.
- 파일별 최초 기준 바이트와 SHA-256: `baseline-manifest.json`.

이 날짜는 Git 커밋 시각이며 원래 파일 작성일이나 프로젝트 전체 최신 작업일을 뜻하지 않습니다.
이 진단은 GitHub 자료에 한정하며 Drive 파일과는 아직 대조하지 않았습니다.

## 보유·누락

| 항목 | 확인 결과 |
| --- | --- |
| 전체 흐름 HTML | `site/FORMA_OPUS_FULL_REVIEW.html` 존재, 690,481 bytes |
| HISTORY 부분 소스 | Astro component, TypeScript controller, CSS, index, package metadata 존재 |
| 룰북 | XLSX 원본과 Markdown 추출본 존재. 이번 진단에서 XLSX 셀 대조는 수행하지 않음 |
| 전체 Architecture v2 source ZIP | 저장소에 없음 |
| 루트 package.json / pnpm-workspace.yaml / pnpm-lock.yaml | 없음 |
| Astro 앱 설정·페이지 소스 | 없음. HISTORY component 하나만으로 전체 앱을 재현할 수 없음 |
| FORMA_OPUS_FULL_REVIEW_LATEST.html | 해당 이름의 파일 없음 |
| 숫자 패치 ID가 붙은 Full Review | 없음 |
| Domain Direct Review HTML | 없음 |
| Implementation Report | 기존 자료에 없음 |
| content/history/ | 없음. HISTORY README 및 index의 보존 설명과 불일치 |

## 버전·문서 충돌

1. HTML title은 `DEV 0.9 Portable Preview`지만 본문에는 DEV 1.7, Architecture v2 RC6, `PATCH TBD` 등이 함께 있습니다. 제목이나 가장 큰 RC 숫자만으로 최신 패치를 판정할 수 없습니다.
2. HISTORY package version은 `2.0.0-rc.8`, index 주석은 RC9, README에는 RC10 및 후속 TBD 설명이 있습니다. 패치 번호를 임의로 정규화하지 않았습니다.
3. HTML의 inline HISTORY와 `packages/history`의 동등성은 검증되지 않았습니다. `CLAUDE.md`와 최신 커밋 메시지도 미조정 상태임을 명시합니다.
4. `CLAUDE.md`의 계층 요약은 PARVUS/MACHINA가 GREA 아래인 것처럼 읽힐 수 있지만, 룰북 `01_CONSTITUTION`은 GREA/PARVUS/MACHINA를 동등한 브랜드로 명시합니다. 상위 브랜드 구조를 요약문만으로 구현하면 안 됩니다.
5. `26_AI_COLLAB_CHARTER` 원문은 DRAFT/provisional임을 명시합니다. 현재 사용자 지시 및 확정된 Architecture v2 프로토콜과의 대조가 필요합니다.

## 이번 변경 및 검증 기준

- 루트 README: 자료의 역할, 미리보기 실행법, 복구 순서 설명.
- 이 진단: 확인 사실, 누락, 버전 충돌 및 후속 우선순위 기록.
- manifest: 원래 추적된 파일 10개 전체의 SHA-256/크기 기록.
- `scripts/verify_recovery.py`: manifest 대조 및 inline JavaScript 문법 검사.
- 수용 기준: 기존 파일 모두 바이트 일치, 검사 명령 성공, 복구 불완전 상태를 명확히 표시.
- 원본 HTML·HISTORY·룰북 및 제품 기능 변경 없음. 새 제품 패치 ID 없음.

실행한 Node 문법 검사에서 inline script 1개가 통과했습니다.
브라우저 렌더링·상호작용·모바일·접근성·보안은 검증하지 않았습니다.
전체 앱 구성이 없으므로 Astro 빌드 성공을 주장하지 않습니다.
검사 도구의 통과는 저장된 기준 바이트의 보존을 뜻하며 원본 코드의 품질을 보증하지 않습니다.

## 후속 우선순위

1. **필수:** Drive의 최신 전체 소스 ZIP, LATEST, 패치 Full Review, Domain Review, Implementation Report를 같은 패치 세트로 회수·대조.
2. **필수:** 누락된 `content/history` 및 앱 설정을 회수하고, HISTORY 두 구현의 출처·diff를 확인.
3. **필수:** 확정 소스에서 의존성 설치·빌드·주요 경로 동작 확인 후 canonical commit 기록.
4. **추천:** canonical 소스 확정 후 CI에 실제 빌드와 주요 경로 검사를 도입.
5. **추천:** 수동 ZIP 외에 커밋/태그로 제품 패치와 5종 산출물의 대응 관계 관리.

DEV 1.7은 읽기 전용 롤백·비주얼 패리티 참조입니다. 현재 HTML을 새 v2 원본으로 승격하거나, 누락된 전체 앱을 추정으로 만들어 복구 완료로 표시하지 않습니다.
