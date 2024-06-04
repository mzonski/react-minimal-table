import React, { ForwardedRef, forwardRef, RefObject, useImperativeHandle, useRef } from 'react';
import TableThemeProvider from '../theme/ThemeProvider';
import type { HeaderOptions, LayoutTableProps, RequiredDataProps } from './types';
import { getTableContainer } from './min-table.utils';
import { StyledTable } from './min-table.styles';
import TableHeader from './table-header/table-header';
import TableBody from './table-body/table-body';
import TableFooter from './table-footer/table-footer';
import {
  SelectedKeysObj,
  SelectedKeysProvider,
  useSelectedKeysContext,
} from '#/minimal-table/contexts/selected-id-context';

type TableListeners<TId extends RequiredDataProps['id'] = RequiredDataProps['id']> = {
  onSelectionUpdated?: (keys: TId[]) => void;
};

export type TableProps<
  TData extends RequiredDataProps,
  TId extends RequiredDataProps['id'] = RequiredDataProps['id'],
> = {
  data: TData[];
  summary?: TData;
  headers: Record<number, HeaderOptions<TData>>;
  options: {
    tableContainerProps?: LayoutTableProps;
    selectable?: boolean;
  };
} & TableListeners<TId>;

function DummyCheckUncheckAll<TData extends RequiredDataProps>(props: Readonly<Pick<TableProps<TData>, 'data'>>) {
  const { clear, add } = useSelectedKeysContext();

  const handleCheckAll = () => {
    add(props.data.map((entry) => entry.id));
  };

  const handleDeselectAll = () => {
    clear();
  };

  return (
    <>
      <button type="button" onClick={handleCheckAll}>
        Check all
      </button>
      <br />
      <button type="button" onClick={handleDeselectAll}>
        Deselect
      </button>
    </>
  );
}

export type TableRefObj = {
  keySelection: RefObject<SelectedKeysObj>;
};

function TableComponent<TData extends RequiredDataProps>(props: TableProps<TData>, ref: ForwardedRef<TableRefObj>) {
  const keySelectionRef = useRef<SelectedKeysObj>(null);
  const [TableLayoutContainer, tableContainerElementProps] = getTableContainer(props.options.tableContainerProps);

  useImperativeHandle(
    ref,
    () => ({
      keySelection: keySelectionRef,
    }),
    [keySelectionRef],
  );

  const { data, summary, headers, options, onSelectionUpdated } = props;

  return (
    <TableThemeProvider>
      <SelectedKeysProvider ref={keySelectionRef} onSelectedKeysUpdated={onSelectionUpdated}>
        <DummyCheckUncheckAll data={data} />
        <TableLayoutContainer {...tableContainerElementProps}>
          <StyledTable>
            <TableHeader headers={headers} selectable={options.selectable} />
            <TableBody headers={headers} data={data} options={options} />
            {summary && <TableFooter headers={headers} summary={summary} selectable={options.selectable} />}
          </StyledTable>
        </TableLayoutContainer>
      </SelectedKeysProvider>
    </TableThemeProvider>
  );
}

TableComponent.defaultName = 'ZUIMinTable';

const MinTable = forwardRef(TableComponent);

export default MinTable;
