import CartItem from './cart-item/cart-item'
import { Product } from '../../types/product';

const mockItems: Product[] = [
  {
    id: 1,
    name: 'Some name 1',
    price: 111000,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Some name 2',
    price: 300,
    quantity: 3,
  },
  {
    id: 3,
    name: 'Some name 3',
    price: 200,
    quantity: 2,
  },
];

export default function Cart(): JSX.Element {
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
          mockItems.length
            ? mockItems.map((item) => <CartItem item={item} />)
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
