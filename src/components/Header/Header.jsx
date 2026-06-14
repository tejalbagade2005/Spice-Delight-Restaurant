import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

import { CartContext } from "../../context/CartContext";
import "./Header.css";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner section-shell">
        <Link to="/home" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo__mark">F</span>
          <span className="logo__text">
            <strong>Foodies</strong>
            <small>Premium delivery</small>
          </span>
        </Link>

        <button
          className="header__toggle"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
          <NavLink to="/home" className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`} onClick={() => setMenuOpen(false)}>
            Menu
          </NavLink>
          <NavLink to="/my-orders" className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`} onClick={() => setMenuOpen(false)}>
            My Orders
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`} onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`} onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </nav>

        <Link to="/cart" className="cart-icon" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart size={20} />
          <span className="cart-icon__label">Cart</span>
          <span className="cart-badge">{cart.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;