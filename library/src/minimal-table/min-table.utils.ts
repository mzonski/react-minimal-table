import { ComponentType } from 'react';

import { FixedLayoutContainer, FluidLayoutContainer } from './min-table.styles';
import { FixedLayoutTableProps, FluidLayoutTableProps, LayoutTableProps } from './types';

const isLayoutFixed = (layoutProps: LayoutTableProps): layoutProps is FixedLayoutTableProps =>
  layoutProps.layoutType === 'fixed';
const isLayoutFluid = (layoutProps: LayoutTableProps): layoutProps is FluidLayoutTableProps =>
  layoutProps.layoutType === 'fluid';

export const getTableContainer = (
  props: LayoutTableProps,
): [ComponentType<LayoutTableProps>, FixedLayoutTableProps | FluidLayoutTableProps] => {
  if (isLayoutFixed(props)) {
    const { width } = props;
    const fixedProps: FixedLayoutTableProps = { layoutType: 'fixed', width };
    return [FixedLayoutContainer, fixedProps];
  }

  if (isLayoutFluid(props)) {
    const { minWidth, maxWidth } = props;
    const fluidProps: FluidLayoutTableProps = { layoutType: 'fluid', minWidth, maxWidth };
    return [FluidLayoutContainer, fluidProps];
  }

  throw new Error('Invalid layout type');
};
