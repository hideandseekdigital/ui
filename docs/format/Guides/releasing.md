---
sidebar_position: 4
title: Releasing Packages
---

# Releasing Packages

Releases are automated via [Changesets](https://github.com/changesets/changesets) and GitHub Actions. The flow has two stages:

1. **Version PR** — Changesets accumulates pending changes and opens a PR that bumps all affected package versions.
2. **Publish** — When the version PR is merged to `main`, CI builds and publishes to GitHub Packages automatically.

No manual `npm publish` or version editing is ever needed.

---

## Step 1 — Write a changeset

After making changes to one or more packages, run:

```bash
pnpm changeset
```

The interactive prompt asks:

1. **Which packages changed?** Select with `<space>`, confirm with `<enter>`.
2. **Semver bump type?** `major` / `minor` / `patch` — see the table below.
3. **Summary** — a short user-facing description of what changed.

A file is created in `.changeset/`. Commit it alongside your code change:

```bash
git add .changeset/
git commit -m "feat(eslint-config): add nextjs preset"
```

### Choosing the right bump

| Change type                                                                                | Bump    |
| ------------------------------------------------------------------------------------------ | ------- |
| New optional rule at `warn`, internal refactor, docs                                       | `patch` |
| New exported preset, tightening a rule (`warn` → `error`), new required rule with auto-fix | `minor` |
| Removing an export, tightening a rule with no auto-fix, breaking API change                | `major` |

---

## Step 2 — Open a PR

Push your branch and open a PR as normal. CI runs lint, format check, and the docs build. The changeset file in `.changeset/` is what tells the release workflow there is something to publish.

---

## Step 3 — The Version PR

Once your PR merges to `main`, the **Release** workflow (`release.yml`) runs automatically. If there are any pending changesets it opens (or updates) a PR titled:

> **chore(release): version packages**

This PR:

- Bumps the `version` field in each affected `package.json`
- Updates `CHANGELOG.md` in each package with the changeset summary
- Deletes the consumed `.changeset/*.md` files

Review the version bump PR, then **merge it** when the version numbers look correct.

---

## Step 4 — Publish

When the version PR merges to `main`, the Release workflow runs again. This time there are no pending changesets, so it runs the publish command instead:

```bash
pnpm build && changeset publish
```

Each package whose version is not yet on the registry is published to **GitHub Packages** (`npm.pkg.github.com`). The `GITHUB_TOKEN` available in Actions is used for both authentication and registry access — no extra secrets are needed.

Published packages appear under the repository's **Packages** tab on GitHub:
`https://github.com/hideandseekdigital/code-standards/packages`

---

## Checking what will be released

To preview which packages have pending changesets:

```bash
pnpm changeset status
```

To preview the version bumps without writing anything:

```bash
pnpm changeset status --verbose
```

---

## Multiple changesets in one release

Multiple PRs can each contribute a `.changeset/*.md` file. The version PR accumulates all of them, so a single merge releases all changes at once. This is intentional — avoid merging the version PR until all related changes are in.

---

## Hotfix releases

For urgent fixes directly on `main`:

1. Make the change directly on a branch off `main`.
2. Run `pnpm changeset` and select `patch`.
3. Open a PR, get it reviewed, merge.
4. The standard version PR → merge → publish flow runs automatically.

---

## Troubleshooting

### Version PR not opening

- Confirm there is at least one `.changeset/*.md` file on `main` (not in a PR branch).
- Check the **Release** workflow run logs in the Actions tab.
- Verify the workflow has `pull-requests: write` and `contents: write` permissions.

### Publish fails with auth error

- Confirm `packages: write` is in the workflow permissions.
- The `GITHUB_TOKEN` must belong to a user or app with write access to the repository's packages.

### Package already exists at this version

Changesets only publishes packages whose new version is not already on the registry. If a publish was partially interrupted, bump the version again with a new `patch` changeset and republish.
