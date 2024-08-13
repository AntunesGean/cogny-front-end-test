import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  const handleCheckout = () => {    
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.');
      navigate('/');
    } else {
      alert('Pedido finalizado com sucesso!');
      clearCart();
      navigate('/');
    }
  };

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio. Adicione produtos para continuar.</p>
      ) : (
        <>
          <div className="cart-header">
            <span></span>
            <span>PRODUTO</span>
            <span>QTD</span>
            <span>PREÇO</span>
          </div>
          <div className="cart-items">           
            {cartItems.map(item => (              
              <div key={item.id} className="cart-item">
                <div className="cart-product-image-container">
                  <img src={item.imagemURL} alt={item.descricao} className="cart-product-image" />
                </div>
                <div className="cart-product-details">
                  <span>{item.descricao}</span>
                  <span className="cart-product-price">
                    {item.preco ? `R$${item.preco.toFixed(2).replace('.', ',')}` : 'Preço não disponível'}
                  </span>
                </div>
                <div className="cart-quantity">
                  <input type="number" value={item.quantity} readOnly className="cart-quantity-input" />
                </div>
                <div className="cart-total-price">
                  R${item.total.toFixed(2).replace('.', ',')}
                </div>                              
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <button className="checkout-button" onClick={handleCheckout}>FINALIZAR PEDIDO</button>
            <div className="cart-total">
              TOTAL
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
