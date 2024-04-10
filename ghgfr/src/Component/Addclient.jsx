import React, { useState } from 'react';
import { Adminnavbar } from './Adminnavbar';
import '../styles/addclients.css';

export const Addclient = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [logoImg, setLogoImg] = useState(null);
  const [logoImgPreview, setLogoImgPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('userId', userId);
    formData.append('password', password);
    formData.append('logoimg', logoImg);

    // Send data to the backend here
    const response = await fetch('http://62.72.59.146:8080/addclient', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Client added successfully!');
    } else {
      console.error('Failed to add client');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoImg(file);
    // Display preview of the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoImgPreview(null);
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
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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
          <label>
            Logo Image:
            <input type="file" accept="image/*" onChange={handleLogoChange} />
          </label>
          <br />
          {/* Display the selected logo image preview */}
          {logoImgPreview && (
            <img src={logoImgPreview} alt="Logo Preview" className="logo-preview" />
          )}
          <br />
          <button type="submit" className="submit-button">
            Add Client
          </button>
        </form>
      </div>
    </>
  );
};
