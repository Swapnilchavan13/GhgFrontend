import React, { useEffect, useState } from 'react';
import '../styles/addclients.css';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Addusers = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [clientId, setClientId] = useState(localStorage.getItem('userId'));
  const [logoimg, setLogoimg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to the backend here
    const response = await fetch('https://backend.climescore.com/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientId, username, userId, password, emailid }),
    });

    if (response.ok) {
      alert('User added successfully!');
      // Reset form fields
      setUsername('');
      setUserId('');
      setEmailid('');
      setPassword('');
    } else {
      console.error('Failed to add User');
    }
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!storedIsLoggedIn);
  }, []);

  // Redirect to the login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/client/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Fetch client's data including logoimg
    fetch('https://backend.climescore.com/getclients')
      .then((response) => response.json())
      .then((data) => {
        // Find the client data whose userId matches with the one in local storage
        const client = data.find((client) => client.userId === localStorage.getItem('userId'));
        if (client) {
          setLogoimg(client.logoimg);
        }
      })
      .catch((error) => console.error('Error fetching client data:', error));
  }, []);

  return (
    <>
      <Clientnavbar logoimg={logoimg} />
      <div className="add-client-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit} className="client-form">
          <label>
            Client Id:
            <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} readOnly />
          </label>
          <label>
            User Name:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
         
          <label>
            Enter User Email ID:
            <input type="text" value={emailid} onChange={(e) => setEmailid(e.target.value)} />
          </label>

          <label>
            Create User ID:
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </label>
          <br />
          <label>
            Create Password:
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <br />
          <button type="submit">Add User</button>
        </form>
      </div>
    </>
  );
};
