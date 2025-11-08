import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Marketplacehome.css";
import { Footer } from "./Footer";

export const MarketplaceHome = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://62.72.59.146:8080/getprojects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">ClimeScore</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/client/login">Measure Carbon Emission</Link></li>
          <li><Link to="/marketplacehome">Carbon Credits</Link></li>
          <li><Link to="/marketplace">Green Marketplace</Link></li>
          <li><Link to="/blog">Resources</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Browse Verified Carbon Credits</h1>
          <p>Only a small fraction of credits truly remove CO₂ permanently. Discover them here.</p>
          <div className="hero-buttons">
            <button>Browse Verified Credits</button>
            <button className="secondary">See Our Curation Process</button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="info-section">
        <h2>The Problem We Solve</h2>
        <ul>
          <li>The carbon market is flooded with unverifiable claims.</li>
          <li>Only a small fraction of credits truly remove CO₂ permanently.</li>
        </ul>
      </section>

      {/* Curation Framework */}
      <section className="framework-section">
        <h2>Our Curation Framework</h2>
        <div className="framework-points">
          <ul>
            <li>Scientific Validation</li>
            <li>Additionality</li>
          </ul>
          <ul>
            <li>Durability & Permanence</li>
            <li>Community & Co-benefits</li>
          </ul>
        </div>
        <button>Explore Our Scoring System</button>
      </section>

      {/* Explore Curated Credits */}
      <section className="credits-section">
        <h2>Explore Curated Credits</h2>
        <div className="project-grid">
          {projects.slice(0, 4).map((p) => (
            <div key={p._id} className="project-card" onClick={() => navigate(`/project/${p._id}`)}>
              <img
                src={`http://62.72.59.146:8080${p.photo}`}
                alt={p.projectName}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn.prod.website-files.com/63f86f47576a6732f24a776a/6623f07d9fef8cf1fd318213_Blog%20Banner%20(64).png";
                }}
              />
              <h3>{p.projectName}</h3>
              <p>{p.projectType}</p>
              <p>Price per tonne ₹{p.price}</p>
              <button>View Project Details</button>
            </div>
          ))}
        </div>
        <button className="see-all">See Full Catalog</button>
      </section>

      {/* Why Trust Us */}
      <section className="trust-section">
        <h2>Why Trust Us</h2>
        <p>Whether you're corporate partners, investors, or auditors — we ensure transparency and trust.</p>

        <div className="featured-card">
          <img
            src="https://cdn.prod.website-files.com/63f86f47576a6732f24a776a/6623f07d9fef8cf1fd318213_Blog%20Banner%20(64).png"
            alt="Featured Project"
          />
          <div>
            <h3>Featured Project / Story of Impact</h3>
            <ul>
              <li>Project helps restore soil and promote biodiversity</li>
            </ul>
            <button>Support This Project</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MarketplaceHome;
