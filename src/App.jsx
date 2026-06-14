import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Menu from "./components/Menu/Menu";
import Reviews from "./components/Reviews/Reviews";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import Orders from "./components/My Orders/Orders";
import Success from "./components/Success/Success";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;