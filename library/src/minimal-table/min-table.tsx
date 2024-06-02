import React, { ForwardedRef, forwardRef } from 'react';
import TableThemeProvider from '../theme/ThemeProvider';
import { HeaderOptions, LayoutTableProps, RequiredDataProps } from './types';
import { getTableContainer } from './min-table.utils';
import { StyledTable } from './min-table.styles';
import TableHeader from './table-header/table-header';
import TableBody from './table-body/table-body';
import TableFooter from './table-footer/table-footer';

export type TableProps<TData extends RequiredDataProps> = {
  data: TData[];
  summary?: TData;
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
          {summary && <TableFooter headers={headers} summary={summary} />}
        </StyledTable>
      </TableLayoutContainer>
    </TableThemeProvider>
  );
}

MinTable.defaultName = 'ZUIMinTable';

const ForwardedMinTable = forwardRef(MinTable);

export default ForwardedMinTable;
