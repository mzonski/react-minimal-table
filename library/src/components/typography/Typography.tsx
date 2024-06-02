import React from 'react';
import { omit } from 'lodash';
import Heading from './Heading';
import Text from './Text';
import type { TypographyProps } from './Typography.types';

export function Typography(props: TypographyProps) {
  if (props.type === 'head') {
    return <Heading {...omit(props, 'type')} />;
  }

  return <Text {...omit(props, 'type')} />;
}

export default Typography;
