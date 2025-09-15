import { defineConfig } from "eslint/config";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    ignores: ["src/routes/**", "src/routeTree.gen.ts"], // 무시할 경로
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...reactHooks.configs["recommended-latest"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...reactPlugin.configs.flat.recommended,
  },

  // 브라우저 전역 변수
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser, // 👈 parser는 객체를 넣어야 함
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-debugger": "error",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...eslintConfigPrettier,
  },
]);
