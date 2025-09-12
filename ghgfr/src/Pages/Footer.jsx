import React from 'react';
import '../styles/footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} ClimeScore. All rights reserved.</p>
      <p>
        <a href="/about">About</a> | <a href="/contact">Contact</a>
      </p>
    </div>
  </footer>
  )
}
