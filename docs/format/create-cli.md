---
sidebar_position: 2
title: Create CLI
---

# @hideandseekdigital/create

A zero-config initialiser that applies all Hide & Seek standards to a new or existing repository in one command. No local install required.

```bash
pnpm dlx @hideandseekdigital/create
yarn dlx @hideandseekdigital/create
npx  @hideandseekdigital/create
```

## What it does

The CLI walks you through an interactive prompt, then:

1. Writes `.nvmrc` and `.envrc` so `direnv` automatically activates the correct Node version on `cd`
2. Writes config files (`.editorconfig`, `eslint.config.mjs`, `.stylelintrc.js`)
3. Writes `AGENTS.md` — populated with the live directory tree, and a workspace packages table if the project is a monorepo
4. Copies agent skills to `.agents/skills/` (and `.claude/commands/` for Claude Code)
5. Adds `prettier`, `lint`, `format`, and `lint:css` scripts to `package.json`
6. Installs the required devDependencies using the detected package manager

## Flags

| Flag                 | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `--yes` / `-y`       | Skip all prompts, use defaults (TypeScript, no styles, all features) |
| `--overwrite` / `-f` | Overwrite existing config files instead of skipping them             |
| `--cwd=<path>`       | Run against a specific directory instead of `process.cwd()`          |

## Interactive prompts

### Which standards?

A `multiselect` lets you toggle each feature independently:

| Feature                | Default | What gets written                                                                                                 |
| ---------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| **ESLint**             | ✓       | `eslint.config.mjs` + `lint` / `lint:fix` scripts                                                                 |
| **Prettier**           | ✓       | `"prettier"` field in `package.json` + `format` / `format:check` scripts                                          |
| **Stylelint**          | —       | `.stylelintrc.js` + `lint:css` / `lint:css:fix` scripts                                                           |
| **EditorConfig**       | ✓       | `.editorconfig`                                                                                                   |
| **direnv + nvm**       | ✓       | `.nvmrc` (Node major version) + `.envrc` (auto-activates nvm on `cd`); adds `.direnv/` to `.gitignore`            |
| **AGENTS.md + skills** | ✓       | `AGENTS.md`, `CLAUDE.md` (imports `@AGENTS.md` for Claude Code), `.agents/skills/` (+ `.claude/commands/` mirror) |

### Project type

Only shown when ESLint is selected:

| Option             | ESLint preset used |
| ------------------ | ------------------ |
| React + TypeScript | `react()`          |
| TypeScript         | `typescript()`     |
| JavaScript         | `base()`           |

### Stylesheet format

Only shown when Stylelint is selected:

| Option                  | Stylelint preset used                              |
| ----------------------- | -------------------------------------------------- |
| Plain CSS               | `@hideandseekdigital/stylelint-config`             |
| SCSS                    | `@hideandseekdigital/stylelint-config/scss`        |
| CSS Modules (plain CSS) | `@hideandseekdigital/stylelint-config/css-modules` |
| CSS Modules (SCSS)      | Combined css-modules + scss rules                  |

### Overwrite existing files?

Only asked when the CLI detects conflicting config files already in the project. Safe to decline — existing files are skipped.

## Monorepo detection

The CLI automatically detects monorepos by checking for `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, `lerna.json`, or a `workspaces` field in `package.json`. When a monorepo is detected:

- The monorepo `AGENTS.md` template is used instead of the single-package one
- A **Workspace packages** table is auto-populated by scanning the workspace globs
- The generated `AGENTS.md` includes changeset workflow steps and per-package command examples

## Package manager detection

The CLI detects which package manager to use for installation by looking for lockfiles in the target directory:

| Lockfile                 | Package manager used |
| ------------------------ | -------------------- |
| `pnpm-lock.yaml`         | pnpm                 |
| `bun.lock` / `bun.lockb` | bun                  |
| `yarn.lock`              | yarn                 |
| _(none)_                 | npm                  |

## Generated files

### `AGENTS.md`

The AGENTS.md is generated from the canonical template in [`@hideandseekdigital/agent-specs`](/Standards/agent-specs). The CLI automatically populates:

- **Repository layout** — a live `tree -L 2` style snapshot of the project at init time
- **Workspace packages** — (monorepos only) a Markdown table of all packages with their name, path, and description from `package.json`

All other sections remain as `[placeholders]` for you to fill in.

### Agent skills

Six skills are written to `.agents/skills/` and mirrored to `.claude/commands/` for Claude Code compatibility:

| Skill         | Invocation           |
| ------------- | -------------------- |
| Lint          | `/lint [path]`       |
| Lint & fix    | `/lint-fix [path]`   |
| Format        | `/format [path]`     |
| Code review   | `/code-review [ref]` |
| Update layout | `/update-layout`     |
| Commit        | `/commit [hint]`     |

See [AGENTS.md specs](/Standards/agent-specs#available-skills) for full descriptions.

## Example: new TypeScript + React project

```bash
mkdir my-app && cd my-app
pnpm init
pnpm dlx @hideandseekdigital/create  # or: yarn dlx / npx
```

```
◆ Hide & Seek — Code Standards Initializer

◇ Which standards?
  ✓ ESLint  ✓ Prettier  ✓ EditorConfig  ✓ AGENTS.md + skills

◇ Project type?
  ● React + TypeScript

◇ Files to write:
  write  .editorconfig
  write  eslint.config.mjs
  write  AGENTS.md
  write  .agents/skills/{format,lint,lint-fix,code-review,update-layout,commit}.md
  write  .claude/commands/{format,lint,lint-fix,code-review,update-layout,commit}.md
  write  package.json (prettier ref + scripts)

◇ Proceed? Yes

◆ Done!
  pnpm run lint
  pnpm run format:check
  Edit AGENTS.md and fill in the [placeholders]
```

## Example: non-interactive (CI or scripted setup)

```bash
pnpm dlx @hideandseekdigital/create --yes --cwd=./packages/my-new-package
yarn dlx @hideandseekdigital/create --yes --cwd=./packages/my-new-package
npx  @hideandseekdigital/create --yes --cwd=./packages/my-new-package
```

Uses defaults: TypeScript preset, no Stylelint, all other features enabled. Skips any files that already exist.
