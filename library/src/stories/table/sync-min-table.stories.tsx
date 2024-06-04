import { useRef } from 'react';
import { random } from 'lodash';
import { fakeOrdersTableProps, fakeTableProps } from './min-table.storydata';
import MinTable, { TableRefObj } from '#/minimal-table/min-table';
import { Stack } from '#/components/containers/FlexBox';

export default {
  title: 'Table',
  parameters: {
    layout: 'centered',
  },
};

export const WithSync = () => {
  const tableRef = useRef<TableRefObj>(null);

  const selectionChangeListener = (keys: number[]) => {
    console.log('SELECTION CHANGED', keys);
  };

  const pickRandom = () => {
    if (!tableRef.current) return;

    const dataLen = fakeOrdersTableProps.data.length;

    console.log(`CurrentData on random, len ${dataLen}`, tableRef.current?.keySelection.current?.data);

    const id = random(dataLen);
    console.log('Selecting random', id);

    if (dataLen) {
      tableRef.current.keySelection.current?.controls.toggleKey(id);
    }
  };

  return (
    <Stack $center>
      <button onClick={pickRandom}>toggle random</button>
      <MinTable {...fakeOrdersTableProps} ref={tableRef} onSelectionUpdated={selectionChangeListener} />
    </Stack>
  );
};

WithSync.args = {};
