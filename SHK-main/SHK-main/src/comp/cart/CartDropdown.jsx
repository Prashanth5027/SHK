import React from "react";
import { useCart } from "../../context/CartContext";

export default function CartDropdown() {
  const { cartItems, isOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "40px",
        right: "10px",
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
        width: "250px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}
    >
      <h4>Cart</h4>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {cartItems.map((item, index) => (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #eee",
                padding: "5px 0"
              }}
            >
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
