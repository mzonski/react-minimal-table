import type { Property } from 'csstype';
import styled from 'styled-components';

import { borderMixin, spacingMixin, textTypographyMixin } from '#/theme';

type StyledThProps = {
  $textAlign?: Property.TextAlign;
  $width?: Property.Width;
};

export const StyledThead = styled.thead`
  ${borderMixin('medium', 'bottom', false)}
`;

export const StyledTh = styled.th<StyledThProps>`
  text-align: ${({ $textAlign = 'right' }) => $textAlign};
  width: ${({ $width }) => $width};

  ${spacingMixin('padding', 'medium', ['all'])}
  ${textTypographyMixin('md', 'bold')}
`;

//
