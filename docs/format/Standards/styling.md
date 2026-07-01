# CSS Styling

Standards for styling React components and applications.

---

## 🎨 CSS Modules

Use CSS Modules for all production code. Maintains separation of concerns and is compatible with React Server Components.

```typescript
// button.module.css
.button {
  padding: 1rem 2rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  transition: background 0.15s ease;
}

.button:hover {
  background: #2563eb;
}
```

```typescript
// Button.tsx
import styles from './button.module.css';

export function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
}
```

---

## ❌ Avoid These

- ❌ **Inline styles** (except for dynamic values)
- ❌ **Styled-components or emotion** (not compatible with RSC)
- ❌ **Global CSS files for component styles**

---

## ✅ Global CSS for Variables & Theming

Use global CSS files for CSS variables, theming, and design tokens.

### ✅ Recommended Pattern

```css
/* globals.css or app/globals.css */
:root {
  --color-primary: rgba(59, 130, 246, 1);
  --color-secondary: #3b82f6;
  --spacing-unit: 0.25rem;
  --border-radius: 0.5rem;
}

[data-theme="dark"] {
  --color-primary: rgba(96, 165, 250, 1);
  --color-secondary: #60a5fa;
}
```

### ✅ Usage in Components

```css
/* button.module.css */
.button {
  padding: var(--spacing-unit);
  background: var(--color-primary);
  border-radius: var(--border-radius);
}
```

```typescript
// Button.tsx
import styles from './button.module.css';

export function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
}
```

---

## 💡 Best Practices

### Global CSS

- **Use for**: Design tokens, theme variables, global resets
- **Location**: `app/globals.css` or root `globals.css`
- **Avoid**: Component-specific styles (use CSS Modules instead)
- **Import only**: In root layout or main CSS entry point

### CSS Modules

- **Use for**: All component-specific styles
- **File naming**: `ComponentName.module.css`
- **Import**: Co-located with component
- **Avoid**: Global selectors, overly generic names

### Inline Styles

- **Use for**: Dynamic values only (e.g., `style={{ height: sliderValue }}`)
- **Avoid**: Static styles that should be in CSS Modules

---

## 📁 File Organization

### Component Styles

```
components/
└── button/
    ├── Button.tsx
    ├── button.module.css
    ├── Button.test.tsx
    └── index.ts
```

### Global Styles

```
app/
├── globals.css              # Global variables, resets
├── layout.tsx
└── page.tsx
```

---

## 🎯 Naming Conventions

### CSS Modules

**Use camelCase for class names:**

```css
/* ✅ Good */
.button {
}
.primaryButton {
}
.submitButton {
}

/* ❌ Bad */
.button {
}
.primary-button {
}
.submit_button {
}
```

### CSS Variables

**Use camelCase for variable names:**

```css
/* ✅ Good */
--colorPrimary: #3b82f6;
--spacingUnit: 0.25rem;
--borderRadius: 0.5rem;

/* ❌ Bad */
--color-primary: #3b82f6;
--spacing_unit: 0.25rem;
--BorderRadius: 0.5rem;
```

---

## 📚 Related Documentation

- [Component Organization](/Structure/component-organization) - How to organize component files
- [Folder Structure](/Structure/folder-structure) - Overall project structure
- [Naming Conventions](/Structure/naming-conventions) - File and folder naming rules
