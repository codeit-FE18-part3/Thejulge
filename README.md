# Thejulge

노션 협업 문서를 바탕으로 정리한 **중급 프로젝트 README**입니다.

---

## 📌 개요

- **프로젝트 기간**: 2025-09-29 ~ 2025-10-22 (제출 마감 23:50)
- **목표**
  - 알바 공고와 가게/지원자를 잇는 서비스의 핵심 플로우(**회원가입 → 프로필 → 공고 등록·조회 →
    상세**) 완성
  - 공통 UI 컴포넌트(버튼/인풋/모달 등) 정리 및 **Storybook 문서화**
  - **배포 파이프라인(Vercel)**과 팀 협업 파이프라인 정착
- **핵심지표(예시)**: 기능 커버리지, QA 체크리스트 통과율, Storybook 커버리지, E2E 통과

---

## 👥 팀 & 역할 (RnR)

| <img src="https://avatars.githubusercontent.com/u/59330818" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/213905938" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/214230956" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/214846243" width="150" height="150"/> |
| :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
|                위소현(팀장)<br/>[@sohyun0](https://github.com/sohyun0)                 |                    박신천<br/>[@jeschun](https://github.com/jeschun)                    |                유인화<br/>[@gummmmmy0v0](https://github.com/gummmmmy0v0)                |                  양재영<br/>[@BaeZzi813](https://github.com/BaeZzi813)                  |

<br>

| 구성원 | 공통 작업 | UI 컴포넌트 | 페이지 |

| 팀원전원 | 디자인 및 기능 QA / 본인 작업관련 문서 | | |

| 박신천 | 인풋, 모달, 버튼 | 로그인, 회원가입, 내프로필 등록, 상세 |

| 양재영 | 시연영상 준비 | 공통 프레임, 푸터, 토스트, 페이지네이션 | 가게 정보 등록, 상세 |

| 위소현 | 발표 | 초기 프로젝트 셋팅 / 공용 문서 작성 및 관리(노션) | 헤더, 필터, 드롭다운, post,
컨테이너, 스켈레톤 UI, 컬러, 폰트, 아이콘 | 공고 리스트, 상세 |

| 유인화 | 발표자료 준비 | 테이블, 알림, 캘린더 | 가게 공고 등록, 상세 |

> 담당 범위는 개발 중 상호 협의로 조정될 수 있음.

---

## 🧰 기술 스택

- **Next.js (React) + TypeScript**
- **Tailwind CSS** (공통 컬러/폰트/유틸)
- **Storybook** (컬러/폰트/아이콘 가이드)
- **ESLint · Prettier**
- **Vercel 배포**
- **GitHub Issues/Projects** · 브랜치 전략 · 템플릿
- **Discord/GitHub 웹훅**

> ※ “기술 스택 선정 배경” 문서는 베이스로 존재하며 상세 설명은 후속 업데이트 예정.

---

## ✨ 주요 기능

- **회원 인증**: 회원가입, 로그인
- **마이페이지**: 내 프로필 등록/수정, 상세 보기
- **가게**: 가게 정보 등록, 상세
- **공고**: 공고 리스트, 상세, 가게 공고 등록
- **공통 UI**: 버튼, 인풋, 모달, 헤더, 필터, 드롭다운, 토스트, 페이지네이션, 스켈레톤, 테이블, 알림,
  캘린더

---

## 🚀 워크플로우 개요

![워크플로우 다이어그램](assets/images/workflow.png)

---

## 🗓️ 진행 일정 (요약)

- **전체 기간**: 2025-09-29 ~ 2025-10-22
- 1차 중간점검 → 2차 중간점검 → 테스트·수정·코드개선 → 발표 준비 → 최종 점검 및 제출

### ▸ 프로젝트 일정표

- **1. 프로젝트 주제 선정** — 2025/09/25 → 2025/09/26
  - 주제 선정, 기획 분석 및 RnR 분배
- **2. 프로젝트 초기 셋팅 및 필요 지식 습득** — 2025/09/27 → 2025/09/28
  - Github repo 만들기, Github fork, project todo 작성 등 / 초기 셋팅 재점검(config 등) / Tailwind
    컬러·폰트 정의 후 배포
- **3. 공통 UI 컴포넌트 제작** — 2025/09/28 → 2025/10/01
  - 버튼, 인풋, 모달 등 최소 UI → 이후 페이지 작업 가능 상태 만들기
- **4. 1차 중간점검** — 2025/10/01
  - 2시 팀 미팅에서 공통 리소스 점검, 마감 19:00
- **5. 기능 컴포넌트 및 페이지 제작** — 2025/10/04 → 2025/10/15
  - 퍼블리싱·API 등 스타일에 맞춰 구현 / 마감은 매일 14:00 팀 미팅 전
- **6. 2차 중간점검** — 2025/10/16
  - 기능 및 디자인 QA, 요구사항 체크리스트 점검
- **7. 테스트 및 수정, 코드 개선** — 2025/10/16 → 2025/10/19
  - QA에서 나온 버그/수정사항 반영 및 개선
- **8. 프로젝트 발표 준비** — 2025/10/18 → 2025/10/19
  - PPT/영상 준비(개인 스케줄에 맞춤) → 발표 시 영상 또는 시연
- **9. 최종점검** — 2025/10/20
  - 모든 버그 및 요구사항 체크리스트 통과
- **10. 발표** — 2025/10/21
  - 13:00 발표 → 이후 PPT/영상 산출물 팀 공유(제출용)
- **11. 완성 및 제출** — 2025/10/22
  - 코드 작업 마감 19:00 / 결과물 제출 23:50

### ▸ 세부 계획

- 상기 일정과 동일한 마일스톤 기준으로 각 작업을 세분화하여 진행 (퍼블리싱, API 연동, 리팩토링,
  테스트/QA, 산출물 제작 등)

---

## ✅ 초기 셋업 TODO 현황

- [O] 프로젝트 협업 문서 작성 및 업데이트 (커뮤니케이션, 컨벤션, 프로젝트 관리, 기술스택)
- [O] 기술스택 설치 + package script 작성
- [O] ESLint 설정
- [O] Prettier 설정
- [O] Tailwind config 공통 설정 (컬러, 폰트)
- [O] Storybook 공통 작성 (컬러, 폰트, 아이콘)
- [O] Vercel 연동
- [O] Discord · GitHub 웹훅 연동
- [O] GitHub repo/브랜치/이슈 템플릿/프로젝트 추가
- [O] 웹폰트 작성 (CDN 미제공)
- [O] 기타 기본 설정: `.gitignore` / `.editorconfig` / `.storybook` / `.vscode`
- [O] `next.config` 이미지 경로 설정
- [O] `.env.example` 작성
- [O] 기본 폴더 구조 생성(+ `index.ts` 포함)
- [O] 공통 아이콘 이미지 export
- [O] Tailwind util 함수 작성

---

## 🤝 협업 컨벤션

- **브랜치**: `main`(보호) / `develop` / `feature/*` (이슈 번호 기반 네이밍)
- **커밋**: Gitmoji/Conventional 권장, 작은 단위로 빈번하게
- **PR**: 템플릿 사용 · 체크리스트 · 스크린샷/Storybook 링크 첨부
- **이슈/프로젝트**: 작업 단위 이슈 → PR 연결, 라벨/담당자/마일스톤 운영
- **QA**: 데일리 스크럼 기준으로 진행, 디자인/기능 QA는 전원 공통 참여

---

## 🗂️ 폴더 구조 (최종 컨벤션 반영)

> Next.js는 **Pages Router** 기준이며, API 디렉터리는 **백엔드 통신 헬퍼 전용**(프론트에서 사용)으로
> 취급합니다.

```
project-root/
├── 📁 components/          # 재사용 가능한 UI 컴포넌트
│   ├── 📁 common/          # 공통 컴포넌트 (SEO, ErrorBoundary 등)
│   ├── 📁 ui/              # 기본 UI 컴포넌트 (Button, Input 등)
│   ├── 📁 layout/          # 레이아웃 컴포넌트 (Header, footer)
│   └── 📁 features/        # 기능 컴포넌트 (Form, Post, List)
│
├── 📁 pages/               # Next.js Pages Router
│   ├── 📁 dashboard/       # 구현할 페이지 예시 (대시보드 페이지들)
│   ├── 📁 mypage/          # 구현할 페이지 예시 (마이페이지)
│   ├── _app.ts             # 글로벌 App 컴포넌트
│   ├── _document.ts        # HTML Document 커스터마이징
│   └── index.ts            # 메인페이지
│
├── 📁 api/                 # API 관련코드 (백엔드 통신 전용, next.js는 단순 프론트로 사용)
│   ├── 📁 posts/
│   └── 📁 users/
│
├── 📁 lib/                 # 유틸리티 및 설정
│   ├── 📁 axios/           # API 요청 헬퍼 axios instance
│   ├── 📁 utils/           # 유틸리티 함수들 (날짜 포맷터 등)
│   └── 📁 validators/      # 유효성 검사
│
├── 📁 assets/              # 정적 파일
│   ├── 📁 icons/           # 아이콘 (SVG, PNG 등)
│   ├── 📁 images/          # 배너, 일러스트, 배경 이미지
│   └── 📁 fonts/           # 웹폰트 (필요 시)
│
├── 📁 hooks/               # 공통 커스텀 React 훅
├── 📁 context/             # 전역 상태 (React Context API)
├── 📁 styles/              # 스타일 파일들 -> 테일윈드 전역 파일
├── 📁 constants/           # 전역 상수 관리
├── 📁 types/               # TypeScript 타입 정의
│
├── .env.local              # 환경 변수
├── tsconfig.json
├── package.json
└── next.config.ts
```

> 구현 팁
>
> - `components/features/`는 **도메인 단위 UI**(예: `PostForm`, `PostList`) 중심.
> - `pages/`에서는 **라우팅과 데이터 주입**만 담당하도록 분리.
> - `constants/`에 라우트/키/에러 메시지 상수화 → 하드코딩 방지.

---

## 🚀 빠른 시작

```bash
# 1) 설치
pnpm install   # 또는 yarn/npm

# 2) 개발 서버
pnpm dev       # http://localhost:3000

# 3) 린트/포맷/빌드
pnpm lint
pnpm format
pnpm build

# 4) 스토리북
pnpm storybook
```

### 환경변수 (.env.example)

```
NEXT_PUBLIC_API_BASE=...
```

> `next.config.ts`의 이미지 설정과 함께 사용합니다.

---

## 🧭 라우팅(워크플로우) 메모

- `/` : 메인
- `/search` : 상단네비 검색
- `/login` : 로그인
- `/signup` : 회원가입
- `/my-profile` : 내 프로필 (상세)
- `/my-profile/register` : 내 프로필 (등록)
- `/notices/[shopId]/[noticeId]` : 공고 상세 - 알바생
- `/my-shop` : 내 가게 (상세)
- `/my-shop/register` : 내 가게 (등록)
- `/employer/shops/[shopId]/notices/[noticeId]` : 공고 (상세) - 사장님
- `/employer/shops/[shopId]/notices/register` : 공고 (등록) - 사장님
- `/employer/shops/[shopId]/notices/[noticeId]/edit` : 공고 (편집) - 사장님
- (공통 UI) Modal/Toast/Dropdown 등은 `components/ui/`에서 제공

> 리포지토리에 `workflow.png`를 README와 같은 폴더에 두면 `![Workflow](./workflow.png)`로 바로
> 미리보기 가능합니다.

---

## 📝 문서 출처

- 노션: _중급 프로젝트 협업 문서_ (프로젝트 수행 계획서, RnR, 데일리 스크럼, 기술 스택 배경,
  프로젝트/세부 일정 CSV 등)

### 메모

- 초기 셋업 TODO는 완료됨: ESLint/Prettier, Tailwind config(컬러/폰트), Storybook 공통, Vercel 배포
  연동, GitHub/Discord 웹훅, 기본 폴더/아이콘 export, `.env.example`, util 함수 등.
