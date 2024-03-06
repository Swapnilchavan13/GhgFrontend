import React, { useState } from 'react';
import { Clientnavbar } from './Clientnavbar';
import '../styles/addclients.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(storedLoginStatus);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const navigate = useNavigate()

  const handleLogout = () => {
    setLoggedInUserName('');
    setLoginStatus(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        // Login successful
        // setLoginStatus(true);
        setLoggedInUserName(userId);
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        navigate('/client/myemission')
        // Redirect to the My Emission page or perform any other necessary actions
      } else {
        // Login failed
        setLoginStatus(false);
        localStorage.setItem('isLoggedIn', 'false');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus(false);
      localStorage.setItem('isLoggedIn', 'false');
    }
  };

  return (
    <>
      <Clientnavbar isLoggedIn={loginStatus} userName={loggedInUserName} onLogout={handleLogout} />
      <div className="add-client-container">
        <h2>Login</h2>
        <label>
          userId:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
