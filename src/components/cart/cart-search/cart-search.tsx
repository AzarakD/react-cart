import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postProduct } from '../../../store/api-actions';

export default function CartSearch(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();

  const onAddEvent = () => {
    if (userInput) {
      dispatch(postProduct({
        name: userInput,
        price: Math.ceil(Math.random()*100),
        quantity: 1,
      }));
    }
  };

  return (
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
  );
}
