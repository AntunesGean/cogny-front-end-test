import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './Cart';
import { CartProvider, CartContext } from './CartContext';
import './App.css';
import { ReactComponent as CartLogo } from './shopping_basket.svg';
import { ReactComponent as HomeLogo } from './running_logo.svg'


function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Condicional para ajustar o texto do carrinho
  const PLURAL_NUMBER_MIN = 2;
  const itemText = totalItems < PLURAL_NUMBER_MIN ? 'item' : 'itens';
  

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <div className="logo">COGNYSHOES</div>
        <div className="home-logo">
          <HomeLogo />
        </div>
      </Link>
      <div className="cart-link">
        <Link to="/cart">
          <div className="cart-logo">
            <CartLogo />
          </div>
          <div className="cart-align-text">
            <div className="cart-main-text">
              Meu carrinho
            </div> 
            <div className="cart-sup-text">
              {totalItems} {itemText}
            </div> 
          </div>
        </Link>        
      </div>
    </header>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
