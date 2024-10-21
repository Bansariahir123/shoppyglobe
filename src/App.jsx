import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import NotFound from './components/NotFound';
import Checkout from './components/Checkout';
import '/src/App.css';
// Lazy loading component for better performance, only loaded when needed
const ProductDetail = lazy(() => import('./components/ProductDetail')); 
const Cart = lazy(() => import('./components/Cart'));

const App = () => {
  return (
    <Router> {/* Wrapping the app with Router to enable routing */}
  
      <Header />
      <Suspense fallback={<div>Loading...</div>}>{/* Wrapping components with Suspense to show a fallback while lazy-loaded components are being fetched */}
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

