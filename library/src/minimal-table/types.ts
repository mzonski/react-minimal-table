import { CSSProperties } from 'react';
import type { Required } from 'utility-types';

export type BaseLayoutTableProps = {
  // empty for now
};

export type FixedLayoutTableProps = BaseLayoutTableProps & {
  layoutType: 'fixed';
} & Required<Pick<CSSProperties, 'width'>>;

export type FluidLayoutTableProps = BaseLayoutTableProps & {
  layoutType: 'fluid';
  minWidth?: number;
  maxWidth?: number;
};

export type LayoutTableProps = FixedLayoutTableProps | FluidLayoutTableProps;

export type MinTableProps = LayoutTableProps & {
  label: string;
};
