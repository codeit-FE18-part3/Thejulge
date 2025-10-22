# Thejulge

**사장님과 알바생 간 단기 일자리 매칭 플랫폼 💰 [더 줄게](https://thejulge-zeta.vercel.app/) 💰**

## 🪧 프로젝트 소개

더줄게는 **사장님과 알바생 간의 단기 일자리 매칭 플랫폼**입니다. <br> 조건에 따라 맞춤 공고를
추천하고, 지원부터 승인·거절, 알림까지의 전 과정을 경험할 수 있는 웹서비스입니다.

## 🧑‍🤝‍🧑 팀원 소개

| <img src="https://avatars.githubusercontent.com/u/59330818" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/213905938" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/214846243" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/214230956" width="150" height="150"/> |
| :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
|                위소현(팀장)<br/>[@sohyun0](https://github.com/sohyun0)                 |                    박신천<br/>[@jeschun](https://github.com/jeschun)                    |                  양재영<br/>[@BaeZzi813](https://github.com/BaeZzi813)                  |                유인화<br/>[@gummmmmy0v0](https://github.com/gummmmmy0v0)                |

## 🏃 역할 분담

|   구성원   |   역할    | 주요 작업                                                                                                        | UI 컴포넌트                                                                                  | 페이지                                                                                |
| :--------: | :-------: | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **위소현** | ✨PL / FE | • 초기 프로젝트 셋팅<br>• 공용 문서 작성 및 관리(노션)<br>• 발표자료 작성 및 영상 준비 <br>• 발표 <br>• 코드리뷰 | • 컬러, 폰트, 아이콘<br>• 스켈레톤 UI, Container<br>• 필터, 드롭다운<br>• post, notice, 헤더 | • 메인페이지(공고 리스트)<br>• 공고 상세 리스트<br>• 검색 결과 페이지<br>• 404 페이지 |
| **박신천** |    FE     | • README 초안 작성                                                                                               | • 인풋, 모달, 버튼                                                                           | • 로그인<br>• 회원가입<br>• 내 프로필 등록<br>• 내 프로필 상세                        |
| **양재영** |    FE     | • 시연 영상 준비<br>• User Flow 설계<br>• README 정리                                                            | • 공통 프레임<br>• 푸터, 토스트<br>• 페이지네이션                                            | • 가게 정보 등록<br>• 가게 정보 상세                                                  |
| **유인화** |    FE     | • 발표 자료 준비                                                                                                 | • 테이블, 테이블 뱃지<br>• 알림, 캘린더(Datepicker/Timepicker)                               | • 가게 공고 등록<br>• 공고 상세                                                       |

## 🛠️ 기술 스택

### **Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### **품질 및 문서화**

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

### **협업 및 관리**

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-FF7262?style=for-the-badge&logo=figma&logoColor=white)

## 🧭 협업 및 코드 관리 방식

- GitHub Flow + Fork 전략을 사용하여, develop 브랜치를 중심으로 안전하게 병합
- Issue / PR 템플릿 자동화로 작업 목적과 변경 사항을 명확히 기록
- Gitmoji 커밋 컨벤션으로 커밋 의도를 시각적으로 구분 (✨ 기능 추가 / 🐛 버그 수정 / ♻️ 리팩토링)
- 코드 리뷰 승인 후 병합 원칙으로 품질 관리
- ESLint / Prettier를 통한 코드 스타일 통일
- Storybook으로 UI 컴포넌트 테스트 및 문서화
- 그 외 프로젝트 관리 문서는 [노션](https://www.notion.so/26f46d4d7ef780dab24cf1d09dcb611e) 참고

## ✨ 주요 기능

- **회원 인증**: 회원가입, 로그인
- **마이페이지**: 내 프로필 등록/수정, 상세 보기
- **가게**: 가게 정보 등록, 상세
- **공고**: 공고 리스트, 상세, 가게 공고 등록
- **공통 UI**: 버튼, 인풋, 모달, 헤더, 필터, 드롭다운, 토스트, 페이지네이션, 스켈레톤, 테이블, 알림,
  캘린더

## 🚀 워크플로우

![워크플로우 다이어그램](src/assets/images/workflow.png)

## 📂 폴더 구조

```
src
├── api
├── assets
│   ├── font
│   ├── icon
│   └── images
├── components
│   ├── features
│   │   ├── notice
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   └── index.ts
│   ├── layout
│   └── ui
│       ├── dropdown
│       │   ├── components
│       │   ├── hooks
│       │   └── index.ts
├── constants
├── context
├── hooks
├── lib
├── pages
├── stories
├── styles
└── types
```

> - Next.js는 **Pages Router** 기준이며, API 디렉터리는 **백엔드 통신 헬퍼 전용**(프론트에서
>   사용)으로 취급합니다.
> - 기능 단위 폴더 구조 예: notice, post, auth 등 각 기능별 components, hooks를 포함해 기능 단위로
>   응집된 구조 유지
> - 공용 컴포넌트 폴더 예: button, dropdown, modal 등 다양한 페이지에서 재사용 가능하도록 설계 내부
>   로직(hooks)과 UI(components) 분리
