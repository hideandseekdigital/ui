import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import noInlineStyles from "eslint-plugin-no-inline-styles";

export default [
  js.configs.recommended,
  {
    files: ["**/*.tsx", "**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      "no-inline-styles": noInlineStyles,
    },
    rules: {
      // Disable no-undef for TypeScript (types handle this)
      "no-undef": "off",

      // CI Guardrails: No raw hex colors or inline styles
      "no-inline-styles/no-inline-styles": "error",

      // Catch common hex color patterns in JSX
      "no-restricted-syntax": [
        "error",
        {
          selector: 'JSXAttribute[value.type="Literal"][value.value=/^#[0-9a-fA-F]{3,8}$/]',
          message: "Raw hex colors are not allowed. Use CSS variables via className instead.",
        },
      ],
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "*.config.*"],
  },
];
