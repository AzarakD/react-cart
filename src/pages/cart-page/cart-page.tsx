import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../store/api-actions';
import { getIsDataLoaded } from '../../store/selectors';
import Cart from '../../components/cart/cart';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

export default function CartPage(): JSX.Element {
  const isDataLoaded = useSelector(getIsDataLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        {
          isDataLoaded
            ? <Cart />
            : <p><i>Loading...</i></p>
        }
      </main>
      <Footer />
    </div>
  );
}
