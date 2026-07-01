---
sidebar_position: 8
title: AGENTS.md
---

# AGENTS.md Specifications

**Package:** `@hideandseekdigital/agent-specs`

Every Hide & Seek repository must have an `AGENTS.md` in its root. This file gives AI coding agents (Claude Code, Copilot, Cursor, etc.) the context they need to work effectively without repeated explanation.

## Templates

The package ships two templates — one for single-package projects and one for monorepos. The correct one is selected automatically when you use the [Create CLI](/create-cli) or the `getTemplate` API.

### Single-package template

For standalone repos with one `package.json` at the root.

```bash
node -e "
import('@hideandseekdigital/agent-specs').then(m =>
  process.stdout.write(m.getTemplate())
)" > AGENTS.md
```

### Monorepo template

For repos with workspace packages (`pnpm-workspace.yaml`, Turborepo, Nx, etc.). Includes a **Workspace packages** table and changeset workflow steps.

```bash
node -e "
import('@hideandseekdigital/agent-specs').then(m =>
  process.stdout.write(m.getTemplate({ monorepo: true }))
)" > AGENTS.md
```

## JavaScript API

### `getTemplate(options?)`

Returns the raw template string.

```js
import { getTemplate } from "@hideandseekdigital/agent-specs";

const template = getTemplate(); // single-package
const monoTemplate = getTemplate({ monorepo: true }); // monorepo
```

### `renderTemplate(replacements, options?)`

Returns the template with `[placeholders]` substituted.

```js
import { renderTemplate } from "@hideandseekdigital/agent-specs";

const agentMd = renderTemplate({ "Project Name": "My App" }, { monorepo: false });
```

### `getCommands()`

Returns all bundled agent skill files as `{ [commandName]: markdownContent }`. Intended to be written to `.agents/skills/`, with `.claude/commands/` as a Claude Code mirror.

```js
import { getCommands } from "@hideandseekdigital/agent-specs";

const commands = getCommands();
// { "lint": "...", "lint-fix": "...", "format": "...", ... }
```

### `detectMonorepo(cwd)`

Returns `true` if the given directory looks like a monorepo. Checks for:

- `pnpm-workspace.yaml`
- `turbo.json`
- `nx.json`
- `lerna.json`
- `package.json#workspaces`

```js
import { detectMonorepo } from "@hideandseekdigital/agent-specs";

if (detectMonorepo(process.cwd())) {
  console.log("monorepo detected");
}
```

### `getWorkspacePackages(cwd)`

Reads the workspace globs and returns metadata for each package found.

```js
import { getWorkspacePackages } from "@hideandseekdigital/agent-specs";

const packages = getWorkspacePackages(process.cwd());
// [
//   { name: "@scope/pkg", path: "packages/pkg", description: "...", private: false },
//   ...
// ]
```

Supports `pnpm-workspace.yaml` and `package.json#workspaces`. Handles simple `dir/*` glob patterns.

### `renderPackageTable(packages)`

Renders a Markdown table from the array returned by `getWorkspacePackages`.

```js
import { getWorkspacePackages, renderPackageTable } from "@hideandseekdigital/agent-specs";

const table = renderPackageTable(getWorkspacePackages(process.cwd()));
```

Output:

```markdown
| Package      | Path           | Description                   |
| ------------ | -------------- | ----------------------------- |
| `@scope/pkg` | `packages/pkg` | Description from package.json |
```

## Template placeholders

Both templates use `[PLACEHOLDER]` syntax. The Create CLI populates `[REPO_TREE]` and `[PACKAGE_TABLE]` automatically. All others require manual editing.

| Placeholder         | Auto-populated | Description                                    |
| ------------------- | -------------- | ---------------------------------------------- |
| `[REPO_TREE]`       | ✓              | Live `tree -L 2` snapshot of the project       |
| `[PACKAGE_TABLE]`   | ✓ (monorepo)   | Workspace packages table                       |
| `[Project Name]`    | —              | Name of the project                            |
| `[pm]`              | —              | Package manager (`pnpm`, `npm`, `bun`, `yarn`) |
| `[install command]` | —              | e.g. `pnpm install`                            |

## Required sections

Every `AGENTS.md` must include these sections. The monorepo template also requires **Workspace packages**.

| Section                    | Purpose                                                       |
| -------------------------- | ------------------------------------------------------------- |
| Project overview           | One paragraph: what it does, who uses it, why it exists       |
| Repository layout          | Directory tree at depth 2                                     |
| Tech stack                 | Language, runtime, framework, database, infra (with versions) |
| Essential commands         | Install, dev, build, test, lint, type-check                   |
| Development workflow       | Branch naming, commit format, PR requirements, merge strategy |
| Environment variables      | All required and optional env vars with descriptions          |
| Available skills           | Table of agent skills (auto-included from template)           |
| Out of scope for AI agents | Explicit list of forbidden agent actions                      |

## Available skills

When you initialise a project with the [Create CLI](/create-cli) (or copy the skills manually), six skills are written to `.agents/skills/` (and mirrored to `.claude/commands/` for Claude Code):

| Skill         | Invocation           | What it does                                                                                                                        |
| ------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Lint          | `/lint [path]`       | Runs ESLint (and Stylelint if configured) in check-only mode; reports all issues grouped by file                                    |
| Lint & fix    | `/lint-fix [path]`   | Runs ESLint + Stylelint `--fix`, then Prettier; reports what changed                                                                |
| Format        | `/format [path]`     | Runs Prettier in write mode; reports reformatted files                                                                              |
| Code review   | `/code-review [ref]` | Reviews branch diff for correctness, security, types, and standards compliance. Accepts a PR URL, commit SHA, or file path          |
| Update layout | `/update-layout`     | Regenerates the "Repository layout" section (and "Workspace packages" in monorepos) from the current state of the repo              |
| Commit        | `/commit [hint]`     | Inspects the staged diff, infers a [Conventional Commits](/Standards/conventional-commits) message, and commits after your approval |

### Skill locations

Skills are stored in two locations so they work with different tooling:

| Path                | Used by                                   |
| ------------------- | ----------------------------------------- |
| `.agents/skills/`   | General agent discovery convention        |
| `.claude/commands/` | Claude Code slash command system (mirror) |

### Installing skills manually

If you already have an `AGENTS.md` and just want the skills:

```js
import { getCommands } from "@hideandseekdigital/agent-specs";
import { mkdirSync, writeFileSync } from "node:fs";

const commands = getCommands();

for (const [name, content] of Object.entries(commands)) {
  mkdirSync(".agents/skills", { recursive: true });
  mkdirSync(".claude/commands", { recursive: true });
  writeFileSync(`.agents/skills/${name}.md`, content);
  writeFileSync(`.claude/commands/${name}.md`, content);
}
```

## Writing guidelines

| Do                                                     | Don't                                        |
| ------------------------------------------------------ | -------------------------------------------- |
| Use concrete commands (`pnpm test`)                    | Use vague instructions ("run the tests")     |
| State constraints explicitly ("do not push to `main`") | Assume the agent knows your branching policy |
| Include version numbers in the tech stack              | Leave versions ambiguous                     |
| Keep it under ~300 lines                               | Write a novel — agents have context limits   |
| Run `/update-layout` after structural changes          | Let the directory tree go stale              |
