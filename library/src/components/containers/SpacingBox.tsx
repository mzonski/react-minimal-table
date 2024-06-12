import { ElementType } from 'react';
import styled, { css, ExecutionContext } from 'styled-components';
import Box, { BoxProps } from './Box';
import type { PrefixPropsWithDolar, ThemeSpacings } from '#/typings';
import { mapSpacingCornersToCssProperties } from '#/theme';
import type { Only, RequireAtLeastOne } from '#/utility/objects';

type PaddingTopBottomProps = RequireAtLeastOne<
  PrefixPropsWithDolar<{
    pt: ThemeSpacings; // padding-top
    pb: ThemeSpacings; // padding-bottom
  }>
>;

type PaddingLeftRightProps = RequireAtLeastOne<
  PrefixPropsWithDolar<{
    pl: ThemeSpacings; // padding-left
    pr: ThemeSpacings; // padding-right
  }>
>;

type PaddingHorizontalType = PrefixPropsWithDolar<{
  ph: ThemeSpacings; // padding-left + padding-right
}>;

type PaddingVerticalType = PrefixPropsWithDolar<{
  pv: ThemeSpacings; // padding-top + padding-bottom
}>;

type PaddingAroundProps = Only<
  PaddingTopBottomProps & PaddingLeftRightProps,
  PaddingVerticalType & PaddingHorizontalType
>;
type VerticalPaddingProps = PaddingVerticalType & PaddingLeftRightProps;
type HorizontalPaddingProps = PaddingHorizontalType & PaddingTopBottomProps;
type PaddingProps = PaddingAroundProps | VerticalPaddingProps | HorizontalPaddingProps;

type MarginTopBottomProps = RequireAtLeastOne<
  PrefixPropsWithDolar<{
    mt: ThemeSpacings; // margin-top
    mb: ThemeSpacings; // margin-bottom
  }>
>;

type MarginLeftRightProps = RequireAtLeastOne<
  PrefixPropsWithDolar<{
    ml: ThemeSpacings; // margin-left
    mr: ThemeSpacings; // margin-right
  }>
>;

type MarginHorizontalType = PrefixPropsWithDolar<{
  mh: ThemeSpacings; // margin-left + margin-right
}>;

type MarginVerticalType = PrefixPropsWithDolar<{
  mv: ThemeSpacings; // margin-top + margin-bottom
}>;

type MarginAroundProps = Only<MarginTopBottomProps & MarginLeftRightProps, MarginVerticalType & MarginHorizontalType>;
type VerticalMarginProps = MarginVerticalType & MarginLeftRightProps;
type HorizontalMarginProps = MarginHorizontalType & MarginTopBottomProps;
type MarginProps = MarginAroundProps | VerticalMarginProps | HorizontalMarginProps;

const isMarginAroundProps = (props: object): props is MarginAroundProps => {
  if ('$mh' in props || '$mv' in props) {
    return false;
  }

  return '$mt' in props || '$mb' in props || '$ml' in props || '$mr' in props;
};

const isVerticalMarginProps = (props: object): props is VerticalMarginProps => {
  if ('$mt' in props || '$mb' in props) {
    return false;
  }

  return '$mv' in props;
};

const isHorizontalMarginProps = (props: object): props is HorizontalMarginProps => {
  if ('$ml' in props || '$mr' in props) {
    return false;
  }

  return '$mh' in props;
};

const isPaddingAroundProps = (props: object): props is PaddingAroundProps => {
  if ('$ph' in props || '$pv' in props) {
    return false;
  }

  return '$pt' in props || '$pb' in props || '$pl' in props || '$pr' in props;
};

const isVerticalPaddingProps = (props: object): props is VerticalPaddingProps => {
  if ('$pt' in props || '$pb' in props) {
    return false;
  }

  return '$pv' in props;
};

const isHorizontalPaddingProps = (props: object): props is HorizontalPaddingProps => {
  if ('$pl' in props || '$pr' in props) {
    return false;
  }

  return '$ph' in props;
};

export const spacingMixin = (props: MarginProps) => {
  const spacingValue = (styledCtx: ExecutionContext, themeSpacing: ThemeSpacings) =>
    styledCtx.theme.spacing[themeSpacing] ?? 0;

  const applySpacing = (styledCtx: ExecutionContext) => {
    const cssFragments: string[] = [];
    const getSpacing = (themeSpacing: ThemeSpacings) => spacingValue(styledCtx, themeSpacing);

    if (isMarginAroundProps(props)) {
      if (props.$mt) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mt), ['top']));
      }
      if (props.$mb) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mb), ['bottom']));
      }
      if (props.$ml) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$ml), ['left']));
      }
      if (props.$mr) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mr), ['right']));
      }
    }

    if (isVerticalMarginProps(props)) {
      if (props.$mv) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mv), ['top', 'bottom']));
      }
      if (props.$ml) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$ml), ['left']));
      }
      if (props.$mr) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mr), ['right']));
      }
    }

    if (isHorizontalMarginProps(props)) {
      if (props.$mh) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mh), ['left', 'right']));
      }
      if (props.$mt) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mt), ['top']));
      }
      if (props.$mb) {
        cssFragments.push(mapSpacingCornersToCssProperties('margin', getSpacing(props.$mb), ['bottom']));
      }
    }

    if (isPaddingAroundProps(props)) {
      if (props.$pt) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pt), ['top']));
      }
      if (props.$pb) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pb), ['bottom']));
      }
      if (props.$pl) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pl), ['left']));
      }
      if (props.$pr) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pr), ['right']));
      }
    }

    if (isVerticalPaddingProps(props)) {
      if (props.$pv) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pv), ['top', 'bottom']));
      }
      if (props.$pl) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pl), ['left']));
      }
      if (props.$pr) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pr), ['right']));
      }
    }

    if (isHorizontalPaddingProps(props)) {
      if (props.$ph) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$ph), ['left', 'right']));
      }
      if (props.$pt) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pt), ['top']));
      }
      if (props.$pb) {
        cssFragments.push(mapSpacingCornersToCssProperties('padding', getSpacing(props.$pb), ['bottom']));
      }
    }

    return cssFragments.join(' ');
  };

  return css`
    ${applySpacing}
  `;
};

export type SpacingBoxProps<C extends ElementType = 'div'> = BoxProps<C> & MarginProps & PaddingProps;

const SpacingBox = styled(Box)<SpacingBoxProps>`
  ${spacingMixin}
`;

export default SpacingBox;
