import { useSelector } from 'react-redux';

import CartItem from './cart-item/cart-item'
import { getCart } from '../../store/selectors';

export default function Cart(): JSX.Element {
  const cart = useSelector(getCart);

  return (
    <div className="container">
      <div className="page-content__header">
        <h1 className="page-content__title">Cart</h1>

        <div className="page-content__header-search">
          <input className="page-content__header-input" type="text" />
          <button className="button">Add</button>
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
