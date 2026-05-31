import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
