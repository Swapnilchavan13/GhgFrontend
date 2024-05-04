import React, { useState, useEffect } from 'react';
import '../styles/addclients.css';
import { useNavigate } from 'react-router-dom';

export const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const adminloginstate = localStorage.getItem('adminloginstate');
    if (adminloginstate === 'true') {
      navigate('/addemission');
    }
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const handleLogin = () => {
    // Dummy authentication logic, replace with actual authentication logic
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('adminloginstate', true);
      navigate('/addemission');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='add-client-container'>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
