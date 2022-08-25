import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductItem } from '../../thunks/asyncThunks';
import Preloader from '../Preloader';
import {
  selectProduct,
  selectLoading,
  selectError,
  selectQuantity,
  selectSize,
  increment,
  decrement,
  toggleSize,
  removeQuantity,
} from '../../slices/productItemSlice';
import { addToCart } from '../../slices/cartSlice';
import links from '../../common/links';

function ProductItem() {
  const product = useSelector(selectProduct);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const quantity = useSelector(selectQuantity);
  const selectedSize = useSelector(selectSize);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductItem(Number(id)));
  }, [dispatch, id]);

  const availableSizes = product?.sizes?.filter((size) => size.avalible);

  const handleReload = () => {
    dispatch(fetchProductItem(Number(id)));
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleClick = (size) => {
    dispatch(toggleSize(size));
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        size: selectedSize,
        quantity,
      })
    );
    dispatch(toggleSize(selectedSize));
    dispatch(removeQuantity());
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
    <button
      onClick={addToCartHandler}
      className="btn btn-danger btn-block btn-lg"
    >
      В корзину
    </button>
  );

  const addToCartInactive = (
    <button className="btn btn-secondary btn-block btn-lg">
      Сначала выберите размер и количество
    </button>
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
      <div className="mb-3">{error.message}</div>
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
