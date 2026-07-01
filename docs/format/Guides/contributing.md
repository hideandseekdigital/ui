---
sidebar_position: 3
title: Contributing to Standards
---

# Contributing to Code Standards

The standards in this repo are owned by all Hide & Seek engineers. Propose a change by opening a PR; any engineer can review, but changes to ESLint rules require sign-off from at least two people.

## When to propose a change

- A rule causes more pain than it prevents across multiple projects
- A rule is missing that would catch a class of bugs we've seen in production
- A new widely-adopted tool should be adopted across the org
- An existing rule conflicts with a framework best practice we've committed to

## Process

1. **Open a discussion** (GitHub Discussions) before writing code for non-trivial changes. This avoids wasted effort if the change won't be accepted.
2. **Fork and branch** off `main`: `feat/rule-description` or `fix/rule-name`.
3. **Make the change** in the relevant package under `packages/`.
4. **Update documentation** in `apps/docs/docs/` — every rule decision should be explained.
5. **Add a changeset**: `pnpm changeset` → choose the affected package → write a user-facing description.
6. **Open a PR** with a clear title and description of the before/after behaviour.
7. **Address review feedback**. Formatting and style changes that conflict with the Prettier config will be auto-blocked by CI.
8. **Merge** — a maintainer will squash-merge once approved.

## Changeset types

| Change                                              | Semver bump |
| --------------------------------------------------- | ----------- |
| New optional rule at `warn`                         | `patch`     |
| Tightening an existing rule (e.g. `warn` → `error`) | `minor`     |
| New required rule at `error` with no auto-fix       | `major`     |
| Removing a rule                                     | `minor`     |
| Config restructure (no rule changes)                | `patch`     |

## Local development

```bash
# Install everything
pnpm install

# Test your ESLint config changes against a fixture
cd packages/eslint-config
node --input-type=module <<'EOF'
import { typescript } from "./src/index.js";
console.log(JSON.stringify(typescript(), null, 2));
EOF

# Start the docs site
pnpm docs:start
```

## Docs style guide

- Write for someone encountering the rule for the first time.
- Always include a **Rationale** — _why_ the rule exists, not just what it does.
- Show a before/after code example for non-obvious rules.
- Keep pages focused: one concept per page.
