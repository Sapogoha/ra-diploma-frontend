import React from 'react';
// import { useParams } from 'react-router-dom';

import Banner from '../components/Banner';
import ProductItem from '../components/ProductItem';

function ProductPage() {
  // const { id } = useParams();
  return (
    <>
      <Banner />
      <ProductItem />
    </>
  );
}

export default ProductPage;
