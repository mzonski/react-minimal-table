import React, { PropsWithChildren } from 'react';

import type { ThemeFontWeights, ThemeTypographyHeads, ThemeTypographyTexts } from '../../typings';

// TODO: Do I need to add React.HTMLAttributes<HTMLElement>?
export type BaseTypographyProps = PropsWithChildren & {
  as?: React.ElementType;
  weight: ThemeFontWeights;
};

export type HeadingProps = BaseTypographyProps & {
  type: 'head';
  variant: ThemeTypographyHeads;
};

export type TextProps = BaseTypographyProps & {
  type: 'text';
  variant: ThemeTypographyTexts;
};

export type TypographyProps = HeadingProps | TextProps;
