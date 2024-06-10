import { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import component from '#/components/containers/SpacingBox';
import { CheckboxObj } from '#/components/Checkbox';
import { Stack } from '#/components/containers/FlexBox';
import { DUMMY_MESSAGE } from '#/utility/const';

// const Wrapper = (props: SpacingBoxProps) => {
//   return <Component {...props}>{DUMMY_MESSAGE}</Component>;
// };

const meta = {
  title: 'Components/Containers',
  component,
  parameters: {
    layout: 'none',
  },
  argTypes: {
    $as: {
      control: 'select',
      options: ['div', 'span', 'p'],
    },
    $mh: {
      control: 'number',
    },
    $mt: {
      control: 'number',
    },
    $mb: {
      control: 'number',
    },
  },
} satisfies Meta<typeof component>;
export default meta;

type Story = StoryObj<typeof meta>;

const Element = component;
export const SpacingBox: Story = ({ ...args }: Story['args']) => {
  return <Element {...args} />;
};

SpacingBox.args = {
  $as: 'div',
  $mh: 2,
  $mt: 5,
  $mb: 4,
  children: DUMMY_MESSAGE,
};

// TODO: ogarnij jak przekazywać parametry
