import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { CartContext } from "../../context/CartContext";

const Menu = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("https://spring-boot-backend-production-58ff.up.railway.app/api/foods");
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to fetch foods`);
        }
        
        const data = await res.json();
        console.log("✅ Foods fetched successfully:", data.length, "items");

        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setError("Invalid data format received");
        }
      } catch (err) {
        console.error("❌ Error fetching foods:", err.message);
        setError(err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <section className="menu">
      <h2>Our Delicious Menu</h2>

      {error && (
        <div style={{
          backgroundColor: "#fee",
          color: "#c33",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #f99"
        }}>
          ❌ Error: {error}
        </div>
      )}

      {loading && (
        <div style={{
          textAlign: "center",
          padding: "20px",
          color: "#666"
        }}>
          ⏳ Loading menu...
        </div>
      )}

      <div className="menu-container">
        {!loading && items.length === 0 ? (
          <p>No items available</p>
        ) : (
          items.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="card-image">
                <img
                  src={item.image || "https://via.placeholder.com/200"}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-price">₹{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Menu;