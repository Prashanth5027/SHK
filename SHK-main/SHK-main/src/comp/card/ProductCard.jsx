import React from "react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <img src={product.src} alt={product.name} style={{ width: "100%" }} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Bag</button>
    </div>
  );
}
