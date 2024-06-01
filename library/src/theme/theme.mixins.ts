import { css, ExecutionContext } from 'styled-components';

import { theme } from './theme';

type MoveType = 'margin' | 'padding';
type Corners = 'top' | 'left' | 'right' | 'bottom' | 'vertical' | 'horizontal' | 'all';
export const spacingMixin = (
  type: MoveType,
  themeSpacing: keyof typeof theme.spacing,
  corners: Corners[] = ['all'],
) => {
  const spacingValue = (props: ExecutionContext) => props.theme.spacing[themeSpacing];

  const applySpacing = (props: ExecutionContext) => {
    const selectedSpacing = spacingValue(props);
    return corners
      .map((corner) => {
        switch (corner) {
          case 'top':
            return `${type}-top: ${selectedSpacing};`;
          case 'left':
            return `${type}-left: ${selectedSpacing};`;
          case 'right':
            return `${type}-right: ${selectedSpacing};`;
          case 'bottom':
            return `${type}-bottom: ${selectedSpacing};`;
          case 'vertical':
            return `${type}-top: ${selectedSpacing}; ${type}-bottom: ${selectedSpacing};`;
          case 'horizontal':
            return `${type}-left: ${selectedSpacing}; ${type}-right: ${selectedSpacing};`;
          case 'all':
            return `${type}: ${selectedSpacing}; ${type}-right: ${selectedSpacing};`;
          default:
            throw new Error(`Selected corner not supported: ${corner}`);
        }
      })
      .join(' ');
  };

  return css`
    ${(props) => applySpacing(props)}
  `;
};
export const colorMixin = (type: 'bgColor' | 'color', color: keyof typeof theme.colors) => {
  const colorValue = (props: ExecutionContext) => props.theme.colors[color];

  const applyColor = (props: ExecutionContext) => {
    const selectedColor = colorValue(props);
    switch (type) {
      case 'bgColor':
        return `background-color: ${selectedColor};`;
      case 'color':
        return `color: ${selectedColor};`;
      default:
        throw new Error(`Selected color not supported: ${type}`);
    }
  };

  return css`
    ${(props) => applyColor(props)}
  `;
};

export const fontSizeMixin = (size: keyof typeof theme.fontSizes) => css`
  font-size: ${(props) => props.theme.fontSizes[size]};
`;
