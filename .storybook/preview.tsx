import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "@/styles/globals.css";
import "@/styles/fonts.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    // 스토리북 캔버스 배경색 (라이트/다크 모드와 맞춤)
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8f9fa" }, // var(--background) 라이트
        { name: "dark", value: "#121212" },  // var(--background) 다크
      ],
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "light", // ✅ 배경 동기화 위해 className도 명시
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story, context) => {
      // ✅ theme 값에 따라 backgrounds도 동기화
      const theme = context.globals.theme;
      if (theme === "dark") {
        document.body.style.backgroundColor = "#121212";
      } else {
        document.body.style.backgroundColor = "#f8f9fa";
      }
      return <Story {...context} />;
    },
  ],
};



export default preview;


