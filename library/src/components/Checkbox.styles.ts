import styled from 'styled-components';

import { colorMixin, valueToRem } from '#/theme';

export const StyledCheckbox = styled.input.attrs<{ $size: number }>({ type: 'checkbox' })`
  width: ${({ $size }) => valueToRem($size)};
  height: ${({ $size }) => valueToRem($size)};
  ${colorMixin('accent', 'primary')}
`;
