import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './ProductList.css';

function ProductList() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'shoes');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleButtonClick = (product) => {
    const isProductInCart = cartItems.some(item => item.id === product.id);
    if (isProductInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => {
        const isProductInCart = cartItems.some(item => item.id === product.id);

        return (
          <div className="product" key={product.id}>
            <img src={product.imagemURL} alt={product.descricao} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.descricao}</h2>
              <p className="product-price">R${product.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            <button 
              className={`add-to-cart-button ${isProductInCart ? 'in-cart' : 'not-in-cart'}`} 
              onClick={() => handleButtonClick(product)}
            >
              <div className="left-space-in-button">
                {isProductInCart ? '0' : '1'}
              </div>
              <div className="right-space-in-button">
                {isProductInCart ? 'REMOVER DO CARRINHO' : 'ADICIONAR AO CARRINHO'}
              </div>              
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
