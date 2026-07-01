---
sidebar_position: 6
title: Stylelint
---

# Stylelint Configuration

**Package:** `@hideandseekdigital/stylelint-config`

Three composable presets cover plain CSS, SCSS, and CSS Modules:

| Preset        | Import path                                        | Use when                    |
| ------------- | -------------------------------------------------- | --------------------------- |
| `base`        | `@hideandseekdigital/stylelint-config`             | Plain CSS                   |
| `scss`        | `@hideandseekdigital/stylelint-config/scss`        | SCSS / Sass                 |
| `css-modules` | `@hideandseekdigital/stylelint-config/css-modules` | CSS Modules (`.module.css`) |

## Installation

```bash
pnpm add -D stylelint @hideandseekdigital/stylelint-config
```

## Usage

Create `.stylelintrc.js` in your project root:

### Plain CSS

```js
import config from "@hideandseekdigital/stylelint-config";
export default config;
```

### SCSS

```js
import config from "@hideandseekdigital/stylelint-config/scss";
export default config;
```

### CSS Modules

```js
import config from "@hideandseekdigital/stylelint-config/css-modules";
export default config;
```

### Extending a preset

```js
import base from "@hideandseekdigital/stylelint-config";

export default {
  ...base,
  rules: {
    ...base.rules,
    // project-specific overrides
    "selector-max-type": 3,
  },
};
```

Add a lint script to `package.json`:

```json
{
  "scripts": {
    "lint:css": "stylelint \"**/*.{css,scss}\"",
    "lint:css:fix": "stylelint \"**/*.{css,scss}\" --fix"
  }
}
```

## Included extends

| Config                           | Preset                | Purpose                                  |
| -------------------------------- | --------------------- | ---------------------------------------- |
| `stylelint-config-standard`      | `base`, `css-modules` | Stylelint's recommended modern CSS rules |
| `stylelint-config-standard-scss` | `scss`                | Standard rules + SCSS-specific rules     |
| `stylelint-config-recess-order`  | all                   | Enforces Bootstrap/RECESS property order |

## Property order

Properties are sorted using the [RECESS order](https://github.com/stordahl/stylelint-config-recess-order) (the same order used by Bootstrap). The broad grouping:

1. Positioning (`position`, `top`, `z-index`, …)
2. Box model (`display`, `width`, `margin`, `padding`, …)
3. Typography (`font`, `line-height`, `color`, …)
4. Visual (`background`, `border`, `opacity`, …)
5. Misc (`transition`, `animation`, …)

## Key rule decisions

### `selector-max-id: 0`

ID selectors create specificity that is nearly impossible to override without escalating to `!important`. Use classes instead.

### `property-no-vendor-prefix: true`

Vendor prefixes should be added by **Autoprefixer** in the build pipeline, not written by hand. Hand-written prefixes become stale as browser support improves. Configure Autoprefixer with a Browserslist query instead.

### `color-function-notation: "modern"`

Enforces `rgb(255 0 0 / 50%)` instead of `rgba(255, 0, 0, 0.5)`. The modern syntax is part of CSS Color Level 4 and is supported in all modern browsers.

### CSS Modules: `selector-class-pattern: camelCase`

CSS Modules are consumed in JavaScript as `styles.myClass`. Kebab-case names require bracket notation (`styles["my-class"]`), which is easy to mistype. camelCase names allow dot notation and are consistent with JavaScript naming conventions.

### SCSS: `scss/at-import-no-partial-leading-underscore`

Leading underscores on `@import` paths are a Sass 1.x convention for marking partials. With `@use` and `@forward` (the modern Sass module system), the underscore is handled automatically — including it manually in `@use` paths is an error.

## Editor integration

### VS Code

Install the [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension, then add to workspace settings:

```json
{
  "stylelint.validate": ["css", "scss"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  }
}
```

### JetBrains IDEs

Go to **Settings → Languages & Frameworks → Style Sheets → Stylelint** and enable it.
