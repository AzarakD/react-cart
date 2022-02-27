import { makeFakeCartItem, makeFakeCartItems } from '../mocks/fake-cart-item';
import { loadProducts, updateCart } from './actions';
import { initialState, reducer } from './reducer';
import { State } from '../types/state';

const ITEM_COUNT = 5;

describe('Reducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load Cart items', () => {
    const fakeCartItems = makeFakeCartItems(ITEM_COUNT);

    expect(reducer(initialState, loadProducts(fakeCartItems)))
    .toEqual({
      cart: fakeCartItems,
      isDataLoaded: true,
    });
  });

  it('should update Cart', () => {
    const fakeCartItems = makeFakeCartItems(ITEM_COUNT);
    const fakeCartItem = makeFakeCartItem();

    const state: State = {
      cart: fakeCartItems,
      isDataLoaded: true,
    };

    const update = [...fakeCartItems, fakeCartItem];

    expect(reducer(state, updateCart(update)))
    .toEqual({
      ...state,
      cart: update,
    });
  });
});
