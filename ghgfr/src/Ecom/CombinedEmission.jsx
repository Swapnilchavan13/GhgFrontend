import React, { useEffect, useState } from "react";
import { Clientnavbar } from '../Component/Clientnavbar';

const API_SCOPE = "https://backend.climescore.com/getdata12";
const API_ECOM = "http://62.72.59.146:8080/emission";

const CombinedEmission = () => {
  const [sdata, setSdata] = useState([]);
  const [edata, setEdata] = useState([]);
  const [scopeTotals, setScopeTotals] = useState({});
  const [ecomTotals, setEcomTotals] = useState({
    packaging: 0,
    transport: 0,
    returnEmission: 0,
    total: 0,
  });
  const [selectedYear, setSelectedYear] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [returnFilter, setReturnFilter] = useState("withReturn");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("useruserId");

  

  const getReturnFactor = (mode) => {
    const factors = {
      Air: 1.58,
      Sea: 0.03,
      Rail: 0.06,
      Road: 0.12,
      EV: 0.05,
      "Bicycle courier": 0.005,
    };
    return factors[mode] || 0;
  };

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_SCOPE}?userId=${username}`).then((r) => r.json()),
      fetch(`${API_ECOM}/${encodeURIComponent(username)}`).then((r) => r.json()),
    ])
      .then(([scopeData, ecomData]) => {
        setSdata(Array.isArray(scopeData) ? scopeData : []);
        const arr = Array.isArray(ecomData) ? ecomData : ecomData.entries || [];
        setEdata(arr);
      })
      .catch((err) => console.error("Error fetching emissions:", err))
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (sdata.length > 0) calculateScopeTotals();
    if (edata.length > 0) calculateEcomTotals();
  }, [sdata, edata, selectedYear, fromDate, toDate, returnFilter]);

  const calculateScopeTotals = () => {
    const totals = {};
    sdata.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear().toString();
      if (selectedYear !== "All" && year !== selectedYear) return;
      if (fromDate && date < new Date(fromDate)) return;
      if (toDate && date > new Date(toDate)) return;
      const scope = item.group || "Unspecified";
      const val = parseFloat(item.result) || 0;
      totals[scope] = (totals[scope] || 0) + val;
    });
    setScopeTotals(totals);
  };

  const calculateEcomTotals = () => {
    let packagingTotal = 0;
    let transportTotal = 0;
    let returnTotal = 0;
    let total = 0;

    edata.forEach((e) => {
      const date = new Date(e.orderDate);
      const year = date.getFullYear().toString();
      if (selectedYear !== "All" && year !== selectedYear) return;
      if (fromDate && date < new Date(fromDate)) return;
      if (toDate && date > new Date(toDate)) return;

      const basePackaging = (e.packagingWeightKg || 0) * (e.packagingEmissionFactor || 0);
      const baseTransport =
        ((e.packagingWeightKg || 0) / 1000) *
        (e.distanceKm || 0) *
        (e.transportEmissionFactor || 0);
      const returnEmission = e.returnFlag
        ? ((e.packagingWeightKg || 0) / 1000) *
          (e.returnDistanceKm || 0) *
          getReturnFactor(e.returnTransportMode)
        : 0;

      if (returnFilter === "withReturn") {
        packagingTotal += basePackaging;
        transportTotal += baseTransport;
        returnTotal += returnEmission;
        total += basePackaging + baseTransport + returnEmission;
      } else if (returnFilter === "withoutReturn") {
        packagingTotal += basePackaging;
        transportTotal += baseTransport;
        total += basePackaging + baseTransport;
      } else if (returnFilter === "onlyReturn") {
        returnTotal += returnEmission;
        total += returnEmission;
      }
    });

    setEcomTotals({
      packaging: packagingTotal,
      transport: transportTotal,
      returnEmission: returnTotal,
      total,
    });
  };


  // === Calculate overall per-product emission ===
const totalPackagingUnits = edata
  .filter((e) => {
    const date = new Date(e.orderDate);
    const year = date.getFullYear().toString();
    if (selectedYear !== "All" && year !== selectedYear) return false;
    if (fromDate && date < new Date(fromDate)) return false;
    if (toDate && date > new Date(toDate)) return false;
    return true;
  })
  .reduce((sum, e) => sum + (e.packagingUnits || 0), 0);

const perProductTotal =
  totalPackagingUnits > 0 ? ecomTotals.total / totalPackagingUnits : 0;


  const uniqueYears = [
    "All",
    ...new Set([
      ...sdata.map((i) => new Date(i.date).getFullYear().toString()),
      ...edata.map((i) => new Date(i.orderDate).getFullYear().toString()),
    ]),
  ];

  const filteredEdata = edata.filter((e) => {
    const date = new Date(e.orderDate);
    const year = date.getFullYear().toString();
    if (selectedYear !== "All" && year !== selectedYear) return false;
    if (fromDate && date < new Date(fromDate)) return false;
    if (toDate && date > new Date(toDate)) return false;
    return true;
  });

  const totalOrders = edata.length;
const filteredOrders = filteredEdata.length;

const uniqueOrderIds = new Set(edata.map((e) => e.orderId)).size;
const uniqueFilteredOrderIds = new Set(filteredEdata.map((e) => e.orderId)).size;

  const computeRowTotals = (e) => {
    const basePackaging = (e.packagingWeightKg || 0) * (e.packagingEmissionFactor || 0);
    const baseTransport =
      ((e.packagingWeightKg || 0) / 1000) *
      (e.distanceKm || 0) *
      (e.transportEmissionFactor || 0);
    const returnEmission = e.returnFlag
      ? ((e.packagingWeightKg || 0) / 1000) *
        (e.returnDistanceKm || 0) *
        getReturnFactor(e.returnTransportMode)
      : 0;

    if (returnFilter === "withReturn") {
      return {
        packaging: basePackaging,
        transport: baseTransport,
        returnEmission,
        total: basePackaging + baseTransport + returnEmission,
      };
    } else if (returnFilter === "withoutReturn") {
      return {
        packaging: basePackaging,
        transport: baseTransport,
        returnEmission: 0,
        total: basePackaging + baseTransport,
      };
    } else {
      return {
        packaging: 0,
        transport: 0,
        returnEmission,
        total: returnEmission,
      };
    }
  };

  // === Calculate combined totals ===
  const ecomInTons = ecomTotals.total / 1000;
  const scope3WithEcom = (scopeTotals["Scope 3"] || 0) + ecomInTons;
  const allScopeTotal = Object.entries(scopeTotals).reduce(
    (sum, [scope, val]) =>
      sum + (scope === "Scope 3" ? val + ecomInTons : val),
    0
  );

  return (
    <>
      <Clientnavbar />
    <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>
      <h2 style={{ color: "#0d257f" }}>🌍 Total Emission Dashboard</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* === FILTERS === */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
            <div>
              <label>From: </label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div>
              <label>To: </label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div>
              <label>Year: </label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Return Type: </label>
              <select value={returnFilter} onChange={(e) => setReturnFilter(e.target.value)}>
                <option value="withReturn">With Return</option>
                <option value="withoutReturn">Without Return</option>
                <option value="onlyReturn">Only Return</option>
              </select>
            </div>
          </div>

          {/* === SCOPE TABLE === */}
          <h3>Scope-wise Emissions (in tons CO₂e)</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead style={{ background: "#e0e7f1" }}>
              <tr>
                <th>Scope</th>
                <th>Total (tons CO₂e)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scopeTotals).map(([scope, val]) => {
                if (scope === "Scope 3") {
                  return (
                    <tr key={scope} style={{ fontWeight: "bold", background: "#f5faff" }}>
                      <td>{scope}</td>
                      <td>{scope3WithEcom.toFixed(2)}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={scope}>
                      <td>{scope}</td>
                      <td>{val.toFixed(2)}</td>
                    </tr>
                  );
                }
              })}
              <tr style={{ fontWeight: "bold", background: "#d8e3f2" }}>
                <td>All Scopes Total</td>
                <td>{allScopeTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

            {/* === COMBINED TOTAL === */}
          {/* <h3 style={{ marginTop: "30px", color: "green" }}>
            🌎 Overall Total Emission (All Scopes + E-commerce): {allScopeTotal.toFixed(2)} tons CO₂e
          </h3> */}

          {/* === ECOM TABLE === */}
          <h3 style={{ marginTop: "25px" }}>Order Related Emission Dashboard</h3>
          <div style={{ marginBottom: "10px", fontWeight: "bold", color: "#0d257f" }}>
  <p>Total Orders: {uniqueOrderIds}</p>
  {/* <p>Orders Matching Filters: {uniqueFilteredOrderIds}</p> */}
</div>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
  <thead style={{ background: "#e0e7f1" }}>
    <tr>
      <th>Packaging (kg CO₂e)</th>
      <th>Transport (kg CO₂e)</th>
      {/* <th>Return (kg CO₂e)</th> */}
      <th>Total (kg CO₂e)</th>
      <th>Per-Product (kg CO₂e/unit)</th>
    </tr>
  </thead>

  <tbody>
    <tr style={{ fontWeight: "bold" }}>
      <td>{ecomTotals.packaging.toFixed(2)}</td>
      <td>{ecomTotals.transport.toFixed(2)}</td>
      {/* <td>{ecomTotals.returnEmission.toFixed(2)}</td> */}
      <td>{ecomTotals.total.toFixed(2)}</td>
      <td>{perProductTotal.toFixed(2)}</td>
    </tr>

    <tr style={{ fontWeight: "bold", background: "#f3f9ef" }}>
      <td colSpan="3" align="right">E-com Total (in tons CO₂e)</td>
      <td>{ecomInTons.toFixed(3)}</td>
    </tr>
  </tbody>
</table>


        
        </>
      )}
    </div>
        </>
  );
};

export default CombinedEmission;
