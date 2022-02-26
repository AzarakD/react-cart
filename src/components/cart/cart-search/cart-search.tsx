import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postProduct, patchProduct } from '../../../store/api-actions';
import { getCart } from '../../../store/selectors';
import { getRandomInt } from '../../../utils';

export default function CartSearch(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const nameList = cart.map((item) => item.name);

  const onAddEvent = (evt: FormEvent) => {
    evt.preventDefault();
    setUserInput('');

    if (nameList.includes(userInput)) {
      const index = cart.findIndex((item) => item.name === userInput);
      dispatch(patchProduct(cart[index].id, cart[index].quantity + 1));

      return;
    }

    if (userInput) {
      dispatch(postProduct({
        name: userInput,
        price: getRandomInt(),
        quantity: 1,
      }));
    }
  };

  return (
    <form className="page-content__header-search" onSubmit={onAddEvent}>
      <input
        onChange={(evt) => setUserInput(evt.currentTarget.value)}
        value={userInput}
        className="page-content__header-input"
        type="text"
      />
      <button className="button" >Add</button>
    </form>
  );
}
