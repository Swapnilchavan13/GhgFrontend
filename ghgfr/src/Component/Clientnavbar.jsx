import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export const Clientnavbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn key from local storage
    localStorage.removeItem('userId'); // Remove isLoggedIn key from local storage

    navigate('/client/login')
    alert('Logout successful!');
  };

  return (
    <div className="navbar-container">
      <Link to='/client/myemission' className="nav-link">
        <h3>My Emission</h3>
      </Link>
      <Link to='/client/addusers' className="nav-link">
        <h3>Add Users</h3>
      </Link>
      <Link to='/client/myusers' className="nav-link">
        <h3>My Users</h3>
      </Link>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="nav-link">
          <h3>Logout</h3>
        </button>
      ) : (
        <Link to='/client/login' className="nav-link">
          <h3>Login</h3>
        </Link>
      )}
    </div>
  );
};
