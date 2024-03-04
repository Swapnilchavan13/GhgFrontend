import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to='upload' className="nav-link">
        <h3>Upload Data</h3>
      </Link>
      <Link to='see' className="nav-link">
        <h3>All Data</h3>
      </Link>
      {/* <Link to='select' className="nav-link">
        <h3>Select Data</h3>
      </Link> */}
      
      <Link to='demo' className="nav-link">
        <h3>Select Data</h3>
      </Link>
    </div>
  );
};
