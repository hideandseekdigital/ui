import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Invite members</CardTitle>
        <CardDescription>Add people to your workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Anyone with the link can view this workspace.</p>
      </CardContent>
      <CardFooter>
        <Button>Send invites</Button>
      </CardFooter>
    </Card>
  ),
};
