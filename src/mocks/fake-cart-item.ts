import { faker } from '@faker-js/faker';
import { Product } from '../types/product';

export const makeFakeCartItem = (): Product => ({
  id: faker.datatype.number(),
  name: faker.name.title(),
  price: faker.datatype.number(),
  quantity: faker.datatype.number(),
});

export const makeFakeCartItems = (count: number): Product[] =>
  new Array(count).fill(null).map(() => makeFakeCartItem());
