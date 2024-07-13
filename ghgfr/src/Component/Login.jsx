import React, { useState } from 'react';
import { Clientnavbar } from './Clientnavbar';
import '../styles/addclients.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(storedLoginStatus);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUserName('');
    setLoginStatus(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId'); // Remove user ID on logout
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://backend.climescore.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        // Login successful
        setLoggedInUserName(userId);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId); // Save user ID on successful login
        alert('Login successful!');
        navigate('/client/myemission');
        // Redirect to the My Emission page or perform any other necessary actions
      } else {
        // Login failed
        setLoginStatus(false);
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userId'); // Remove user ID on unsuccessful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus(false);
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userId'); // Remove user ID on error
    }
  };

  return (
    <>
      <Clientnavbar isLoggedIn={loginStatus} userName={loggedInUserName} onLogout={handleLogout} logoimg={null}/>
      <div className="add-client-container">
        <h2>Login</h2>
        <label>
          userId:
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
        {loginStatus === false && (
          <p style={{ color: 'red' }}>Incorrect username or password. Please try again.</p>
        )}
      </div>
    </>
  );
};
