import React, { useEffect, useState } from "react";
import { Usernavbar } from "../Component/Usernavbar";
import { Clientnavbar } from "../Component/Clientnavbar";

const API_BASE = "http://62.72.59.146:8080";

const styles = {
  container: {
    maxWidth: "1280px",
    margin: "28px auto",
    padding: "32px",
    background: "#f6f9fd",
    borderRadius: "14px",
    fontFamily: '"Segoe UI", sans-serif',
    boxShadow: "0 2px 18px #b1b5bc14",
  },
  title: {
    fontSize: "2rem",
    color: "#0d257f",
    fontWeight: 700,
    marginBottom: "30px",
    textAlign: "center",
  },
  filters: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "25px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #d7dbe7",
    fontSize: "1rem",
    background: "#fff",
  },
  select: {
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #d7dbe7",
    fontSize: "1rem",
    background: "#fff",
  },
  button: {
    padding: "10px 20px",
    background: "#0f63be",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 10px 0 rgba(0,0,0,.06)",
  },
  th: {
    background: "#e0e7f1",
    color: "#14285e",
    fontWeight: 600,
    padding: "8px 10px",
    border: "1px solid #d0d6e0",
    fontSize: "0.9rem",
  },
  td: {
    border: "1px solid #d0d6e0",
    padding: "8px 10px",
    fontSize: "0.95rem",
    color: "#262949",
    textAlign: "center",
  },
  summary: {
    marginTop: "25px",
    textAlign: "right",
    fontWeight: 700,
    color: "#0f63be",
    fontSize: "1.1rem",
  },
};

// === Helper Calculation Functions ===
function calculatePackagingEmission(weightKg, factor) {
  return Number(weightKg || 0) * Number(factor || 0);
}

function calculateTransportEmission(weightKg, distanceKm, factor) {
  const tonnes = Number(weightKg || 0) / 1000;
  return tonnes * Number(distanceKm || 0) * Number(factor || 0);
}

function calculateReturnEmission(weightKg, distanceKm, mode) {
  const factors = {
    Air: 1.58,
    Sea: 0.03,
    Rail: 0.06,
    Road: 0.12,
    EV: 0.05,
    "Bicycle courier": 0.005,
  };
  const factor = factors[mode] || 0;
  const tonnes = Number(weightKg || 0) / 1000;
  return tonnes * Number(distanceKm || 0) * factor;
}

const EcomEmissionDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [returnFilter, setReturnFilter] = useState("withReturn");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("useruserId");

  useEffect(() => {
    if (!username) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/emission/${encodeURIComponent(username)}`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data.entries || [];
        setEntries(arr);
        setFiltered(arr);
      } catch (err) {
        console.error("Failed to fetch emission data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const handleFilter = () => {
    let filteredData = [...entries];

    // Date filter
    if (fromDate || toDate) {
      const from = fromDate ? new Date(fromDate) : new Date("1970-01-01");
      const to = toDate ? new Date(toDate) : new Date();
      filteredData = filteredData.filter((e) => {
        const date = new Date(e.orderDate);
        return date >= from && date <= to;
      });
    }

    // Return filters
    if (returnFilter === "withReturn") {
      filteredData = filteredData.filter((e) => e.returnFlag === true);
    } else if (returnFilter === "withoutReturn") {
      filteredData = filteredData.filter((e) => !e.returnFlag);
    } else if (returnFilter === "onlyReturn") {
      filteredData = filteredData.filter((e) => e.returnFlag === true);
    }

    setFiltered(filteredData);
  };

  const totals = filtered.map((e) => {
    const basePackaging = calculatePackagingEmission(e.packagingWeightKg, e.packagingEmissionFactor);
    const baseTransport = calculateTransportEmission(e.packagingWeightKg, e.distanceKm, e.transportEmissionFactor);
    const returnEmission = e.returnFlag
      ? calculateReturnEmission(e.packagingWeightKg, e.returnDistanceKm, e.returnTransportMode)
      : 0;

    const units = e.packagingUnits || 1;
    const returned = e.returnQuantity || 0;
    const soldRatio = units > 0 ? (units - returned) / units : 1;
    const returnRatio = units > 0 ? returned / units : 0;

    let packagingEmission = 0;
    let transportEmission = 0;
    let total = 0;

    if (returnFilter === "withReturn") {
      packagingEmission = basePackaging;
      transportEmission = baseTransport;
      total = basePackaging + baseTransport + returnEmission;
    } else if (returnFilter === "withoutReturn") {
      packagingEmission = basePackaging * soldRatio;
      transportEmission = baseTransport * soldRatio;
      total = packagingEmission + transportEmission;
    } else if (returnFilter === "onlyReturn") {
      packagingEmission = basePackaging * returnRatio;
      transportEmission = baseTransport * returnRatio;
      total = packagingEmission + transportEmission + returnEmission;
    }

    return { total, packagingEmission, transportEmission, returnEmission, units };
  });

  const grandTotal = totals.reduce((sum, t) => sum + t.total, 0);
  const totalUnits = totals.reduce((sum, t) => sum + (t.units || 0), 0);
  const avgEmissionPerUnit = totalUnits > 0 ? grandTotal / totalUnits : 0;

  return (
    <>
      <Clientnavbar />
      <div style={styles.container}>
        <h2 style={styles.title}>E-commerce Emission Dashboard</h2>

        <div style={styles.filters}>
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Emission Type:
            <select
              value={returnFilter}
              onChange={(e) => setReturnFilter(e.target.value)}
              style={styles.select}
            >
              <option value="withReturn">With Return</option>
              <option value="withoutReturn">Without Return</option>
              <option value="onlyReturn">Only Return</option>
            </select>
          </label>
          <button style={styles.button} onClick={handleFilter}>
            Apply Filter
          </button>
        </div>

        {loading ? (
          <p>Loading emission data...</p>
        ) : (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Order Date</th>
                  <th style={styles.th}>Packaging Type</th>
                  <th style={styles.th}>Transport Mode</th>
                  <th style={styles.th}>Distance (km)</th>
                  <th style={styles.th}>Units</th>
                  <th style={styles.th}>Packaging Emission (kg CO₂e)</th>
                  <th style={styles.th}>Transport Emission (kg CO₂e)</th>
                  <th style={styles.th}>Return Emission (kg CO₂e)</th>
                  <th style={styles.th}>Total Emission (kg CO₂e)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((e, i) => {
                    const basePackaging = calculatePackagingEmission(e.packagingWeightKg, e.packagingEmissionFactor);
                    const baseTransport = calculateTransportEmission(e.packagingWeightKg, e.distanceKm, e.transportEmissionFactor);
                    const returnEmission = e.returnFlag
                      ? calculateReturnEmission(e.packagingWeightKg, e.returnDistanceKm, e.returnTransportMode)
                      : 0;

                    const units = e.packagingUnits || 1;
                    const returned = e.returnQuantity || 0;
                    const soldRatio = units > 0 ? (units - returned) / units : 1;
                    const returnRatio = units > 0 ? returned / units : 0;

                    let packagingEmission = 0;
                    let transportEmission = 0;
                    let total = 0;

                    if (returnFilter === "withReturn") {
                      packagingEmission = basePackaging;
                      transportEmission = baseTransport;
                      total = basePackaging + baseTransport + returnEmission;
                    } else if (returnFilter === "withoutReturn") {
                      packagingEmission = basePackaging * soldRatio;
                      transportEmission = baseTransport * soldRatio;
                      total = packagingEmission + transportEmission;
                    } else if (returnFilter === "onlyReturn") {
                      packagingEmission = basePackaging * returnRatio;
                      transportEmission = baseTransport * returnRatio;
                      total = packagingEmission + transportEmission + returnEmission;
                    }

                    return (
                      <tr key={i}>
                        <td style={styles.td}>{e.orderId}</td>
                        <td style={styles.td}>{new Date(e.orderDate).toLocaleDateString()}</td>
                        <td style={styles.td}>{e.packagingType}</td>
                        <td style={styles.td}>{e.transportMode}</td>
                        <td style={styles.td}>{e.distanceKm}</td>
                        <td style={styles.td}>{units}</td>
                        <td style={styles.td}>{packagingEmission.toFixed(2)}</td>
                        <td style={styles.td}>{transportEmission.toFixed(2)}</td>
                        <td style={styles.td}>{returnEmission.toFixed(2)}</td>
                        <td style={styles.td}>{total.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td style={styles.td} colSpan={10}>
                      No emission records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div style={styles.summary}>
              <div>Grand Total Emissions: {grandTotal.toFixed(2)} kg CO₂e</div>
              <div>Average per Unit: {avgEmissionPerUnit.toFixed(2)} kg CO₂e</div>
              <div>Total Units: {totalUnits}</div>
              <div>Orders Displayed: {filtered.length}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EcomEmissionDashboard;
