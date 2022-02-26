import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postProduct } from '../../../store/api-actions';
import { getRandomInt } from '../../../utils';

export default function CartSearch(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();

  const onAddEvent = (evt: FormEvent) => {
    evt.preventDefault();

    if (userInput) {
      dispatch(postProduct({
        name: userInput,
        price: getRandomInt(),
        quantity: 1,
      }));
      setUserInput('');
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
