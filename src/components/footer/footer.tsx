export default function Footer(): JSX.Element {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container container">
        <section className="footer__nav-section">
          <h2 className="footer__nav-title">About</h2>
          <p className="footer__nav-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/><br/>Tempora deserunt dicta tempore sed autem quam. Corrupti architecto qui ut reprehenderit totam deserunt ipsum nihil!</p>
        </section>
        <section className="footer__nav-section">
          <h2 className="footer__nav-title">Info</h2>
          <ul className="footer__nav-list">
            <li><a className="link" href="#top">Home</a>
            </li>
            <li><a className="link" href="#top">Blog</a>
            </li>
            <li><a className="link" href="#top">FAQ</a>
            </li>
            <li><a className="link" href="#top">Terms</a>
            </li>
            <li><a className="link" href="#top">Support</a>
            </li>
          </ul>
        </section>
        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">Contact</h2>
          <p className="footer__nav-content">Lorem Road,<br/> Ipsum dolor, <br/>Sit amet consectetur.. 6.</p>
          <div className="footer__nav-content">
            <a className="link" href="tel:88000000000"> 8-800-000-00-00</a>
          </div>
        </section>
      </div>
    </footer>
  );
}
