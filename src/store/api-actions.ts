import { loadProducts } from './actions';
import { ThunkActionResult } from '../types/actions';
import { Product } from '../types/product';

export const fetchProducts = (): ThunkActionResult =>
  async (dispatch, _getStore, api) => {
    const { data } = await api.get<Product[]>('/products');
    dispatch(loadProducts(data));
  };
