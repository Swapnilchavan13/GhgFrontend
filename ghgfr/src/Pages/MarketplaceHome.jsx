import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Marketplacehome.css";

export const MarketplaceHome = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
    rating: "",
  });

  const navigate = useNavigate();

  // Fetch projects from backend API
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

  // Apply filters
  const filteredProjects = projects.filter((p) => {
    return (
      (filters.search === "" ||
        p.projectName.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.type === "" || p.projectType === filters.type) &&
      (filters.location === "" || p.location === filters.location) &&
      (filters.rating === "" || p.rating === filters.rating)
    );
  });

  return (
    <div className="marketplace-container">
      <h2>🌍 Carbon Credit Marketplace</h2>

      {/* Search & Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by project name..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Project Type</option>
          <option value="Biochar">Biochar</option>
          <option value="Renewable Energy">Renewable Energy</option>
          <option value="Forestry">Forestry</option>
          <option value="Waste Management">Waste Management</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Brazil">Brazil</option>
          <option value="Kenya">Kenya</option>
        </select>

        <select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        >
          <option value="">Credit Rating</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
        </select>
      </div>

      {/* Featured Carousel */}
      <div className="carousel">
        <h3>⭐ Featured Projects</h3>
        <div className="carousel-track">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <div
                key={p._id}
                className="carousel-card"
                onClick={() => navigate(`/project/${p._id}`)}
              >
                <img
                  src={`http://62.72.59.146:8080${p.photo}`}
                  alt={p.projectName}
                  className="carousel-img"
                />
                <h4>{p.projectName}</h4>
                <p>{p.projectType}</p>
                <p>💰 ₹{p.price}/tonne</p>
              </div>
            ))}
        </div>
      </div>

      {/* Project List */}
      <div className="project-grid">
        {filteredProjects.map((p) => (
          <div
            key={p._id}
            className="project-card"
            onClick={() => navigate(`/project/${p._id}`)}
          >
          <img
  src={`http://62.72.59.146:8080${p.photo}`}
  alt={p.projectName}
  className="project-img"
  onError={(e) => {
    e.currentTarget.src =
      "https://cdn.prod.website-files.com/63f86f47576a6732f24a776a/6623f07d9fef8cf1fd318213_Blog%20Banner%20(64).png";
  }}
/>

            <h3 className="project-title">{p.projectName}</h3>
            <p className="project-meta">
              🌱 <strong>Type:</strong> {p.projectType} | 📍{" "}
              <strong>Location:</strong> {p.location || "N/A"}
            </p>
            <p>
              ⭐ <strong>Rating:</strong> {p.rating} | 🔎{" "}
              <strong>Methodology:</strong> {p.methodology || "N/A"}
            </p>
            <p>
              ✅ <strong>Registry:</strong> {p.registry || "Independent"}
            </p>
            <p>
              📄 <strong>Description:</strong>{" "}
              {p.description
                ? p.description.slice(0, 100) + "..."
                : "No description available."}
            </p>
            <p className="price">
              💰 <strong>Price:</strong> ₹{p.price}/tonne | 📦{" "}
              <strong>Available:</strong> {p.quantity}
            </p>
            <button className="buy-btn">View Details →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceHome;
