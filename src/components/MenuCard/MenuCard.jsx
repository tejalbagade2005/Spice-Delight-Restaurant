import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ food }) => {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart(food);
    navigate("/cart");
  };

  return (
    <div className="food-card">

      <img src={food.image} alt={food.name} />

      <h3>{food.name}</h3>
      <p>₹{food.price}</p>

      <button onClick={handleAdd} className="add-btn">
        <FaShoppingCart />
      </button>


      <button onClick={() => navigate("/menu")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default MenuCard;