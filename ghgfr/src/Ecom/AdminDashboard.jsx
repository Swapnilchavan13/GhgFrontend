import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [emissions, setEmissions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem("logged_in_admin"));
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");

    const admin = admins.find((a) => a.username === loggedInAdmin?.username);
    if (admin) {
      setBusinesses(admin.businesses || []);
    }

    const allEmissions = JSON.parse(localStorage.getItem("business_emission_entries_by_user") || "{}");
    setEmissions(allEmissions);
  }, []);

  const handleAddBusiness = () => {
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    const loggedInAdmin = JSON.parse(localStorage.getItem("logged_in_admin"));

    const adminIndex = admins.findIndex((a) => a.username === loggedInAdmin.username);

    if (admins[adminIndex].businesses.find(b => b.username === username)) {
      alert("Business already exists");
      return;
    }

    const newBusiness = { username, password, businessName };
    admins[adminIndex].businesses.push(newBusiness);
    localStorage.setItem("admins", JSON.stringify(admins));

    setBusinesses([...businesses, newBusiness]);
    setUsername("");
    setPassword("");
    setBusinessName("");
  };

  const handleLogout = () => {
    localStorage.removeItem("logged_in_admin");
    navigate("/admin-login"); // Adjust this path if needed
  };

  const getBusinessName = (username) => {
    const biz = businesses.find(b => b.username === username);
    return biz ? biz.businessName : username;
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h3>Add Business</h3>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <input placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} /><br />
      <button onClick={handleAddBusiness}>Add Business</button>

      <h3>All Emissions</h3>
      {Object.entries(emissions).map(([bizUsername, entries]) => (
        <div key={bizUsername} style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
          <strong>{getBusinessName(bizUsername)}</strong>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr>
                {entries.length > 0 && Object.keys(entries[0]).map((key) => (
                  <th key={key} style={{ border: "1px solid #ddd", padding: "8px", textTransform: "capitalize" }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={i}>
                  {Object.entries(entry).map(([k, v]) => (
                    <td key={k} style={{ border: "1px solid #ddd", padding: "8px" }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
