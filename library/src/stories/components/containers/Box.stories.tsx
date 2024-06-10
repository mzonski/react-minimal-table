import component from '#/components/containers/FlexBox';
import { theme } from '#/theme';

function StorybookFlexChildren() {
  return (
    <>
      <div>1st</div>
      <div>2nd</div>
      <div>3rd</div>
      <div>4th</div>
    </>
  );
}

export default {
  title: 'Components/Containers',
  component,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: <StorybookFlexChildren />,
    as: 'div',
  },
  argTypes: {
    children: { table: { disable: true } },
    as: {
      control: 'select',
      options: ['div', 'span', 'p'],
    },
    $gap: {
      control: 'select',
      options: Object.values(theme.spacing),
    },
  },
};

export const FlexBox = {};
