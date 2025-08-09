// src/pages/EcomAdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EcomAdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8080/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.adminId) {
      // Store admin info in localStorage for session purposes
      localStorage.setItem("logged_in_admin", JSON.stringify({ username: form.username, adminId: data.adminId }));
      navigate("/admindashboard");  // make sure your route path is correct and matches your Router setup
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default EcomAdminLogin;
