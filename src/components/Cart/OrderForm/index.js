import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  clearCart,
  selectCart,
  selectNumberOfItems,
  selectNewPrice,
} from '../../../store/slices/cartSlice';
import useInput from '../../../hooks/useInput';

import Preloader from '../../Preloader';

const regex = new RegExp(/^[\d+][\d() -]{4,14}\d$/);
const EMPTY_STATE_ERROR = { status: null, message: null };

const isNotEmpty = (value) => value.trim().length >= 5;
const isPhone = (value) => regex.test(value);

function OrderForm() {
  const dispatch = useDispatch();
  const numberOfItems = useSelector(selectNumberOfItems);
  const newPrice = useSelector(selectNewPrice);
  const cart = useSelector(selectCart);

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(EMPTY_STATE_ERROR);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  let formIsValid = false;

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isPhone);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const items = cart.map((item) => ({
    id: item.id,
    price: item.price,
    count: item.quantity,
  }));

  const handleCheckboxCkick = () => {
    setCheckboxClicked((prevState) => !prevState);
  };

  if (phoneIsValid && addressIsValid && checkboxClicked) {
    formIsValid = true;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!formIsValid) {
      return;
    }
    try {
      setError(EMPTY_STATE_ERROR);
      setLoading(true);

      const response = await fetch(process.env.REACT_APP_SHOP_CART_POST_ORDER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: { phone: phoneValue, address: addressValue },
          items,
        }),
      });

      if (!response.ok) {
        throw new Error('Что-то пошло не так. Попробуйте еще раз');
      } else {
        setError(EMPTY_STATE_ERROR);
        setSent(true);
        resetPhone();
        resetAddress();
        dispatch(clearCart());
      }
    } catch (err) {
      setSent(false);
      setError({
        status: true,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const sendBtnActive = (
    <button
      type="submit"
      className="btn btn-outline-secondary"
      disabled={!formIsValid}
    >
      Оформить
    </button>
  );

  const sendBtnPlaceholder = (
    <div className="alert alert-danger text-center" role="alert">
      Pазрешите пересчитать стоимость корзины или удалите товар с изменившейся
      ценой. После этого вы сможете оформить заказ
    </div>
  );

  const phoneClasses = phoneHasError
    ? 'form-control mt-2 invalid'
    : 'form-control mt-2';
  const addressClasses = addressHasError
    ? 'form-control mt-2 invalid'
    : 'form-control mt-2';
  const checkboxClasses = !checkboxClicked
    ? 'form-check-input invalid'
    : 'form-check-input';

  const section = (
    <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="phone">Телефон</label>
          <input
            name="phone"
            id="phone"
            placeholder="Ваш телефон"
            type="tel"
            className={phoneClasses}
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneHasError && (
            <p className="error-text">
              Пожалуйста, введите корректный номер телефона
            </p>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address ">Адрес доставки</label>
          <input
            name="address"
            id="address"
            placeholder="Адрес доставки"
            className={addressClasses}
            value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />
          {addressHasError && (
            <p className="error-text">
              Нам нужно не менее пяти символов чтобы определить ваш адрес
            </p>
          )}
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            id="agreement"
            className={checkboxClasses}
            onClick={handleCheckboxCkick}
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
    <div
      className="alert alert-danger text-center"
      role="alert"
      style={{ marginTop: '20px' }}
    >
      {error.message}
    </div>
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
        {numberOfItems > 0 && error.status && sendingError}
        {sent && sentSuccessfully}
      </section>
    </>
  );
}

export default OrderForm;
