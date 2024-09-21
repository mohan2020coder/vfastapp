import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.cart.find(item => item.id === action.product.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: 1 }],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.product.id),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Ensure quantity doesn't go below 1
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
