import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

import { selectSearch, resetSearch } from '../store/slices/searchSlice';
import { selectActiveCategory } from '../store/slices/categoriesSlice';
import { fetchCatalog } from '../store/thunks/asyncThunks';

import links from '../common/links';

function Layout(props) {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const activeCategoryId = useSelector(selectActiveCategory);
  const { pathname } = window.location;

  useEffect(() => {
    if (search && pathname !== links.catalog) {
      dispatch(resetSearch());
      dispatch(fetchCatalog({ id: activeCategoryId }));
    }
  }, [pathname, search, activeCategoryId, dispatch]);

  return (
    <>
      <Header />

      <main className="container">
        <div className="row">
          <div className="col p-0">
            <Banner />
            {props.children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Layout;
