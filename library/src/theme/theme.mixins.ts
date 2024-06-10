import { css, ExecutionContext } from 'styled-components';

import type {
  Autocomplete,
  ThemeBorderSizes,
  ThemeColors,
  ThemeFontWeights,
  ThemeSpacings,
  ThemeTypographyHeads,
  ThemeTypographyTexts,
} from '#/typings';

export type MoveType = 'margin' | 'padding';
export type Corners = 'top' | 'left' | 'right' | 'bottom' | 'vertical' | 'horizontal' | 'all';

export const mapSpacingCornetToCssProperties = (type: MoveType, selectedSpacing: string, corners: Corners[] = ['all']) => {
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
          return `${type}: ${selectedSpacing};`;
        default:
          throw new Error(`Selected corner not supported: ${corner}`);
      }
    })
    .join(' ');
}

export const spacingMixin = (type: MoveType, themeSpacing: ThemeSpacings, corners: Corners[] = ['all']) => {
  const spacingValue = (props: ExecutionContext) => props.theme.spacing[themeSpacing];

  const applySpacing = (props: ExecutionContext) => {
    const selectedSpacing = spacingValue(props);
    return mapSpacingCornetToCssProperties(type, selectedSpacing, corners);
  };

  return css`
    ${applySpacing}
  `;
};
export const colorMixin = (type: 'bgColor' | 'color' | 'accent', color: Autocomplete<ThemeColors>) => {
  const colorValue = (props: ExecutionContext) => props.theme.colors[color];

  const applyColor = (props: ExecutionContext) => {
    const selectedColor = colorValue(props);
    switch (type) {
      case 'bgColor':
        return `background-color: ${selectedColor};`;
      case 'color':
        return `color: ${selectedColor};`;
      case 'accent':
        return `accent-color: ${selectedColor};`;
      default:
        throw new Error(`Selected color not supported: ${type}`);
    }
  };

  return css`
    ${applyColor}
  `;
};

export const borderMixin = (
  size: Autocomplete<ThemeBorderSizes> = 'small',
  corners: Autocomplete<Corners> = 'all',
  radius: boolean = false,
) => {
  const getValues = (props: ExecutionContext) => ({
    selectedSize: props.theme.borders.size[size],
    selectedColor: props.theme.borders.color,
    selectedType: props.theme.borders.type,
    selectedRadius: props.theme.borders.radius,
  });

  const applyBorder = (props: ExecutionContext) => {
    const { selectedSize, selectedColor, selectedType, selectedRadius } = getValues(props);
    const borderStyle = `${selectedSize} ${selectedType} ${selectedColor}`;

    let returnCss: string;

    switch (corners) {
      case 'top':
        returnCss = `border-top: ${borderStyle};`;
        break;
      case 'left':
        returnCss = `border-left: ${borderStyle};`;
        break;
      case 'right':
        returnCss = `border-right: ${borderStyle};`;
        break;
      case 'bottom':
        returnCss = `border-bottom: ${borderStyle};`;
        break;
      case 'vertical':
        returnCss = `border-top: ${borderStyle}; border-bottom: ${borderStyle};`;
        break;
      case 'horizontal':
        returnCss = `border-left: ${borderStyle}; border-right: ${borderStyle};`;
        break;
      case 'all':
      default:
        returnCss = `border: ${borderStyle};`;
        break;
    }

    if (radius) {
      returnCss += `border-radius: ${selectedRadius};`;
    }

    return returnCss;
  };

  return css`
    ${applyBorder}
  `;
};

const getTypographyValues = (props: ExecutionContext, type: 'head' | 'text', variant: string, weight: string) => {
  const typographyConfig = props.theme.components.typography[type][variant];
  const fontWeight = props.theme.fonts.weights[weight];

  return {
    fontSize: typographyConfig.fontSize,
    lineHeight: typographyConfig.lineHeight,
    fontWeight,
  };
};

export const headingTypographyMixin = (variant: ThemeTypographyHeads, weight: ThemeFontWeights) => {
  const applyTypography = (props: ExecutionContext) => {
    const { fontSize, lineHeight, fontWeight } = getTypographyValues(props, 'head', variant, weight);

    return `
      font-size: ${fontSize};
      line-height: ${lineHeight};
      font-weight: ${fontWeight};
    `;
  };

  return css`
    ${applyTypography}
  `;
};

export const textTypographyMixin = (
  variant: Autocomplete<ThemeTypographyTexts>,
  weight: Autocomplete<ThemeFontWeights>,
) => {
  const applyTypography = (props: ExecutionContext) => {
    const { fontSize, lineHeight, fontWeight } = getTypographyValues(props, 'text', variant, weight);

    return `
      font-size: ${fontSize};
      line-height: ${lineHeight};
      font-weight: ${fontWeight};
    `;
  };

  return css`
    ${applyTypography}
  `;
};
