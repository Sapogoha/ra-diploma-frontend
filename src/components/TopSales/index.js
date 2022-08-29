import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTopSales } from '../../thunks/asyncThunks';
import Preloader from '../Preloader';

import {
  selectTopSales,
  selectLoading,
  selectError,
} from '../../slices/topSalesSlice';

function TopSales() {
  const topSales = useSelector(selectTopSales);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  const loaded = (
    <>
      <div className="row">
        {topSales?.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card">
              <div className="card-img-container">
                <img
                  src={item.images[0]}
                  className="card-img-top img-fluid"
                  alt={item.title}
                />
              </div>

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
      <div className="alert alert-warning text-center" role="alert">
        {error.message}
      </div>
      <button className="btn btn-outline-primary" onClick={reloadHandler}>
        Загрузить хиты продаж
      </button>
    </>
  );

  if (loading || error.status || (!loading && topSales.length > 0)) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading ? <Preloader /> : error.status ? errorHappened : loaded}
      </section>
    );
  }

  return null;
}

export default TopSales;
