import React from 'react';
import styled from 'styled-components';
import { textTypographyMixin } from '../../theme/theme.mixins';
import { TextProps } from './Typography.types';

const StyledText = styled.div<Pick<TextProps, 'variant' | 'weight'>>`
  ${(props) => textTypographyMixin(props.variant, props.weight)}
`;

export function Text({ as: Component = 'span', variant, weight, children }: Readonly<Omit<TextProps, 'type'>>) {
  return (
    <StyledText as={Component} variant={variant} weight={weight}>
      {children}
    </StyledText>
  );
}

export default Text;
