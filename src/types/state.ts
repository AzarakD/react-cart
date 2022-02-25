import { Product } from './product';

export type State = {
  cart: Product[],
  isDataLoaded: boolean,
};
