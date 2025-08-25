import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      backgroundColor: '#fff',
      zIndex: 1000,
    },
    navLogo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2e7d32',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      fontSize: '16px',
      fontWeight: '500',
      listStyle: 'none',
    },
    navLink: {
      cursor: 'pointer',
      color: '#333',
    },
    navLogin: {
      color: '#2e7d32',
      fontWeight: 'bold',
    },
    hero: {
      backgroundColor: '#e8f5e9',
      padding: '80px 20px',
      textAlign: 'center',
    },
    heroHeading: {
      width:'60%',
      margin: 'auto',

      fontSize: '62px',
      fontWeight: 'bold',
      color: '#1b5e20',
      marginBottom: '20px',
    },
    heroButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      marginTop: '30px',
    },
    primaryBtn: {
      padding: '12px 24px',
      backgroundColor: '#2e7d32',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    secondaryBtn: {
      padding: '12px 24px',
      backgroundColor: '#fff',
      color: '#2e7d32',
      border: '2px solid #2e7d32',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    section: {
      width:'80%',
      margin:'auto',
      padding: '30px 20px',
      textAlign: 'center',
      backgroundColor: '#f7f5f5ff',
    },
    sectionHeading: {
      fontSize: '30px',
      color: '#1b5e20',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    sectionText: {
      maxWidth: '700px',
      margin: '0 auto 40px',
      color: '#555',
    },
   cards: {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
  gap: '30px',                          // spacing between cards
  justifyItems: 'center',               // center each card inside its grid cell
},

    card: {
      width: '500px',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f5f1f1ff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      textAlign: 'left',
    },
    cardTitle: {
      fontSize: '30px',
      color: '#2e7d32',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    cardText: {
      fontSize: '20px',
      color: '#555',
    },
    footer: {
      backgroundColor: '#212121',
      color: '#fff',
      padding: '60px 20px',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '40px',
      justifyContent: 'space-between',
    },
    footerColumn: {
      minWidth: '200px',
    },
    footerTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      lineHeight: '1.8',
    },
    newsletterInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: 'none',
      fontSize: '14px',
      color: '#333',
    },
    subscribeBtn: {
      padding: '10px',
      width: '100%',
      backgroundColor: '#43a047',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },

 featureSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '20px',
  },
  featureCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover', // keeps aspect ratio while filling
    borderRadius: '8px',
    marginBottom: '15px',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#222',
  },
  featureText: {
    fontSize: '15px',
    color: '#555',
    marginBottom: '20px',
  },
  featureButton: {
    background: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
  },



testimonialSection: {
    background: '#f9f9f9',
    padding: '20px 20px',
    marginTop:'-50px'
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  testimonialCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  stars: {
    color: '#FFD700', // golden stars
    fontSize: '18px',
    marginBottom: '12px',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '16px',
    color: '#444',
    marginBottom: '20px',
  },
  author: {
    fontWeight: '600',
    fontSize: '15px',
    marginBottom: '5px',
    color: '#222',
  },
  details: {
    fontSize: '14px',
    color: '#666',
  },






  projectSection: {
    background: '#fff',
    padding: '20px 20px',
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  projectCard: {
    background: '#f9f9f9',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  projectImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  projectContent: {
    padding: '20px',
  },
  projectTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#222',
  },
  projectDesc: {
    fontSize: '15px',
    color: '#555',
    marginBottom: '15px',
  },
  projectButton: {
    display: 'inline-block',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2e7d32',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },




   blogSection: {
    padding: '20px 20px',
    backgroundColor: '#f7f9fc',
  },
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    justifyItems: 'center',
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '350px',
  },
  blogImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  blogContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  blogDate: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '10px',
  },
  blogTitle: {
    fontSize: '18px',
    margin: '0 0 10px 0',
    fontWeight: '600',
  },
  blogDesc: {
    flexGrow: 1,
    fontSize: '15px',
    color: '#555',
    marginBottom: '15px',
  },
  blogButton: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'background-color 0.3s',
  },
};

  const navigate = useNavigate();



  return (
    <div style={styles.container}>
     
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroHeading}>
          Your Climate Scorecard, Marketplace, and Action Hub
        </h1>
        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn} onClick={() => navigate('/client/login')}>Measure Your Carbon Footprint</button>
          <button style={styles.secondaryBtn}>Browse Carbon Credits</button>
          <button style={styles.primaryBtn}>Shop Sustainable</button>
        </div>
      </section>

      {/* Mid-Page Highlights */}
      <section style={styles.section}>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>What is ClimeScore?</h2>
            <p style={styles.cardText}>ClimeScore helps individuals and businesses measure, reduce, and offset their carbon footprint through tools, stories, and products.</p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Why Measure Emissions?</h2>
            <p style={styles.cardText}>Understand your impact and take steps toward sustainability.</p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Impact Stories</h2>
            <p style={styles.cardText}>Real stories from users making a difference.</p>
            <img src="https://dn5z2jafg7hv0.cloudfront.net/blog/wp-content/uploads/2022/06/14160107/Solar-Panel-In-India.jpg"  style={styles.projectImage} alt="" />
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Built for Climate Action. Designed for You.</h2>
            <div>
            <p style={styles.cardText}>Science-based <br />GHG Protocol, ISO 14064-compliant emissions measurement for accurate carbon accounting.</p>
            <p style={styles.cardText}>For Everyone <br />Tailored solutions for individuals, businesses, and governments to measure and reduce emissions.</p>
            {/* <p style={styles.cardText}>End-to-End <br />Complete climate action platform from measurement to action & offset with verified solutions.</p> */}

            </div>
          </div>
        </div>
      </section>

      <button onClick={() => navigate('/client/login')} style={styles.primaryBtn}>Start Measuring Now ➜</button>


       <section style={styles.section}>
        <h1>Explore ClimeScore's Action Tools</h1>
