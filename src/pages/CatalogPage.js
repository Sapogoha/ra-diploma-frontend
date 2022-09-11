import React from 'react';

import Catalog from '../components/Catalog';
import CatalogCategories from '../components/Catalog/Categories';
import CatalogSearch from '../components/Catalog/Search';
import CatalogView from '../components/Catalog/View';
import Layout from '../layout/Layout';

function CatalogPage() {
  return (
    <>
      <Layout>
        <Catalog>
          <CatalogSearch />
          <CatalogCategories />
          <CatalogView />
        </Catalog>
      </Layout>
    </>
  );
}

export default CatalogPage;
