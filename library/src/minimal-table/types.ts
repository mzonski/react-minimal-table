import type { Property } from 'csstype';
import { CSSProperties, ReactNode } from 'react';
import type { Required } from 'utility-types';

import type { PrefixPropsWithDolar } from '#/typings';

type BaseLayoutTableProps = {
  // empty for now
};

export type FixedLayoutTableProps = BaseLayoutTableProps &
  PrefixPropsWithDolar<
    {
      layoutType: 'fixed';
    } & Required<Pick<CSSProperties, 'width'>>
  >;

export type FluidLayoutTableProps = BaseLayoutTableProps &
  PrefixPropsWithDolar<
    {
      layoutType: 'fluid';
    } & Pick<CSSProperties, 'minWidth' | 'maxWidth'>
  >;

export type LayoutTableProps = FixedLayoutTableProps | FluidLayoutTableProps;

export type RequiredDataProps = {
  id: number;
};

type BaseHeaderOptions<TData extends RequiredDataProps> = {
  name: string;
  width?: Property.Width;
  colSpan?: number;
  dataProp: keyof TData;
  colTextAlign?: Property.TextAlign;
  renderCellContent?: (rowIndex: number, value: TData[keyof TData]) => ReactNode;
};

export type HeaderContentOptions<TData extends RequiredDataProps> = BaseHeaderOptions<TData> & {
  type: 'text';
  content: string;
};

export type HeaderRendererOptions<TData extends RequiredDataProps> = BaseHeaderOptions<TData> & {
  type: 'element';
  renderHeaderContent: (headerIndex: number) => ReactNode;
};

export type HeaderOptions<TData extends RequiredDataProps> = HeaderContentOptions<TData> | HeaderRendererOptions<TData>;
