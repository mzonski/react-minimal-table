import 'styled-components';
import type { Property } from 'csstype';

import { theme } from '../theme/theme';

type ValidFontSizeUnits = 'px' | 'rem';
export type ValidSizeFormat = `${number}${ValidFontSizeUnits}` | '0';

type HexColor = `#${string}`;
type RgbColor = `rgb(${number},${number},${number})` | `rgb(${number}, ${number}, ${number})`;
type RgbaColor = `rgba(${number},${number},${number},${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;
type ValidColorFormat = HexColor | RgbColor | RgbaColor;
type TypographyConfig = { fontSize: ValidSizeFormat; lineHeight: Property.FontSize };

export type ThemeColors = keyof typeof theme.colors;
export type ThemeSpacings = keyof typeof theme.spacing;
export type ThemeTypographyTypes = keyof typeof theme.components.typography;
export type ThemeTypographyHeads = keyof typeof theme.components.typography.head;
export type ThemeTypographyTexts = keyof typeof theme.components.typography.text;
export type ThemeFontWeights = keyof typeof theme.fonts.weights;
export type ThemeBorderSizes = keyof typeof theme.borders.size;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<ThemeColors, ValidColorFormat>;
    spacing: Record<ThemeSpacings, ValidSizeFormat>;
    components: {
      table: unknown;
      typography: {
        head: Record<ThemeTypographyHeads, TypographyConfig>;
        text: Record<ThemeTypographyTexts, TypographyConfig>;
      };
    };
    fonts: {
      defaultSize: ValidSizeFormat;
      defaultFamily: Property.FontFamily;
      weights: Record<ThemeFontWeights, Property.FontWeight>;
    };
    borders: {
      color: ValidColorFormat;
      size: Record<ThemeBorderSizes, ValidSizeFormat>;
      type: 'solid';
      radius: ValidSizeFormat;
    };
  }

  export interface DefaultTheme extends TableTheme {}
}
