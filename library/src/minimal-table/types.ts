import type { Property } from 'csstype';
import { CSSProperties, ReactNode } from 'react';
import type { Required } from 'utility-types';

type BaseLayoutTableProps = {
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

export type RequiredDataProps = {
  id: number;
  renderCell?: (headerIndex: number, rowIndex: number) => ReactNode;
};

type BaseHeaderOptions<TData extends RequiredDataProps> = {
  name: string;
  colSpan?: number;
  dataProp: keyof TData;
  colTextAlign?: Property.TextAlign;
};

export type HeaderContentOptions<TData extends RequiredDataProps> = BaseHeaderOptions<TData> & {
  type: 'text';
  content: string;
};

export type HeaderRendererOptions<TData extends RequiredDataProps> = BaseHeaderOptions<TData> & {
  type: 'element';
  renderHeader: (headerIndex: number) => ReactNode;
};

export type HeaderOptions<TData extends RequiredDataProps> = HeaderContentOptions<TData> | HeaderRendererOptions<TData>;
