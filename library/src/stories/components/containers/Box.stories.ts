import component from '#/components/containers/Box';
import { DUMMY_MESSAGE } from '#/utility/const';

export default {
  title: 'Components/Containers',
  component,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: DUMMY_MESSAGE,
    as: 'div',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'p'],
    },
  },
};

export const Box = {};
