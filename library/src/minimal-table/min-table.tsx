import React, { ForwardedRef, forwardRef } from 'react';
import TableThemeProvider from '../theme/ThemeProvider';
import { HeaderOptions, LayoutTableProps, RequiredDataProps } from './types';
import { getTableContainer } from './min-table.utils';
import { StyledTable } from './min-table.styles';
import TableHeader from './table-header/table-header';
import TableBody from './table-body/table-body';
import TableFooter from './table-footer/table-footer';

type DummyDataProps = {
  id: number;
  service: string;
  cost: number;
  revenue: number;
  balance: number;
};

export const fakeTableProps: TableProps<DummyDataProps> = {
  headers: {
    1: { type: 'text', name: 'services', content: 'Services', colSpan: 2, colTextAlign: 'left', dataProp: 'service' },
    2: { type: 'text', name: 'const', content: 'Cost', dataProp: 'cost' },
    3: { type: 'text', name: 'revenue', content: 'Revenue', dataProp: 'revenue' },
    4: {
      type: 'element',
      name: 'balance',
      dataProp: 'balance',
      renderHeader: (headerIndex) => <div>Test: {headerIndex}</div>,
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
    defaultSorter: (prev, next) => prev.id > next.id,
    tableContainerProps: { layoutType: 'fixed', width: '400px' },
  },
};

export type TableProps<TData extends RequiredDataProps> = {
  data: TData[];
  summary: TData;
  headers: Record<number, HeaderOptions<TData>>;
  options: {
    defaultFilter?: (entry: TData) => boolean;
    defaultSorter?: (prev: TData, next: TData) => boolean;
    tableContainerProps: LayoutTableProps;
  };
};

export function MinTable<TData extends RequiredDataProps>(
  props: TableProps<TData>,
  _ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    data,
    summary,
    headers,
    options: { tableContainerProps },
  } = props;

  const [TableLayoutContainer, tableContainerElementProps] = getTableContainer(tableContainerProps);

  return (
    <TableThemeProvider>
      <TableLayoutContainer {...tableContainerElementProps}>
        <StyledTable>
          <TableHeader headers={headers} />
          <TableBody headers={headers} data={data} />
          <TableFooter headers={headers} summary={summary} />
        </StyledTable>
      </TableLayoutContainer>
    </TableThemeProvider>
  );
}

MinTable.defaultName = 'ZUIMinTable';

const ForwardedMinTable = forwardRef(MinTable);

export default ForwardedMinTable;
