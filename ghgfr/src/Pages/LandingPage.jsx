import React from 'react';

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
      fontSize: '36px',
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
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    secondaryBtn: {
      padding: '12px 24px',
      backgroundColor: '#fff',
      color: '#2e7d32',
      border: '2px solid #2e7d32',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    section: {
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: '#fff',
    },
    sectionHeading: {
      fontSize: '28px',
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
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '30px',
    },
    card: {
      width: '300px',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      textAlign: 'left',
    },
    cardTitle: {
      fontSize: '20px',
      color: '#2e7d32',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    cardText: {
      fontSize: '15px',
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
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navLogo}>ClimeScore</div>
        <ul style={styles.navLinks}>
          <li style={styles.navLink}>Home</li>
          <li style={styles.navLink}>About Us</li>
          <li style={styles.navLink}>Emissions Measurement</li>
          <li style={styles.navLink}>Carbon Credit Marketplace</li>
          <li style={styles.navLink}>Sustainable Marketplace</li>
          <li style={styles.navLink}>Blog / Resources</li>
          <li style={{ ...styles.navLink, ...styles.navLogin }}>Login / Sign Up</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroHeading}>
          Your Climate Scorecard, Marketplace, and Action Hub
        </h1>
        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn}>Measure Your Carbon Footprint</button>
          <button style={styles.secondaryBtn}>Browse Carbon Credits</button>
          <button style={styles.primaryBtn}>Shop Sustainable</button>
        </div>
      </section>

      {/* Mid-Page Highlights */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>What is ClimeScore?</h2>
        <p style={styles.sectionText}>
          ClimeScore helps individuals and businesses measure, reduce, and offset their carbon footprint through tools, stories, and products.
        </p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Why Measure Emissions?</h3>
            <p style={styles.cardText}>Understand your impact and take steps toward sustainability.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Impact Stories / Testimonials</h3>
            <p style={styles.cardText}>Real stories from users making a difference.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Featured Projects or Products</h3>
            <p style={styles.cardText}>Explore verified projects and eco-friendly products.</p>
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
