import React from 'react';
import { Link } from 'react-router-dom';

import links from '../../common/links';
import contacts from '../../common/contacts';

function Footer() {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <section>
            <h5>Информация</h5>
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <Link to={links.about} className="nav-link">
                  О магазине
                </Link>
              </li>
              <li className="nav-item">
                <Link to={links.catalog} className="nav-link">
                  Каталог
                </Link>
              </li>
              <li className="nav-item">
                <Link to={links.contacts} className="nav-link">
                  Контакты
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className="footer-pay">
              <div className="footer-pay-systems footer-pay-systems-paypal"></div>
              <div className="footer-pay-systems footer-pay-systems-master-card"></div>
              <div className="footer-pay-systems footer-pay-systems-visa"></div>
              <div className="footer-pay-systems footer-pay-systems-yandex"></div>
              <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
              <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
            </div>
          </section>
          <section>
            <div className="footer-copyright">
              2009-{year} © BosaNoga.ru — модный интернет-магазин обуви и
              аксессуаров. Все права защищены.
              <br />
              Доставка по всей России!
            </div>
          </section>
        </div>
        <div className="col text-end">
          <section className="footer-contacts">
            <h5>Контакты:</h5>
            <a className="footer-contacts-phone" href={`tel:${contacts.phone}`}>
              {contacts.phoneDisplay}
            </a>
            <span className="footer-contacts-working-hours ">
              Ежедневно: с 09-00 до 21-00
            </span>
            <a
              className="footer-contacts-email"
              href={`mailto:${contacts.mail}`}
            >
              {contacts.mail}
            </a>
            <div className="footer-social-links">
              <div className="footer-social-link footer-social-link-twitter"></div>
              <div className="footer-social-link footer-social-link-vk"></div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
