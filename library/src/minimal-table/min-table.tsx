import React, { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import TableThemeProvider from '../theme/ThemeProvider';
import type { HeaderOptions, LayoutTableProps, RequiredDataProps } from './types';
import { getTableContainer } from './min-table.utils';
import { StyledTable } from './min-table.styles';
import TableHeader from './table-header/table-header';
import TableBody from './table-body/table-body';
import TableFooter from './table-footer/table-footer';
import {
  SelectedKeysContextType,
  SelectedKeysProvider,
  useSelectedKeysContext,
} from '#/minimal-table/contexts/selected-id-context';
import { convertMapToRecord } from '#/utility/converters';

export type TableProps<TData extends RequiredDataProps> = {
  data: TData[];
  summary?: TData;
  headers: Record<number, HeaderOptions<TData>>;
  options: {
    defaultFilter?: (entry: TData) => boolean;
    defaultSorter?: (prev: TData, next: TData) => boolean;
    tableContainerProps: LayoutTableProps;
    selectable?: {
      keySelector: (entry: TData) => TData[keyof TData];
    };
  };
};

// type SelectedIdentityKey = ReturnType<StripUndefined<typeof props.options.selectable>['keySelector']>;

type TableRefObj = SelectedKeysContextType<RequiredDataProps['id']> & {
  selectedIds: Record<RequiredDataProps['id'], boolean>;
  selectedKeysControl: React.RefObject<SelectedKeysContextType<RequiredDataProps['id']>> | null;
};

function DummyCheckUncheckAll<TData extends RequiredDataProps>(props: Pick<TableProps<TData>, 'data'>) {
  const { removeKey, addKey } = useSelectedKeysContext();

  const handleCheckAll = () => {
    props.data.forEach((entry) => addKey(entry.id));
  };

  const handleDeselectAll = () => {
    props.data.forEach((entry) => removeKey(entry.id));
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

function TableComponent<TData extends RequiredDataProps>(props: TableProps<TData>, ref: ForwardedRef<TableRefObj>) {
  const selectedKeysRef = useRef<SelectedKeysContextType<RequiredDataProps['id']>>(null);
  const [TableLayoutContainer, tableContainerElementProps] = getTableContainer(props.options.tableContainerProps);
  const [selectedIds, setSelectedIds] = useState<Record<RequiredDataProps['id'], boolean>>();

  useImperativeHandle(
    ref,
    () => {
      return {
        selectedIds,
        selectedKeysControl: selectedKeysRef,
      } as TableRefObj;
    },
    [selectedIds],
  );

  const { data, summary, headers } = props;

  const handleUpdateSelectedKey = useCallback(
    (keys: RequiredDataProps['id'][]) => {
      console.log('New keys selected', keys);
      const map = new Map<RequiredDataProps['id'], boolean>();
      data.forEach((en) => map.set(en.id, keys.includes(en.id)));
      setSelectedIds(convertMapToRecord(map));
    },
    [data],
  );

  return (
    <TableThemeProvider>
      <SelectedKeysProvider ref={selectedKeysRef} onSelectedKeysUpdated={handleUpdateSelectedKey}>
        <DummyCheckUncheckAll data={data} />
        <TableLayoutContainer {...tableContainerElementProps}>
          <StyledTable>
            <TableHeader headers={headers} />
            <TableBody headers={headers} data={data} options={props.options} />
            {summary && <TableFooter headers={headers} summary={summary} />}
          </StyledTable>
        </TableLayoutContainer>
      </SelectedKeysProvider>
    </TableThemeProvider>
  );
}

TableComponent.defaultName = 'ZUIMinTable';

const MinTable = forwardRef(TableComponent);

export default MinTable;
