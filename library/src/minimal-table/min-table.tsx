/* eslint-disable react/jsx-props-no-spreading */
import React, { ForwardedRef, forwardRef, Fragment, ReactNode, useState } from 'react';
import type { Property } from 'csstype';
import TableThemeProvider from '../theme/ThemeProvider';
import { FixedLayoutTableProps, FluidLayoutTableProps, LayoutTableProps } from './types';
import { getTableContainer } from './min-table.utils';
import {
  ServiceLabel,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTfoot,
  StyledTh,
  StyledThead,
  StyledTr,
  TotalRow,
} from './min-table.styles';

type TableRowProps = {
  id: number;
  service: string;
  cost: number;
  revenue: number;
  balance: number;
};

const getTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
const getTypedEntries = Object.entries as <T extends object>(obj: T) => Array<[keyof T, T[keyof T]]>;

type RequiredTableProps = {
  id: number;
};

type BaseHeaderOptions<TData extends RequiredTableProps> = {
  name: string;
  colSpan?: number;
  dataProp: keyof TData;
  colTextAlign?: Property.TextAlign;
};

type HeaderContentOptions<TData extends RequiredTableProps> = BaseHeaderOptions<TData> & {
  type: 'text';
  content: string;
};

type HeaderRendererOptions<TData extends RequiredTableProps> = BaseHeaderOptions<TData> & {
  type: 'element';
  renderHeader: (headerIndex: number) => ReactNode;
};

type HeaderOptions<TData extends RequiredTableProps> = HeaderContentOptions<TData> | HeaderRendererOptions<TData>;

const isHeaderContent = <TData extends RequiredTableProps>(
  options: HeaderOptions<TData>,
): options is HeaderContentOptions<TData> => options.type === 'text';
const isHeaderElement = <TData extends RequiredTableProps>(
  options: HeaderOptions<TData>,
): options is HeaderRendererOptions<TData> => options.type === 'element';

type TableProps<TData extends RequiredTableProps> = {
  data: TData[];
  summary: TData;
  headers: Record<number, HeaderOptions<TData>>;
  options: {
    defaultFilter?: (entry: TData) => boolean;
    defaultSorter?: (prev: TData, next: TData) => boolean;
    tableContainerProps: LayoutTableProps;
  };
};

export const fakeTableProps: TableProps<TableRowProps> = {
  headers: {
    1: { type: 'text', name: 'services', content: 'Services', colSpan: 2, colTextAlign: 'left', dataProp: 'service' },
    2: { type: 'text', name: 'const', content: 'Cost', dataProp: 'cost' },
    3: { type: 'text', name: 'revenue', content: 'Revenue', dataProp: 'revenue' },
    4: {
      type: 'element',
      name: 'balance',
      dataProp: 'balance',
      renderHeader: (headerIndex) => <div>Bylo ni ma: {headerIndex}</div>,
    },
  },
  data: [
    { id: 1, service: 'MC', cost: 750, revenue: 1000, balance: 250 },
    { id: 2, service: 'RN', cost: 750, revenue: 1100, balance: 350 },
    { id: 3, service: 'RM', cost: 0, revenue: 1000, balance: 1000 },
    { id: 4, service: 'Subsidy', cost: 0, revenue: 500, balance: 500 },
    { id: 5, service: 'Total', cost: 1500, revenue: 3700, balance: 2200 },
    { id: 6, service: 'MC', cost: 0, revenue: 1000, balance: 1000 },
  ],
  summary: { id: 1, service: 'Total', cost: 750, revenue: 2137, balance: 250 },
  options: {
    defaultSorter: (_previous, _next) => false,
    tableContainerProps: { layoutType: 'fixed', width: '400px' },
  },
};

export function MinTable<TData extends RequiredTableProps>(
  props: TableProps<TData>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    data,
    summary,
    headers,
    options: { tableContainerProps, ...filters },
  } = props;

  const [TableLayoutContainer, tableContainerElementProps] = getTableContainer(tableContainerProps);

  return (
    <TableThemeProvider>
      <TableLayoutContainer {...tableContainerElementProps}>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              {getTypedEntries(headers).map(([id, headerEntry]) => {
                const { colTextAlign, colSpan } = headerEntry;
                return (
                  <StyledTh key={id} textAlign={colTextAlign} colSpan={colSpan}>
                    {isHeaderContent(headerEntry) && headerEntry.content}
                    {isHeaderElement(headerEntry) && headerEntry.renderHeader(id)}
                  </StyledTh>
                );
              })}
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {data.map((entry) => (
              <StyledTr key={entry.id}>
                {Object.values(headers).map((header) => {
                  return (
                    <StyledTd
                      key={`${entry.id} ${String(header.dataProp)}`}
                      colSpan={header.colSpan}
                      textAlign={header.colTextAlign}
                    >
                      {entry[String(header.dataProp)]}
                    </StyledTd>
                  );
                })}
              </StyledTr>
            ))}
          </StyledTbody>
          <StyledTfoot>
            <TotalRow>
              {Object.values(headers).map((header) => {
                return (
                  <StyledTd
                    key={`footer-${String(header.dataProp)}`}
                    colSpan={header.colSpan}
                    textAlign={header.colTextAlign}
                  >
                    {summary[String(header.dataProp)]}
                  </StyledTd>
                );
              })}
            </TotalRow>
          </StyledTfoot>
        </StyledTable>
      </TableLayoutContainer>
    </TableThemeProvider>
  );
}

MinTable.defaultName = 'ZUIMinTable';

const ForwardedMinTable = forwardRef(MinTable);

export default ForwardedMinTable;
