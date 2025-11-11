import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import "../styles/resources.css";

const blogPosts = [
  {
    title: "Understanding Your Carbon Footprint",
    subtitle: "Measure, Reduce & Contribute",
    category: "Climate Awareness",
    description:
      "Learn what contributes to your carbon emissions and how to reduce them with practical steps.",
    views: 1240,
    image:
      "https://cdn.prod.website-files.com/64b78e9db44da70d86b3b47f/662383dde0a0f7cd33b6319f_Carbon%20Footprint.jpg",
    link: "#",
  },
  {
    title: "Top 10 Sustainable Products in 2025",
    subtitle: "Eco-friendly Innovations",
    category: "Green Lifestyle",
    description:
      "Discover innovative and eco-friendly products that are making a difference this year.",
    views: 980,
    image: "https://www.dsers.com/blog/content/images/2025/01/sustainable-product.png",
    link: "#",
  },
  {
    title: "How Carbon Credits Work",
    subtitle: "A Simple Guide",
    category: "Carbon Market",
    description:
      "An easy guide to how carbon credits help the planet and how you can get involved.",
    views: 765,
    image:
      "https://climatecarbon.com/wp-content/uploads/2023/05/1_1dbQNPRGrukYs2wFej0Hvg.png",
    link: "#",
  },
  {
    title: "Sustainability Success Stories",
    subtitle: "Real-world Impact",
    category: "Case Studies",
    description:
      "Real-life stories of communities and businesses making an impact in sustainability.",
    views: 1540,
    image:
      "https://t4.ftcdn.net/jpg/01/42/78/73/360_F_142787339_RkyaHN7hVIxYa9Mf75vCRUgZtbqHtSxA.jpg",
    link: "#",
  },
];

 const BlogResources = () => {
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

      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Knowledge that Powers Climate Action.</h1>
          <p>
            Explore insights, research, and stories from across the Clime
            ecosystem — measurement, reduction, removal, and education.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Browse All Resources</button>
            <button className="secondary-btn">Subscribe for Updates</button>
          </div>
        </div>
      </section>

      {/* 2. Featured Highlights */}
      <section className="featured">
        <h2>Featured Highlights</h2>
        <div className="highlight-grid">
          {blogPosts.slice(0, 3).map((post, i) => (
            <div key={i} className="highlight-card">
              <img src={post.image} alt={post.title} />
              <div className="highlight-text">
                <span className="tag">From ClimeStore</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <a href={post.link}>Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Filter & Category */}
      <section className="filters">
        <h2>Filter & Category</h2>
        <div className="filter-grid">
          <button>Emissions Measurement</button>
          <button>Carbon Credits & Curation</button>
          <button>Sustainable Procurement</button>
          <button>Carbon Removal Projects</button>
          <button>Climate Literacy</button>
          <button>Articles</button>
          <button>Case Studies</button>
          <button>Reports & Whitepapers</button>
          <button>Webinars & Talks</button>
          <button>News & Announcements</button>
        </div>
      </section>

      {/* 4. Main Resource Grid */}
      <section className="resources">
        <h2>Main Resource Grid</h2>
        <div className="resource-grid">
          {blogPosts.map((post, i) => (
            <div className="resource-card" key={i}>
              <img src={post.image} alt={post.title} />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <a href={post.link}>Read More</a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Case Studies */}
      <section className="case-studies">
        <h2>Featured Case Studies</h2>
        <div className="case-slider">
          {blogPosts
            .filter((b) => b.category === "Case Studies")
            .map((caseItem, i) => (
              <div key={i} className="case-card">
                <img src={caseItem.image} alt={caseItem.title} />
                <div>
                  <h4>{caseItem.title}</h4>
                  <p>{caseItem.description}</p>
                  <button>Download</button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 6. Research & Whitepapers */}
      <section className="whitepapers">
        <h2>Research & Whitepapers</h2>
        <div className="whitepaper-list">
          <div className="whitepaper-item">
            <h4>Comparative LCA of Biochar vs ERW for CDR</h4>
            <p>Peer-Reviewed Research • Puro.earth</p>
            <button>Download</button>
          </div>
          <div className="whitepaper-item">
            <h4>Corporate Net Zero Roadmaps 2025</h4>
            <p>Internal Study • ClimeStore</p>
            <button>Download</button>
          </div>
          <div className="whitepaper-item">
            <h4>Lifecycle Impacts of Recycled Polymers</h4>
            <p>Partner Publication • IIT Delhi</p>
            <button>Download</button>
          </div>
        </div>
      </section>

      {/* 7. Video & Webinar Library */}
      <section className="videos">
        <h2>Video & Webinar Library</h2>
        <div className="video-grid">
          <div className="video-card">
            <div className="video-thumb">▶</div>
            <h4>Understanding Scope 3</h4>
          </div>
          <div className="video-card">
            <div className="video-thumb">▶</div>
            <h4>Carbon Removal Deep Dive</h4>
          </div>
          <div className="video-card">
            <div className="video-thumb">▶</div>
            <h4>Corporate Net Zero Journeys</h4>
          </div>
        </div>
      </section>

      {/* 8. Resource of the Month */}
      <section className="resource-month">
        <h2>Resource of the Month</h2>
        <div className="month-card">
          <h3>The 2025 Net-Zero Procurement Playbook</h3>
          <p>Co-authored by ClimeScore & ClimeStore teams.</p>
          <button>Download Playbook</button>
        </div>
      </section>

      {/* 9. Knowledge Tracks */}
      <section className="tracks">
        <h2>Knowledge Tracks</h2>
        <div className="track-grid">
          <div className="track-card">Decoding Scope 3 Emissions</div>
          <div className="track-card">Carbon Removal Technologies Demystified</div>
          <div className="track-card">Corporate Net Zero Roadmaps</div>
          <div className="track-card">Learning for a Sustainable Workforce</div>
        </div>
        <button className="secondary-btn">Explore All Tracks</button>
      </section>

      {/* 10. Newsletter */}
      <section className="newsletter">
        <h2>Stay Connected to Climate Innovation.</h2>
        <p>
          Join thousands of sustainability leaders receiving monthly insights
          from the Clime ecosystem.
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogResources;
