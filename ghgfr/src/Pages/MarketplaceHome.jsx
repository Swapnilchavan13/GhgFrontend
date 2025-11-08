// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Marketplacehome.css";
// import { Footer } from "./Footer";

// export const MarketplaceHome = () => {
//   const [projects, setProjects] = useState([]);
//   const [filters, setFilters] = useState({
//     search: "",
//     type: "",
//     location: "",
//     rating: "",
//   });

//   const navigate = useNavigate();

//   // Fetch projects from backend API
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("http://62.72.59.146:8080/getprojects");
//         const data = await res.json();
//         setProjects(data);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//       }
//     };
//     fetchProjects();
//   }, []);

//   // Apply filters
//   const filteredProjects = projects.filter((p) => {
//     return (
//       (filters.search === "" ||
//         p.projectName.toLowerCase().includes(filters.search.toLowerCase())) &&
//       (filters.type === "" || p.projectType === filters.type) &&
//       (filters.location === "" || p.location === filters.location) &&
//       (filters.rating === "" || p.rating === filters.rating)
//     );
//   });

//   return (
// <>
//  {/* Navbar */}
//       <nav className="navbar">
//         {/* Left side logo */}
//         <div className="logo"><Link to="/">Climecore</Link></div>

//         {/* Right side menu */}
//   <ul className="nav-links">
//   <li><Link to="/client/login">Measure Carbon Emission</Link></li>
//   <li><Link to="/marketplacehome">Carbon Credits</Link></li>
//   <li><Link to="/marketplace">Green Marketplace</Link></li>
//   <li><Link to="/blog">Resources</Link></li>
//   <li><Link to="/jobs">Jobs</Link></li>
//   <li><Link to="/about">About</Link></li>
// </ul>
//       </nav>
    
//     <div className="marketplace-container">
      
//       <h2>🌍 Carbon Credit Marketplace</h2>

//       {/* Search & Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search by project name..."
//           value={filters.search}
//           onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//         />

//         <select
//           value={filters.type}
//           onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//         >
//           <option value="">Project Type</option>
//           <option value="Biochar">Biochar</option>
//           <option value="Renewable Energy">Renewable Energy</option>
//           <option value="Forestry">Forestry</option>
//           <option value="Waste Management">Waste Management</option>
//         </select>

//         <select
//           value={filters.location}
//           onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//         >
//           <option value="">Location</option>
//           <option value="India">India</option>
//           <option value="USA">USA</option>
//           <option value="Brazil">Brazil</option>
//           <option value="Kenya">Kenya</option>
//         </select>

//         <select
//           value={filters.rating}
//           onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//         >
//           <option value="">Credit Rating</option>
//           <option value="A+">A+</option>
//           <option value="A">A</option>
//           <option value="B+">B+</option>
//         </select>
//       </div>

//       {/* Featured Carousel */}
//       <div className="carousel">
//         <h3>⭐ Featured Projects</h3>
//         <div className="carousel-track">
//           {projects
//             .filter((p) => p.featured)
//             .map((p) => (
//               <div
//                 key={p._id}
//                 className="carousel-card"
//                 onClick={() => navigate(`/project/${p._id}`)}
//               >
//                 <img
//   src={`http://62.72.59.146:8080${p.photo}`}
//   alt={p.projectName}
//   className="project-img"
//   onError={(e) => {
//     e.currentTarget.src =
//       "https://cdn.prod.website-files.com/63f86f47576a6732f24a776a/6623f07d9fef8cf1fd318213_Blog%20Banner%20(64).png";
//   }}
// />
//                 <h4>{p.projectName}</h4>
//                 <p>{p.projectType}</p>
//                 <p>💰 ₹{p.price}/tonne</p>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Project List */}
//       <div className="project-grid">
//         {filteredProjects.map((p) => (
//           <div
//             key={p._id}
//             className="project-card"
//             onClick={() => navigate(`/project/${p._id}`)}
//           >
//           <img
//   src={`http://62.72.59.146:8080${p.photo}`}
//   alt={p.projectName}
//   className="project-img"
//   onError={(e) => {
//     e.currentTarget.src =
//       "https://cdn.prod.website-files.com/63f86f47576a6732f24a776a/6623f07d9fef8cf1fd318213_Blog%20Banner%20(64).png";
//   }}
// />

//             <h3 className="project-title">{p.projectName}</h3>
//             <p className="project-meta">
//               🌱 <strong>Type:</strong> {p.projectType} | 📍{" "}
//               <strong>Location:</strong> {p.location || "N/A"}
//             </p>
//             <p>
//               ⭐ <strong>Rating:</strong> {p.rating} | 🔎{" "}
//               <strong>Methodology:</strong> {p.methodology || "N/A"}
//             </p>
//             <p>
//               ✅ <strong>Registry:</strong> {p.registry || "Independent"}
//             </p>
//             <p>
//               📄 <strong>Description:</strong>{" "}
//               {p.description
//                 ? p.description.slice(0, 100) + "..."
//                 : "No description available."}
//             </p>
//             <p className="price">
//               💰 <strong>Price:</strong> ₹{p.price}/tonne | 📦{" "}
//               <strong>Available:</strong> {p.quantity}
//             </p>
//             <button className="buy-btn">View Details →</button>
//           </div>
//         ))}
//       </div>
//     </div>
// <Footer />
//     </>
//   );
// };

// export default MarketplaceHome;




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
