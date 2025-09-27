module.exports = {
  root: true, // 상위 폴더에 .eslintrc가 있더라도 무시하고, 여기 설정만 사용
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest', // 최신 ECMAScript 문법까지 인식
    sourceType: 'module', // import/export 문법 사용 가능
    ecmaFeatures: { jsx: true }, //React JSX 문법 지원
  },
  env: {
    browser: true, // window, document 같은 전역 객체 인식
    es2021: true, //최신 ES2021 전역 변수와 문법 인식
    node: true, //Node.js 환경(require, process)도 인식
  },
  extends: [
    'eslint:recommended', // 기본 JS 규칙
    'next/core-web-vitals', // Next.js + React + Web Vitals
    'plugin:@typescript-eslint/recommended', // TS 권장 규칙
    'plugin:import/recommended', // import/export 규칙
    'plugin:import/typescript', // TS import 필요한 규칙 추가
    'plugin:jsx-a11y/recommended', // 접근성 권장
    'plugin:storybook/recommended', // Storybook 권장
    'plugin:prettier/recommended', // Prettier와 충돌 방지 + 오류 표시, extend 항상 마지막에 위치
  ],
  plugins: [
    'no-relative-import-paths', // 절대경로 사용
    'filenames', // 파일이름 강제
  ],
  rules: {
    // 절대경로 사용
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true, rootDir: 'src', prefix: '@' },
    ],

    // Typescript
    '@typescript-eslint/no-explicit-any': 'error', // any 사용 금지
    '@typescript-eslint/prefer-nullish-coalescing': 'warn', // ?? 연산자 사용 권장
    '@typescript-eslint/prefer-optional-chain': 'warn', // ?. 연산자 사용 권장
    '@typescript-eslint/no-unnecessary-condition': 'warn', // 불필요한 조건문 경고
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // _로 시작하는 변수는 무시 → 의도적으로 안 쓰는 매개변수에서 유용.
    ],

    // JavaScript
    'no-console': 'error', // 배포 전 로그 제거

    // 개발 편의를 위한 완화
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 선택사항
    'react/no-unescaped-entities': 'off', // JSX 안에 특수문자 직접 사용 허용
    // 네이밍 컨벤션
    '@typescript-eslint/naming-convention': [
      'error',
      {
        // 변수 & 함수
        selector: 'variableLike',
        format: ['camelCase'],
      },
      {
        // 상수
        selector: 'variable',
        modifiers: ['const'],
        format: ['UPPER_CASE'],
      },
      {
        // 타입, 인터페이스, 클래스
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        // enum
        selector: 'enum',
        format: ['PascalCase'],
      },
    ],
  },
  overrides: [
    {
      // config ,pages, stories 컨벤션 완화
      files: [
        'src/pages/**/*.tsx',
        'src/stories/**/*.tsx',
        'src/stories/**/*.ts',
        '*.config.ts',
        '*.config.js',
        '*.config.mjs',
        '*.json',
        '*.d.ts',
      ],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['*.config.ts', '*.config.js', '*.config.mjs', '*.json', '*.d.ts'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
  settings: {
    react: { version: 'detect' }, // react 설치 후 버전 명시
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    '*.config.js',
    '*.config.mjs',
    '.eslintrc.js',
  ],
};
