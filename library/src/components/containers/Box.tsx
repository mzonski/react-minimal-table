import React, { ElementType } from 'react';
import styled from 'styled-components';
import { spacingMixin } from '#/theme/theme.mixins';
import type { PolymorphicComponentProp, ThemeSpacings } from '#/typings';

type DefaultBoxProps = { $padding?: ThemeSpacings; $margin?: ThemeSpacings };
export type BoxProps<C extends ElementType> = PolymorphicComponentProp<C, DefaultBoxProps>;

const StyledBox = styled.div<DefaultBoxProps>`
  ${(props) => props.$padding && spacingMixin('padding', props.$padding)}
  ${(props) => props.$margin && spacingMixin('margin', props.$margin)}
`;

function Box<C extends ElementType = 'div'>({ $as, padding, margin, children, ...rest }: BoxProps<C>) {
  const Component = $as ?? StyledBox;
  return (
    <Component $as={$as} $padding={padding} $margin={margin} {...rest}>
      {children}
    </Component>
  );
}

export default Box;
