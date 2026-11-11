import globals from "globals";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: [eslintJs.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier.flat],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
    },
  },
]);
