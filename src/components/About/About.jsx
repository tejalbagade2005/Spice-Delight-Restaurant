import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaRegSmile,
  FaClock,
  FaHeart,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaStar,
  FaCoffee,
  FaUtensils,
  FaQuoteLeft
} from "react-icons/fa";
import "./About.css";

const missionCards = [
  {
    title: "Fresh Ingredients",
    icon: <FaLeaf />,
    description: "Seasonal produce, premium beans, and thoughtfully sourced ingredients in every recipe."
  },
  {
    title: "Exceptional Taste",
    icon: <FaCoffee />,
    description: "Elegant flavor profiles inspired by luxury cafes and chef-led restaurant experiences."
  },
  {
    title: "Fast Service",
    icon: <FaClock />,
    description: "Carefully prepared dishes delivered quickly without compromising presentation or quality."
  },
  {
    title: "Customer Satisfaction",
    icon: <FaRegSmile />,
    description: "Warm hospitality, responsive support, and an experience that keeps guests returning."
  }
];

const chefs = [
  {
    name: "Chef Arjun Rao",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chef Mira Kapoor",
    role: "Pastry & Dessert Chef",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chef Rohan Mehta",
    role: "Coffee & Kitchen Lead",
    image: "https://images.unsplash.com/photo-1556911073-a517e752729c?auto=format&fit=crop&w=800&q=80"
  }
];

const loveCards = [
  {
    title: "Premium Coffee",
    icon: <FaCoffee />,
    text: "Curated espresso, signature pours, and handcrafted drinks with balanced aroma and depth."
  },
  {
    title: "Fresh Food",
    icon: <FaUtensils />,
    text: "Chef-prepared meals served with premium ingredients and a focus on freshness.",
  },
  {
    title: "Cozy Atmosphere",
    icon: <FaHeart />,
    text: "Warm lighting, luxe interiors, and a dining experience designed to feel inviting and calm.",
  },
  {
    title: "Friendly Service",
    icon: <FaRegSmile />,
    text: "Attentive service, thoughtful recommendations, and a hospitality-first mindset.",
  }
];

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 100, suffix: "+", label: "Dishes" },
  { value: 24, suffix: "/7", label: "Service" }
];

const gallery = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80"
];

const About = () => {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [countValues, setCountValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1300;
        let frameId;

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCountValues(stats.map(({ value }) => Math.round(value * eased)));

          if (progress < 1) {
            frameId = requestAnimationFrame(step);
          }
        };

        frameId = requestAnimationFrame(step);
        observer.disconnect();

        return () => cancelAnimationFrame(frameId);
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="luxury-page about-page">
      <section className="luxury-hero luxury-hero--about">
        <div className="luxury-hero__overlay" />
        <div className="luxury-hero__content section-shell">
          <span className="luxury-pill reveal">Crafted for coffee lovers and food enthusiasts</span>
          <h1 className="reveal">Our Story</h1>
          <p className="luxury-subtitle reveal">
            A premium café and restaurant experience inspired by warm hospitality,
            artisanal coffee culture, and chef-driven comfort food.
          </p>
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="about-story-grid">
          <div className="luxury-card story-card">
            <span className="section-kicker">About us</span>
            <h2>Where rich coffee aromas meet refined dining.</h2>
            <p>
              Foodies began as a simple idea: create a place where premium café culture and
              memorable dining could feel effortless. From the first pour to the final plate,
              every detail is designed to feel warm, polished, and elevated.
            </p>
            <p>
              We blend fresh ingredients, elegant plating, and thoughtful service to build a space
              that feels as inviting as a neighborhood café and as refined as a luxury restaurant.
            </p>
            <button className="btn btn--primary" type="button" onClick={() => navigate("/menu")}>
              Explore Menu
            </button>
          </div>

          <div className="about-image-panel">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury cafe interior"
            />
            <div className="about-image-panel__badge">
              <FaQuoteLeft />
              <div>
                <strong>Designed to feel premium</strong>
                <span>Soft light, rich textures, and calm hospitality.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="section-heading section-heading--row">
          <div>
            <span>Mission and vision</span>
            <h2>Built around quality, comfort, and consistency.</h2>
          </div>
        </div>

        <div className="mission-grid">
          {missionCards.map((card, index) => (
            <article className="luxury-card mission-card" key={card.title} style={{ animationDelay: `${index * 100}ms` }}>
              <div className="mission-card__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="section-heading section-heading--row">
          <div>
            <span>Meet our chefs</span>
            <h2>The hands behind every signature plate.</h2>
          </div>
          <div className="social-inline">
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="chef-grid">
          {chefs.map((chef, index) => (
            <article className="luxury-card chef-card" key={chef.name} style={{ animationDelay: `${index * 100}ms` }}>
              <img src={chef.image} alt={chef.name} className="chef-card__image" />
              <h3>{chef.name}</h3>
              <p>{chef.role}</p>
              <div className="chef-card__stars">
                {[...Array(5)].map((_, starIndex) => <FaStar key={starIndex} />)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="section-heading">
          <span>Why customers love us</span>
          <h2>Every visit feels warm, polished, and memorable.</h2>
        </div>

        <div className="love-grid">
          {loveCards.map((card, index) => (
            <article className="luxury-card love-card" key={card.title} style={{ animationDelay: `${index * 90}ms` }}>
              <div className="love-card__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell luxury-section luxury-section--stats reveal" ref={statsRef}>
        <div className="stats-grid stats-grid--about">
          {stats.map((stat, index) => (
            <article className="luxury-card stat-card" key={stat.label} style={{ animationDelay: `${index * 100}ms` }}>
              <strong>{countValues[index]}{stat.suffix}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell luxury-section reveal">
        <div className="section-heading">
          <span>Gallery</span>
          <h2>A glimpse into our café interiors and food photography.</h2>
        </div>

        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <div className={`gallery-item gallery-item--${index % 3 === 0 ? 'wide' : 'tall'}`} key={image}>
              <img src={image} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;