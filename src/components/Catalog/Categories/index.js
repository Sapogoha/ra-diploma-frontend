import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../../thunks/asyncThunks';
import {
  selectCategories,
  selectActiveCategory,
  selectLoading,
  selectError,
  chooseActiveCategory,
} from '../../../slices/categoriesSlice';
import Preloader from '../../Preloader';

function CatalogCategories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector(selectCategories);
  const activeCategoryId = useSelector(selectActiveCategory);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleClick = (evt) => {
    dispatch(chooseActiveCategory(Number(evt.target.id)));
  };

  const handleReload = () => {
    dispatch(fetchCategories());
  };

  const errorHappened = (
    <>
      <div className="alert alert-warning text-center" role="alert">
        {error.message}
      </div>
      <button className="btn btn-outline-primary" onClick={handleReload}>
        Загрузить категории
      </button>
    </>
  );

  const loaded = (
    <>
      <ul className="catalog-categories nav justify-content-center">
        {categories?.map((item) => (
          <NavLink to={'#'} key={item.id}>
            <li className="nav-item" onClick={handleClick}>
              <div
                className={`nav-link ${
                  item.id === activeCategoryId && 'active'
                }`}
                id={item.id}
              >
                {item.title}
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </>
  );

  return <>{loading ? <Preloader /> : error.status ? errorHappened : loaded}</>;
}

export default CatalogCategories;
