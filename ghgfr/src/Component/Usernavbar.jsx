import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export const Usernavbar = () => {
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn'); // Remove isLoggedIn key from local storage
    navigate('/user/login')
    alert('Logout successful!');
  };

  return (
    <div className="navbar-container">
      <Link to='/user/emission' className="nav-link">
        <h3>My Emission</h3>
      </Link>
      {isUserLoggedIn ? (
        <button onClick={handleLogout} className="nav-link">
          <h3>Logout</h3>
        </button>
      ) : (
        <Link to='/user/login' className="nav-link">
          <h3>Login</h3>
        </Link>
      )}
    </div>
  );
};
