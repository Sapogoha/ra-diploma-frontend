import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch, selectSearch } from '../../../slices/searchSlice';
import { fetchCatalog } from '../../../thunks/asyncThunks';
import { selectActiveCategory } from '../../../slices/categoriesSlice';

function CatalogSearch() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const activeCategoryId = useSelector(selectActiveCategory);

  const handleChange = (event) => {
    dispatch(changeSearch(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
