import React, { createContext, useCallback, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ORDERS_API = "https://spring-boot-backend-production-58ff.up.railway.app/api/orders";
  const ORDERS_COLLECTION_API = ORDERS_API;
  const orderByIdUrl = (orderId) => '${ORDERS_API}/${orderId}';
  const getResponseErrorMessage = useCallback(async (res) => {
    let text = "";
    try {
      text = await res.text();
    } catch (err) {
      text = "";
    }
    return text ? `${res.status} ${res.statusText}: ${text}` : `${res.status} ${res.statusText}`;
  }, []);

  const normalizeFetchError = useCallback((error) => {
    if (!error) return "Unknown error occurred while contacting the backend.";
    const message = error.message || String(error);
    if (/Failed to fetch|NetworkError|Failed to execute 'fetch'/.test(message)) {
      return `Cannot connect to backend at ${ORDERS_API}. Make sure the backend is running and accessible.`;
    }
    return message;
  }, [ORDERS_API]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 [FETCH ORDERS] Fetching from', ORDERS_API);
      
      const res = await fetch(ORDERS_COLLECTION_API, { method: 'GET', mode: 'cors' });
      console.log('📨 [FETCH ORDERS] Response object:', res);
      console.log('📨 [FETCH ORDERS] Response status:', res.status);
      
      if (!res.ok) {
        const message = await getResponseErrorMessage(res);
        throw new Error(message);
      }
      
      const data = await res.json();
      console.log("✅ [FETCH ORDERS] Raw API response:", data);
      console.log("📥 [FETCH ORDERS] Parsed JSON data:", data);

      const source = Array.isArray(data) ? data : [];
      console.log('📦 [FETCH ORDERS] Order count:', source.length);

      const mappedOrders = source.map((order, idx) => {
        const mappedOrder = {
          id: order.id,
          name: order.name || 'No Name',
          price: order.price ?? 0,
          quantity: order.quantity ?? 1,
          image: order.image || '',
          date: order.date || '',
          paymentMethod: order.paymentMethod || order.payment_method || 'COD'
        };
        
        console.log(`   Order ${idx + 1}:`, { id: order.id, name: order.name, price: order.price, image: order.image, date: order.date });
        
        return mappedOrder;
      });

      console.log("✅ [FETCH ORDERS] Mapped orders for frontend:", mappedOrders);
      setOrders(mappedOrders);
      setLoading(false);
    } catch (err) {
      const message = normalizeFetchError(err);
      console.error("❌ [FETCH ORDERS] Error:", message);
      console.error('   Full error:', err);
      setError(message);
      setLoading(false);
      setOrders([]); // Clear orders on error
    }
  }, [ORDERS_COLLECTION_API, ORDERS_API, getResponseErrorMessage, normalizeFetchError]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const addToCart = (item) => {

    const exist = cart.find((x) => x.id === item.id);

    if (exist) {

      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );

    } else {

      setCart([...cart, { ...item, qty: 1 }]);

    }

  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map((item) =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const placeOrder = async (paymentMethod = 'COD') => {
    if (cart.length === 0) {
      setError("Cart is empty");
      console.warn('⚠️  Cannot place order: Cart is empty');
      return false;
    }

    // Log cart items for debugging
    console.log('🛒 [PLACE ORDER] Cart items:');
    cart.forEach((item, idx) => {
      console.log(`   Item ${idx + 1}:`, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        image: item.image,
        qty: item.qty
      });
    });

    try {
      setLoading(true);
      setError(null);
      
      // Send each item as separate order
      for (const item of cart) {
        const quantity = Number(item.qty ?? 1);
        const normalizedPaymentMethod = paymentMethod === 'ONLINE' ? 'ONLINE' : 'COD';
        const orderData = {
          name: item.name || 'Unknown Item',
          price: Number((item.price ?? 0) * quantity),
          quantity,
          image: item.image || '',
          date: new Date().toISOString(),
          paymentMethod: normalizedPaymentMethod
        };

        console.log('🚀 [PLACE ORDER] Sending POST for item:', orderData);
        
        const res = await fetch(ORDERS_COLLECTION_API, {
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });

        console.log('📨 [PLACE ORDER] Response object:', res);
        console.log('📨 [PLACE ORDER] Response status for', item.name, ':', res.status);

        if (!res.ok) {
          const message = await getResponseErrorMessage(res);
          if (res.status === 404) {
            throw new Error(`Backend endpoint not found: ${ORDERS_API} (404). Confirm POST /orders is available.`);
          }
          if (res.status === 405) {
            throw new Error(`Method not allowed: POST ${ORDERS_API} (405). Confirm the backend accepts POST requests on /orders.`);
          }
          if (res.status === 500) {
            throw new Error(`Server error saving order: ${message}`);
          }
          console.error('❌ [PLACE ORDER] HTTP Error for', item.name, ':', message);
          throw new Error(message);
        }

        const response = await res.json();
        console.log("✅ [PLACE ORDER] API Response for", item.name, ":", response);
      }

      console.log('✨ [PLACE ORDER] All orders placed successfully!');
      setCart([]);
      await fetchOrders(); // Refresh orders
      setLoading(false);
      return true; // Success
    } catch (err) {
      const message = normalizeFetchError(err);
      console.error("❌ [PLACE ORDER] ERROR:", message);
      console.error("❌ [PLACE ORDER] Error object:", err);
      setError(message);
      setLoading(false);
      return false; // Failure
    }
  };

  const deleteOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🗑️ [DELETE ORDERS] Sending DELETE request to', ORDERS_COLLECTION_API);
      const res = await fetch(ORDERS_COLLECTION_API, {
        method: "DELETE",
        mode: 'cors'
      });

      console.log('📨 [DELETE ORDERS] Response status:', res.status);
      const text = await res.text();
      console.log('📨 [DELETE ORDERS] Response body:', text);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Delete failed (${text})`);
      }

      setOrders([]);
      await fetchOrders();
      setLoading(false);
      return true;
    } catch (err) {
      console.error('❌ [DELETE ORDERS] Error:', err.message);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const url = orderByIdUrl(orderId);
      console.log('🗑️ [DELETE ORDER] Sending DELETE request to', url);
      const res = await fetch(url, {
        method: "DELETE",
        mode: 'cors'
      });

      console.log('📨 [DELETE ORDER] Response status:', res.status);
      const text = await res.text();
      console.log('📨 [DELETE ORDER] Response body:', text);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Delete failed (${text})`);
      }

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      setLoading(false);
      return true;
    } catch (err) {
      console.error('❌ [DELETE ORDER] Error:', err.message);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeItem,
      increaseQty,
      decreaseQty,
      totalPrice,
      orders,
      placeOrder,
      deleteOrders,
      deleteOrder,
      fetchOrders,
      loading,
      error,
      setError
    }}>
      {children}
    </CartContext.Provider>
  );

};