<p>Comprehensive tools to measure, offset, and reduce your carbon footprint effectively.</p>

    <div style={styles.featureSection}>
      <div style={styles.featureCard}>
        <img
          src="https://askelsustainabilitysolutions.com/wp-content/uploads/2023/11/1.png"
          alt="Emissions Measurement"
          style={styles.cardImage}
        />
        <h3 style={styles.featureTitle}>Emissions Measurement</h3>
        <p style={styles.featureText}>
          Calculate your personal or business footprint with precision and insights.
        </p>
        <button onClick={() => navigate('/client/login')} style={styles.featureButton}>Start Now</button>
      </div>

      <div style={styles.featureCard}>
        <img
          src="https://pixelplex.io/wp-content/uploads/2023/06/carbon-credit-tokenization-main-1600.jpg"
          alt="Carbon Credit Marketplace"
          style={styles.cardImage}
        />
        <h3 style={styles.featureTitle}>Carbon Credit Marketplace</h3>
        <p style={styles.featureText}>
          Offset with verified, high-impact credits from around the world.
        </p>
        <button style={styles.featureButton}>Browse Projects</button>
      </div>

      <div style={styles.featureCard}>
        <img
          src="https://www.reelpaper.com/cdn/shop/articles/is-bamboo-sustainable-eco-friendly-reel-talk-590779_1024x1024.jpg?v=1648222790"
          alt="Sustainable Marketplace"
          style={styles.cardImage}
        />
        <h3 style={styles.featureTitle}>Sustainable Marketplace</h3>
        <p style={styles.featureText}>
          Shop curated, low-impact products that reduce your footprint.
        </p>
        <button onClick={() => navigate('/marketplace')} style={styles.featureButton}>Start Shopping</button>
      </div>
    </div>


<div style={styles.testimonialSection}>
  <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
    Testimonials & Impact Stories
  </h2>

  <div style={styles.testimonialGrid}>
    <div style={styles.testimonialCard}>
      <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
      <p style={styles.quote}>
        "We reduced 12% emissions using ClimeScore. The platform made it easy to identify and address our highest emission areas."
      </p>
      <div>
        <div style={styles.author}>SB</div>
        <div style={styles.details}>Small Business • Pune, India</div>
      </div>
    </div>

    <div style={styles.testimonialCard}>
      <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
      <p style={styles.quote}>
        "I finally understand my climate impact! The visualization tools helped me see where my choices matter most."
      </p>
      <div>
        <div style={styles.author}>AR</div>
        <div style={styles.details}>Student • Mumbai, India</div>
      </div>
    </div>

    <div style={styles.testimonialCard}>
      <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
      <p style={styles.quote}>
        "Integrated this into our curriculum. Students are engaged and excited about tracking their impact on the planet."
      </p>
      <div>
        <div style={styles.author}>KS</div>
        <div style={styles.details}>School • Nairobi, Kenya</div>
      </div>
    </div>
  </div>
</div>


