---
sidebar_position: 3
title: Prettier
---

# Prettier Configuration

**Package:** `@hideandseekdigital/prettier-config`

A single shared Prettier config keeps formatting consistent and eliminates "style" discussion in code review.

## Installation

```bash
pnpm add -D prettier @hideandseekdigital/prettier-config
```

## Usage

Reference the package in `package.json`:

```json
{
  "prettier": "@hideandseekdigital/prettier-config"
}
```

Or in `prettier.config.js` if you need to extend it:

```js
import baseConfig from "@hideandseekdigital/prettier-config";

/** @type {import("prettier").Config} */
const config = {
  ...baseConfig,
  // project-specific overrides
  printWidth: 80,
};

export default config;
```

## Settings reference

| Option            | Value      | Rationale                                                        |
| ----------------- | ---------- | ---------------------------------------------------------------- |
| `printWidth`      | `100`      | Wider than 80 but avoids the illegibility of unconstrained lines |
| `tabWidth`        | `2`        | Standard for JS/TS; matches `.editorconfig`                      |
| `useTabs`         | `false`    | Spaces are consistent across all editors                         |
| `singleQuote`     | `false`    | Double quotes are standard in JSX and HTML; one style for all    |
| `trailingComma`   | `"all"`    | Cleaner diffs when adding items to the end of a list             |
| `bracketSpacing`  | `true`     | `{ foo }` is more readable than `{foo}`                          |
| `bracketSameLine` | `false`    | Closing `>` on its own line for JSX                              |
| `arrowParens`     | `"always"` | `(x) => x` is consistent whether 0, 1, or many params            |
| `semi`            | `true`     | Explicit semicolons avoid ASI footguns                           |
| `endOfLine`       | `"lf"`     | Unix line endings everywhere; matches `.editorconfig`            |

## Editor integration

### VS Code

Install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension, then add to your workspace settings:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

### JetBrains IDEs

Go to **Settings → Languages & Frameworks → JavaScript → Prettier** and enable "Run on save".
