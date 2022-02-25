export default function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link" href="/#">Main</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/#">Catalog</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/#">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
