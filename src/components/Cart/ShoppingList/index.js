import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCart,
  selectSum,
  removeFromCart,
  selectNumberOfItems,
} from '../../../slices/cartSlice';

function ShoppingList() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const sum = useSelector(selectSum);
  const numberOfItems = useSelector(selectNumberOfItems);

  const handleClick = (id) => {
    dispatch(removeFromCart(id));
  };

  const section = (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
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
                  onClick={() => handleClick(item.id)}
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
