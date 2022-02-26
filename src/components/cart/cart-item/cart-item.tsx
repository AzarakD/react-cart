import {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState
} from 'react';
import { useDispatch } from 'react-redux';

import { useDebounce } from '../../../hooks/use-debounce';
import { useDidUpdateEffect } from '../../../hooks/use-did-update';
import { deleteProduct, patchProduct } from '../../../store/api-actions';
import { setPrice } from '../../../utils';
import { Count } from '../../../const';
import { Product } from '../../../types/product';

export default function CartItem({item}: {item: Product}): JSX.Element {
  const {
    id,
    name,
    price,
    quantity,
  } = item;

  const [userInput, setUserInput] = useState(quantity);
  const [shownInput, setShownInput] = useState(quantity);
  const debouncedInput = useDebounce(userInput);
  const dispatch = useDispatch();

  useEffect(() => {
    setShownInput(quantity);
  }, [quantity]);

  useDidUpdateEffect(() => {
    dispatch(patchProduct(id, debouncedInput));
  }, [debouncedInput, dispatch, id]);

  const onDeleteEvent = () => {
    dispatch(deleteProduct(id));
  };

  const onIncreaseEvent = () => {
    const newValue = userInput + 1;

    if (newValue <= Count.Max) {
      setUserInput(newValue);
      setShownInput(newValue);
    }
  };

  const onDecreaseEvent = () => {
    const newValue = userInput - 1;

    if (newValue >= Count.Min) {
      setUserInput(newValue);
      setShownInput(newValue);
    } else {
      onDeleteEvent();
    }
  };

  const onInputChangeEvent = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = +evt.currentTarget.value;

    if (inputValue >= 0) {
      setShownInput(inputValue);
    }
  };

  const onBlurEvent = (evt: FocusEvent<HTMLInputElement, Element>) => {
    let inputValue = +evt.currentTarget.value;

    if (inputValue < Count.Min) {
      inputValue = Count.Min;
    } else if (inputValue > Count.Max) {
      inputValue = Count.Max;
    }
    if (inputValue !== quantity) {
      setUserInput(inputValue);
    }
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
        <button
          onClick={onDecreaseEvent}
          className="quantity__button"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          onChange={onInputChangeEvent}
          onBlur={onBlurEvent}
          value={shownInput}
          className="quantity__input"
          type="number"
          placeholder="1"
          id={`${id}`}
          name={`${id}-count`}
        />
        <button
          onClick={onIncreaseEvent}
          className="quantity__button"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className="cart-item__price-total">{setPrice(price * quantity)}</div>
    </div>
  );  
}
