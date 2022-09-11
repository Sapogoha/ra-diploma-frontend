import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Preloader from '../Preloader';
import { addToCart } from '../../store/slices/cartSlice';

import links from '../../common/links';

function ProductItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: null, message: null });

  const fetchProductHandler = useCallback(async (id) => {
    setLoading(true);
    setError({ status: null, message: null });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SHOP_CATALOG}/${id}`
      );
      if (!response.ok) {
        throw new Error(
          'Что-то пошло не так. Возможно такого товара не существует'
        );
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      setError({ status: true, message: error.message });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProductHandler(Number(id));
  }, [fetchProductHandler, id]);

  const availableSizes = product?.sizes?.filter((size) => size.avalible);

  const handleReload = () => {
    fetchProductHandler(Number(id));
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClick = (size) => {
    selectedSize === size ? setSelectedSize(null) : setSelectedSize(size);
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        size: selectedSize,
        price: product.price,
        quantity,
      })
    );
    navigate(links.cart);
  };

  const showSizes = availableSizes?.map((size) => (
    <span
      onClick={() => handleClick(size.size)}
      key={size.size}
      className={`catalog-item-size ${
        size.size === selectedSize ? 'selected' : ''
      }`}
    >
      {size.size}
    </span>
  ));

  const noSizes = <span> в данный момент товара нет в наличиии</span>;

  const addToCartBtn = (
    <div className="d-grid gap-2">
      <button
        onClick={addToCartHandler}
        className="btn btn-danger btn-block btn-lg "
      >
        В корзину
      </button>
    </div>
  );

  const addToCartInactive = (
    <div className="d-grid gap-2">
      <button className="btn btn-secondary btn-block btn-lg" disabled>
        Сначала выберите размер
      </button>
    </div>
  );

  const quantityBlock = (
    <p>
      Количество: {'  '}
      <span className="btn-group btn-group-sm pl-2">
        <button className="btn btn-secondary" onClick={handleDecrement}>
          -
        </button>
        <span className="btn btn-outline-primary">{quantity}</span>
        <button className="btn btn-secondary" onClick={handleIncrement}>
          +
        </button>
      </span>
    </p>
  );

  const loaded = (
    <>
      <h2 className="text-center">{product?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={product?.images[0]}
            className="card-img-top img-fluid"
            alt={product?.title}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:{' '}
              {availableSizes?.length >= 1 ? showSizes : noSizes}
            </p>
            {availableSizes?.length >= 1 ? quantityBlock : null}
          </div>
          {availableSizes?.length >= 1
            ? selectedSize && quantity
              ? addToCartBtn
              : addToCartInactive
            : null}
        </div>
      </div>
    </>
  );

  const errorHappened = (
    <>
      <div className="alert alert-warning text-center" role="alert">
        {error.message}
      </div>
      <button className="btn btn-outline-primary" onClick={handleReload}>
        Загрузить данные о товаре
      </button>
    </>
  );

  return (
    <section className="catalog-item">
      <div>
        {loading ? (
          <Preloader />
        ) : error.status ? (
          errorHappened
        ) : product ? (
          loaded
        ) : null}
      </div>
    </section>
  );
}

export default ProductItem;