<div style={styles.projectSection}>
  <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Featured Projects & Products</h2>

  <div style={styles.projectGrid}>
    <div style={styles.projectCard}>
      <img
        src="https://www.bandhavgarh-national-park.com/blog/wp-content/uploads/2018/03/Shesh-Shaiya.jpg"
        alt="Biochar in Bandhavgarh"
        style={styles.projectImage}
      />
      <div style={styles.projectContent}>
        <h3 style={styles.projectTitle}>🔥 Biochar in Bandhavgarh</h3>
        <p style={styles.projectDesc}>
          Carbon sequestration through traditional biochar methods, empowering local communities.
        </p>
        <button style={styles.projectButton}>View Project</button>
      </div>
    </div>

    <div style={styles.projectCard}>
      <img
        src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
        alt="Forest Project in Ecuador"
        style={styles.projectImage}
      />
      <div style={styles.projectContent}>
        <h3 style={styles.projectTitle}>🌲 Forest Project in Ecuador</h3>
        <p style={styles.projectDesc}>
          Indigenous-led conservation of the Amazon rainforest to preserve biodiversity.
        </p>
        <button style={styles.projectButton}>View Project</button>
      </div>
    </div>

    <div style={styles.projectCard}>
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Ocean Cleanup Initiative"
        style={styles.projectImage}
      />
      <div style={styles.projectContent}>
        <h3 style={styles.projectTitle}>🌊 Ocean Cleanup Initiative</h3>
        <p style={styles.projectDesc}>
          Removing plastic pollution while generating sustainable local employment.
        </p>
        <button style={styles.projectButton}>View Project</button>
      </div>
    </div>

    <div style={styles.projectCard}>
      <img
        src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5"
        alt="Plastic-free Home Kits"
        style={styles.projectImage}
      />
      <div style={styles.projectContent}>
        <h3 style={styles.projectTitle}>🧴 Plastic-free Home Kits</h3>
        <p style={styles.projectDesc}>
          Essential eco-friendly home products designed for a zero-waste lifestyle.
        </p>
        <button style={styles.projectButton}>View Product</button>
      </div>
    </div>

    {/* New Project 1 */}
    <div style={styles.projectCard}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu7jpSSUfm9IZvnqOHYGaqCgs_7d7t037pxw&s"
        alt="Renewable Solar Farm"
        style={styles.projectImage}
      />
      <div style={styles.projectContent}>
        <h3 style={styles.projectTitle}>☀️ Renewable Solar Farm</h3>
        <p style={styles.projectDesc}>
          Large-scale solar energy project providing clean power to rural communities.
        </p>
        <button style={styles.projectButton}>View Project</button>
      </div>
    </div>

    {/* New Project 2 */}
    <div style={styles.projectCard}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_5AFVvxv-EeKd1qy9rN3Udp5TIH4VchLp2G4yaCSw8QZZ8J2J1RJfyQ9hyLrfO4lIitc&usqp=CAU"
        alt="Urban Tree Plantation"
        style={styles.projectImage}
      />
      <div style={styles.projectContent}>
        <h3 style={styles.projectTitle}>🌳 Urban Tree Plantation</h3>
        <p style={styles.projectDesc}>
          Planting trees across urban areas to improve air quality and community wellbeing.
        </p>
        <button style={styles.projectButton}>View Project</button>
      </div>
    </div>
  </div>
</div>


<div style={styles.blogSection}>
  <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Blog & Resources</h2>

  <div style={styles.blogGrid}>
    {/* Blog 1 */}
    <div style={styles.blogCard}>
      <img
        src="https://cdn.prod.website-files.com/64f5dc424006834d4d01f490/64f5de8a70d1c945d8def66b_CARBONCHAIN_INFOGRAPHIC_draft2%2520(2).jpeg"
        alt="Understanding Scope 3 Emissions"
        style={styles.blogImage}
      />
      <div style={styles.blogContent}>
        <p style={styles.blogDate}>August 15, 2025</p>
        <h3 style={styles.blogTitle}>Understanding Scope 3 Emissions</h3>
        <p style={styles.blogDesc}>
          A deep dive into the most challenging but critical emissions category for businesses.
        </p>
        <button style={styles.blogButton}>Read Article</button>
      </div>
    </div>

    {/* Blog 2 */}
    <div style={styles.blogCard}>
      <img
        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
        alt="Top Sustainable Brands in India"
        style={styles.blogImage}
      />
      <div style={styles.blogContent}>
        <p style={styles.blogDate}>August 8, 2025</p>
        <h3 style={styles.blogTitle}>Top Sustainable Brands in India</h3>
        <p style={styles.blogDesc}>
          Our curated list of brands making a real difference through sustainable practices.
        </p>
        <button style={styles.blogButton}>Read Article</button>
      </div>
    </div>

    {/* Blog 3 */}
    <div style={styles.blogCard}>
      <img
        src="https://tracextech.com/wp-content/uploads/2023/10/carbon-offset-lifecycle.jpg"
        alt="How Carbon Offsets Work"
        style={styles.blogImage}
      />
      <div style={styles.blogContent}>
        <p style={styles.blogDate}>July 30, 2025</p>
        <h3 style={styles.blogTitle}>How Carbon Offsets Work</h3>
        <p style={styles.blogDesc}>
          A beginner's guide to understanding carbon credits and how they benefit the planet.
        </p>
        <button style={styles.blogButton}>Read Article</button>
      </div>
    </div>
  </div>
</div>





      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <p>contact@climescore.org</p>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <ul style={styles.footerList}>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Follow Us</h4>
            <ul style={styles.footerList}>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Newsletter Signup</h4>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.newsletterInput}
            />
            <button style={styles.subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
