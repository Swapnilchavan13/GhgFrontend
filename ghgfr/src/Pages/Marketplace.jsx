import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/marketplace.css";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

export const Marketplace = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    axios
      .get("https://backend.climescore.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setCategories([
          ...new Set(response.data.map((product) => product.category)),
        ]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">ClimeScore</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/client/login">Measure Carbon Emission</Link>
          </li>
          <li>
            <Link to="/marketplacehome">Carbon Credits</Link>
          </li>
          <li>
            <Link to="/marketplace">Green Marketplace</Link>
          </li>
          <li>
            <Link to="/blog">Resources</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>From Measurement to Action</h1>
          <p>
            ClimeStore connects companies that measure their emissions with
            verified low-carbon products, materials, and services — enabling real
            Scope 3 reductions.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Explore Sustainable Suppliers</button>
            <button className="secondary-btn">List Your Green Solution</button>
          </div>
        </div>
      </section>

      {/* Why ClimeStore Exists */}
      <section className="why-section">
        <h2>Why ClimeStore Exists</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>Data-Driven Procurement</h3>
            <p>
              Integrates with ClimeScore results to match emission hotspots with
              relevant green alternatives.
            </p>
          </div>
          <div className="why-card">
            <h3>Verified Impact</h3>
            <p>
              Every product or service vetted for its lifecycle impact and
              certification.
            </p>
          </div>
          <div className="why-card">
            <h3>Collaborative Ecosystem</h3>
            <p>
              Suppliers, consultants, and innovators united under one Not Zero
              procurement platform.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Sustainable Categories */}
      <section className="categories-section">
        <h2>Explore Sustainable Categories</h2>
        <div className="filter-bar">
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleClick(product._id)}
            >
              <img
                src={`https://backend.climescore.com${product.images[0]}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>₹ {product.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Partner */}
      <section className="featured-section">
        <div className="featured-content">
          <h2>Featured Solution Partner</h2>
          <p>Join ClimeStore and become a verified supplier.</p>
          <button className="secondary-btn">See Our Verification Criteria</button>
        </div>
        <div className="for-suppliers">
          <h2>For Solution-Providers / Vendors</h2>
          <p>
            Have a climate-positive solution? Apply, get verified, and go live
            on ClimeStore.
          </p>
          <div className="steps">
            <div>1. Apply</div>
            <div>2. Verification & Audit</div>
            <div>3. Go Live</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
