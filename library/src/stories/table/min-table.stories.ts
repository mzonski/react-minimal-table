import { MinTable } from '#/minimal-table/min-table';
import { fakeTableProps } from '#/minimal-table/min-table.fakedata';

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
        layoutType: 'fluid',
        minWidth: 400,
      },
    },
  },
};
