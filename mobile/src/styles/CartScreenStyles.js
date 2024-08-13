// styles/CartScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cartItems: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cartProductImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  cartProductDetails: {
    flex: 1,
    marginLeft: 16,
  },
  cartProductPrice: {
    fontSize: 16,
    color: '#888',
  },
  cartQuantity: {
    alignSelf: 'center',
  },
  cartTotalPrice: {
    alignSelf: 'center',
  },
  cartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
