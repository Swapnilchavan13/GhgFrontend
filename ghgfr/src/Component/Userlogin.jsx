import React, { useState } from 'react';
import '../styles/addclients.css';
import { Link, useNavigate } from 'react-router-dom';
import { Usernavbar } from './Usernavbar';

export const Userlogin = () => {
  const storedLoginStatus = localStorage.getItem('isUserLoggedIn') === 'true';
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(storedLoginStatus);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUserName('');
    setLoginStatus(false);
    localStorage.setItem('isUserLoggedIn', 'false');
    localStorage.removeItem('useruserId'); // Remove user ID on logout
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://backend.climescore.com/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        // Login successful
        setLoggedInUserName(userId);
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('useruserId', userId); // Save user ID on successful login
        alert('Login successful!');
        navigate('/user/useremission');
        // Redirect to the My Emission page or perform any other necessary actions
      } else {
        // Login failed
        setLoginStatus(false);
        localStorage.setItem('isUserLoggedIn', 'false');
        localStorage.removeItem('useruserId'); // Remove user ID on unsuccessful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus(false);
      localStorage.setItem('isUserLoggedIn', 'false');
      localStorage.removeItem('useruserId'); // Remove user ID on error
    }
  };

  return (
    <>
      <Usernavbar isLoggedIn={loginStatus} userName={loggedInUserName} onLogout={handleLogout} />
      <div className="add-client-container">
        <h2>User Login</h2>
       
        <label>
          User Id:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
        <br />
        <br />

        {/* <Link to='/email'>
        Forgot password
        </Link> */}

      </div>
    </>
  );
};
