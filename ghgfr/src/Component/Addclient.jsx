import React, { useState } from 'react';
import { Adminnavbar } from './Adminnavbar';
import '../styles/addclients.css';

export const Addclient = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to the backend here
    const response = await fetch('http://localhost:8080/addclient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, userId, password }),
    });

    if (response.ok) {
      alert('Client added successfully!');
    } else {
      console.error('Failed to add client');
    }
  };

  return (
    <>
      <Adminnavbar />
      <div className="add-client-container">
        <h2>Add Client</h2>
        <form onSubmit={handleSubmit} className="client-form">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            User ID:
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit" className="submit-button">
            Add Client
          </button>
        </form>
      </div>
    </>
  );
};
