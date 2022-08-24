import React from 'react';

import Banner from '../components/Banner';
import Catalog from '../components/Catalog';
import CatalogCategories from '../components/Catalog/Categories';
import CatalogSearch from '../components/Catalog/Search';
import CatalogView from '../components/Catalog/View';

function CatalogPage() {
  return (
    <>
      <Banner />
      <Catalog>
        <CatalogSearch />
        <CatalogCategories />
        <CatalogView />
      </Catalog>
    </>
  );
}

export default CatalogPage;
