import Cart from '../../components/cart/cart';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

export default function CartPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <Cart />
      </main>
      <Footer />
    </div>
  );
}
