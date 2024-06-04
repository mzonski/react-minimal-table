import { Meta, StoryObj } from '@storybook/react';
import component from '../../../components/typography/Typography';
import { theme } from '#/theme';
import { TypographyProps } from '#/components/typography/Typography.types';
import { DUMMY_MESSAGE } from '#/utility/const';

const meta = {
  title: 'Components/Typography',
  component,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { table: { disable: true } },

    weight: { control: 'select', options: Object.keys(theme.fonts.weights) },
  },
} satisfies Meta<typeof component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: {
    type: 'head',
    variant: 'h4',
    weight: 'normal',
    children: DUMMY_MESSAGE,
  } as TypographyProps,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(theme.components.typography.head), // Default to head variants
    },
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    variant: 'md',
    weight: 'bold',
    children: DUMMY_MESSAGE,
  } as TypographyProps,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(theme.components.typography.text), // Default to head variants
    },
  },
};
