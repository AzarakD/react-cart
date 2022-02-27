import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { makeFakeCartItem } from '../../../mocks/fake-cart-item';
import { createAPI } from '../../../services/api';
import CartItem from './cart-item';
import { State } from '../../../types/state';
import { Product } from '../../../types/product';

const fakeCartItem = makeFakeCartItem();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore();

const cartItem = (
  <Provider store={store}>
    <CartItem item={fakeCartItem} />
  </Provider>
);

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(cartItem);

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
    expect(screen.getByText(`${fakeCartItem.name}`)).toBeInTheDocument();
  });

  it('should increase item quantity when plus clicked', () => {
    const item: Product = {
      ...fakeCartItem,
      quantity: 1,
    }

    render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    expect(screen.getByRole<HTMLInputElement>('spinbutton').value).toEqual("1");
    userEvent.click(screen.getByText("+"));
    expect(screen.getByRole<HTMLInputElement>('spinbutton').value).toEqual("2");
  });

  it('should decrease item quantity when plus clicked', () => {
    const item: Product = {
      ...fakeCartItem,
      quantity: 2,
    }

    render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    expect(screen.getByRole<HTMLInputElement>('spinbutton').value).toEqual('2');
    userEvent.click(screen.getByText("-"));
    expect(screen.getByRole<HTMLInputElement>('spinbutton').value).toEqual('1');
  });

  it('should dispatch deleteProduct action when close clicked', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(cartItem);

    userEvent.click(screen.getByLabelText('Delete'));
    expect(dispatch).toBeCalled();
  });
});
