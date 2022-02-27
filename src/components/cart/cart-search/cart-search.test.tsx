import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import { makeFakeCartItems } from '../../../mocks/fake-cart-item';
import { createAPI } from '../../../services/api';
import CartSearch from './cart-search';
import { State } from '../../../types/state';

const ITEM_COUNT = 5;

const fakeCartItems = makeFakeCartItems(ITEM_COUNT);
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  cart: fakeCartItems,
});

const fakeCartSearch = (
  <Provider store={store}>
    <CartSearch />
  </Provider>
);

describe('Component: CartSearch', () => {
  it('should render correctly', () => {
    render(fakeCartSearch);

    expect(screen.getByText(/Add/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('page-content__header-input');
  });

  it('should dispatch postProduct action when submit', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(fakeCartSearch);

    const input = screen.getByPlaceholderText('What to add?');

    userEvent.type(input, 'Lorem ipsum');
    fireEvent.submit(input);

    expect(dispatch).toBeCalled();
  });

  it('should dispatch patchProduct action when submit and there is the same item', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(fakeCartSearch);

    const input = screen.getByPlaceholderText('What to add?');

    userEvent.type(input, `${fakeCartItems[0].name}`);
    fireEvent.submit(input);

    expect(dispatch).toBeCalled();
  });
});
