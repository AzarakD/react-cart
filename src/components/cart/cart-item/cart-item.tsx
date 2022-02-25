export default function CartItem(): JSX.Element {
  return (
    <div className="cart-item">
      <button className="cart-item__close-button" type="button" aria-label="Delete">
        <span className="cart-item__close-button-icon"></span>
      </button>
      <div className="cart-item__image">
        <img src="img/bag.png" width="100" height="100" alt="Product name" />
      </div>
      <div className="cart-item__info">
        <p className="cart-item__info__title">Product Title</p>
      </div>
      <div className="cart-item__price">1 000 $</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Decrease quantity">-</button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" />
        <button className="quantity__button" aria-label="Increase quantity">+</button>
      </div>
      <div className="cart-item__price-total">1 000 ₽</div>
    </div>
  );  
}
