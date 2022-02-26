import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postProduct } from '../../../store/api-actions';

export default function CartSearch(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();

  const onAddEvent = (evt: FormEvent) => {
    evt.preventDefault();

    if (userInput) {
      dispatch(postProduct({
        name: userInput,
        price: Math.ceil(Math.random()*100),
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
