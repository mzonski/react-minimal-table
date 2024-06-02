import { Meta, StoryObj } from '@storybook/react';

import { theme } from '#/theme';
import type { BadgeProps } from '#/components/badge/Badge';
import component from '#/components/badge/Badge';

const meta = {
  title: 'Components/Badge',
  component,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    $bgColor: { control: 'select', options: Object.keys(theme.colors) },
    $color: { control: 'select', options: Object.keys(theme.colors) },
    $border: { control: 'select', options: Object.keys(theme.borders.size) },
    $dense: { active: { control: 'boolean' } },
  },
} satisfies Meta<typeof component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  args: {
    $bgColor: 'success',
    $color: 'black',
    $border: 'tiny',
    $dense: false,
    children: 'Lorem ipsum',
  } as BadgeProps,
};
