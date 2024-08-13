import React, { createContext, useState, useEffect } from 'react';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './utils/localStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromLocalStorage());

  useEffect(() => {
    // Salvar no Local Storage sempre que o cartItems mudar
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.preco }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, total: product.preco }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart'); // Remove o carrinho do Local Storage ao limpar
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
