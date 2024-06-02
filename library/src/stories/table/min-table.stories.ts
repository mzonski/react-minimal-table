import { MinTable, TableProps } from '#/minimal-table/min-table';

import { DummyDataProps, fakeOrdersTableProps, fakeTableProps } from './min-table.storydata';

export default {
  title: 'Table',
  component: MinTable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    layoutType: { table: { disable: true } },
  },
};

export const Fixed = {
  args: fakeTableProps,
};
export const Fluid = {
  args: {
    ...fakeTableProps,
    options: {
      ...fakeTableProps.options,
      tableContainerProps: {
        $layoutType: 'fluid',
        $minWidth: 400,
      },
    },
  } as TableProps<DummyDataProps>,
};

export const Renderers = {
  args: fakeOrdersTableProps,
};
