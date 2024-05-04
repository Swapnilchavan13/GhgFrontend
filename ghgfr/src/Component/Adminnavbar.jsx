import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/navbar.css"

export const Adminnavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('adminloginstate', false);
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <img style={{borderRadius:'15px'}} src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="" />
      <Link to='/addemission' className="nav-link">
        <h3>Add Emissions</h3>
      </Link>
      <Link to='/addclient' className="nav-link">
        <h3>Add Clients</h3>
      </Link>      
      <Link to='/allclients' className="nav-link">
        <h3>All Clients</h3>
      </Link>
      <Link to='/allemissions' className="nav-link">
        <h3>All Emissions</h3>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
