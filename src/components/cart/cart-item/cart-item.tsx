import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../store/api-actions';

import { Product } from '../../../types/product';
import { setPrice } from '../../../utils';

export default function CartItem({item}: {item: Product}): JSX.Element {
  const {
    id,
    name,
    price,
    quantity,
  } = item;

  const dispatch = useDispatch();

  const onDeleteEvent = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="cart-item">
      <button
        onClick={onDeleteEvent}
        className="cart-item__close-button"
        type="button"
        aria-label="Delete"
      >
        <span className="cart-item__close-button-icon"></span>
      </button>
      <div className="cart-item__image">
        <img src="img/bag.png" width="100" height="100" alt={`${name}`} />
      </div>
      <div className="cart-item__info">
        <p className="cart-item__info__title">{name}</p>
      </div>
      <div className="cart-item__price">{setPrice(price)}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Decrease quantity">-</button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id={`${id}`}
          name={`${id}-count`}
        />
        <button className="quantity__button" aria-label="Increase quantity">+</button>
      </div>
      <div className="cart-item__price-total">{setPrice(price * quantity)}</div>
    </div>
  );  
}
