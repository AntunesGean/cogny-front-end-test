import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { View, Text, Image, Button } from 'react-native';
import styles from '../styles/HomeScreenStyles';

function HomeScreen() {
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
    <View style={styles.container}>
      {products.map((product) => {
        const isProductInCart = cartItems.some(item => item.id === product.id);

        return (
          <View key={product.id} style={styles.product}>
            <Image source={{ uri: product.imagemURL }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.descricao}</Text>
              <Text style={styles.productPrice}>R${product.preco.toFixed(2).replace('.', ',')}</Text>
            </View>
            <Button
              title={isProductInCart ? 'REMOVER DO CARRINHO' : 'ADICIONAR AO CARRINHO'}
              onPress={() => handleButtonClick(product)}
              color={isProductInCart ? 'red' : 'green'}
            />
          </View>
        );
      })}
    </View>
  );
}

export default HomeScreen;
