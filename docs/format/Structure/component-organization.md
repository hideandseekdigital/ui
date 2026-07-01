# Component Organization

Each component should be self-contained with all related files in its own folder.

## ✅ Recommended Component Structure

```
components/
└── button/                        # camelCase folder
    ├── Button.tsx                 # Component implementation
    ├── Button.test.tsx            # Unit tests
    ├── Button.stories.tsx         # Storybook stories
    ├── types.ts                   # Component types
    └── index.ts                   # Public API export
```

## Benefits

- **Co-located related files** - Everything for one component in one place
- **Easy to move/delete** - Just drag the folder
- **Clear boundaries** - Know exactly where code lives
- **Simple to understand** - New developers can navigate quickly

---

## 📄 `index.ts` Pattern

The `index.ts` file defines the component's public API and makes imports cleaner.

### Example

```typescript
// components/Button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./types";
```

### Usage

```typescript
// Clean import from component folder
import { Button } from "@/components/ui/Button";

// Instead of:
import { Button } from "@/components/ui/Button/Button";
```

## Export Guidelines

- ✅ **Export public API only** - What users of the component need
- ✅ **Re-export types** - Convenience for TypeScript users
- ✅ **Keep imports clean** - Simple, predictable import paths
- ✅ **Document public exports** - Comments for exported items

---

## File Breakdown

### 📝 `Component.tsx`

The main component implementation with JSX and logic.

```typescript
// Button.tsx
import type { ButtonProps } from './types';

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}
```

### 🧪 `Component.test.tsx`

Unit tests using Vitest & Testing Library.

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### 📖 `Component.stories.tsx`

Storybook stories for documentation and visual testing.

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};
```

### 📋 `types.ts`

TypeScript type definitions.

```typescript
// types.ts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}
```

### 📦 `index.ts`

Public API exports - the barrel file.

```typescript
// index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./types";
```

---

## Folder Naming

**Component folders use camelCase** to match the component name:

```
✅ Good
components/
└── button/
    ├── Button.tsx
    └── index.ts

❌ Bad
components/
└── Button/
    ├── Button.tsx
    └── index.ts
```

This makes it easy to spot component folders and keeps them consistent with file naming.

---

## Nested Components

For components with sub-components, give each sub-component its own folder:

```
components/
└── card/
    ├── Card.tsx
    ├── Card.test.tsx
    ├── cardHeader/
    │   ├── CardHeader.tsx
    │   ├── CardHeader.test.tsx
    │   ├── CardHeader.module.css
    │   ├── types.ts
    │   └── index.ts
    ├── cardBody/
    │   ├── CardBody.tsx
    │   ├── CardBody.test.tsx
    │   ├── CardBody.module.css
    │   ├── types.ts
    │   └── index.ts
    ├── cardFooter/
    │   ├── CardFooter.tsx
    │   ├── CardFooter.test.tsx
    │   ├── CardFooter.module.css
    │   ├── types.ts
    │   └── index.ts
    ├── types.ts
    └── index.ts             # Re-exports all sub-components
```

### `index.ts` for Nested Components

```typescript
// Card/index.ts
export { Card } from "./Card";
export { CardHeader } from "./cardHeader";
export { CardBody } from "./cardBody";
export { CardFooter } from "./cardFooter";
export type { CardProps } from "./types";
```

---

## Importing Components

### Within the Same Folder

```typescript
// CardBody.tsx
import { Card } from "../card";
import type { CardProps } from "../types";

// Or import from main index:
import { Card } from ".";
import type { CardProps } from "./types";
```

### From Other Components

```typescript
// UserProfile.tsx
import { Card, CardHeader, CardBody } from "@/components/ui/card";
```

### Best Practices

- ✅ Use the `index.ts` export for cleaner imports
- ✅ Import from the folder, not the file
- ✅ Use path aliases (`@/`) for consistency
- ❌ Avoid deep relative imports (`../../../Button`)

---

## When to Split Components

Consider creating separate component folders when:

1. **Reused across features** → Move to `components/ui/`
2. **Complex logic** → Separate file for clarity
3. **Multiple variants** → Sub-components in same folder
4. **Shared styles** → Keep co-located

### Feature-Specific Components

Keep components in the route folder if they're only used there:

```
app/
└── (routes)/
    └── account-settings/
        ├── components/
        │   └── accountForm/
        │       ├── AccountForm.tsx
        │       ├── AccountForm.test.tsx
        │       └── index.ts
        └── page.tsx
```

See [Folder Structure](/Structure/folder-structure) for route-specific component patterns.

---

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [Next.js Project Structure](https://nextjs.org/docs/app/building-your-application/routing/colocation)
