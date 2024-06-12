import React from 'react';
import styled from 'styled-components';
import { HeadingProps } from './Typography.types';
import { headingTypographyMixin } from '#/theme/theme.mixins';

const StyledHeading = styled.div<Pick<HeadingProps, '$variant' | '$weight'>>`
  ${(props) => headingTypographyMixin(props.$variant, props.$weight ?? 'normal')}
`;

export function Heading({ as, children, $variant = 'h1', $weight = 'normal' }: Readonly<Omit<HeadingProps, '$type'>>) {
  return (
    <StyledHeading as={as ?? $variant} $variant={$variant} $weight={$weight}>
      {children}
    </StyledHeading>
  );
}

export default Heading;
