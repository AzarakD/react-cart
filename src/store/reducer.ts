import { createReducer } from '@reduxjs/toolkit';

import { loadProducts, updateCart } from './actions';
import { State } from '../types/state';

export const initialState: State = {
  cart: [],
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.cart = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(updateCart, (state, action) => {
      state.cart = action.payload;
    });
});
