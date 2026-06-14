import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import "./Orders.css";

const MyOrders = () => {

  const { orders, loading, error, deleteOrders, deleteOrder, fetchOrders } = useContext(CartContext);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("=== [MY ORDERS COMPONENT] ===");
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Orders count:", Array.isArray(orders) ? orders.length : "not an array");
  console.log("All orders:", orders);

  const safeOrders = Array.isArray(orders) ? orders : [];
  const ordersTotalPrice = safeOrders.reduce((sum, order) => {
    const price = order.price ?? 0;
    if (typeof price === 'number') {
      return sum + price;
    }
    return sum;
  }, 0);

  const paymentLabels = {
    COD: 'Cash on Delivery',
    ONLINE: 'Online Payment'
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Delete all order history?')) {
      return;
    }
    const success = await deleteOrders();
    if (success) {
      alert('All orders deleted successfully');
    }
  };

  const handleDelete = async (orderId) => {
    console.log("Delete clicked:", orderId);
    if (!window.confirm(`Delete order #${orderId}?`)) {
      return;
    }

    const success = await deleteOrder(orderId);
    if (!success) {
      alert('Failed to delete order. See console for details.');
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-page__header">
        <div>
          <h2 className="orders-page__title">My Orders</h2>
          <p className="orders-page__summary">
            Total orders: {safeOrders.length} • Total value: ₹{ordersTotalPrice.toFixed(2)}
          </p>
        </div>
        <button className="orders-page__clear-button" onClick={handleClearHistory}>
          Clear Order History
        </button>
      </div>

      {error && (
        <div className="orders-page__error">
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div className="orders-page__loading">
          ⏳ Loading orders...
        </div>
      )}

      {!loading && safeOrders.length === 0 ? (
        <p className="orders-page__empty">No Orders Yet</p>
      ) : (
        safeOrders.map((order, index) => {
          return (
            <div className="order-card" key={order.id || index}>
              <div className="order-card__summary">
                <img
                  src={order.image || "https://via.placeholder.com/200?text=Order"}
                  width="100"
                  height="100"
                  className="order-card__image"
                  alt={order.name || "Order"}
                />
                <div className="order-card__content">
                  <h3 className="order-card__name">{order.name || "Order Item"}</h3>
                  <p className="order-card__meta"><span>Quantity:</span> {order.quantity ?? 1}</p>
                  <p className="order-card__meta"><span>Price:</span> ₹{order.price?.toFixed(2) || "0.00"}</p>
                  <p className="order-card__meta"><span>Payment Method:</span> {paymentLabels[order.paymentMethod] || paymentLabels[order.payment_method] || 'Cash on Delivery'}</p>
                  <p className="order-card__meta"><span>Date:</span> {order.date || "No Date"}</p>
                  <button className="order-card__delete-button" onClick={() => handleDelete(order.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;