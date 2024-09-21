// Cart.js
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useCart } from './context/CartContext';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const increaseQuantity = (id) => {
    dispatch({ type: 'ADD_TO_CART', product: { id } });
  };

  const decreaseQuantity = (id) => {
    const product = cart.find(item => item.id === id);
    if (product) {
      if (product.quantity > 1) {
        dispatch({ type: 'DECREASE_QUANTITY', product: { id } });
      } else {
        dispatch({ type: 'REMOVE_FROM_CART', product: { id } });
      }
    }
  };


  const removeProduct = (id) => {
    const product = cart.find(item => item.id === id);
    if (product) {
        dispatch({ type: 'REMOVE_FROM_CART', product: { id } });
    }
  };
  
  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map(product => (
            <View key={product.id} style={styles.cartItem}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(product.id)}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{product.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(product.id)}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.productPrice}>${(product.price * product.quantity).toFixed(2)}</Text>
              <Button title="Remove" onPress={() => removeProduct(product.id)} />
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  productName: {
    flex: 2,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    width: 30,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
  },
  productPrice: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
