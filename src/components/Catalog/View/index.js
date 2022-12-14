import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import {
  fetchCatalog,
  fetchMoreItems,
} from '../../../store/thunks/asyncThunks';
import {
  selectCatalog,
  selectLoading,
  selectError,
  selectLoadingNewItems,
  selectShowFetchMoreButton,
  selectEndOfList,
} from '../../../store/slices/catalogSlice';
import {
  selectActiveCategory,
  selectLoading as selectLoadingCategories,
  selectError as selectCategoriesError,
} from '../../../store/slices/categoriesSlice';
import { selectSearch, resetSearch } from '../../../store/slices/searchSlice';

import ErrorHappened from '../../UI/ErrorHappened';
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
                  <div>???????????????? ????????????????????. ?????????? ???? ???? ??????????????</div>
                )}
              </div>

              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price} ??????.</p>
                <Link to={`${links.catalog}/${item.id}`}>
                  <button className="btn btn-outline-primary">????????????????</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const message = (
    <>
      {error.message}
      <div>?????????????? ???? ???????????? ????????, ?? ?????????? ?????????????????? ??????????</div>
    </>
  );

  const errorHappened = (
    <ErrorHappened message={message} onClick={handleReload}>
      ?????????????????? ????????????
    </ErrorHappened>
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
          ?????????????????? ??????
        </button>
      </div>
    </>
  );

  const listEnd = (
    <div className="alert alert-warning text-center" role="alert">
      ???? ?????????????????? ?????? ?????????????????? ???????????? ({catalog.length} ????.)
    </div>
  );

  const noItemsFound = (
    <div className="alert alert-danger text-center" role="alert">
      ???? ?????????????? '{failedSearch}' ???????????? ???? ??????????????
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
        : !search
        ? listEnd
        : catalog.length > 0
        ? listEnd
        : noItemsFound}
    </>
  );
}

export default CatalogView;
