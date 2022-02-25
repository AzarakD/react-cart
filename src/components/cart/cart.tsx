import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../store/api-actions';

import { getCart } from '../../store/selectors';
import CartItem from './cart-item/cart-item'

export default function Cart(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const onAddEvent = () => {
    dispatch(postProduct({
      name: userInput,
      price: Math.ceil(Math.random()*100),
      quantity: 1,
    }));
  };

  return (
    <div className="container">
      <div className="page-content__header">
        <h1 className="page-content__title">Cart</h1>

        <div className="page-content__header-search">
          <input
            onChange={(evt) => setUserInput(evt.currentTarget.value)}
            value={userInput}
            className="page-content__header-input"
            type="text"
          />
          <button
            onClick={onAddEvent}
            className="button"
          >
            Add
          </button>
        </div>
      </div>
      <div className="cart">
        {
          cart.length
            ? cart.map((item) => <CartItem key={item.id} item={item} />)
            : <p><i>Your cart is empty</i></p>
        }
        <div className="cart__footer">
          <div className="cart__total-info">
            <p className="cart__total-item">
              <span className="cart__total-value-name">Total:</span>
              <span className="cart__total-value">0 $</span></p>
            <button className="button cart__order-button">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
