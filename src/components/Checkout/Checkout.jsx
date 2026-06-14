import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaShieldAlt,
  FaMobileAlt,
  FaCheckCircle,
  FaShoppingBag,
  FaStar
} from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const { cart, placeOrder, loading, error, setError, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentState, setPaymentState] = useState("idle");

  const orderSummary = useMemo(() => {
    const items = Array.isArray(cart) ? cart : [];
    const summaryCount = items.reduce((total, item) => total + (item.qty ?? 1), 0);
    return {
      items,
      summaryCount,
      total: totalPrice || items.reduce((sum, item) => sum + (item.price ?? 0) * (item.qty ?? 1), 0)
    };
  }, [cart, totalPrice]);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, [setError]);

  const handleOrder = async () => {
    setError(null);
    setSuccessMessage("");
    setPaymentError("");

    if (!cart || cart.length === 0) {
      setError("Cart is empty. Add at least one item before confirming your order.");
      return;
    }

    if (!paymentMethod) {
      setPaymentError("Please select a payment method before placing your order.");
      return;
    }

    if (paymentMethod === "ONLINE") {
      setPaymentState("processing");
      setSuccessMessage("");

      setTimeout(async () => {
        setPaymentState("paid");
        const success = await placeOrder("ONLINE");

        if (success) {
          navigate("/success", {
            state: {
              paymentMethod: "ONLINE",
              orderType: "online-payment",
              itemCount: orderSummary.summaryCount,
              total: orderSummary.total
            }
          });
        } else {
          setPaymentState("idle");
        }
      }, 1200);

      return;
    }

    const success = await placeOrder("COD");

    if (success) {
      setSuccessMessage("✅ Order placed successfully. Redirecting to My Orders...");
      setTimeout(() => {
        navigate("/my-orders");
      }, 650);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-page__shell">
        <div className="checkout-hero">
          <span className="checkout-hero__eyebrow">Premium checkout experience</span>
          <h2>Checkout</h2>
          <p>Please confirm your order. Select a payment method and we will handle the rest.</p>
        </div>

        <div className="checkout-layout">
          <section className="checkout-panel checkout-panel--summary">
            <div className="panel-heading">
              <span><FaShoppingBag /> Order Summary</span>
            </div>

            <div className="summary-list">
              {orderSummary.items.map((item) => (
                <article className="summary-item" key={item.id}>
                  <img src={item.image || "https://via.placeholder.com/120?text=Food"} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.qty ?? 1}</p>
                    <p>Total Price: ₹{((item.price ?? 0) * (item.qty ?? 1)).toFixed(2)}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="summary-footer">
              <div>
                <span>Items</span>
                <strong>{orderSummary.summaryCount}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>₹{orderSummary.total.toFixed(2)}</strong>
              </div>
            </div>
          </section>

          <section className="checkout-panel checkout-panel--payment">
            <div className="panel-heading">
              <span><FaShieldAlt /> Payment Method</span>
            </div>

            <div className="payment-grid">
              <label className={`payment-card ${paymentMethod === "COD" ? "is-selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(event) => {
                    setPaymentMethod(event.target.value);
                    setPaymentError("");
                  }}
                />
                <div className="payment-card__icon"><FaMoneyBillWave /></div>
                <div className="payment-card__content">
                  <strong>Cash on Delivery (COD)</strong>
                  <p>Pay when your order is delivered.</p>
                </div>
              </label>

              <label className={`payment-card ${paymentMethod === "ONLINE" ? "is-selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(event) => {
                    setPaymentMethod(event.target.value);
                    setPaymentError("");
                  }}
                />
                <div className="payment-card__icon"><FaCreditCard /></div>
                <div className="payment-card__content">
                  <strong>Online Payment</strong>
                  <p>Pay securely using UPI, Debit Card, Credit Card, Net Banking.</p>
                  <div className="payment-card__subtext">
                    <FaMobileAlt /> UPI
                    <FaStar /> Secure
                    <FaCheckCircle /> Instant confirmation
                  </div>
                </div>
              </label>
            </div>

            {paymentError && <div className="checkout-error">{paymentError}</div>}
            {error && <div className="checkout-error checkout-error--danger">Unable to place order: {error}</div>}
            {paymentState === "processing" && (
              <div className="checkout-success checkout-success--processing">Processing secure payment...</div>
            )}
            {successMessage && <div className="checkout-success">{successMessage}</div>}

            <button
              onClick={handleOrder}
              disabled={loading || !cart || cart.length === 0 || paymentState === "processing"}
              className="checkout-submit"
              type="button"
            >
              {paymentState === "processing"
                ? "⏳ Processing payment..."
                : loading
                  ? "⏳ Processing order..."
                  : paymentMethod === "ONLINE"
                    ? "Pay & Place Order"
                    : "Confirm Order"}
            </button>

            <p className="checkout-note">
              By confirming, you agree to complete your selected payment method for this order.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;