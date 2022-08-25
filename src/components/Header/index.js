import React, { useState, useRef } from 'react';
import headerLogo from '../../img/header-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  changeSearchTop,
  selectSearchTop,
  resetSearchTop,
} from '../../slices/searchSlice';

import links from '../../common/links';

function Header() {
  const [searchVisible, setVisible] = useState(false);
  const textInput = useRef(null);
  const search = useSelector(selectSearchTop);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    searchVisible ? setVisible(false) : setVisible(true);
    setTimeout(() => {
      textInput.current.focus();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetSearchTop());
    navigate(links.catalog);
  };

  const handleBlur = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    dispatch(changeSearchTop(event.target.value));
  };

  const navigation = (
    <>
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
            О магазине
          </Link>
        </li>
        <li className="nav-item">
          <Link to={links.contacts} className="nav-link">
            Контакты
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <header className="container">
      <div className="row bg-light">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light">
            <Link to={links.main}>
              <img src={headerLogo} alt="Bosa Noga" />
            </Link>

            <div className="collapase navbar-collapse" id="navbarMain">
              {navigation}
              <div>
                <div className="header-controls-pics">
                  <div
                    onClick={handleClick}
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
                  onBlur={handleBlur}
                  onSubmit={handleSubmit}
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${
                    searchVisible ? '' : 'invisible'
                  } `}
                >
                  <input
                    ref={textInput}
                    onChange={handleChange}
                    value={search}
                    type="text"
                    required
                    className="form-control"
                    placeholder="Поиск"
                  />
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
