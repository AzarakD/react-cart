import { loadProducts, updateCart } from './actions';
import { ThunkActionResult } from '../types/actions';
import { Product, ProductToAdd } from '../types/product';

export const fetchProducts = (): ThunkActionResult =>
  async (dispatch, _getStore, api) => {
    const { data } = await api.get<Product[]>('/products');
    dispatch(loadProducts(data.reverse()));
  };

export const postProduct = (product: ProductToAdd): ThunkActionResult =>
  async (dispatch, getStore, api) => {
    const { data } = await api.post<Product>('/products', product);

    const update = [
      data,
      ...getStore().cart,
    ];
    dispatch(updateCart(update));
  };

export const deleteProduct = (productId: number): ThunkActionResult =>
  async (dispatch, getStore, api) => {
    await api.delete(`/products/${productId}`);

    const update = getStore().cart.filter((item) => item.id !== productId);
    dispatch(updateCart(update));
  };
