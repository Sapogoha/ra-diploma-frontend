import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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
  selectError as selectCategoriesError,
} from '../../../slices/categoriesSlice';
import { selectSearch, resetSearch } from '../../../slices/searchSlice';
import Preloader from '../../Preloader';
import links from '../../../common/links';

function CatalogView() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const catalog = useSelector(selectCatalog);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const loadingNewItems = useSelector(selectLoadingNewItems);
  const showFetchMoreButton = useSelector(selectShowFetchMoreButton);
  const endOfList = useSelector(selectEndOfList);
  const categoriesError = useSelector(selectCategoriesError);
  const activeCategoryId = useSelector(selectActiveCategory);
  const loadingCategories = useSelector(selectLoadingCategories);
  const search = useSelector(selectSearch);
  const [failedSearch, setFailedSerch] = useState(null);

  useEffect(() => {
    if (endOfList && search) {
      setFailedSerch(search);
    } else if (search) {
      setFailedSerch(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endOfList]);

  const handleReload = () => {
    dispatch(fetchCatalog({ id: activeCategoryId }));
  };

  useEffect(() => {
    if (pathname !== links.catalog) {
      dispatch(resetSearch());
      handleReload();
    } else {
      dispatch(fetchCatalog({ id: activeCategoryId, query: search }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activeCategoryId]);

  const loaded = (
    <>
      <div className="row">
        {catalog?.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card catalog-item-card">
              <div className="card-img-container">
                {item.images && item.images[0] ? (
                  <img
                    src={item.images[0]}
                    className="card-img-top img-fluid"
                    alt={item.title}
                  />
                ) : (
                  <div>Картинка потерялась. Скоро мы ее добавим</div>
                )}
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

  const errorHappened = (
    <>
      <div className="alert alert-warning text-center" role="alert">
        {error.message}
      </div>
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
    <div className="alert alert-warning text-center" role="alert">
      Вы загрузили все доступные товары
    </div>
  );

  const noItemsFound = (
    <div className="alert alert-danger text-center" role="alert">
      По запросу '{failedSearch}' ничего не найдено
    </div>
  );

  if (loadingCategories || categoriesError.status) return null;

  return (
    <>
      {loading && !loadingCategories ? (
        <Preloader />
      ) : error.status ? (
        errorHappened
      ) : (
        loaded
      )}

      {loadingNewItems && <Preloader />}
      {showFetchMoreButton
        ? fetchMore
        : !endOfList
        ? null
        : search
        ? noItemsFound
        : listEnd}
    </>
  );
}

export default CatalogView;
