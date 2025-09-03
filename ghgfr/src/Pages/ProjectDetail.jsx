import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";  // ✅ Import CSS file

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://62.72.59.146:8080/getprojects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Error fetching project:", err));
  }, [id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div className="project-detail-container">
      {/* Project Image at top */}
      <h1>Project Details</h1>
      {project.photo && (
        <div className="project-banner">
          <img
            src={`http://62.72.59.146:8080${project.photo}`}
            alt={project.projectName}
          />
        </div>
      )}

      {/* Title */}
      <h2 className="project-title">{project.projectName}</h2>

      {/* Info Sections */}
      <div className="project-section">
        <h3>📄 Description</h3>
        <p>{project.description}</p>
      </div>

      <div className="project-section">
        <h3>🌱 Project Information</h3>
        <p><strong>Type:</strong> {project.projectType}</p>
        <p><strong>Location:</strong> {project.location || "N/A"}</p>
        <p><strong>Methodology:</strong> {project.methodology || "N/A"}</p>
        <p><strong>Co-benefits:</strong> {project.coBenefits}</p>
      </div>

      <div className="project-section">
        <h3>✅ Verification & Rating</h3>
        <p><strong>Verification:</strong> {project.verification}</p>
        <p><strong>Credit Rating:</strong> {project.rating}</p>
        <p><strong>Registry:</strong> {project.registry}</p>
      </div>

      <div className="project-section">
        <h3>💰 Pricing & Availability</h3>
        <p><strong>Price:</strong> ₹{project.price}/tonne</p>
        <p><strong>Quantity Available:</strong> {project.quantity} tCO₂e</p>
      </div>

      {/* Media Section */}
      {project.video && (
        <div className="project-section">
          <h3>🎥 Project Video</h3>
          <video controls width="100%">
            <source src={`http://62.72.59.146:8080${project.video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {project.document && (
        <div className="project-section">
          <h3>📑 Supporting Document</h3>
          <a
            href={`http://62.72.59.146:8080${project.document}`}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-link"
          >
            View Document
          </a>
        </div>
      )}

      {/* Buy Button */}
      <div className="project-actions">
        <button
          className="buy-btn"
          onClick={() => navigate(`/checkout/${project._id}`)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
