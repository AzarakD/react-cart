import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { createAPI } from '../../services/api';
import { makeFakeCartItems } from '../../mocks/fake-cart-item';
import CartPage from './cart-page';
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

describe('Page: Cart Page', () => {
  it('should render correctly if data is loading', () => {
    const store = mockStore({
      cart: [],
      isDataLoaded: false,
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
  });

  it('should render correctly if data is loaded', () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    const store = mockStore({
      cart: fakeCartItems,
      isDataLoaded: true,
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
  });
});
