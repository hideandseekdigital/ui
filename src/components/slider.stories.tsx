import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { defaultValue: [50] },
  argTypes: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[25, 75]} />
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} min={0} max={100} step={10} />
    </div>
  ),
};
