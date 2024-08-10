import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["dist"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
      "no-unused-vars": "warn",
      "react/prop-types": 0,
      "no-extra-boolean-cast": 0,
      "no-dupe-keys": "warn",
      "react/display-name": 0,
      "react/react-in-jsx-scope": "off",
      "no-undef": 1,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": 0,
    },
    settings: {
      react: {
        // Tells eslint-plugin-react to automatically detect the version of React to use.
        version: "detect",
      },
      // Tells eslint how to resolve imports
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx"],
        },
      },
      "import/resolver": {
        alias: {
          map: [
            ["@/components", "./src/components"],
            ["@/assets", "./src/assets"],
            ["@/modules", "./src/modules"],
            ["@/utils", "./src/utils"],
            ["@/customHooks", "./src/customHooks"],
          ],
          extensions: [".js", ".jsx", ".json"],
        },
      },
    },
  },
];
