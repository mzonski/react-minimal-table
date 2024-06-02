import { ComponentType } from 'react';

import { FixedLayoutContainer, FluidLayoutContainer } from './min-table.styles';
import {
  FixedLayoutTableProps,
  FluidLayoutTableProps,
  HeaderContentOptions,
  HeaderOptions,
  HeaderRendererOptions,
  LayoutTableProps,
  RequiredDataProps,
} from './types';

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

// TODO: too generic, move it out
export const getTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
export const getTypedEntries = Object.entries as <T extends object>(obj: T) => Array<[keyof T, T[keyof T]]>;
// TOOD: END

export const isHeaderContent = <TData extends RequiredDataProps>(
  options: HeaderOptions<TData>,
): options is HeaderContentOptions<TData> => options.type === 'text';
export const isHeaderElement = <TData extends RequiredDataProps>(
  options: HeaderOptions<TData>,
): options is HeaderRendererOptions<TData> => options.type === 'element';
