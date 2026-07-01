# Storybook Guide

This document outlines the standard pattern for writing Storybook stories in the `@hideandseekdigital/ui` component library. Following this pattern ensures consistency across all component documentation.

## File Structure

Stories should be co-located with their components:

```
src/components/
  button.tsx
  button.stories.tsx
  card.tsx
  card.stories.tsx
```

## Story Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name";

const meta = {
  title: "Category/ComponentName",
  component: ComponentName,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { /* default props */ },
  argTypes: {
    /* control configurations for props */
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const VariantName: Story = { args: { /* variant props */ } };
```

## Key Elements

| Element | Purpose |
|---------|---------|
| `title` | Hierarchical path in Storybook sidebar (e.g., `"Components/Button"`) |
| `component` | The component being documented |
| `parameters.layout` | Use `"centered"` for most components; `"fullscreen"` for full-screen components |
| `tags: ["autodocs"]` | Enables automatic docs page generation |
| `args` | Default props shared across all stories |
| `argTypes` | Controls for Storybook's addons panel |

## Example: Button Stories

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "Button" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Destructive: Story = { args: { variant: "destructive" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Link: Story = { args: { variant: "link" } };
```

## Best Practices

1. **Naming**: Export stories with PascalCase (`Default`, `Destructive`, not `default`)
2. **Variants**: Create a separate export for each meaningful variant
3. **Controls**: Use `argTypes` to provide select controls for variant props
4. **Layout**: Default to `"centered"` layout unless the component needs full screen
5. **Autodocs**: Always include `tags: ["autodocs"]` for automatic doc generation

## Running Storybook

```bash
# Start dev server
pnpm storybook

# Build static version
pnpm build-storybook
```

Visit http://localhost:6006 when running the dev server.
