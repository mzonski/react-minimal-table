import { Meta, StoryObj } from '@storybook/react';
import { theme } from '../../../theme/theme';
import component from '../../../components/typography/Typography';
import { TypographyProps } from '../../../components/typography/Typography.types';

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
    children: 'Zażółć gęślą jaźń',
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
    children: 'Zażółć gęślą jaźń',
  } as TypographyProps,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(theme.components.typography.text), // Default to head variants
    },
  },
};
