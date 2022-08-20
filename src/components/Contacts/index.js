import React from 'react';

import contacts from '../../common/contacts';

function Contacts() {
  return (
    <section className="top-sales">
      <h2 className="text-center">Контакты</h2>
      <p>
        Наш головной офис расположен в г.Москва, по адресу: {contacts.address}
      </p>
      <h5 className="text-center">Координаты для связи:</h5>
      <p>
        Телефон: <a href={`tel:${contacts.phone}`}>{contacts.phoneDisplay}</a>{' '}
        (ежедневно: с 09-00 до 21-00)
      </p>
      <p>
        Email: <a href={`mailto:${contacts.mail}`}>{contacts.mail}</a>
      </p>
    </section>
  );
}

export default Contacts;
