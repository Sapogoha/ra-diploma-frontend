import React from 'react';

function Catalog(props) {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.children}
    </section>
  );
}

export default Catalog;
