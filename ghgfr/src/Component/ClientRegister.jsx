import React, { useState } from 'react';
import '../styles/addclientnew.css';
import { useNavigate } from 'react-router-dom';

export const ClientRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [sector, setSector] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logoImg, setLogoImg] = useState(null);
  const [logoImgPreview, setLogoImgPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('contactNumber', contactNumber); // will be login ID
    formData.append('email', email);
    formData.append('organization', organization);
    formData.append('sector', sector);
    formData.append('password', password);
    formData.append('logoimg', logoImg);

    const response = await fetch('https://backend.climescore.com/addclient', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Registered successfully! Please log in with your contact number.');
      // Reset fields
      setFirstName('');
      setLastName('');
      setContactNumber('');
      setEmail('');
      setOrganization('');
      setSector('');
      setPassword('');
      setConfirmPassword('');
      setLogoImg(null);
      setLogoImgPreview(null);

      navigate('/client/login'); // ✅ redirect to client login
    } else {
      console.error('Failed to register');
      alert('Registration failed. Please try again.');
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
    <div className="add-client-container">
      <h2>Client Registration</h2>
      <p className="note">Note: Your <strong>Contact Number</strong> will be your login ID.</p>
      
      <form onSubmit={handleSubmit} className="client-form">
        <label>
          First Name:
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </label>
        <br />

        <label>
          Last Name:
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </label>
        <br />

       <label>
  Contact Number:
  <input 
    type="tel" 
    value={contactNumber} 
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); // only digits
      if (value.length <= 10) {
        setContactNumber(value);
      }
    }} 
    maxLength="10"
    required 
    placeholder="Enter 10-digit number"
  />
</label>

        <br />

        <label>
          Email ID:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <br />

        <label>
          Organization Name:
          <input 
            type="text" 
            value={organization} 
            onChange={(e) => setOrganization(e.target.value)} 
            required 
          />
        </label>
        <br />

        <label>
          Sector / Industry:
          <select value={sector} onChange={(e) => setSector(e.target.value)} required>
            <option value="">Select Sector</option>
            <option value="IT">IT</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />

        <label>
          Password:
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <br />

        <label>
          Confirm Password:
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <br />

        <label>
          Logo Image:
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </label>
        <br />

        {logoImgPreview && (
          <img src={logoImgPreview} alt="Logo Preview" className="logo-preview" />
        )}
        <br />

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};
