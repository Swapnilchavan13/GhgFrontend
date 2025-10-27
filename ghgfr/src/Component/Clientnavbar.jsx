import React, { useState } from 'react';
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



   const [showModal, setShowModal] = useState(false);

  const handleOptionClick = (path) => {
    setShowModal(false);
    navigate(path);
  };
  // console.log(logoimg)

  const buttonStyle = {
  display: "block",
  width: "100%",
  padding: "10px 0",
  marginBottom: "10px",
  border: "none",
  borderRadius: "6px",
  background: "#0f63be",
  color: "#fff",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
};

  return (
    <div className="navbar-container">
        <img className='logimg' src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="" />

      <div
        className="nav-link"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        <h3>My Emission</h3>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              minWidth: "300px",
              textAlign: "center",
              boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#0d257f" }}>
              Choose Emission Type
            </h2>

            <button
              style={buttonStyle}
              onClick={() => handleOptionClick("/client/myemission")}
            >
              Normal Emission
            </button>

            <button
              style={buttonStyle}
              onClick={() => handleOptionClick("/client/ecomemission")}
            >
              Ecom Emission
            </button>

            <button
              style={buttonStyle}
              onClick={() => handleOptionClick("/client/combinedemission")}
            >
              Combined Emission
            </button>

            <button
              style={{
                ...buttonStyle,
                background: "#ccc",
                color: "#333",
                marginTop: "15px",
              }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Link to='/client/addusers' className="nav-link">
        <h3>Add Users</h3>
      </Link>
      <Link to='/client/myusers' className="nav-link">
        <h3>My Users</h3>
      </Link>
      <Link to='/client/reports' className="nav-link">
        <h3>Reports</h3>
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
      {logoimg !== null && <img src={`https://backend.climescore.com${logoimg}`} alt="Client Logo" className="client-logo" />}

    </div>
  );
};
