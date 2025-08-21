import React, { useState, useEffect } from "react";
import "../styles/CMSDashboard.css";

export const CMSDashboard = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectType: "",
    location: "",
    methodology: "",
    rating: "",
    price: "",
    quantity: "",
    coBenefits: "",
    verification: "",
    featured: false,
  });

  const [projects, setProjects] = useState([]);

  // Fetch projects from DB
  useEffect(() => {
    fetch("http://localhost:8080/getprojects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddProject = async () => {
    if (!formData.projectName || !formData.price) {
      alert("Project name & price required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/addprojects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newProject = await res.json();

      setProjects([newProject, ...projects]); // Update list instantly
      setFormData({
        projectName: "",
        description: "",
        projectType: "",
        location: "",
        methodology: "",
        rating: "",
        price: "",
        quantity: "",
        coBenefits: "",
        verification: "",
        featured: false,
      });
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    }
  };

  return (
    <div className="cms-container">
      <h2 className="cms-title">🌱 Carbon Credit CMS Dashboard</h2>

      <div className="cms-form">
        <label>
          Project Name
          <input
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter Project Name"
          />
        </label>

        <label>
          Project Type
          <select name="projectType" value={formData.projectType} onChange={handleChange}>
            <option value="">Select Project Type</option>
            <option value="Biochar">Biochar</option>
            <option value="Renewable Energy">Renewable Energy</option>
            <option value="Forestry">Forestry</option>
            <option value="Waste Management">Waste Management</option>
          </select>
        </label>

        <label>
          Location
          <select name="location" value={formData.location} onChange={handleChange}>
            <option value="">Select Location</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Brazil">Brazil</option>
            <option value="Kenya">Kenya</option>
            <option value="Indonesia">Indonesia</option>
          </select>
        </label>

        <label>
          Methodology
          <input
            name="methodology"
            value={formData.methodology}
            onChange={handleChange}
            placeholder="Enter Methodology"
          />
        </label>

        <label>
          Credit Rating
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value="">Select Credit Rating</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
          </select>
        </label>

        <label>
          Price (₹ per tonne)
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price in Rs."
          />
        </label>

        <label>
          Available Quantity (tonnes)
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
          />
        </label>

        <label>
          Verification
          <select name="verification" value={formData.verification} onChange={handleChange}>
            <option value="">Select Verification</option>
            <option value="Verra">Verra</option>
            <option value="Gold Standard">Gold Standard</option>
            <option value="Climate Action Reserve">Climate Action Reserve</option>
            <option value="American Carbon Registry">American Carbon Registry</option>
          </select>
        </label>

        <label className="full-width">
          Project Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Project Description"
          />
        </label>

        <label className="full-width">
          Co-Benefits
          <textarea
            name="coBenefits"
            value={formData.coBenefits}
            onChange={handleChange}
            placeholder="Jobs, Biodiversity, Water Security..."
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Mark as Featured Project
        </label>

        <button className="btn-primary" onClick={handleAddProject}>
          ➕ Add Project
        </button>
      </div>

      <div className="cms-project-list">
        <h3>📋 All Projects</h3>
        <ul>
          {projects.map((p) => (
            <li key={p.id} className="project-card">
              <h4>{p.projectName}</h4>
              <p>
                <strong>Type:</strong> {p.projectType} | <strong>Location:</strong> {p.location}
              </p>
              <p>
                <strong>Price:</strong> ₹{p.price}/tonne | <strong>Rating:</strong> {p.rating}
              </p>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
