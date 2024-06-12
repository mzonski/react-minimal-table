import React from 'react';
import styled from 'styled-components';
import { TextProps } from './Typography.types';
import { textTypographyMixin } from '#/theme';

const StyledText = styled.div<Pick<TextProps, '$variant' | '$weight'>>`
  ${(props) => textTypographyMixin(props.$variant, props.$weight ?? 'normal')}
`;

export function Text({
  children,
  as: Component = 'span',
  $variant = 'md',
  $weight = 'normal',
}: Readonly<Omit<TextProps, 'type'>>) {
  return (
    <StyledText as={Component} $variant={$variant} $weight={$weight}>
      {children}
    </StyledText>
  );
}

export default Text;
