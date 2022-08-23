import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { fetchTopSales } from '../../thunks/asyncThunks';

import {
  selectTopSales,
  selectLoading,
  selectError,
} from '../../slices/topSalesSlice';

function TopSales() {
  const topSales = useSelector(selectTopSales);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  console.log(error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  const preloader = (
    <>
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );

  const loaded = (
    <>
      <div className="row">
        {topSales?.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card">
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
    </>
  );

  const reloadHandler = () => {
    dispatch(fetchTopSales());
  };

  const errorHappened = (
    <>
      <div className="mb-3">{error.message}</div>
      <button className="btn btn-outline-primary" onClick={reloadHandler}>
        Загрузить хиты продаж
      </button>
    </>
  );

  if (loading || error.status || (!loading && topSales.length > 0)) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading ? preloader : error.status ? errorHappened : loaded}
      </section>
    );
  }

  return null;
}

export default TopSales;
