# 프로젝트 생성

npx create-next-app@14

## 1. 개발 의존성 패키지들 설치

npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y
eslint-plugin-storybook eslint-plugin-no-relative-import-paths
eslint-plugin-filenames prettier eslint-config-prettier eslint-plugin-prettier
prettier-plugin-tailwindcss

## 2. 런타임 의존성 설치

npm i clsx tailwind-merge npm i axios

## 3. Storybook 설치 및 초기화

npx storybook init

// 테마 변경 + tailwind 토큰 추가 (Storybook UI에서 미리보기 가능) npm i -D
@storybook/addon-themes storybook-tailwind-addon

## 설치 후 확인

npm run storybook # Storybook 실행 npm run lint # ESLint 검사 npm run dev #
Next.js 개발 서버

# 각 패키지별 설치 (필요에 따라 선택)

npm install --save-dev eslint-plugin-import # import/export 규칙 npm install
--save-dev eslint-plugin-jsx-a11y # 접근성 규칙 npm install --save-dev
eslint-plugin-storybook # Storybook 규칙 npm install --save-dev
eslint-plugin-no-relative-import-paths # 절대경로 강제 npm install --save-dev
eslint-plugin-filenames # 파일명 규칙 npm install --save-dev prettier # 코드
포맷터 npm install --save-dev eslint-config-prettier # ESLint와 Prettier 충돌
방지 npm install --save-dev eslint-plugin-prettier # Prettier를 ESLint 규칙으로
npm install --save-dev prettier-plugin-tailwindcss # Prettier를 tailwindcss
우선순위대로 배치

# clsx + tailwind-merge

## clsx 사용법

```
import clsx from 'clsx';

const buttonClass = clsx(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50'
);
```

## tailwind-merge 사용법

```
import { twMerge } from 'tailwind-merge';

const merged = twMerge('px-2 py-1 bg-red-500', 'px-4 bg-blue-500');
// 결과: 'py-1 px-4 bg-blue-500' (중복 제거됨)
```

## 조합해서 사용

```
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: string[]) {
  return twMerge(clsx(...inputs));
}

// 사용
const className = cn(
  'px-4 py-2 bg-blue-500', // 기본 스타일
  isLarge && 'px-6 py-3',   // 큰 사이즈일 때 padding 덮어쓰기
  className                 // 외부에서 전달받은 추가 스타일
);
```

# storybook 설정

#


  --color-orange: #ea3c12;
  --color-black: #111322;
  --color-gray-50: #7d7986;
  --color-gray-40: #a4a1aa;
  --color-gray-30: #cbc9cf;
  --color-gray-20: #e5e4e7;
  --color-gray-10: #f2f2f3;
  --color-gray-5: #fafafa;
  --color-white: #ffffff;
  --color-red-40: #ff4040;
  --color-red-30: #ff8d72;
  --color-red-20: #ffaf9b;
  --color-red-10: #ffebe7;
  --color-blue-20: #0080ff;
  --color-blue-10: #cce6ff;
  --color-green-20: #20a81e;
  --color-green-10: #d4f7d4;
  --color-kakao: #fee500;
  --color-black: #000;



  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px; //
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 28px;





모달 스타일이 2가지
아이콘없는 얼럿형태 18 -> 16
아이콘 있는 컨펌형태 16-> 16
18 ->16으로 통일하는것이 어떤가 ?

The julge/caption : 12 / 16 -> 유지
The julge/body 2 - regular : 14/22 -> 12/16
The julge/body 1  : 16 /20 ->  14/
The julge/body 1 - regular : 16/26  -> 14/22
The julge/modal 18px -> 16/26
The julge/h3 20/24->  16/20
The julge/h2 24 -> 18
The julge/h1 28px -> 20 , 자간 2% -> 0




화요일에 제출하기!!

https://www.notion.so/codeit/18-26f6fd228e8d803b82f0d8572b4655d9?p=2796fd228e8d80c89373fc4ab66cabac&pm=s
