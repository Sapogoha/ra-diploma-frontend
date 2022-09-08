import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch, selectSearch } from '../../../store/slices/searchSlice';
import { fetchCatalog } from '../../../store/thunks/asyncThunks';
import { selectActiveCategory } from '../../../store/slices/categoriesSlice';

function CatalogSearch() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const activeCategoryId = useSelector(selectActiveCategory);

  const handleChange = (event) => {
    if (search.trim === '') {
      return;
    }
    dispatch(changeSearch(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.trim() === '') {
      return;
    }

    dispatch(fetchCatalog({ id: activeCategoryId, query: search }));
  };

  return (
    <form onSubmit={handleSubmit} className="catalog-search-form form-inline">
      <input
        value={search}
        onChange={handleChange}
        className="form-control"
        placeholder="Поиск"
      />
    </form>
  );
}

export default CatalogSearch;
