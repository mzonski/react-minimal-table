import type { Property } from 'csstype';
import styled from 'styled-components';

import { spacingMixin } from '#/theme';

type TdProps = {
  $width?: Property.Width;
  $textAlign?: Property.TextAlign;
};
export const StyledTd = styled.td<TdProps>`
  text-align: ${({ $textAlign = 'right' }) => $textAlign};
  width: ${({ $width }) => $width};

  ${spacingMixin('padding', 'medium', ['horizontal'])}
  ${spacingMixin('padding', 'small', ['vertical'])}
`;

export const StyledTbody = styled.tbody``;
