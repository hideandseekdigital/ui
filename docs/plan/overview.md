# Design System Implementation Plan

## Overview

This plan outlines building a unified design system for Hide & Seek — a shared component library (`@hideandseek/ui`), Storyblok template library, and project starter — to enable consistent, efficient delivery across 20+ projects.

---

## Phase 0 — Lock the decisions (days, not weeks)

**Goal**: Confirm the stack so you're not re-deciding mid-build.

**Key decisions to lock**:
- React framework (Next.js is the shadcn/Storyblok default)
- Tailwind version
- GitHub Packages as the registry
- Monorepo vs separate repos for /ui + template lib (a monorepo with Changesets is usually easier for two tightly-related packages)
- Token approach (CSS variables)
- Governance policy (Tier-1/Tier-2, lint guardrails)
- Reserve the npm org name for future portability

---

## Phase 1 — @hideandseek/ui (the shared component repo)

**Goal**: Scaffold and publish the core component library.

**Tasks**:
- Scaffold the repo
- Copy in the shadcn components you need now (not all of them)
- Wire up Storybook as docs + visual-regression baseline
- Define token structure as CSS variables
- Stand up release pipeline (Changesets → GitHub Packages) with semver and deprecation policy
- Add CI guardrails (lint: no raw hex/inline styles)
- Establish Figma↔code link via the shadcn design kit (Code Connect / token sync)

**Principles**:
- Keep it unbranded
- Keep it Storyblok-free

---

## Phase 2 — Storyblok template library

**Goal**: Create Storyblok block wrappers that map to /ui components.

**Approach**:
- Pick a couple of common blocks (start with Hero)
- For each block:
  - Define the block schema (editor-facing fields)
  - Build the wrapper that maps those fields to /ui props
  - Set up schema export/sync to a Storyblok space (Storyblok CLI/Management API)
- Storybook the wrappers
- Publish as its own versioned package depending on /ui

---

## Phase 3 — Project starter

**Goal**: Create a reusable project template.

**Template includes**:
- Installation of /ui + the template library
- Storyblok SDK wiring (block→wrapper registration)
- Brand-token theming setup
- Content fetching setup
- Deployment configuration

This becomes the clone-and-go base for the 20 projects.

---

## Phase 4 — Governance & automation (ongoing)

**Goal**: Maintain and evolve the system sustainably.

**Elements**:
- Renovate in consumer projects
- Chromatic (or similar) visual regression on the libraries
- AI-codegen guardrails so generation flows through /ui
- Maintenance cadence (foundation upgrades done once, centrally)

---

## Sequencing with TIQ

Build TIQ standalone now (no shared library) to hit its deadline, while **Phases 0–3 run in parallel** as the proper foundation.

**Migrate TIQ onto the library later**, once it's proven.

---

## Concrete First Step

**De-risk 80% of the architecture with a simple loop:**

1. Stand up the /ui repo with just:
   - Button component
   - Hero Card component
2. Publish 0.1.0 to GitHub Packages
3. Consume it in one throwaway test app
4. Verify: build → publish → install → theme → render

**If that loop works, you've de-risked 80% of the architecture. Everything after is repetition.**

---

## Next Step

Turn this into a proper implementation plan doc — phases broken into concrete tasks with the key decisions called out — that you can hand to the team or drive the build from.
