import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export const Clientnavbar = ({ logoimg }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn key from local storage
    localStorage.removeItem('userId'); // Remove isLoggedIn key from local storage

    navigate('/client/login')
    alert('Logout successful!');
  };

  console.log(logoimg)

  return (
    <div className="navbar-container">
        <img style={{borderRadius:'15px', marginLeft:"-60px"}} src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="" />

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
        // <button className="nav-link">
          <h3 style={{marginTop:'10px'}} className="nav-link" onClick={handleLogout} >Logout</h3>
        // </button>
      ) : (
        <Link to='/client/login' className="nav-link">
          <h3>Login</h3>
        </Link>
      )}
      {logoimg !== null && <img src={`http://62.72.59.146:8080${logoimg}`} alt="Client Logo" className="client-logo" />}

    </div>
  );
};
