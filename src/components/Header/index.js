import React from 'react';
import headerLogo from '../../img/header-logo.png';
import { Link } from 'react-router-dom';

import links from '../../common/links';

function Header() {
  return (
    <header className="container">
      <div className="row bg-light">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light">
            <Link to={links.main}>
              <img src={headerLogo} alt="Bosa Noga" />
            </Link>

            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to={links.main} className="nav-link">
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={links.catalog} className="nav-link">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={links.about} className="nav-link">
                    {' '}
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={links.contacts} className="nav-link">
                    {' '}
                    Контакты
                  </Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>
                  <Link to={links.cart}>
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
