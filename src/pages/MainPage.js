import React from 'react';

import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';
import CatalogCategories from '../components/Catalog/Categories';
import CatalogView from '../components/Catalog/View';
import Layout from '../layout/Layout';

function MainPage() {
  return (
    <>
      <Layout>
        <TopSales />
        <Catalog>
          <CatalogCategories />
          <CatalogView />
        </Catalog>
      </Layout>
    </>
  );
}

export default MainPage;
