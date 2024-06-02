import { faker } from '@faker-js/faker';

function generateFakeOrder() {
  return {
    orderId: `Order #${faker.number.int({ min: 10000, max: 99999 })}`,
    status: faker.datatype.boolean(),
    amount: faker.finance.amount({ min: 69, max: 2137, dec: 2 }),
    billingDate: faker.date.future().toLocaleDateString('en-GB'), // Future date formatted as DD/MM/YYYY
    method: faker.helpers.arrayElement(['Paypal', 'Credit Card', 'Bank Transfer']),
  };
}
