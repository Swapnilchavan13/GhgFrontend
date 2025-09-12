import React from "react";
import { Link } from "react-router-dom";

export const Jobs = () => {
  const jobs = [
    {
      title: "Sustainability Analyst",
      location: "Remote",
      type: "Full-time",
      desc: "Analyze, track, and report on carbon emissions data for our clients. Help design strategies to reduce emissions and meet sustainability goals."
    },
    {
      title: "Carbon Project Manager",
      location: "Remote",
      type: "Full-time",
      desc: "Lead and manage carbon removal and offset projects across India. Collaborate with farmers, partners, and internal teams to deliver measurable impact."
    },
    {
      title: "Software Engineer (Climate Tech)",
      location: "Remote",
      type: "Full-time",
      desc: "Develop and maintain ClimeScore’s digital platform for carbon measurement, reporting, and analysis. Work with a modern stack and scalable architecture."
    },
    {
      title: "Communications & Outreach Specialist",
      location: "Mumbai",
      type: "Full-time",
      desc: "Craft impactful communication campaigns that spread awareness about ClimeScore’s mission. Build partnerships and engage with local communities."
    }
  ];

  return (

    <>

    {/* Navbar */}
      <nav className="navbar">
        {/* Left side logo */}
        <div className="logo">Climescore</div>

        {/* Right side menu */}
       <ul className="nav-links">
  <li><Link to="/client/login">Measure Carbon Emission</Link></li>
  <li><Link to="/marketplacehome">Carbon Credits</Link></li>
  <li><Link to="/marketplace">Green Marketplace</Link></li>
  <li><Link to="/blog">Resources</Link></li>
  <li><Link to="/jobs">Jobs</Link></li>
  <li><Link to="/about">About</Link></li>
</ul>
      </nav>
    <div
      style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
        padding: "40px",
        minHeight: "100vh"
    }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#03AFF8",
          marginBottom: "40px"
        }}
      >
        Join the ClimeScore Team
      </h1>
      <p
        style={{
          maxWidth: "800px",
          margin: "0 auto 50px auto",
          textAlign: "center",
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#333"
        }}
      >
        At ClimeScore, we are on a mission to fight climate change with data-driven
        solutions and sustainable impact. Explore our current job openings and be
        part of the change.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
          maxWidth: "1000px",
          margin: "0 auto"
        }}
      >
        {jobs.map((job, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              padding: "25px",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h2 style={{ color: "#2e7d32", marginBottom: "10px" }}>{job.title}</h2>
            <p style={{ margin: "5px 0", fontWeight: "bold", color: "#555" }}>
              📍 {job.location}
            </p>
            <p style={{ margin: "5px 0", color: "#777" }}>
              🕒 {job.type}
            </p>
            <p style={{ margin: "15px 0", color: "#444", lineHeight: "1.5" }}>
              {job.desc}
            </p>
            <button
              style={{
                  backgroundColor: "#03AFF8",
                  color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
                </>
  );
};
