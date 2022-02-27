import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { makeFakeCartItem, makeFakeCartItems } from '../mocks/fake-cart-item';
import { deleteProduct, fetchProducts, patchProduct, postProduct } from './api-actions';
import { loadProducts, updateCart } from './actions';

const ITEM_COUNT = 5;
const fakeCartItems = makeFakeCartItems(ITEM_COUNT);
const fakeCartItem = makeFakeCartItem();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadCart when Get /products', async () => {
    mockAPI
      .onGet(APIRoute.Products)
      .reply(200, fakeCartItems);

    const store = mockStore();

    await store.dispatch(fetchProducts());

    expect(store.getActions()).toEqual([
      loadProducts(fakeCartItems.reverse()),
    ]);
  });

  it('should dispatch updateCart when Post /products', async () => {
    mockAPI
      .onPost(APIRoute.Products)
      .reply(200, fakeCartItem);

    const store = mockStore({
      cart: fakeCartItems,
    });

    await store.dispatch(postProduct(fakeCartItem));

    expect(store.getActions()).toEqual([
      updateCart([fakeCartItem, ...fakeCartItems]),
    ]);
  });

  it('should dispatch updateCart when Delete /products/:id', async () => {
    mockAPI
      .onDelete(`${APIRoute.Products}/${fakeCartItems[0].id}`)
      .reply(200);

    const store = mockStore({
      cart: fakeCartItems,
    });

    await store.dispatch(deleteProduct(fakeCartItems[0].id));

    const update = fakeCartItems.filter((item) => item.id !== fakeCartItems[0].id);

    expect(store.getActions()).toEqual([
      updateCart(update),
    ]);
  });

  it('should dispatch updateCart when Patch /products/:id', async () => {
    const UPDATED_QUANTITY = 10;
  
    mockAPI
      .onPatch(`${APIRoute.Products}/${fakeCartItems[0].id}`)
      .reply(200, {
        ...fakeCartItems[0],
        quantity: UPDATED_QUANTITY,
      });

    const store = mockStore({
      cart: fakeCartItems,
    });

    await store.dispatch(patchProduct(fakeCartItems[0].id, UPDATED_QUANTITY));

    fakeCartItems[0].quantity = UPDATED_QUANTITY;

    expect(store.getActions()).toEqual([
      updateCart(fakeCartItems),
    ]);
  });
});
