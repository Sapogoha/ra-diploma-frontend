import React from 'react';

import Banner from '../components/Banner';
import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';
import CatalogCategories from '../components/Catalog/Categories';
import CatalogView from '../components/Catalog/View';

function MainPage() {
  return (
    <>
      <Banner />
      <TopSales />
      <Catalog>
        <CatalogCategories />
        <CatalogView />
      </Catalog>
    </>
  );
}

export default MainPage;
