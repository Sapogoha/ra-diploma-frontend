import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

function Catalog() {
  const [categories, setCategories] = useState([]);
  const [catalog, setCatalog] = useState([]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, []);

  const getCategories = () => {
    fetch(process.env.REACT_APP_SHOP_CATEGORIES)
      .then((response) => response.json())
      .then((data) => {
        setCategories([{ id: 11, title: 'Все' }, ...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCatalog = () => {
    fetch(process.env.REACT_APP_SHOP_CATALOG)
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories();
    getCatalog();
  }, []);

  const handleClick = (evt) => {
    // console.log(evt.target.id);
    evt.target
      .closest('.catalog-categories')
      .querySelector('.active')
      ?.classList.remove('active');
    evt.target.classList.add('active');
  };

  return (
    // <section className="catalog">
    //   <h2 className="text-center">Каталог</h2>
    //   <div className="preloader">
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //   </div>
    // </section>
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <ul className="catalog-categories nav justify-content-center">
        {/* <li className="nav-item">
          <div className="nav-link active" href="#">
            Все
          </div>
        </li> */}
        {categories.map((item) => (
          <li key={item.id} className="nav-item" onClick={handleClick}>
            <div className="nav-link" href="#" id={item.id}>
              {item.title}
            </div>
          </li>
        ))}
      </ul>
      <div className="row">
        {catalog.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card catalog-item-card">
              <img
                src={item.images[0]}
                className="card-img-top img-fluid"
                alt={item.title}
              />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price} руб.</p>
                <Link to={`/catalog/${item.id}.html`}>
                  <button className="btn btn-outline-primary">Заказать</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  );
}

export default Catalog;
