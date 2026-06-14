import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";



const Cart = () => {

  const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext);

  const navigate = useNavigate();

  const itemsTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const gst = itemsTotal * 0.05;

  const delivery = 20;

  const finalTotal = itemsTotal + gst + delivery;

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is Empty</p>}

      {Array.isArray(cart) && cart.map((item) => (
        <div key={item.id}>

          <h3>{item.name}</h3>

          <p>₹{item.price}</p>

          <div>

        

            <button onClick={() => decreaseQty(item.id)}>-</button>

            <span>{item.qty}</span>

            <button onClick={() => increaseQty(item.id)}>+</button>

          </div>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>

        </div>
      ))}

      {/* Bill Section */}

      <div className="bill">

        <h3>Bill Details</h3>

        <p>Items Total : ₹{itemsTotal}</p>

        <p>GST (5%) : ₹{gst.toFixed(2)}</p>

        <p>Delivery Charge : ₹{delivery}</p>

        <hr />

        <h2>Total Bill : ₹{finalTotal.toFixed(2)}</h2>

        <button onClick={() => navigate("/checkout")}>
          Checkout
        </button>

      </div>

    </div>
  );
};

export default Cart;