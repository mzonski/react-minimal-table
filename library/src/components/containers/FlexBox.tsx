import { ElementType } from 'react';
import styled from 'styled-components';
import type { Property } from 'csstype';
import Box, { BoxProps } from './Box';

export type FlexProps<C extends ElementType = 'div'> = BoxProps<C> & {
  $inline?: boolean;
  $direction?: Property.FlexDirection;
  $justify?: Property.JustifyContent;
  $align?: Property.AlignItems;
  $wrap?: Property.FlexWrap;
  $grow?: Property.FlexGrow;
  $shrink?: Property.FlexShrink;
  $basis?: Property.FlexBasis;
  $alignContent?: Property.FlexBasis;
  $alignSelf?: Property.FlexBasis;
  $flex?: Property.FlexBasis;
  $flexFlow?: Property.FlexBasis;
  $gap?: Property.FlexBasis;
  $order?: Property.FlexBasis;
};

export const FlexBox = styled(Box)<FlexProps>`
  display: ${(props) => (props.$inline ? 'inline-flex' : 'flex')};
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$justify};
  align-items: ${(props) => props.$align};
  flex-wrap: ${(props) => props.$wrap};
  flex-grow: ${(props) => props.$grow};
  flex-shrink: ${(props) => props.$shrink};
  flex-basis: ${(props) => props.$basis};
  align-content: ${(props) => props.$alignContent};
  order: ${(props) => props.$order};
  flex: ${(props) => props.$flex};
  align-self: ${(props) => props.$alignSelf};
  flex-flow: ${(props) => props.$flexFlow};
  gap: ${(props) => props.$gap};
`;

export const Stack = styled(FlexBox)<Pick<FlexProps, '$inline' | '$direction' | '$gap'> & { $center?: boolean }>`
  display: ${(props) => (props.$inline ? 'inline-flex' : 'flex')};
  flex-direction: ${(props) => props.$direction ?? 'column'};
  gap: ${(props) => props.$gap ?? '1rem'};
  justify-content: ${(props) => (props.$center ? 'center' : 'unset')};
  align-items: ${(props) => (props.$center ? 'center' : 'unset')};
`;

export default FlexBox;
