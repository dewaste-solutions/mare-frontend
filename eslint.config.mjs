import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      prettier: prettier,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Prettier rules
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-console": "warn", // Warn on console.log statements
      // React rules
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off", // Disable rule for React in scope (not needed in Next.js)
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/ban-ts-comment": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
];

export default eslintConfig;
