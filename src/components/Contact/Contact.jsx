import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaCalendarAlt,
  FaUsers,
  FaGlassMartiniAlt
} from "react-icons/fa";
import "./Contact.css";

const contactCards = [
  {
    title: "Address",
    icon: <FaMapMarkerAlt />,
    text: "Fergusson College Rd, Shivajinagar, Pune, Maharashtra 411004"
  },
  {
    title: "Phone",
    icon: <FaPhoneAlt />,
    text: "+91 94228 86320"
  },
  {
    title: "Email",
    icon: <FaEnvelope />,
    text: "hello@foodies.com"
  },
  {
    title: "Working Hours",
    icon: <FaClock />,
    text: "Mon - Sun: 8:00 AM - 11:00 PM"
  }
];

const socialLinks = [
  { label: "Instagram", icon: <FaInstagram />, href: "https://instagram.com" },
  { label: "Facebook", icon: <FaFacebookF />, href: "https://facebook.com" },
  { label: "WhatsApp", icon: <FaWhatsapp />, href: "https://whatsapp.com" },
  { label: "Twitter", icon: <FaTwitter />, href: "https://twitter.com" }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    date: "",
    time: "",
    guests: "2"
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!formData.message.trim()) nextErrors.message = "Message is required.";
    if (!formData.date) nextErrors.date = "Please choose a reservation date.";
    if (!formData.time) nextErrors.time = "Please choose a reservation time.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      date: "",
      time: "",
      guests: "2"
    });
  };

  return (
    <main className="luxury-page contact-page">
      <section className="luxury-hero luxury-hero--contact">
        <div className="luxury-hero__overlay" />
        <div className="luxury-hero__content section-shell">
          <span className="luxury-pill reveal">Reservations, inquiries, and private events</span>
          <h1 className="reveal">Get In Touch</h1>
          <p className="luxury-subtitle reveal">
            Reach out for table reservations, special occasions, catering requests,
            or simply to say hello. We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="contact-cards-grid">
          {contactCards.map((card, index) => (
            <article className="luxury-card contact-info-card" key={card.title} style={{ animationDelay: `${index * 100}ms` }}>
              <div className="contact-info-card__icon">{card.icon}</div>
              <strong>{card.title}</strong>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="contact-layout">
          <form className="luxury-card contact-form" onSubmit={handleSubmit} noValidate>
            <div className="section-heading">
              <span>Contact form</span>
              <h2>Send us a message or request a reservation.</h2>
            </div>

            {submitted && (
              <div className="form-success">
                Thanks, your message has been submitted successfully.
              </div>
            )}

            <div className="form-grid">
              <label>
                <span>Name</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" />
                {errors.email && <small>{errors.email}</small>}
              </label>
              <label>
                <span>Phone</span>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
                {errors.phone && <small>{errors.phone}</small>}
              </label>
              <label>
                <span>Subject</span>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Reservation or query" />
                {errors.subject && <small>{errors.subject}</small>}
              </label>
              <label>
                <span>Reservation Date</span>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
                {errors.date && <small>{errors.date}</small>}
              </label>
              <label>
                <span>Reservation Time</span>
                <input type="time" name="time" value={formData.time} onChange={handleChange} />
                {errors.time && <small>{errors.time}</small>}
              </label>
              <label>
                <span>Guests</span>
                <select name="guests" value={formData.guests} onChange={handleChange}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((guestCount) => (
                    <option key={guestCount} value={guestCount}>{guestCount} guests</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-message">
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about your reservation, celebration, or event"
              />
              {errors.message && <small>{errors.message}</small>}
            </label>

            <button className="btn btn--primary contact-submit" type="submit">
              Send Message
            </button>
          </form>

          <div className="contact-sidebar">
            <div className="luxury-card map-card">
              <div className="section-heading">
                <span>Find us</span>
                <h2>Visit our café and restaurant.</h2>
              </div>
              <div className="map-frame">
                <iframe
                  title="Foodies location map"
                  src="https://www.google.com/maps?q=Fergusson%20College%20Rd%20Shivajinagar%20Pune&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="luxury-card reservation-card">
              <div className="section-heading">
                <span>Book a table</span>
                <h2>Plan your next premium dining experience.</h2>
              </div>
              <p>
                Reserve a cozy table for coffee, brunch, or dinner and let us prepare everything in advance.
              </p>
              <div className="reservation-meta">
                <FaCalendarAlt />
                <span>Flexible date and time selection</span>
              </div>
              <div className="reservation-meta">
                <FaUsers />
                <span>Perfect for small groups and celebrations</span>
              </div>
              <div className="reservation-meta">
                <FaGlassMartiniAlt />
                <span>Special arrangements available on request</span>
              </div>
            </div>

            <div className="luxury-card social-card">
              <div className="section-heading">
                <span>Social media</span>
                <h2>Follow our latest menus and updates.</h2>
              </div>
              <div className="social-grid">
                {socialLinks.map((social) => (
                  <a className="social-grid__item" href={social.href} key={social.label} target="_blank" rel="noreferrer">
                    {social.icon}
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;