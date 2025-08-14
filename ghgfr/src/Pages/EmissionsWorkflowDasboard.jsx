// src/Pages/EmissionsWorkflowDashboard.jsx
import React, { useEffect, useState } from "react";
import "../styles/ecomdashboard.css";

export default function EmissionsWorkflowDashboard() {
  const [entries, setEntries] = useState([]);
  const [totalCO2e, setTotalCO2e] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emissionsEntries") || "[]");
    setEntries(saved);

    // Calculate total CO₂e
    let total = 0;
    saved.forEach(entry => {
      Object.values(entry.inputData || {}).forEach(item => {
        if (item.co2e) {
          total += Number(item.co2e);
        }
      });
    });
    setTotalCO2e(total);
  }, []);

  if (!entries.length) {
    return (
      <div className="dashboard-container">
        <h2>Emissions Measurement Dashboard</h2>
        <p className="no-data">No records found. Please complete the workflow first.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Emissions Measurement Dashboard</h2>

      {/* Total Summary */}
      <div className="total-summary">
        <h3>Total CO₂e Emissions</h3>
        <p className="total-value">{totalCO2e.toFixed(2)} kg</p>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="dashboard-card">
          <div className="card-header">
            <h3>{entry.role}</h3>
            <span className="date">
              {new Date(entry.date).toLocaleString()}
            </span>
          </div>

          {/* Onboarding Info */}
          <div className="dashboard-section">
            <h4>Onboarding Details</h4>
            <p><strong>Name:</strong> {entry.onboarding?.name || "N/A"}</p>
            <p><strong>Location:</strong> {entry.onboarding?.location || "N/A"}</p>
            <p><strong>Sector:</strong> {entry.onboarding?.sector || "N/A"}</p>
          </div>

          {/* Categories */}
          <div className="dashboard-section">
            <h4>Selected Categories</h4>
            {Object.keys(entry.categoryData || {}).map((catKey) => {
              const cat = entry.categoryData[catKey];
              if (!cat.selected) return null;
              return (
                <div key={catKey} className="category-block">
                  <p><strong>{catKey.toUpperCase()}</strong></p>
                  {cat.options?.length > 0 ? (
                    <ul>
                      {cat.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No specific options selected</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Input Data */}
            <h4>Emission Data</h4>
          <div className="dashboard-section emission-data">
            {Object.keys(entry.inputData || {}).map((catKey) => {
              const data = entry.inputData[catKey];
              return (
                <div key={catKey} className="input-block">
                  <p><strong>{catKey.toUpperCase()}</strong></p>
                  <p>Amount: {data.amount || "N/A"}</p>
                  <p>Notes: {data.notes || "N/A"}</p>
                  {data.co2e && (
                    <p>Estimated CO₂e: <strong>{data.co2e.toFixed(2)} kg</strong></p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
