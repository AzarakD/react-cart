import Cart from '../../components/cart/cart';
import Header from '../../components/header/header';

export default function CartPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <Cart />
      </main>
    </div>
  );
}
