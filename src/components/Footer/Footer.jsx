import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__glow" />

      <div className="footer-container section-shell">
        <div className="footer-about">
          <div className="footer-brand">Foodies</div>
          <p>
            Premium food delivery with chef-inspired meals, fast service,
            and a beautifully curated dining experience at home.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://youtube.com" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>My Orders</li>
            <li>Checkout</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p><FaPhoneAlt /> +91 9422886320</p>
          <p><FaEnvelope /> hello@foodies.com</p>
          <p><FaMapMarkerAlt /> Pune, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Foodies. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;