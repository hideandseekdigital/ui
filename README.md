# @hide-seek-digital/ui

Shared, CMS-agnostic React component library for Hide & Seek — built on shadcn/ui,
themeable via tokens, published to GitHub Packages and consumed across all projects.

This is the **owned component library** (layer 2 of the architecture): pure presentational
components, no CMS knowledge, no brand baked in. Projects install it and apply their own
brand tokens.

---

## Develop

```bash
pnpm install
pnpm run build      # outputs dist/ (ESM + CJS + types) via tsup
pnpm run typecheck
```

## Publish (GitHub Packages)

Releases are automated. Per change:

```bash
pnpm changeset         # choose the bump (patch/minor/major) + write a note
git add . && git commit -m "feat: ..."
git push
```

On push to `main`, the GitHub Action opens a **"Version Packages"** PR. Merging that PR
publishes the new version to GitHub Packages. No manual `npm publish` needed.

> First publish: the workflow uses the built-in `GITHUB_TOKEN`, so no extra secret is
> required. Just make sure the repo's Actions have **read/write** permissions
> (Settings → Actions → General → Workflow permissions).

### Publishing from your machine (optional)

```bash
export NODE_AUTH_TOKEN=<a GitHub PAT with write:packages>
pnpm run build
pnpm publish --no-git-checks
```

---

## Consume it in a project

**1. Add an `.npmrc` to the consuming repo** so the scope resolves to GitHub Packages:

```
@hide-seek-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

(Set `NODE_AUTH_TOKEN` to a GitHub PAT with `read:packages` locally; in CI use the
built-in token.)

**2. Install:**

```bash
npm install @hide-seek-digital/ui
```

**3. Import the tokens once at your app root, then use components:**

```tsx
import "@hide-seek-digital/ui/styles/tokens.css";
import { Button } from "@hide-seek-digital/ui";

export default function Page() {
  return <Button variant="default">Hello</Button>;
}
```

**4. Wire Tailwind** so it maps the token CSS variables and scans this package's classes.

- Add the package to your Tailwind `content` so its classes aren't purged:
  ```js
  content: ["./node_modules/@hide-seek-digital/ui/dist/**/*.{js,mjs}"]
  ```
- Map the color tokens to the CSS variables (same as a standard shadcn `tailwind.config`),
  e.g. `primary: "hsl(var(--primary) / <alpha-value>)"`, etc.

**5. Apply brand tokens per project** by overriding the variables in your own CSS, after
importing the defaults:

```css
:root {
  --primary: 262 83% 58%;   /* this client's brand */
  --radius: 0.75rem;
}
```

---

## What's here (step 1)

- `Button` — the first component (class-variance-authority variants).
- `cn` — class-merge helper.
- `styles/tokens.css` — unbranded default tokens.

Next steps: add Storybook, more components, and the Hero Card composite.
