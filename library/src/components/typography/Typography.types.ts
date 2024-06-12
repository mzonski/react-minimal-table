import { ElementType, PropsWithChildren } from 'react';

import type { PrefixPropsWithDolar, ThemeFontWeights, ThemeTypographyHeads, ThemeTypographyTexts } from '#/typings';

// TODO: Do I need to add React.HTMLAttributes<HTMLElement>?
export type BaseTypographyProps = PropsWithChildren &
  PrefixPropsWithDolar<{
    weight?: ThemeFontWeights;
  }> & { as?: ElementType };

export type HeadingProps = BaseTypographyProps &
  PrefixPropsWithDolar<{
    type: 'head';
    variant: ThemeTypographyHeads;
  }>;

export type TextProps = BaseTypographyProps &
  PrefixPropsWithDolar<{
    type: 'text';
    variant: ThemeTypographyTexts;
  }>;

export type TypographyProps = HeadingProps | TextProps;
