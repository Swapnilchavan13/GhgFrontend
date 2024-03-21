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
            <img style={{borderRadius:'15px', marginLeft:"-60px"}} src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="" />

      <Link to='/user/useremission' className="nav-link">
        <h3>My Emissions</h3>
      </Link>
      {isUserLoggedIn ? (
        <h3 onClick={handleLogout} className="navh3">
          Logout
        </h3>
      ) : (
        <Link to='/user/login' className="nav-link">
          <h3>Login</h3>
        </Link>
      )}
    </div>
  );
};
