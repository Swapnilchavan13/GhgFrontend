import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onRegister = (e) => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (admins.find((a) => a.username === form.username)) {
      alert('Admin already exists!');
    navigate('/ecomadminlogin');

      return;
    }
    admins.push({ ...form, businesses: [] });
    localStorage.setItem('admins', JSON.stringify(admins));
    alert('Registered successfully!');
    navigate('/ecomadminlogin');
  };

  return (
    <div>
      <h2>Admin Register</h2>
      <form onSubmit={onRegister}>
        <input name="username" placeholder="Username" onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" onChange={onChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
