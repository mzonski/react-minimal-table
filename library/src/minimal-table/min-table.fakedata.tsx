import React from 'react';
import { TableProps } from '#/minimal-table/min-table';

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