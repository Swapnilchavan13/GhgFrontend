// Updated CMSDashboard.js
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
    registry: "",
    climateScore: "",
  });

  const [projects, setProjects] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [document, setDocument] = useState(null);

  // Fetch projects
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else setPhotoPreview(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    } else setVideoPreview(null);
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };

  const handleAddProject = async () => {
    if (!formData.projectName || !formData.price) {
      alert("Project name & price required!");
      return;
    }

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      if (photo) dataToSend.append("photo", photo);
      if (video) dataToSend.append("video", video);
      if (document) dataToSend.append("document", document);

      const res = await fetch("http://localhost:8080/addprojects", {
        method: "POST",
        body: dataToSend,
      });

      const newProject = await res.json();
      setProjects([newProject, ...projects]);

      // Reset form
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
        registry: "",
        climateScore: "",
      });
      setPhoto(null);
      setPhotoPreview(null);
      setVideo(null);
      setVideoPreview(null);
      setDocument(null);
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
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          >
            <option value="">Select Project Type</option>
            <option value="Biochar">Biochar</option>
            <option value="Renewable Energy">Renewable Energy</option>
            <option value="Forestry">Forestry</option>
            <option value="Waste Management">Waste Management</option>
          </select>
        </label>

        <label>
          Location
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
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
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
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
          <select
            name="verification"
            value={formData.verification}
            onChange={handleChange}
          >
            <option value="">Select Verification</option>
            <option value="Verra">Verra</option>
            <option value="Gold Standard">Gold Standard</option>
            <option value="Climate Action Reserve">Climate Action Reserve</option>
            <option value="American Carbon Registry">American Carbon Registry</option>
          </select>
        </label>

        <label>
          Registry
          <input
            name="registry"
            value={formData.registry}
            onChange={handleChange}
            placeholder="Enter Registry"
          />
        </label>

        <label>
          Climate Score
          <input
            name="climateScore"
            value={formData.climateScore}
            onChange={handleChange}
            placeholder="Enter Climate Score"
          />
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

        {/* Upload single photo */}
        <label>
          Upload Photo
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        {photoPreview && <img src={photoPreview} alt="preview" className="preview-img" />}

        {/* Upload single video */}
        <label>
          Upload Video
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </label>
        {videoPreview && <video src={videoPreview} controls className="preview-video" />}

        {/* Upload single document */}
        <label>
          Upload Document
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleDocumentChange} />
        </label>
        {document && <p>{document.name}</p>}

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

      {/* Project list */}
      <div className="cms-project-list">
        <h3>📋 All Projects</h3>
        <ul>
          {projects.map((p) => (
            <li key={p._id} className="project-card">
              <h4>{p.projectName}</h4>
              <p>
                <strong>Type:</strong> {p.projectType} | <strong>Location:</strong>{" "}
                {p.location}
              </p>
              <p>
                <strong>Price:</strong> ₹{p.price}/tonne | <strong>Rating:</strong>{" "}
                {p.rating}
              </p>
              <p>{p.description}</p>
              {p.photo && <img src={`http://localhost:8080${p.photo}`} alt="project" />}
              {p.video && <video src={`http://localhost:8080${p.video}`} controls />}
              {p.document && (
                <a href={`http://localhost:8080${p.document}`} target="_blank" rel="noreferrer">
                  Download Document
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};