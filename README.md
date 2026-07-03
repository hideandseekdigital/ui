# @hideandseekdigital/ui

Shared, CMS-agnostic React component library for Hide & Seek — built on shadcn/ui,
themeable via tokens, published to GitHub Packages and consumed across all projects.

## Where this fits

This repo is **layer 2** of the architecture: pure, presentational components with **no
CMS knowledge and no brand baked in**. A separate **CMS template library** (Storyblok
wrappers, swappable per CMS) builds on top of it, and **project repos** install both,
apply their own brand tokens, and connect their content space.

## Tech stack

| Layer                     | Choice                                                  | Why                                                                              |
| ------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Language**              | TypeScript                                              | Type-safe public API; types ship with the package.                               |
| **UI runtime**            | React 18                                                | Peer dependency — provided by the consuming app.                                 |
| **Component foundation**  | [shadcn/ui](https://ui.shadcn.com) (new-york)           | Owned, copy-in components added via the shadcn CLI — not an upstream dependency. |
| **Primitives**            | [Radix UI](https://www.radix-ui.com)                    | Accessible, unstyled behaviour (e.g. `Slot` for `asChild`).                      |
| **Styling**               | [Tailwind CSS v4](https://tailwindcss.com)              | CSS-first config (`@theme`); zero runtime.                                       |
| **Design tokens**         | CSS custom properties                                   | Unbranded defaults in `styles/tokens.css`; **each project overrides per brand**. |
| **Variant API**           | class-variance-authority + `cn` (clsx + tailwind-merge) | Typed, conflict-safe component variants.                                         |
| **Build**                 | [tsup](https://tsup.egoist.dev)                         | Outputs ESM + CJS + `.d.ts` types.                                               |
| **Workbench / docs**      | [Storybook](https://storybook.js.org) (react-vite)      | Develop components in isolation; visual-regression baseline.                     |
| **Versioning & releases** | [Changesets](https://github.com/changesets/changesets)  | Strict semver, automated changelog + publish.                                    |
| **Registry**              | GitHub Packages                                         | Private, scoped to the `hideandseekdigital` org.                                  |
| **CI/CD**                 | GitHub Actions                                          | Opens a "Version Packages" PR; publishes on merge.                               |
| **Package manager**       | pnpm                                                    | Fast, strict installs (`packageManager` pinned).                                 |

## What's inside

- **`Button`** — canonical shadcn Button: variants via class-variance-authority, `asChild`
  via Radix `Slot`.
- **`cn`** — class-merge helper (clsx + tailwind-merge).
- **`styles/tokens.css`** — unbranded default design tokens (CSS variables).
- **Storybook** — visual workbench with stories for each component.

---

## Develop

```bash
pnpm install
pnpm storybook       # component workbench at http://localhost:6006
pnpm build           # outputs dist/ (ESM + CJS + types) via tsup
pnpm typecheck
```

## Adding components

Components come from the shadcn CLI — the "shopping trip" workflow. They're **copied into
this repo and become ours** (no live upstream link):

```bash
pnpm dlx shadcn@latest add <component>
```

`components.json` is preconfigured (new-york style, Tailwind v4, `@/*` → `src/*`). After
pulling a component, re-theme it to our tokens and add a Storybook story.

---

## Design tokens

Tokens come from the **shadcndesign Figma kit** (the design system we use) and flow
design → code:

1. **Design (Figma):** open the shadcndesign **plugin → Variables** (or the **Theme
   Generator**) and **export the theme to CSS**.
2. **Drop in:** paste the exported `:root` / `.dark` variables into
   [`styles/tokens.css`](./styles/tokens.css), replacing the placeholder values. Keep the
   variable **names** (shadcn standard) — only the **values** change.
3. **Map (already wired):** `src/styles/globals.css` maps those variables to Tailwind
   utilities via `@theme`, so components (`bg-primary`, `border-input`, …) pick up the
   brand automatically.
4. **See it:** `pnpm storybook`.

`styles/tokens.css` ships with the package, so projects inherit these defaults and can
override per-brand in their own CSS. The values currently in the file are canonical shadcn
defaults — placeholders until the real shadcndesign export is pasted in.

---

## Releasing (GitHub Packages)

Releases are automated. Per change:

```bash
pnpm changeset       # choose the bump (patch/minor/major) + write a note
git add . && git commit -m "feat: ..."
git push
```

On push to `main`, the GitHub Action opens a **"Version Packages"** PR. Merging that PR
publishes the new version to GitHub Packages.

> The workflow uses the built-in `GITHUB_TOKEN`, so no extra secret is required. Just
> ensure Actions have **read/write** permissions
> (Settings → Actions → General → Workflow permissions).

### Publishing from your machine (optional)

```bash
export NODE_AUTH_TOKEN=<a GitHub PAT with write:packages>
pnpm build
pnpm publish --no-git-checks
```

---

## Consuming in a project

This is a **private GitHub Packages** package: authenticate, install, wire Tailwind v4.
(Verified against a Next.js 15 app.)

### 1. Authenticate (one-time)

Create a GitHub **Personal Access Token (classic)** with the **`read:packages`** scope,
then either export it for the install:

```bash
export NODE_AUTH_TOKEN=<your-PAT>
```

or add the token to your **user** `~/.npmrc` to keep it out of the project.

> A token is required **even though the repo is public** — GitHub Packages npm does not
> allow anonymous installs.

### 2. Add an `.npmrc` to the project root

```
@hideandseekdigital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### 3. Install

```bash
npm install @hideandseekdigital/ui      # or: pnpm add @hideandseekdigital/ui
```

Its runtime deps (`radix-ui`, `lucide-react`, …) install automatically. React 18+ must
already be present.

### 4. Set up Tailwind v4 (if the project doesn't have it)

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

`postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

### 5. Wire the tokens in your CSS entry

```css
@import "tailwindcss";
@import "@hideandseekdigital/ui/styles/tokens.css";
@custom-variant dark (&:is(.dark *));

/* Scan the library's compiled classes so they aren't purged */
@source "../node_modules/@hideandseekdigital/ui/dist";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  /* + card, popover, chart-*, sidebar-* — see src/styles/globals.css */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

@layer base {
  * { border-color: var(--border); outline-color: var(--ring); }
  body { background-color: var(--background); color: var(--foreground); }
}
```

Import that CSS once at your app root (e.g. `app/layout.tsx` in Next.js).

### 6. Use components

```tsx
import { Button, Card } from "@hideandseekdigital/ui";

export default function Page() {
  return <Button>Hello</Button>;
}
```

### 7. Apply this project's brand (optional)

Override the token values in your own CSS **after** importing the defaults — every
component restyles automatically, no component changes:

```css
:root {
  --primary: oklch(0.55 0.22 285); /* this client's brand */
  --radius: 0.75rem;
}
```

---
