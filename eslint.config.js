import { defineConfig } from "eslint/config";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier/flat";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["src/routes/**", "src/routeTree.gen.ts"],
  },

  // 1. 기본 설정들 먼저
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 2. React 관련 설정
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...reactPlugin.configs.flat.recommended,
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...reactHooks.configs["recommended-latest"],
  },

  // 3. Prettier (formatting 관련)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...eslintConfigPrettier,
  },

  // 4. 커스텀 rules는 맨 마지막에! (가장 중요)
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      globals: { ...globals.browser },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
);
