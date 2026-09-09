# 포트폴리오 — 김동환

Java · Spring Boot 백엔드 개발자 개인 포트폴리오 사이트.
빌드 도구 없이 순수 HTML / CSS / JavaScript로만 만들었다.

```
portfolio/
├── index.html          모든 콘텐츠
├── assets/profile.jpg  프로필 사진 (없으면 모노그램으로 자동 대체)
├── assets/
│   ├── style.css       디자인 토큰 + 레이아웃
│   └── main.js         등장 애니메이션 · 스크롤 스파이 · 카운트업
└── .claude/
    └── launch.json     로컬 미리보기 설정
```

## 로컬에서 보기

```bash
python -m http.server 4321
# http://localhost:4321
```

빌드 단계가 없다. 파일을 고치고 새로고침하면 끝이다.

## 디자인

| 항목 | 값 |
|---|---|
| 배경 | `#0A0C10` (ink) |
| 강조 | `#F5A524` (amber) |
| 본문 폰트 | Pretendard Variable |
| 코드·숫자 폰트 | JetBrains Mono |
| 사이드바 | 268px 고정 (1080px 이하에서 상단 고정 바로 전환) |
| 콘텐츠 폭 | 920px |

강조색으로 앰버를 쓴 이유는 경고등 색이기 때문이다.
"만든 것이 멈췄을 때 원인을 찾는다"는 이 사이트의 주제와 맞는다.

## 콘텐츠 원칙

**모든 수치는 GitHub 커밋 기록에서 확인한 값만 쓴다.**
프로젝트마다 본인 커밋 수를 함께 적었고, 확인되지 않은 수치는 넣지 않았다.

| 프로젝트 | 저장소 | 본인 커밋 |
|---|---|---|
| 한국어 발음 교정 학습 서비스 | `Shinhan-KoreanLanguage/backend` | 208 |
| 엄마약 (복약 안전) | `Dev-MAMOKEY/Mom-Med-Backend` | 81 |
| MTM (AI 개인 피팅) | `Dev-MAMOKEY/MTM-Backend` | 64 |
| 비콘 출결 관리 플랫폼 | `Dev-MAMOKEY/Beacon-Backend` | 63 |
| 여운 (디지털 추모) | `Dev-MAMOKEY/Yeoun-Backend` | 33 |
| 역사 고증 검색 | `mamoki-contest/history-backend` | 26 |
| LAKO | `Dev-MAMOKEY/Laos_Backend_travel` | 7 |
| Re:Form | `ReForm-hackathon/BackEnd-End` | 6 |

합계 488 커밋.

## 수정하는 법

- **글**: `index.html`만 고치면 된다. 섹션은 `<section id="...">` 단위.
- **색**: `assets/style.css` 맨 위 `:root` 변수만 바꾸면 전체가 따라온다.
- **프로필 사진**: `.mark` 요소(모노그램 K)를 `<img>`로 교체하면 된다.

## 프로필 사진

`assets/profile.jpg` 에 파일을 두면 사이드바에 원형으로 표시된다.
파일이 없으면 `onerror` 로 모노그램(K)이 대신 표시되므로 사이트는 항상 정상 동작한다.

## 배포

GitHub Pages. `main` 브랜치에 푸시하면 자동 반영된다.

    https://donghwan814.github.io
