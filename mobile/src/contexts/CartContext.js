// src/contexts/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
          setCartItems(JSON.parse(cart));
        }
      } catch (error) {
        console.error('Could not load cart from AsyncStorage', error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Could not save cart to AsyncStorage', error);
      }
    };

    saveCart();
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, quantity: 1, total: item.price }]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
