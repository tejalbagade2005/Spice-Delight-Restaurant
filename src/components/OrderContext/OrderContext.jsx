const handleOrder = async () => {

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  await placeOrder();   // wait karega

  alert("Order Placed Successfully! 🎉");

  navigate("/success");
};