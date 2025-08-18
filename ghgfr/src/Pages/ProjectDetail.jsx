import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";  // ✅ Import CSS file

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("carbonProjects")) || [];
    const selected = storedProjects.find((p) => String(p.id) === id);
    setProject(selected);
  }, [id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div className="project-detail-container">
      <h2>{project.projectName}</h2>
      <p><strong>Type:</strong> {project.projectType}</p>
      <p><strong>Location:</strong> {project.location}</p>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Co-benefits:</strong> {project.coBenefits}</p>
      <p><strong>Verification:</strong> {project.verification}</p>
      <p><strong>Credit Rating:</strong> {project.rating}</p>
      <p><strong>Price:</strong> ₹{project.price}/tonne</p>

      <button
        className="buy-btn"
        onClick={() => navigate(`/checkout/${project.id}`)}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProjectDetail;
