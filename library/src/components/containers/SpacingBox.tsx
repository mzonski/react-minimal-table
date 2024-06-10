/* eslint-disable import/no-extraneous-dependencies */
import { ElementType } from 'react';
import styled, { css, ExecutionContext } from 'styled-components';

import Box, { BoxProps } from './Box';
import type { PrefixPropsWithDolar, ThemeSpacings } from '#/typings';
import { mapSpacingCornetToCssProperties } from '#/theme';
import type { Only, RequireAtLeastOne } from '#/utility/objects';

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

type SpacingProps = MarginProps;

export const isMarginAroundProps = (props: MarginProps): props is MarginAroundProps => {
  if ('$mh' in props || '$mv' in props) {
    return false;
  }

  return '$mt' in props || '$mb' in props || '$ml' in props || '$mr' in props;
};

export const isVerticalMarginProps = (props: object): props is VerticalMarginProps => {
  if ('$mt' in props || '$mb' in props) {
    return false;
  }

  return '$mv' in props;
};

export const isHorizontalMarginProps = (props: object): props is HorizontalMarginProps => {
  if ('$ml' in props || '$mr' in props) {
    return false;
  }

  return '$mh' in props;
};

export type SpacingBoxProps<C extends ElementType = 'div'> = BoxProps<C> & MarginProps;

export const marginMixin2 = (props: MarginProps) => {
  const spacingValue = (styledCtx: ExecutionContext, themeSpacing: ThemeSpacings) =>
    styledCtx.theme.spacing[themeSpacing];

  const applySpacing = (styledCtx: ExecutionContext) => {
    const cssFragments: string[] = [];
    const getSpacing = (themeSpacing: ThemeSpacings) => spacingValue(styledCtx, themeSpacing);

    if (isMarginAroundProps(props)) {
      // TODO: switch object keys?
      if (props.$mt) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mt), ['top']));
      }
      if (props.$mb) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mb), ['bottom']));
      }
      if (props.$ml) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$ml), ['left']));
      }
      if (props.$mr) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mr), ['right']));
      }
    }

    if (isVerticalMarginProps(props)) {
      if (props.$mv) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mv), ['top', 'bottom']));
      }
      if (props.$ml) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$ml), ['left']));
      }
      if (props.$mr) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mr), ['right']));
      }
    }

    if (isHorizontalMarginProps(props)) {
      if (props.$mh) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mh), ['left', 'right']));
      }
      if (props.$mt) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mt), ['top']));
      }
      if (props.$mb) {
        cssFragments.push(mapSpacingCornetToCssProperties('margin', getSpacing(props.$mb), ['bottom']));
      }
    }

    console.log('=>(SpacingBox.tsx:114) cssFragments', cssFragments);
    return cssFragments.join(' ');
  };

  return css`
    ${applySpacing}
  `;
};
//
// const getMarginStyle = (props: MarginProps) => {
//   console.log('=>(SpacingBox.tsx:67) props', props);
//   const cssFragments: string[] = [];
//
//   if (isMarginAroundProps(props)) {
//     // TODO: switch object keys?
//     if (props.$mt) {
//       cssFragments.push(mapSpacingCornetToCssProperties('margin', props.$mt, ['top']));
//     }
//     if (props.$mb) {
//       cssFragments.push(spacingMixin('margin', props.$mb, ['bottom']));
//     }
//     if (props.$ml) {
//       cssFragments.push(spacingMixin('margin', props.$ml, ['left']));
//     }
//     if (props.$mr) {
//       cssFragments.push(spacingMixin('margin', props.$mr, ['right']));
//     }
//   }
//
//   if (isVerticalMarginProps(props)) {
//     if (props.$mv) {
//       cssFragments.push(spacingMixin('margin', props.$mv, ['top', 'bottom']));
//     }
//     if (props.$ml) {
//       cssFragments.push(spacingMixin('margin', props.$ml, ['left']));
//     }
//     if (props.$mr) {
//       cssFragments.push(spacingMixin('margin', props.$mr, ['right']));
//     }
//   }
//
//   if (isHorizontalMarginProps(props)) {
//     if (props.$mh) {
//       cssFragments.push(spacingMixin('margin', props.$mh, ['left', 'right']));
//     }
//     if (props.$mt) {
//       cssFragments.push(spacingMixin('margin', props.$mt, ['top']));
//     }
//     if (props.$mb) {
//       cssFragments.push(spacingMixin('margin', props.$mb, ['bottom']));
//     }
//   }
//
//   return css`
//     ${cssFragments}
//   `;
// };

const SpacingBox = styled(Box)<SpacingBoxProps>`
  ${marginMixin2}
`;

export default SpacingBox;
