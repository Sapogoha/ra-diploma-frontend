import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearCart,
  selectCart,
  selectNumberOfItems,
  selectNewPrice,
} from '../../../slices/cartSlice';
import axios from 'axios';
import Preloader from '../../Preloader';

function OrderForm() {
  const dispatch = useDispatch();
  const numberOfItems = useSelector(selectNumberOfItems);
  const EMPTY_STATE = { phone: '', address: '' };
  const EMPTY_STATE_ERROR = { status: null, message: null };
  const [form, setForm] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(EMPTY_STATE_ERROR);
  const newPrice = useSelector(selectNewPrice);

  const cart = useSelector(selectCart);

  const items = cart.map((item) => ({
    id: item.id,
    price: item.price,
    count: item.quantity,
  }));

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setError(EMPTY_STATE_ERROR);
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_SHOP_CART_POST_ORDER,
        { owner: form, items }
      );

      if (response.status === 204) {
        setError(EMPTY_STATE_ERROR);
        setForm(EMPTY_STATE);
        setSent(true);
        dispatch(clearCart());
      }
    } catch (err) {
      setSent(false);
      setError({
        status: true,
        message: 'Что-то пошло не так. Попробуйте еще раз',
      });
    } finally {
      setLoading(false);
    }
  };

  const sendBtnActive = (
    <button type="submit" className="btn btn-outline-secondary">
      Оформить
    </button>
  );

  const sendBtnPlaceholder = (
    <div className="alert alert-danger text-center" role="alert">
      Pазрешите пересчитать стоимость корзины или удалите товар с изменившейся
      ценой. После этого вы сможете оформить заказ
    </div>
  );

  const section = (
    <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="phone">Телефон</label>
          <input
            name="phone"
            className="form-control mt-2"
            id="phone"
            placeholder="Ваш телефон"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            minLength={6}
            maxLength={11}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address ">Адрес доставки</label>
          <input
            name="address"
            className="form-control mt-2"
            id="address"
            placeholder="Адрес доставки"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreement"
            required
          />
          <label className="form-check-label" htmlFor="agreement">
            Согласен с правилами доставки
          </label>
        </div>
        {newPrice ? sendBtnPlaceholder : sendBtnActive}
      </form>
    </div>
  );

  const sendingError = (
    <>
      <div className="alert alert-danger text-center" role="alert">
        {error.message}
      </div>
      {section}
    </>
  );

  const sentSuccessfully = (
    <div className="alert alert-success text-center" role="alert">
      Заказ успешно отправлен. В ближайшее время с вами свяжется сотрудник
      интернет-магазина
    </div>
  );

  const noItems = (
    <div className=" my-5 h4 text-center">
      На даный момент ваша корзина пуста. Добавьте в нее товары для оформления
      заказа
    </div>
  );

  return (
    <>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>

        {!numberOfItems && noItems}
        {numberOfItems > 0 && section}
        {numberOfItems > 0 && loading && <Preloader />}
        {error.status && sendingError}
        {sent && sentSuccessfully}
      </section>
    </>
  );
}

export default OrderForm;
