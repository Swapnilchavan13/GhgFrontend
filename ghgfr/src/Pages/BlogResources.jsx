import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'Understanding Your Carbon Footprint',
    subtitle: 'Measure, Reduce & Contribute',
    category: 'Climate Awareness',
    description: 'Learn what contributes to your carbon emissions and how to reduce them with practical steps.',
    views: 1240,
    image: 'https://cdn.prod.website-files.com/64b78e9db44da70d86b3b47f/662383dde0a0f7cd33b6319f_Carbon%20Footprint.jpg',
    link: '#'
  },
  {
    title: 'Top 10 Sustainable Products in 2025',
    subtitle: 'Eco-friendly Innovations',
    category: 'Green Lifestyle',
    description: 'Discover innovative and eco-friendly products that are making a difference this year.',
    views: 980,
    image: 'https://www.dsers.com/blog/content/images/2025/01/sustainable-product.png',
    link: '#'
  },
  {
    title: 'How Carbon Credits Work',
    subtitle: 'A Simple Guide',
    category: 'Carbon Market',
    description: 'An easy guide to how carbon credits help the planet and how you can get involved.',
    views: 765,
    image: 'https://climatecarbon.com/wp-content/uploads/2023/05/1_1dbQNPRGrukYs2wFej0Hvg.png',
    link: '#'
  },
  {
    title: 'Sustainability Success Stories',
    subtitle: 'Real-world Impact',
    category: 'Case Studies',
    description: 'Real-life stories of communities and businesses making an impact in sustainability.',
    views: 1540,
    image: 'https://t4.ftcdn.net/jpg/01/42/78/73/360_F_142787339_RkyaHN7hVIxYa9Mf75vCRUgZtbqHtSxA.jpg',
    link: '#'
  }
];

const BlogResources = () => {
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
      <div className="blog-container">
        <h1 className="blog-title">Blog & Resources</h1>
        <p className="blog-subtitle">
          Insights, tips, and tools to help you live and work more sustainably.
        </p>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div className="blog-card" key={index}>
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h3>{post.title}</h3>
                <h4 className="blog-sub">{post.subtitle}</h4>
                <p className="blog-category">Category: {post.category}</p>
                <p>{post.description}</p>
                <p className="blog-views">👁 {post.views} views</p>
                <a href={post.link} className="blog-link">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .blog-container {
          padding: 40px 20px;
          font-family: 'Arial', sans-serif;
          background-color: #f9fafc;
        }

        .blog-title {
          text-align: center;
          font-size: 36px;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .blog-subtitle {
          text-align: center;
          font-size: 18px;
          color: #666;
          margin-bottom: 40px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .blog-card {
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease-in-out;
        }

        .blog-card:hover {
          transform: translateY(-5px);
        }

        .blog-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .blog-content {
          padding: 20px;
        }

        .blog-content h3 {
          font-size: 20px;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .blog-sub {
          font-size: 16px;
          font-weight: 500;
          color: #1e88e5;
          margin-bottom: 10px;
        }

        .blog-category {
          font-size: 14px;
          color: #888;
          margin-bottom: 10px;
        }

        .blog-content p {
          font-size: 15px;
          color: #555;
          margin-bottom: 10px;
        }

        .blog-views {
          font-size: 14px;
          color: #444;
          margin-bottom: 15px;
        }

        .blog-link {
          font-size: 14px;
          text-decoration: none;
          color: #1e88e5;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default BlogResources;
