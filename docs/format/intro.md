---
slug: /
sidebar_position: 1
title: Introduction
---

# Hide & Seek Code Standards

This site documents the shared code standards used across all Hide & Seek projects. The standards are distributed as versioned npm packages under the `@hideandseekdigital` scope, so every project stays in sync automatically.

## What's included

| Standard             | Package                                                        | Purpose                                                   |
| -------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| **Create CLI**       | [`@hideandseekdigital/create`](/create-cli)                    | One-command bootstrapper — installs all standards at once |
| ESLint               | [`@hideandseekdigital/eslint-config`](/Standards/eslint)       | Linting rules for JS/TS/React/Next.js                     |
| Prettier             | [`@hideandseekdigital/prettier-config`](/Standards/prettier)   | Code formatting                                           |
| Stylelint            | [`@hideandseekdigital/stylelint-config`](/Standards/stylelint) | Linting rules for CSS/SCSS/CSS Modules                    |
| EditorConfig         | [`.editorconfig`](/Standards/editorconfig)                     | Editor-level whitespace rules                             |
| direnv + nvm         | [`.envrc` / `.nvmrc`](/Standards/direnv)                       | Automatic Node version switching on `cd`                  |
| Conventional Commits | [Commit spec](/Standards/conventional-commits)                 | Commit message format and tooling                         |
| AGENTS.md            | [`@hideandseekdigital/agent-specs`](/Standards/agent-specs)    | AI agent context templates and agent skills               |

## Quick start

:::note GitHub Packages
All `@hideandseekdigital` packages are hosted on **GitHub Packages**, not the public npm registry. Add the following to your project's `.npmrc` before installing or running the CLI:

```ini
@hideandseekdigital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

See the [GitHub Packages setup guide](/Guides/github-packages) for authentication details.
:::

The fastest way to apply all standards to a project is the [Create CLI](/create-cli):

```bash
pnpm dlx @hideandseekdigital/create
yarn dlx @hideandseekdigital/create
npx  @hideandseekdigital/create
```

This launches an interactive prompt, writes all config files, populates `AGENTS.md` with the live directory tree, installs agent skills, and installs devDependencies — all in one step.

## Manual setup

If you prefer to install standards individually, see the [New Project Setup](/Guides/new-project) guide.

## Versioning & updates

All packages follow [Semantic Versioning](https://semver.org). Breaking rule changes ship as major versions. Subscribe to releases on [GitHub](https://github.com/hideandseekdigital/code-standards/releases) or run `pnpm outdated` to check for updates.
