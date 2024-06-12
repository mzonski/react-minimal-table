import { Meta } from '@storybook/react';
import styled from 'styled-components';
import component, { SpacingBoxProps } from '#/components/containers/SpacingBox';
import { DUMMY_MESSAGE } from '#/utility/const';
import Heading from '#/components/typography/Heading';
import { theme } from '#/theme';

const meta = {
  title: 'Components/Containers',
  component,
  parameters: {
    layout: 'none',
  },
  argTypes: {
    children: { table: { disable: true } },
    as: {
      control: 'select',
      options: ['div', 'span', 'p'],
    },
    $mh: {
      control: 'select',
      options: Object.keys(theme.spacing),
    },
    $mt: {
      control: 'select',
      options: Object.keys(theme.spacing),
    },
    $mb: {
      control: 'select',
      options: Object.keys(theme.spacing),
    },
    $ph: {
      control: 'select',
      options: Object.keys(theme.spacing),
    },
    $pt: {
      control: 'select',
      options: Object.keys(theme.spacing),
    },
    $pb: {
      control: 'select',
      options: Object.keys(theme.spacing),
    },
  },
} satisfies Meta<typeof component>;
export default meta;

const DisplayElement = styled(component)`
  background-image: linear-gradient(to bottom, #4adc7f 0%, #4adc7f 100%),
    linear-gradient(to bottom, #f56565 0%, #f56565 100%);
  background-clip: content-box, padding-box;
`;

export const SpacingBox = (props: SpacingBoxProps) => {
  return <DisplayElement {...props} />;
};

SpacingBox.args = {
  as: 'div',
  $mh: 0.5,
  $mt: 'px',
  $mb: 56,
  $ph: 44,
  $pt: 10,
  $pb: 24,
  children: <Heading $variant="h3">{DUMMY_MESSAGE}</Heading>,
};

// TODO: ogarnij jak przekazywać parametry
