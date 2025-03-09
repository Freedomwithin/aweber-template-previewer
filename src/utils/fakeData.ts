import { faker } from '@faker-js/faker';
import { Customer } from '../types';

export const generateFakeCustomers = (count: number): Customer[] => {
  const customers: Customer[] = [];
  for (let i = 0; i < count; i++) {
    customers.push({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }
  return customers;
};
