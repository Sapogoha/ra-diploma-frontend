import React from 'react';

import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';
import CatalogCategories from '../components/Catalog/Categories';
import CatalogView from '../components/Catalog/View';

function MainPage() {
  return (
    <>
      <TopSales />
      <Catalog>
        <CatalogCategories />
        <CatalogView />
      </Catalog>
    </>
  );
}

export default MainPage;
