import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EcomAdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onLogin = (e) => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const found = admins.find((a) => a.username === form.username && a.password === form.password);
    if (!found) return alert('Invalid credentials');
    localStorage.setItem('logged_in_admin', JSON.stringify(found));
    navigate('/admindashboard');
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={onLogin}>
        <input name="username" placeholder="Username" onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default EcomAdminLogin;
