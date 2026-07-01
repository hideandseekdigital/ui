---
sidebar_position: 1
title: Installing from GitHub Packages
---

# Installing from GitHub Packages

All `@hideandseekdigital` packages are published to **GitHub Packages** (not the public npm registry). Consuming projects need one-time registry configuration before running `pnpm install`.

## 1. Configure the registry

Create or update `.npmrc` in the root of your project:

```ini title=".npmrc"
@hideandseekdigital:registry=https://npm.pkg.github.com
```

This tells your package manager to resolve only the `@hideandseekdigital` scope through GitHub Packages; all other packages continue to come from the public npm registry.

## 2. Authenticate

GitHub Packages requires authentication even for public packages.

### Option A — Personal Access Token (recommended for local dev)

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens** (or classic tokens).
2. Create a token with the **`read:packages`** scope.
3. Add it to `.npmrc` (do **not** commit this file when it contains a token):

```ini title=".npmrc"
@hideandseekdigital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

Or export it as an environment variable and reference it:

```ini title=".npmrc"
@hideandseekdigital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then in your shell profile (`.zshrc`, `.bashrc`):

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### Option B — GitHub Actions (CI/CD)

In CI, `GITHUB_TOKEN` is automatically available. Pass it as `NODE_AUTH_TOKEN` and reference it from `.npmrc`:

```ini title=".npmrc"
@hideandseekdigital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```yaml title=".github/workflows/ci.yml"
- uses: actions/setup-node@v6
  with:
    node-version-file: .nvmrc
    registry-url: https://npm.pkg.github.com
    scope: "@hideandseekdigital"

- run: pnpm install --frozen-lockfile
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 3. Install packages

Once the registry is configured, install as normal:

```bash
pnpm add -D @hideandseekdigital/eslint-config
pnpm add -D @hideandseekdigital/prettier-config
pnpm add -D @hideandseekdigital/stylelint-config
```

Or use the [Create CLI](/create-cli) to set everything up in one step:

```bash
pnpm dlx @hideandseekdigital/create
```

---

## Available packages and subpath exports

### `@hideandseekdigital/eslint-config`

Flat-config ESLint presets for ESLint 9. Each preset is a named export and also has a dedicated subpath for direct import.

| Preset       | Named import                                                     | Subpath import                                 | Extends                      |
| ------------ | ---------------------------------------------------------------- | ---------------------------------------------- | ---------------------------- |
| `base`       | `import { base } from "@hideandseekdigital/eslint-config"`       | `@hideandseekdigital/eslint-config/base`       | —                            |
| `typescript` | `import { typescript } from "@hideandseekdigital/eslint-config"` | `@hideandseekdigital/eslint-config/typescript` | `base`                       |
| `react`      | `import { react } from "@hideandseekdigital/eslint-config"`      | `@hideandseekdigital/eslint-config/react`      | `typescript`                 |
| `nextjs`     | `import { nextjs } from "@hideandseekdigital/eslint-config"`     | `@hideandseekdigital/eslint-config/nextjs`     | `react` + eslint-config-next |

See the [ESLint page](/Standards/eslint) for full usage examples.

### `@hideandseekdigital/prettier-config`

A single shareable Prettier config object. Reference it from `package.json`:

```json
{
  "prettier": "@hideandseekdigital/prettier-config"
}
```

Or import and extend it in `prettier.config.js`:

```js
import config from "@hideandseekdigital/prettier-config";

export default { ...config, printWidth: 120 };
```

### `@hideandseekdigital/stylelint-config`

Stylelint presets for CSS, SCSS, and CSS Modules.

| Variant     | Import path                                        | Use when                |
| ----------- | -------------------------------------------------- | ----------------------- |
| CSS         | `@hideandseekdigital/stylelint-config`             | Plain CSS               |
| SCSS        | `@hideandseekdigital/stylelint-config/scss`        | SCSS / Sass             |
| CSS Modules | `@hideandseekdigital/stylelint-config/css-modules` | CSS Modules (plain CSS) |

See the [Stylelint page](/Standards/stylelint) for full usage examples.

### `@hideandseekdigital/agent-specs`

Utilities for generating and managing `AGENTS.md` files. Used internally by the Create CLI.

```js
import {
  getTemplate,
  getSubpackageTemplate,
  getCommands,
  detectMonorepo,
  getWorkspacePackages,
  renderPackageTable,
} from "@hideandseekdigital/agent-specs";
```

See the [AGENTS.md page](/Standards/agent-specs) for the full API.

### `@hideandseekdigital/create`

The project bootstrapper CLI. Run without installing:

```bash
pnpm dlx @hideandseekdigital/create
yarn dlx @hideandseekdigital/create
npx  @hideandseekdigital/create
```

See the [Create CLI page](/create-cli) for all options.
