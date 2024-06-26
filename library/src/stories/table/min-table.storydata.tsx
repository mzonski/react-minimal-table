import React from 'react';
import { faker } from '@faker-js/faker';
import { ValuesType } from 'utility-types';
import { TableProps } from '#/minimal-table/min-table';
import { convertListToRecord } from '#/utility/converters';
import { HeaderOptions, type RequiredDataProps } from '#/minimal-table/types';
import Badge from '#/components/Badge';

const paymentStatuses = {
  Pending: 'pending',
  Completed: 'completed',
  Failed: 'failed',
} as const;

const paymentMethod = {
  Paypal: 0,
  CreditCard: 1,
  BankTransfer: 2,
} as const;

type PaymentStatus = ValuesType<typeof paymentStatuses>;
type PaymentMethod = ValuesType<typeof paymentMethod>;

function getPaymentMethodTypeMessage(method: PaymentMethod) {
  switch (method) {
    case paymentMethod.Paypal: {
      return 'PayPal';
    }
    case paymentMethod.CreditCard: {
      return 'Credit card';
    }
    case paymentMethod.BankTransfer: {
      return 'Bank transfer';
    }
    default:
      throw new Error(`Message not defined for payment method ${paymentMethod[method]}`);
  }
}

interface FakeOrder extends RequiredDataProps {
  id: number;
  orderId: string;
  status: PaymentStatus;
  amount: string;
  billingDate: string;
  method: PaymentMethod;
}

let currentId = 0;
function generateFakeOrder(): FakeOrder {
  const status = faker.helpers.arrayElement(Object.values(paymentStatuses));
  const method = faker.helpers.arrayElement(Object.values(paymentMethod));

  const nextId = currentId;
  currentId += 1;

  return {
    id: nextId,
    orderId: `Order #${nextId}`,
    status,
    amount: faker.finance.amount({ min: 10, max: 1000, dec: 0 }),
    billingDate: faker.date.future().toLocaleDateString('en-GB'),
    method,
  };
}

const generateFakeOrders = (length: number) => {
  currentId = 1;
  return Array.from({ length }, generateFakeOrder);
};

const fakeOrdersList = generateFakeOrders(2000);
const fakeOrdersRecord = convertListToRecord((en) => en.id, fakeOrdersList);

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  switch (status) {
    case 'failed':
      return (
        <Badge $bgColor="error" $color="white" $dense>
          Failed
        </Badge>
      );
    case 'completed':
      return (
        <Badge $bgColor="success" $color="white" $dense>
          Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge $bgColor="info" $color="white" $dense>
          Pending
        </Badge>
      );
    default:
      throw new Error('Payment status badge is not supported');
  }
}

/*
type BaseHeaderOptions<TData extends RequiredDataProps> = {

};

export type HeaderContentOptions<TData extends RequiredDataProps> = BaseHeaderOptions<TData> & {
  type: 'text';
  content: string;
  name: string;
  colSpan?: number;
  dataProp: keyof TData;
};

export type HeaderRendererOptions<TData extends RequiredDataProps> = BaseHeaderOptions<TData> & {
  type: 'element';
  renderHeaderContent: (headerIndex: number) => ReactNode;
  name: string;
  colSpan?: number;
  dataProp: keyof TData;
};
 */

export const fakeOrdersTableProps = {
  headers: {
    1: { type: 'text', name: 'order', content: 'Order', width: '35%', colTextAlign: 'left', dataProp: 'orderId' },
    2: {
      type: 'text',
      name: 'status',
      content: 'Status',
      colTextAlign: 'center',
      dataProp: 'status',
      width: '25%',
      renderCellContent: (idx) => {
        const { status } = fakeOrdersList[idx];
        return PaymentStatusBadge({ status });
      },
    },
    3: {
      type: 'text',
      name: 'services',
      content: 'Billing date',
      dataProp: 'billingDate',
      width: '20%',
    },
    4: {
      type: 'text',
      name: 'amount',
      content: 'Amount',
      dataProp: 'amount',
      width: '20%',
      renderCellContent: (idx) => {
        const { amount } = fakeOrdersList[idx];
        return `$${amount}`;
      },
    },
    5: {
      type: 'text',
      name: 'method',
      content: 'Payment method',
      dataProp: 'method',
      width: '20%',
      colTextAlign: 'right',
      renderCellContent: (idx) => getPaymentMethodTypeMessage(fakeOrdersList[idx].method),
    },
  } as Record<number, HeaderOptions<FakeOrder>>,
  data: fakeOrdersList,
  options: {
    tableContainerProps: { $layoutType: 'fixed', $width: '800px' },
    selectable: true,
  },
} as TableProps<FakeOrder>;

export type DummyDataProps = RequiredDataProps & {
  service: string;
  cost: number;
  revenue: number;
  balance: number;
};

export const fakeTableProps = {
  headers: {
    1: { type: 'text', name: 'services', content: 'Services', colSpan: 2, colTextAlign: 'left', dataProp: 'service' },
    2: { type: 'text', name: 'const', content: 'Cost', dataProp: 'cost' },
    3: { type: 'text', name: 'revenue', content: 'Revenue', dataProp: 'revenue' },
    4: {
      type: 'element',
      name: 'balance',
      dataProp: 'balance',
      renderHeaderContent: (headerIndex) => <div>Test: {headerIndex}</div>,
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
    tableContainerProps: { $layoutType: 'fixed', $width: '400px' },
    selectable: true,
  },
} as TableProps<DummyDataProps>;
