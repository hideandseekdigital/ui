import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { type: "text", placeholder: "Enter text..." },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number"] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Email: Story = { args: { type: "email", placeholder: "email@example.com" } };
export const Password: Story = { args: { type: "password", placeholder: "Enter password" } };
export const Disabled: Story = { args: { disabled: true, placeholder: "Disabled input" } };
