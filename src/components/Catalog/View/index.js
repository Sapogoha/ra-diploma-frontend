import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCatalog, fetchMoreItems } from '../../../thunks/asyncThunks';
import {
  selectCatalog,
  selectLoading,
  selectError,
  selectLoadingNewItems,
  selectShowFetchMoreButton,
  selectEndOfList,
} from '../../../slices/catalogSlice';
import {
  selectActiveCategory,
  selectLoading as selectLoadingCategories,
} from '../../../slices/categoriesSlice';
import { selectSearch } from '../../../slices/searchSlice';
import Preloader from '../../Preloader';

function CatalogView() {
  const dispatch = useDispatch();

  const catalog = useSelector(selectCatalog);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const loadingNewItems = useSelector(selectLoadingNewItems);
  const showFetchMoreButton = useSelector(selectShowFetchMoreButton);
  const endOfList = useSelector(selectEndOfList);

  const activeCategoryId = useSelector(selectActiveCategory);
  const loadingCategories = useSelector(selectLoadingCategories);

  const search = useSelector(selectSearch);

  useEffect(() => {
    dispatch(fetchCatalog({ id: activeCategoryId, query: search }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activeCategoryId]);

  const handleReload = () => {
    dispatch(fetchCatalog({ id: activeCategoryId }));
  };

  const loaded = (
    <>
      <div className="row">
        {catalog?.map((item) => (
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
    </>
  );

  const errorHappened = (
    <>
      <div className="mb-3">{error.message}</div>
      <button className="btn btn-outline-primary" onClick={handleReload}>
        Загрузить товары
      </button>
    </>
  );

  const handleClick = () => {
    dispatch(
      fetchMoreItems({
        id: activeCategoryId,
        offset: catalog.length,
        query: search,
      })
    );
  };

  const fetchMore = (
    <>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={handleClick}>
          Загрузить ещё
        </button>
      </div>
    </>
  );

  const listEnd = (
    <>
      <div className="text-center">Вы загрузили все доступные товары</div>
    </>
  );

  if (loadingCategories) return null;

  return (
    <div>
      {loading && !loadingCategories ? (
        <Preloader />
      ) : error.status ? (
        errorHappened
      ) : (
        loaded
      )}

      {loadingNewItems && <Preloader />}
      {showFetchMoreButton ? fetchMore : endOfList ? listEnd : null}
    </div>
  );
}

export default CatalogView;
