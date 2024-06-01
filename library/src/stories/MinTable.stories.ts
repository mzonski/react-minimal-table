import { fakeTableProps, MinTable } from '../minimal-table/min-table';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'MinTable',
  component: MinTable,
  parameters: {
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    layoutType: { table: { disable: true } },
    data: { table: { disable: true } },
    headers: { table: { disable: true } },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
