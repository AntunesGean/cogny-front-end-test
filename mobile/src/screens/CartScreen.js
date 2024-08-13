import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image } from 'react-native';
import styles from '../styles/CartScreenStyles';

function CartScreen() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigation = useNavigation();
  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.');
      navigation.navigate('Home');
    } else {
      alert('Pedido finalizado com sucesso!');
      clearCart();
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Seu carrinho está vazio. Adicione produtos para continuar.</Text>
      ) : (
        <>
          <View style={styles.cartHeader}>
            <Text>PRODUTO</Text>
            <Text>QTD</Text>
            <Text>PREÇO</Text>
          </View>
          <View style={styles.cartItems}>
            {cartItems.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartProductImage} />
                <View style={styles.cartProductDetails}>
                  <Text>{item.name}</Text>
                  <Text style={styles.cartProductPrice}>
                    {item.price ? `R$${item.price.toFixed(2).replace('.', ',')}` : 'Preço não disponível'}
                  </Text>
                </View>
                <Text style={styles.cartQuantity}>{item.quantity}</Text>
                <Text style={styles.cartTotalPrice}>
                  {item.total ? `R$${item.total.toFixed(2).replace('.', ',')}` : 'Total não disponível'}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.cartFooter}>
            <Button title="FINALIZAR PEDIDO" onPress={handleCheckout} color="green" />
            <Text>
              TOTAL <Text>R${total.toFixed(2).replace('.', ',')}</Text>
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

export default CartScreen;
