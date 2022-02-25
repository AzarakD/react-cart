import { createReducer } from '@reduxjs/toolkit';

import { loadProducts } from './actions';
import { State } from '../types/state';

const initialState: State = {
  cart: [],
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.cart = action.payload;
      state.isDataLoaded = true;
    });
});
