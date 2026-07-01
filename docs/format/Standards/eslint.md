---
sidebar_position: 2
title: ESLint
---

# ESLint Configuration

**Package:** `@hideandseekdigital/eslint-config`

Flat-config presets for ESLint 9+. Three composable presets are available:

| Preset       | Import path                                    | Use when                    |
| ------------ | ---------------------------------------------- | --------------------------- |
| `base`       | `@hideandseekdigital/eslint-config` (default)  | Plain JS / Node.js projects |
| `typescript` | `@hideandseekdigital/eslint-config/typescript` | TypeScript projects         |
| `react`      | `@hideandseekdigital/eslint-config/react`      | React + TypeScript projects |
| `nextjs`     | `@hideandseekdigital/eslint-config/nextjs`     | Next.js projects            |

Each preset extends the one above it — `nextjs` builds on `react`, which builds on `typescript`, which builds on `base`.

## Installation

:::note GitHub Packages
`@hideandseekdigital` packages are hosted on GitHub Packages. See the [GitHub Packages setup guide](/Guides/github-packages) to configure your registry and authenticate before installing.
:::

```bash
pnpm add -D eslint @hideandseekdigital/eslint-config
```

For TypeScript projects also install the peer deps:

```bash
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

For React projects:

```bash
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
```

For Next.js projects:

```bash
pnpm add -D eslint-config-next
```

## Usage

Create `eslint.config.mjs` (or `.mjs`) in your project root:

### Base (JavaScript / Node.js)

```js
import { base } from "@hideandseekdigital/eslint-config";

export default base();
```

### TypeScript

```js
import { typescript } from "@hideandseekdigital/eslint-config";

export default typescript();
```

### React + TypeScript

```js
import { react } from "@hideandseekdigital/eslint-config";

export default react();
```

### Next.js

```js
import { nextjs } from "@hideandseekdigital/eslint-config";

export default nextjs();
```

The `nextjs` preset composes `react()` with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, and overrides Next.js's default broad ignores so only the standard build output directories are excluded.

### Extending the preset

Spread the preset into an array to add or override rules:

```js
import { typescript } from "@hideandseekdigital/eslint-config";

export default [
  ...typescript(),
  {
    rules: {
      // project-specific overrides
      "no-console": "off",
    },
  },
];
```

## Included plugins

| Plugin                      | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| `@eslint/js`                | ESLint core recommended rules              |
| `eslint-plugin-import-x`    | Import ordering and deduplication          |
| `eslint-plugin-unicorn`     | Opinionated JS best-practice rules         |
| `eslint-config-prettier`    | Disables rules that conflict with Prettier |
| `@typescript-eslint/*`      | TypeScript-specific rules (TS preset only) |
| `eslint-plugin-react`       | React-specific rules (React preset only)   |
| `eslint-plugin-react-hooks` | Hooks rules (React preset only)            |

## Key rule decisions

### `unicorn/prevent-abbreviations: off`

Common abbreviations like `props`, `ref`, `fn`, `env` are idiomatic in JS — enforcing expansion would make code noisier, not cleaner.

### `@typescript-eslint/no-explicit-any: error`

`any` defeats the type system. Use `unknown` and narrow with guards instead.

### `@typescript-eslint/consistent-type-imports: error`

Type-only imports use `import type { Foo }` or inline `import { type Foo }`. This produces cleaner transpiled output and avoids accidental value imports.

### `import-x/order: error`

Imports are sorted: builtins → externals → internals → parent → sibling → index, with a blank line between groups. Enforced alphabetically within each group.
