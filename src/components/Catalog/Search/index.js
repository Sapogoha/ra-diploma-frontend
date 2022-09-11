import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeSearch, selectSearch } from '../../../store/slices/searchSlice';
import { fetchCatalog } from '../../../store/thunks/asyncThunks';
import { selectActiveCategory } from '../../../store/slices/categoriesSlice';

import useDebounce from '../../../hooks/useDebounce';

function CatalogSearch() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const activeCategoryId = useSelector(selectActiveCategory);
  const textInput = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      textInput.current.focus();
    });
  }, [search]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search.trim() === '') {
      return;
    }

    if (debouncedSearch) {
      dispatch(fetchCatalog({ id: activeCategoryId, query: search }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, activeCategoryId]);

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(changeSearch(event.target.value));
  };

  return (
    <form className="catalog-search-form form-inline">
      <input
        value={search}
        ref={textInput}
        onChange={handleChange}
        className="form-control"
        placeholder="Поиск"
      />
    </form>
  );
}

export default CatalogSearch;
