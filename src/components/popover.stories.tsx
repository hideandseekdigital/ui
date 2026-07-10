import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
          Open popover
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          <div className="font-medium">Popover content</div>
          <div className="text-sm text-muted-foreground">
            This is a popover with some content inside.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithAlign: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
            Start
          </button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="text-sm">Aligned to start</div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
            Center
          </button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <div className="text-sm">Aligned to center</div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
            End
          </button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="text-sm">Aligned to end</div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
