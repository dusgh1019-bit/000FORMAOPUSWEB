# FORMA OPUS — 복구 자료 저장소

현재 저장소는 **전체 Architecture v2 프로젝트가 아닌 부분 복구 자료**입니다.
기준 스냅샷은 `88ccaaa87afd22b40cb3212d368d7c152b5fe18e` (2026-09-13)입니다.

| 자료 | 용도 |
| --- | --- |
| `site/FORMA_OPUS_FULL_REVIEW.html` | 전체 흐름을 살펴보는 기존 단일 HTML. DEV 1.7 및 Architecture v2 패치 표기가 혼재함 |
| `packages/history/` | HISTORY 진입 연출 부분 소스. 위 HTML과 버전 일치 미확정 |
| `docs/rulebook/` | 기존 브랜드 룰북 원본 및 Markdown 추출본 |
| [복구 진단](docs/recovery/REPOSITORY_AUDIT.md) | 확인된 상태, 누락, 충돌, 다음 작업 |
| [원본 목록](docs/recovery/baseline-manifest.json) | 기존 10개 파일의 크기와 SHA-256 |

## 미리보기

`site/FORMA_OPUS_FULL_REVIEW.html`을 브라우저에서 열거나, 저장소 루트에서:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory site
```

`http://127.0.0.1:8000/FORMA_OPUS_FULL_REVIEW.html#/home`에 접속합니다.
이는 기존 미리보기 확인 방법이며 전체 소스 빌드 방법이 아닙니다.
현재 루트 `package.json`, pnpm workspace, Astro 설정은 없습니다.

## 복구 검증

Python 3와 Node.js가 필요하며 패키지 설치는 필요 없습니다.

```sh
python3 scripts/verify_recovery.py
```

기존 파일의 바이트 보존 여부와 HTML 내 실행 스크립트 문법을 검사합니다.
화면 품질, 브라우저 동작, Astro 빌드, 보안 감사는 검사 범위에 포함되지 않습니다.

## 다음 개발 기준

1. 최신 Architecture v2 전체 소스와 같은 패치의 리뷰·리포트 세트를 회수합니다.
2. 파일명뿐 아니라 내용, 패치 번호, 수정 이력으로 일관성을 확인합니다.
3. 전체 소스의 실행·빌드 검증 후 개발 기준점을 확정합니다.
4. 이후 기능 패치를 별도 브랜치에서 진행합니다.

DEV 1.7은 읽기 전용 롤백·비주얼 패리티 참조로 취급합니다.
현재 자료를 임의로 `LATEST` 또는 완성된 v2 소스로 승격하지 않습니다.
기존 룰북은 `CLAUDE.md`와 함께 읽되, 현재 사용자의 명시적 지시를 우선합니다.
이 정리는 제품 패치가 아니므로 패치 번호를 새로 부여하지 않습니다.
