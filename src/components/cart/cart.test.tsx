import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { createAPI } from '../../services/api';
import { makeFakeCartItems } from '../../mocks/fake-cart-item';
import Cart from './cart';
import { State } from '../../types/state';

const ITEM_COUNT = 5;

const fakeCartItems = makeFakeCartItems(ITEM_COUNT);
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('Component: Cart', () => {
  it('should render correctly if cart is empty', () => {
    const store = mockStore({
      cart: [],
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  it('should render correctly if cart is not empty', () => {
    const store = mockStore({
      cart: fakeCartItems,
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.queryByText(/Your cart is empty/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId(/cart-item/i)).toBeTruthy();
  });
});
