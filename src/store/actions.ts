import { createAction } from '@reduxjs/toolkit';

import { ActionType } from '../types/actions';
import { Product } from '../types/product';

export const loadProducts = createAction(
  ActionType.LoadProducts,
  (cart: Product[]) => ({payload: cart}),
);
