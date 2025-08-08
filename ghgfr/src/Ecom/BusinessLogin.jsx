import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onLogin = (e) => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const allBusinesses = admins.flatMap(a => a.businesses);
    const found = allBusinesses.find((b) => b.username === form.username && b.password === form.password);
    if (!found) return alert('Invalid credentials');
    localStorage.setItem('logged_in_business', JSON.stringify(found));
    navigate('/businessdashboard');
  };

  return (
    <div>
      <h2>Business Login</h2>
      <form onSubmit={onLogin}>
        <input name="username" placeholder="Username" onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default BusinessLogin;
