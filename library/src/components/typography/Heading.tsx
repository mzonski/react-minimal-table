import React from 'react';
import styled from 'styled-components';
import { headingTypographyMixin } from '../../theme/theme.mixins';
import { HeadingProps } from './Typography.types';

const StyledHeading = styled.div<Pick<HeadingProps, 'variant' | 'weight'>>`
  ${(props) => headingTypographyMixin(props.variant, props.weight)}
`;

export function Heading({ as: Component = 'h1', variant, weight, children }: Readonly<Omit<HeadingProps, 'type'>>) {
  return (
    <StyledHeading as={Component} variant={variant} weight={weight}>
      {children}
    </StyledHeading>
  );
}

export default Heading;
