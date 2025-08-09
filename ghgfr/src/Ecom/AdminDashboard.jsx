import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const API_BASE = "http://localhost:8080";

  // Get adminId from 'logged_in_admin' localStorage key
  const storedAdmin = localStorage.getItem("logged_in_admin");
  const [adminId, setAdminId] = useState(() => {
    if (storedAdmin) {
      try {
        return JSON.parse(storedAdmin).adminId || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [businesses, setBusinesses] = useState([]);
  const [emissionsByBusiness, setEmissionsByBusiness] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch businesses created by this admin
  const fetchBusinesses = async () => {
    if (!adminId) return;
    try {
      const res = await fetch(`${API_BASE}/businesses/by-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId }),
      });
      if (!res.ok) throw new Error("Failed to fetch businesses");
      const data = await res.json();
      setBusinesses(data.businesses || []);
    } catch (err) {
      console.error(err);
      setBusinesses([]);
    }
  };

  // Fetch emissions for all businesses of this admin
  const fetchEmissions = async () => {
    if (!adminId) return;
    try {
      const res = await fetch(`${API_BASE}/admin/emissions/${adminId}`);
      if (!res.ok) throw new Error("Failed to fetch emissions");
      const emissions = await res.json();

      // Group emissions by businessId for easier display
      const grouped = {};
      emissions.forEach((e) => {
        const key = e.businessId;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(e);
      });
      setEmissionsByBusiness(grouped);
    } catch (err) {
      console.error(err);
      setEmissionsByBusiness({});
    }
  };

  

  useEffect(() => {
    if (!adminId) {
      alert("Please login as admin first");
      navigate("/ecomadminlogin");
      return;
    }
    fetchBusinesses();
    fetchEmissions();
  }, [adminId]);

  // Add a new business using API
  const handleAddBusiness = async () => {
    if (!username.trim() || !password.trim() || !businessName.trim()) {
      setMessage("Please fill in all fields");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/business/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminId,
          name: businessName,
          username,
          password,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setMessage(errData.message || "Failed to add business");
      } else {
        const data = await res.json();
        setBusinesses((prev) => [...prev, data.business]);
        setUsername("");
        setPassword("");
        setBusinessName("");
        setMessage("Business added successfully");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to add business");
    }
    setLoading(false);
  };

  // Get business name by businessId
  const getBusinessName = (businessId) => {
    const biz = businesses.find((b) => b._id === businessId);
    return biz ? biz.name : businessId;
  };

  // Logout function removes correct localStorage key
  const handleLogout = () => {
    localStorage.removeItem("logged_in_admin");
    navigate("/ecomadminlogin");
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <section style={{ marginTop: 30 }}>
        <h3>Add Business</h3>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          style={{ width: "100%", marginBottom: 10, padding: 8, boxSizing: "border-box" }}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{ width: "100%", marginBottom: 10, padding: 8, boxSizing: "border-box" }}
        />
        <input
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          disabled={loading}
          style={{ width: "100%", marginBottom: 10, padding: 8, boxSizing: "border-box" }}
        />
        <button
          onClick={handleAddBusiness}
          disabled={loading || !username || !password || !businessName}
          style={{
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
          }}
        >
          {loading ? "Adding..." : "Add Business"}
        </button>
        {message && (
          <p style={{ marginTop: 10, color: message.includes("success") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </section>

     <section style={{ marginTop: 40 }}>
  <h3>All Emissions</h3>
  {Object.keys(emissionsByBusiness).length === 0 && <p>No emissions found.</p>}
  {Object.entries(emissionsByBusiness).map(([businessId, entries]) => (
    <div
      key={businessId}
      style={{ marginBottom: 20, border: "1px solid #ccc", borderRadius: 6, padding: 10 }}
    >
      <strong>{getBusinessName(businessId)}</strong>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}
        border="1"
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Transaction Type</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Transport Mode</th>
            <th>Vehicle</th>
            <th>Weight (Kg)</th>
            <th>Distance (Km)</th>
            <th>Emission Factor</th>
            <th>Emission</th>
            <th>Pack Material</th>
            <th>Pack Weight (Kg)</th>
            <th>Pack Factor</th>
            <th>Pack Emission</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td style={{ padding: 6 }}>{entry.username}</td>
              <td style={{ padding: 6 }}>{entry.transactionType}</td>
              <td style={{ padding: 6 }}>{entry.pickup || "-"}</td>
              <td style={{ padding: 6 }}>{entry.drop || "-"}</td>
              <td style={{ padding: 6 }}>{entry.transportMode || "-"}</td>
              <td style={{ padding: 6 }}>{entry.vehicle || "-"}</td>
              <td style={{ padding: 6 }}>{entry.weightKg != null ? entry.weightKg : "-"}</td>
              <td style={{ padding: 6 }}>{entry.distanceKm != null ? entry.distanceKm : "-"}</td>
              <td style={{ padding: 6 }}>{entry.emissionFactor != null ? entry.emissionFactor : "-"}</td>
              <td style={{ padding: 6 }}>{entry.emission != null ? entry.emission : "-"}</td>
              <td style={{ padding: 6 }}>{entry.packMaterial || "-"}</td>
              <td style={{ padding: 6 }}>{entry.packWeightKg != null ? entry.packWeightKg : "-"}</td>
              <td style={{ padding: 6 }}>{entry.packFactor != null ? entry.packFactor : "-"}</td>
              <td style={{ padding: 6 }}>{entry.packEmission != null ? entry.packEmission : "-"}</td>
              <td style={{ padding: 6 }}>{new Date(entry.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</section>

    </div>
  );
};

export default AdminDashboard;
