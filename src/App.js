import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';

import Header from './components/Header';
import Footer from './components/Footer';

import links from './common/links';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col p-0">
            <Routes>
              <Route path={links.main} element={<MainPage />} />
              <Route path={links.about} element={<AboutPage />} />
              <Route path={links.cart} element={<CartPage />} />
              <Route path={links.catalog} element={<CatalogPage />} />
              <Route path={links.product} element={<ProductPage />} />
              <Route path={links.contacts} element={<ContactsPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
