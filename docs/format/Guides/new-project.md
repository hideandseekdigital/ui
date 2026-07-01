---
sidebar_position: 1
title: New Project Setup
---

# Setting Up a New Project

## Option A — Create CLI (recommended)

The [Create CLI](/create-cli) applies all standards in one step:

```bash
pnpm dlx @hideandseekdigital/create
# yarn dlx @hideandseekdigital/create
# npx  @hideandseekdigital/create
```

The interactive prompt lets you pick which standards to enable, your project type, and whether to overwrite existing files. It then writes all config files, populates `AGENTS.md` with the live directory tree, copies agent skills to `.agents/skills/` (and `.claude/commands/` for Claude Code), and installs the necessary devDependencies.

For non-interactive use (CI, scripted setup):

```bash
pnpm dlx @hideandseekdigital/create
# yarn dlx @hideandseekdigital/create
# npx  @hideandseekdigital/create --yes
```

---

## Option B — Manual setup

Follow these steps to apply standards individually.

### 1. Install packages

```bash
pnpm add -D \
  eslint \
  prettier \
  @hideandseekdigital/eslint-config \
  @hideandseekdigital/prettier-config \
  @hideandseekdigital/agent-specs
```

For TypeScript projects, also add:

```bash
pnpm add -D \
  typescript \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
```

For React projects, also add:

```bash
pnpm add -D \
  eslint-plugin-react \
  eslint-plugin-react-hooks
```

### 2. Configure ESLint

Create `eslint.config.mjs` in the project root:

```js
// Plain JS / Node.js
import { base } from "@hideandseekdigital/eslint-config";
export default base();

// TypeScript
import { typescript } from "@hideandseekdigital/eslint-config";
export default typescript();

// React + TypeScript
import { react } from "@hideandseekdigital/eslint-config";
export default react();
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 3. Configure Prettier

Add to `package.json`:

```json
{
  "prettier": "@hideandseekdigital/prettier-config",
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### 4. Add EditorConfig

Copy the standard `.editorconfig` to your project root. See the [EditorConfig page](/Standards/editorconfig) for the full file contents.

### 5. Create AGENTS.md

Detect whether you're in a monorepo and generate the right template:

```js
import { detectMonorepo, getTemplate } from "@hideandseekdigital/agent-specs";

const template = getTemplate({ monorepo: detectMonorepo(process.cwd()) });
process.stdout.write(template);
```

Or directly:

```bash
# Single-package
node -e "
import('@hideandseekdigital/agent-specs').then(m =>
  process.stdout.write(m.getTemplate())
)" > AGENTS.md

# Monorepo
node -e "
import('@hideandseekdigital/agent-specs').then(m =>
  process.stdout.write(m.getTemplate({ monorepo: true }))
)" > AGENTS.md
```

Fill in every `[placeholder]` in the generated file.

### 6. Install agent skills

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

### 7. Add CI checks

```yaml
- name: Lint
  run: pnpm lint

- name: Format check
  run: pnpm format:check
```
