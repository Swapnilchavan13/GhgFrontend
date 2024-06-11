import React, { useEffect, useState } from 'react';
import { Adminnavbar } from './Adminnavbar';
import '../styles/addclients.css';
import { useNavigate } from 'react-router-dom';

export const Addclient = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [logoImg, setLogoImg] = useState(null);
  const [logoImgPreview, setLogoImgPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const adminloginstate = localStorage.getItem('adminloginstate');
    if (adminloginstate !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('userId', userId);
    formData.append('password', password);
    formData.append('logoimg', logoImg);

    const response = await fetch('http://62.72.59.146:8080/addclient', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Client added successfully!');
      // Reset form fields
      setUsername('');
      setUserId('');
      setPassword('');
      setLogoImg(null);
      setLogoImgPreview(null);
    } else {
      console.error('Failed to add client');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoImg(file);
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
