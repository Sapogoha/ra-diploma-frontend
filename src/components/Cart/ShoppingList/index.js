import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCart,
  removeFromCart,
  selectNumberOfItems,
  updateProduct,
  selectNewPrice,
  selectLoading,
} from '../../../slices/cartSlice';
import { refreshPrice } from '../../../thunks/asyncThunks';
import Preloader from '../../Preloader';

function ShoppingList() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const numberOfItems = useSelector(selectNumberOfItems);
  const newPrice = useSelector(selectNewPrice);
  const loading = useSelector(selectLoading);

  const sum = cart.reduce((curNumber, item) => {
    return curNumber + item.price * item.quantity;
  }, 0);

  const ids = useMemo(
    () =>
      cart.map((item) => ({ id: item.id, price: item.price, size: item.size })),
    [cart]
  );

  const handleClickDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClickUpdate = (id) => {
    const toUpdate = ids.find((item) => item.id === id);
    console.log(toUpdate);
    dispatch(updateProduct({ id, size: toUpdate.size, price: newPrice.price }));
  };

  useEffect(() => {
    ids.map((item) =>
      dispatch(
        refreshPrice({ id: item.id, oldPrice: item.price, size: item.size })
      )
    );
  }, [dispatch, ids]);

  const priceChanged = (
    <>
      <div className="alert alert-danger text-center" role="alert">
        <div>
          Изменилась цена товара "
          <Link to={`/catalog/${newPrice?.id}.html`}>{newPrice?.title}</Link>",
          новая цена - {newPrice?.price}
        </div>
        <div className="m-2" role="group">
          <button
            onClick={() => handleClickUpdate(newPrice?.id)}
            className="btn btn-outline-success btn me-3"
          >
            Пересчитать стоимость
          </button>
          <button
            onClick={() => handleClickDelete(newPrice?.id)}
            className="btn btn-outline-danger btn"
          >
            Удалить товар из корзины
          </button>
        </div>
      </div>
    </>
  );

  const section = (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {loading ? <Preloader /> : newPrice && priceChanged}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/catalog/${item.id}.html`}>
                  <div>{item.title}</div>
                </Link>
              </td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button
                  onClick={() => handleClickDelete(item.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>{sum} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );

  return numberOfItems ? section : null;
}

export default ShoppingList;
