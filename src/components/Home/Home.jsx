import React, { useContext, useMemo, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import {
  FaStar,
  FaTruck,
  FaLeaf,
  FaAward,
  FaClock,
  FaPizzaSlice,
  FaHamburger,
  FaGlassWhiskey,
  FaIceCream,
  FaUtensils,
  FaChevronRight,
  FaQuoteLeft
} from "react-icons/fa";
import "./Home.css";

const featuredFoods = [
  {
    id: 101,
    name: "Truffle Cheese Burger",
    price: 349,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 102,
    name: "Margherita Pizza",
    price: 429,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 103,
    name: "Creamy Alfredo Pasta",
    price: 319,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 104,
    name: "Berry Cheesecake",
    price: 249,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80"
  }
];

const categories = [
  { name: "Pizza", icon: <FaPizzaSlice /> },
  { name: "Burger", icon: <FaHamburger /> },
  { name: "Pasta", icon: <FaUtensils /> },
  { name: "Drinks", icon: <FaGlassWhiskey /> },
  { name: "Desserts", icon: <FaIceCream /> }
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Food lover",
    avatar: "https://i.pravatar.cc/160?img=12",
    text: "The delivery is consistently fast, the food looks premium, and every order feels restaurant-quality."
  },
  {
    name: "Nisha Sharma",
    role: "Busy professional",
    avatar: "https://i.pravatar.cc/160?img=47",
    text: "Beautiful UI, great menu, and the order process is smooth. It feels like a premium brand experience."
  },
  {
    name: "Rahul Verma",
    role: "Weekend foodie",
    avatar: "https://i.pravatar.cc/160?img=31",
    text: "Fresh ingredients, stylish presentation, and fast delivery. Exactly what I expect from a modern food app."
  }
];

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 100, suffix: "+", label: "Menu Items" },
  { value: 24, suffix: "/7", label: "Service" },
  { value: 100, suffix: "%", label: "Fresh Food" }
];

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const featuredRef = useRef(null);
  const [countValues, setCountValues] = useState(stats.map(() => 0));

  const heroHighlights = useMemo(() => ([
    { title: "Fast Delivery", description: "Lightning quick dispatch with live order tracking.", icon: <FaTruck /> },
    { title: "Fresh Ingredients", description: "Chef-picked ingredients and premium quality every time.", icon: <FaLeaf /> },
    { title: "Best Quality", description: "Highly rated dishes crafted for a memorable dining experience.", icon: <FaAward /> },
    { title: "24/7 Service", description: "Order any time, day or night, with consistent support.", icon: <FaClock /> }
  ]), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 1400;
        const start = performance.now();
        let frameId;

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCountValues(stats.map(({ value }) => Math.round(value * eased)));

          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          }
        };

        frameId = requestAnimationFrame(tick);
        observer.disconnect();

        return () => cancelAnimationFrame(frameId);
      },
      { threshold: 0.35 }
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (food) => {
    addToCart({ ...food, qty: 1 });
    navigate("/cart");
  };

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__bg" />
        <div className="hero__content section-shell">
          <div className="hero__copy">
            <span className="hero__eyebrow">Premium food delivery experience</span>
            <h1>Delicious Food Delivered To Your Doorstep</h1>
            <p>
              Discover chef-crafted meals, premium ingredients, and a seamless ordering experience inspired by the best food apps.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" type="button" onClick={() => navigate("/menu")}>Order Now</button>
              <button className="btn btn--ghost" type="button" onClick={scrollToFeatured}>Explore Menu</button>
            </div>
            <div className="hero__proof">
              <div>
                <strong>4.9/5</strong>
                <span>Customer rating</span>
              </div>
              <div>
                <strong>30 min</strong>
                <span>Average delivery</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Fresh guarantee</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero-card hero-card--main">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                alt="Elegant food spread"
              />
              <div className="hero-card__badge">Chef's Special</div>
            </div>
            <div className="hero-card hero-card--floating">
              <FaStar />
              <div>
                <strong>Top Rated Restaurant</strong>
                <span>Premium taste, exceptional service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-block section-block--intro reveal">
        <div className="section-heading">
          <span>Why choose Foodies</span>
          <h2>Built for speed, taste, and a premium dining feel.</h2>
        </div>

        <div className="feature-grid">
          {heroHighlights.map((feature, index) => (
            <article className="feature-card" key={feature.title} style={{ animationDelay: `${index * 120}ms` }}>
              <div className="feature-card__icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-block reveal" ref={featuredRef}>
        <div className="section-heading section-heading--row">
          <div>
            <span>Featured foods</span>
            <h2>Handpicked dishes loved by our customers.</h2>
          </div>
          <button className="text-link" type="button" onClick={() => navigate("/menu")}>
            View full menu <FaChevronRight />
          </button>
        </div>

        <div className="food-grid">
          {featuredFoods.map((food, index) => (
            <article className="food-card" key={food.id} style={{ animationDelay: `${index * 120}ms` }}>
              <div className="food-card__image-wrap">
                <img src={food.image} alt={food.name} className="food-card__image" />
                <span className="food-card__price">₹{food.price}</span>
              </div>
              <div className="food-card__body">
                <div className="food-card__rating">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar key={starIndex} className={starIndex < Math.round(food.rating) ? "is-filled" : ""} />
                  ))}
                  <span>{food.rating}</span>
                </div>
                <h3>{food.name}</h3>
                <p>Premium quality ingredients, carefully plated and ready to delight.</p>
                <button className="btn btn--primary btn--full" type="button" onClick={() => handleAddToCart(food)}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-block reveal">
        <div className="section-heading">
          <span>Popular categories</span>
          <h2>Quick paths to the dishes customers order most.</h2>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={category.name} style={{ animationDelay: `${index * 90}ms` }}>
              <div className="category-card__icon">{category.icon}</div>
              <strong>{category.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-block reveal">
        <div className="section-heading">
          <span>Customer stories</span>
          <h2>People return for the service, quality, and presentation.</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <article className="testimonial-card" key={testimonial.name} style={{ animationDelay: `${index * 120}ms` }}>
              <FaQuoteLeft className="testimonial-card__quote" />
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, starIndex) => <FaStar key={starIndex} />)}
              </div>
              <p>{testimonial.text}</p>
              <div className="testimonial-card__author">
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-block section-block--stats reveal">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <article className="stat-card" key={stat.label} style={{ animationDelay: `${index * 120}ms` }}>
              <strong>{countValues[index]}{stat.suffix}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;