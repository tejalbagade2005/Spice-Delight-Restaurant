import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaShoppingBag, FaArrowRight } from "react-icons/fa";
import "./Success.css";

const paymentLabels = {
  COD: "Cash on Delivery",
  ONLINE: "Online Payment"
};

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || "COD";
  const itemCount = location.state?.itemCount ?? 0;
  const total = location.state?.total ?? 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/my-orders", { replace: true });
    }, 2400);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="success-page">
      <section className="success-card">
        <div className="success-card__icon">
          <FaCheckCircle />
        </div>
        <span className="success-card__eyebrow">Payment successful</span>
        <h1>Order Placed Successfully!</h1>
        <p>
          Your {paymentLabels[paymentMethod] || paymentMethod} order has been confirmed and is now being prepared.
        </p>

        <div className="success-summary">
          <div>
            <FaShoppingBag />
            <span>{itemCount} items</span>
          </div>
          <div>
            <FaClock />
            <span>Redirecting soon</span>
          </div>
          <div>
            <FaArrowRight />
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button className="success-card__button" onClick={() => navigate("/my-orders") }>
          View My Orders
        </button>
      </section>
    </main>
  );
};

export default Success;