import React, { useEffect, useState } from "react";
import "../styles/reviewAndAction.css";

export default function ReviewAndAction() {
  const [data, setData] = useState(null);
  const [totals, setTotals] = useState({ totalCO2e: 0, categories: {} });
  const [climeScore, setClimeScore] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("emissionsEntries");
    if (stored) {
      const parsed = JSON.parse(stored);
      const latest = parsed[parsed.length - 1];
      setData(latest);

      // Calculate totals
      let total = 0;
      let categories = {};
      for (let cat in latest.inputData) {
        const co2e = latest.inputData[cat]?.co2e || 0;
        categories[cat] = co2e;
        total += co2e;
      }
      setTotals({ totalCO2e: total, categories });

      // Calculate ClimeScore
      const role = latest.role || "Individual";
      const benchmarks = {
        Individual: 10000,
        Business: 500000,
        "Government / NGO": 1000000
      };
      const benchmark = benchmarks[role] || 10000;

      let score = 100 - ((total / benchmark) * 100);
      if (score < 0) score = 0;
      if (score > 100) score = 100;
      setClimeScore(Math.round(score));
    }
  }, []);

  const downloadReport = (type) => {
    alert(`Downloading ${type} report... (Mock functionality)`);
  };

  const getRecommendations = () => {
    return [
      "Switch to renewable energy sources.",
      "Optimize transportation routes to reduce fuel use.",
      "Encourage remote work to cut commuting emissions.",
      "Improve waste segregation and recycling.",
      "Adopt energy-efficient appliances and lighting."
    ];
  };

  return (
    <div className="review-container">
      <h2>Review & Calculate</h2>

      {data ? (
        <>
          {/* Totals */}
          <div className="total-summary">
            <h3>Total Estimated Emissions</h3>
            <div className="total-value">{totals.totalCO2e.toLocaleString()} kg CO₂e</div>
          </div>

          {/* Category Breakdown */}
          <div className="category-breakdown">
            <h4>Category-wise Emissions</h4>
            <div className="category-list">
              {Object.keys(totals.categories).map((cat) => (
                <div className="category-card" key={cat}>
                  <h5>{cat.toUpperCase()}</h5>
                  <p>{totals.categories[cat].toLocaleString()} kg CO₂e</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Comparison */}
          <div className="comparison-section">
            <h4>Comparison vs Global Average</h4>
            <p>Your total emissions are <strong>{(totals.totalCO2e / (data.role === "Individual" ? 10000 : data.role === "Business" ? 500000 : 1000000) * 100).toFixed(1)}%</strong> of the average global emissions for your role.</p>
          </div>

          {/* GHG Protocol Report */}
          <div className="ghg-report">
            <h4>GHG Protocol Summary</h4>
            <p>This report follows the GHG Protocol and ISO 14064 guidelines for carbon accounting.</p>
          </div>

          {/* Step 5 */}
          <h2 style={{ marginTop: "40px" }}>Action Plan & Offset</h2>
          <div className="recommendations">
            <h4>Recommended Actions</h4>
            <ul>
              {getRecommendations().map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Offset CTA */}
          <div className="offset-section">
            <button className="offset-btn">Offset Emissions → Credit Marketplace</button>
          </div>

          {/* Download Options */}
          <div className="download-section">
            <button onClick={() => downloadReport("PDF")}>Download PDF Report</button>
            <button onClick={() => downloadReport("Excel")}>Download Excel Report</button>
          </div>

          {/* ClimeScore */}
          <div className="climescore">
            <h3>Your ClimeScore: <span>{climeScore}/100</span></h3>
          </div>
        </>
      ) : (
        <p>No data found for review. Please complete previous steps.</p>
      )}
    </div>
  );
}
