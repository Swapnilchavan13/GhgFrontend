// // src/pages/BusinessDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AREAS = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Chandigarh', 'Coimbatore', 'Kochi'];
// const TRANSPORT_MODES = ['Surface', 'Air', 'Sea'];
// const VEHICLES = ['MCV', 'LCV', 'Three Wheeler', 'Two Wheeler', 'Bus', 'Ship', 'Airplane'];
// const EMISSION_FACTORS = { MCV: 0.599, LCV: 0.319, 'Three Wheeler': 0.12, 'Two Wheeler': 0.035, Bus: 0.08, Ship: 0.03, Airplane: 1.58 };
// const PACK_MATERIALS = [
//   { name: "Bubble Wrap", factor: 3.5 },
//   { name: "Cling Wrap Film", factor: 2.4 },
//   { name: "Kraft paper box", factor: 0.94 },
//   { name: "Packaging tape", factor: 3.5 },
//   { name: "Polythene Bag", factor: 3.5 },
//   { name: "Thermal Paper", factor: 0.012 },
//   { name: "Copier Paper", factor: 0.05 },
// ];

// const styles = {
//   container: { maxWidth: '1280px', margin: '28px auto', padding: '32px', background: '#f6f9fd', borderRadius: '14px', fontFamily: '"Segoe UI",sans-serif', boxShadow: '0 2px 18px #b1b5bc14' },
//   title: { fontSize: '2.12rem', color: '#0d257f', fontWeight: 700, marginBottom: '30px', textAlign: 'center' },
//   form: { display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '30px', alignItems: 'flex-end' },
//   input: { padding: '9px 12px', borderRadius: '6px', border: '1px solid #d7dbe7', fontSize: '1rem', background: '#fff', minWidth: '140px' },
//   label: { fontSize: '.98rem', color: '#222', fontWeight: 500, display: 'block', marginBottom: '5px' },
//   button: { padding: '10px 32px', background: '#0f63be', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'background .2s', minWidth: '110px' },
//   table: { borderCollapse: 'collapse', width: '100%', background: '#fff', borderRadius: '8px', margin: '12px 0', boxShadow: '0 1px 10px 0 rgba(0,0,0,.06)' },
//   th: { background: '#e0e7f1', color: '#14285e', fontWeight: 600, padding: '8px 10px', border: '1px solid #d0d6e0', fontSize: '1rem', letterSpacing: '.02em' },
//   td: { border: '1px solid #d0d6e0', padding: '8px 10px', fontSize: '.97rem', color: '#262949', textAlign: 'center' },
//   total: { fontWeight: 700, fontSize: '1.08rem', textAlign: 'right', marginTop: '15px', color: '#0f63be' },
//   typeBadge: { borderRadius: '5px', padding: '2px 7px', fontWeight: 600, fontSize: '.92em', color: '#fff', background: '#b86c19', marginRight: '6px' },
//   badgeReturn: { background: '#e02e2e' },
//   badgeSale: { background: '#0b7b3e' },
// };

// function calculateEmission(weightKg, distanceKm, factorPerTonneKm) {
//   const tonnes = weightKg / 1000;
//   return tonnes * distanceKm * factorPerTonneKm;
// }

// const BusinessDashboard = () => {
//   const [entries, setEntries] = useState([]);
//   const [form, setForm] = useState({
//     transactionType: 'Sale', pickup: '', drop: '', transportMode: '', vehicle: '', weightKg: '', distanceKm: '', packMaterial: '', packWeightKg: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//     const navigate = useNavigate(); // for navigation

//   // logged_in_business expected in localStorage (set at login)
//   const loggedInBusiness = JSON.parse(localStorage.getItem("logged_in_business"));


// const username = loggedInBusiness.businessName; // This should be "Demo"
// const adminId = loggedInBusiness.adminId; // This should be "Demo"


//   // console.log("Hello" + adminId)

//   // Replace with your real API base if needed (or leave empty and use same host)
//   const API_BASE = "http://localhost:8080"; // e.g. "http://localhost:5000" or "" if proxied

//   useEffect(() => {
//     if (!loggedInBusiness) return;
//     const fetchEntries = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${API_BASE}/emission/${encodeURIComponent(username)}`);
//         if (!res.ok) {
//           // If server returns 404 or empty, treat as empty array
//           console.warn("Failed fetching emissions, status:", res.status);
//           setEntries([]);
//         } else {
//           const data = await res.json();
//           // If backend returns { entries: [...] } or array directly, handle both
//           const arr = Array.isArray(data) ? data : (data.entries || []);
//           setEntries(arr);
//         }
//       } catch (err) {
//         console.error("Error fetching emissions:", err);
//         setEntries([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEntries();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loggedInBusiness?.username]);

//   const handleLogout = () => {
//     localStorage.removeItem("logged_in_business");
//     window.location.href = "/businesslogin";
//   };

//   const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const onAdd = async (e) => {
//     e.preventDefault();
//     const { transactionType, pickup, drop, transportMode, vehicle, weightKg, distanceKm, packMaterial, packWeightKg } = form;
//     if (!(pickup && drop && transportMode && vehicle && weightKg && distanceKm)) {
//       alert('Please fill in all fields!');
//       return;
//     }
//     if (!(Number(weightKg) > 0 && Number(distanceKm) > 0)) {
//       alert('Weight and Distance must be positive.');
//       return;
//     }

//     let packEmission = 0, packFactor = 0;
//     if (packMaterial && Number(packWeightKg) > 0) {
//       const found = PACK_MATERIALS.find(m => m.name === packMaterial);
//       if (found) {
//         packFactor = found.factor;
//         packEmission = Number(packWeightKg) * packFactor;
//       }
//     }

//     const emissionFactor = EMISSION_FACTORS[vehicle] || 0;
//     const emission = calculateEmission(Number(weightKg), Number(distanceKm), emissionFactor);

//     const newEntry = {
//       transactionType,
//       pickup,
//       drop,
//       transportMode,
//       vehicle,
//       weightKg: Number(weightKg),
//       distanceKm: Number(distanceKm),
//       emissionFactor,
//       emission,
//       packMaterial: packMaterial || null,
//       packWeightKg: packWeightKg ? Number(packWeightKg) : 0,
//       packFactor,
//       packEmission,
//       // createdAt will be set by backend if desired
//     };

//     // local optimistic update + save to backend
//     setSaving(true);
//     try {
//       const payload = {adminId: adminId, username: username, ...newEntry };
//       const res = await fetch(`${API_BASE}/emissions`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errBody = await res.json().catch(() => ({}));
//         throw new Error(errBody.message || `Server responded ${res.status}`);
//       }

//       const saved = await res.json();
//       // backend may return saved object directly or { entry: saved }
//       const savedEntry = saved.entry || saved;

//       // append saved entry to UI
//       setEntries(prev => [...prev, savedEntry]);
//       // reset form
//       setForm({
//         transactionType: 'Sale', pickup: '', drop: '', transportMode: '', vehicle: '', weightKg: '', distanceKm: '', packMaterial: '', packWeightKg: ''
//       });
//     } catch (err) {
//       console.error("Failed to save emission entry:", err);
//       alert("Failed to save emission entry. See console for details.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const totalEmission = entries.reduce((acc, curr) => acc + (Number(curr.emission) || 0) + (Number(curr.packEmission) || 0), 0);
//   const totalReturnEmission = entries.filter(r => r.transactionType === 'Return').reduce((sum, r) => sum + Number(r.emission || 0) + Number(r.packEmission || 0), 0);
//   const totalSaleEmission = entries.filter(r => r.transactionType !== 'Return').reduce((sum, r) => sum + Number(r.emission || 0) + Number(r.packEmission || 0), 0);

//   if (!loggedInBusiness) {
//     return <div style={{ padding: 20 }}>Not logged in. Please login as a business to view this page.</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Welcome, {loggedInBusiness.businessName}</h2>
//       <button onClick={handleLogout} style={{ marginTop: "30px", background: "red", color: "white" }}>
//         Logout
//       </button>

//       <form style={styles.form} onSubmit={onAdd}>
//         <label style={styles.label}>Transaction Type
//           <select name="transactionType" style={styles.input} value={form.transactionType} onChange={onChange}>
//             <option value="Sale">Sale</option>
//             <option value="Return">Return</option>
//           </select>
//         </label>

//         <label style={styles.label}>Pickup Area
//           <select name="pickup" style={styles.input} value={form.pickup} onChange={onChange}>
//             <option value="">Select</option>
//             {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
//           </select>
//         </label>

//         <label style={styles.label}>Drop Area
//           <select name="drop" style={styles.input} value={form.drop} onChange={onChange}>
//             <option value="">Select</option>
//             {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
//           </select>
//         </label>

//         <label style={styles.label}>Mode
//           <select name="transportMode" style={styles.input} value={form.transportMode} onChange={onChange}>
//             <option value="">Select</option>
//             {TRANSPORT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
//           </select>
//         </label>

//         <label style={styles.label}>Vehicle
//           <select name="vehicle" style={styles.input} value={form.vehicle} onChange={onChange}>
//             <option value="">Select</option>
//             {VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
//           </select>
//         </label>

//         <label style={styles.label}>Weight (Kg)
//           <input type="number" name="weightKg" min={0} style={styles.input} value={form.weightKg} onChange={onChange} />
//         </label>

//         <label style={styles.label}>Distance (Km)
//           <input type="number" name="distanceKm" min={0} style={styles.input} value={form.distanceKm} onChange={onChange} />
//         </label>

//         <label style={styles.label}>Packing Material Type
//           <select name="packMaterial" style={styles.input} value={form.packMaterial} onChange={onChange}>
//             <option value="">Select</option>
//             {PACK_MATERIALS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
//           </select>
//         </label>

//         <label style={styles.label}>Packing Material Weight (Kg)
//           <input type="number" name="packWeightKg" min={0} style={styles.input} value={form.packWeightKg} onChange={onChange} />
//         </label>

//         <button type="submit" style={styles.button} disabled={saving}>
//           {saving ? "Saving..." : "Add Entry"}
//         </button>
//       </form>

//       {loading ? <p>Loading entries...</p> : (
//         <>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Type</th>
//                 <th style={styles.th}>Pickup</th>
//                 <th style={styles.th}>Drop</th>
//                 <th style={styles.th}>Mode</th>
//                 <th style={styles.th}>Vehicle</th>
//                 <th style={styles.th}>Weight (Kg)</th>
//                 <th style={styles.th}>Distance (Km)</th>
//                 <th style={styles.th}>Factor</th>
//                 <th style={styles.th}>Emission</th>
//                 <th style={styles.th}>Packing Material</th>
//                 <th style={styles.th}>Packing Weight</th>
//                 <th style={styles.th}>Pack Factor</th>
//                 <th style={styles.th}>Pack Emission</th>
//               </tr>
//             </thead>
//             <tbody>
//               {entries.length ? entries.map((row, idx) => (
//                 <tr key={idx}>
//                   <td style={styles.td}>
//                     <span style={{ ...styles.typeBadge, ...(row.transactionType === 'Return' ? styles.badgeReturn : styles.badgeSale) }}>{row.transactionType}</span>
//                   </td>
//                   <td style={styles.td}>{row.pickup}</td>
//                   <td style={styles.td}>{row.drop}</td>
//                   <td style={styles.td}>{row.transportMode}</td>
//                   <td style={styles.td}>{row.vehicle}</td>
//                   <td style={styles.td}>{row.weightKg}</td>
//                   <td style={styles.td}>{row.distanceKm}</td>
//                   <td style={styles.td}>{row.emissionFactor}</td>
//                   <td style={styles.td}>{Number(row.emission).toFixed(3)}</td>
//                   <td style={styles.td}>{row.packMaterial || '-'}</td>
//                   <td style={styles.td}>{row.packWeightKg || '-'}</td>
//                   <td style={styles.td}>{row.packFactor || '-'}</td>
//                   <td style={styles.td}>{row.packEmission ? Number(row.packEmission).toFixed(3) : '-'}</td>
//                 </tr>
//               )) : (
//                 <tr><td style={styles.td} colSpan={13}>No data yet, please add an entry.</td></tr>
//               )}
//             </tbody>
//           </table>

//           <div style={styles.total}>
//             Total Sale Emissions: {totalSaleEmission.toFixed(3)} kg CO₂e<br />
//             Total Return Emissions: {totalReturnEmission.toFixed(3)} kg CO₂e<br />
//             <strong>Combined Total: {totalEmission.toFixed(3)} kg CO₂e</strong>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BusinessDashboard;


// src/pages/BusinessDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usernavbar } from "../Component/Usernavbar";

/*
  Fields implemented exactly per user's list (no extra visible inputs):
  - Order-Level: orderId, orderDate, customerCity, customerState, customerCountry, customerPin, deliveryOption, paymentMethod
  - Packaging: packagingType, packagingWeightKg, packagingUnits
  - Logistics: warehouseLocation, transportMode, distanceKm
  - Returns: returnFlag, returnQuantity, returnDistanceKm, returnTransportMode
  - Derived shown: productEmissionFactor, packagingEmissionFactor, transportEmissionFactor, orderCarbonFootprint, carbonIntensity (carbonIntensity requires order value which is NOT in the field list so it's left as '-' unless backend provides it)
  
  Assumptions & notes:
  - No product weight or order value field was present in your list; therefore:
    - product emission is set to 0 (placeholder) because product-level calculation requires product weight or SKU emission mapping.
    - transport emission uses packagingWeightKg as the available mass proxy (converted to tonnes) since product weight isn't available.
    - carbonIntensity requires orderValue (kgCO2e / order value) which is not provided in your field list, so it is left empty ('-').
  - Packaging/transport emission factors are based on small lookup maps included below; adjust those maps to your authoritative factors.
*/

const DELIVERY_OPTIONS = ["Standard", "Express", "Same-day", "Eco-shipping"];
const PACKAGING_TYPES = ["Bubble Wrap", "Cling Wrap Film", "Kraft paper box", "Packaging tape", "Polythene Bag", "Thermal Paper", "Copier Paper"];
const TRANSPORT_MODES = ["Air", "Sea", "Rail", "Road", "EV", "Bicycle courier"];
const RETURN_FLAGS = ["No", "Yes"];

// Example emission factor lookups (editable)
const PACKAGING_EMISSION_FACTORS = {
  "Bubble Wrap": 3.5,
  "Cling Wrap Film": 2.4,
  "Kraft paper box": 0.94,
  "Packaging tape": 3.5,
  "Polythene Bag": 3.5,
  "Thermal Paper": 0.012,
  "Copier Paper": 0.05
};

const TRANSPORT_EMISSION_FACTORS_TONNE_KM = {
  Air: 1.58,
  Sea: 0.03,
  Rail: 0.06,
  Road: 0.12,
  EV: 0.05,
  "Bicycle courier": 0.005,
};

const styles = {
  container: { maxWidth: '1280px', margin: '28px auto', padding: '32px', background: '#f6f9fd', borderRadius: '14px', fontFamily: '"Segoe UI",sans-serif', boxShadow: '0 2px 18px #b1b5bc14' },
  title: { fontSize: '2.12rem', color: '#0d257f', fontWeight: 700, marginBottom: '30px', textAlign: 'center' },
  form: { display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '30px', alignItems: 'flex-end' },
  input: { padding: '9px 12px', borderRadius: '6px', border: '1px solid #d7dbe7', fontSize: '1rem', background: '#fff', minWidth: '160px' },
  label: { fontSize: '.98rem', color: '#222', fontWeight: 500, display: 'block', marginBottom: '5px' },
  button: { padding: '10px 32px', background: '#0f63be', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'background .2s', minWidth: '110px' },
  table: { borderCollapse: 'collapse', width: '100%', background: '#fff', borderRadius: '8px', margin: '12px 0', boxShadow: '0 1px 10px 0 rgba(0,0,0,.06)' },
  th: { background: '#e0e7f1', color: '#14285e', fontWeight: 600, padding: '8px 10px', border: '1px solid #d0d6e0', fontSize: '8px', letterSpacing: '.02em' },
  td: { border: '1px solid #d0d6e0', padding: '8px 10px', fontSize: '.97rem', color: '#262949', textAlign: 'center' },
  total: { fontWeight: 700, fontSize: '1.08rem', textAlign: 'right', marginTop: '15px', color: '#0f63be' },
  typeBadge: { borderRadius: '5px', padding: '2px 7px', fontWeight: 600, fontSize: '.92em', color: '#fff', background: '#b86c19', marginRight: '6px' },
};

function toTonne(kg) {
  return Number(kg || 0) / 1000;
}

function calculatePackagingEmission(packagingWeightKg, packagingType) {
  const factor = PACKAGING_EMISSION_FACTORS[packagingType] || 0;
  return Number(packagingWeightKg || 0) * factor; // kg CO2e
}

function calculateTransportEmission(totalMassKg, distanceKm, transportMode) {
  // transport factors are in kg CO2e per tonne-km (we store as kg CO2e per tonne-km)
  // - convert mass to tonnes, multiply by km and factor
  const factor = TRANSPORT_EMISSION_FACTORS_TONNE_KM[transportMode] || 0;
  const tonnes = toTonne(totalMassKg);
  return tonnes * Number(distanceKm || 0) * factor; // kg CO2e
}

const BusinessDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    orderId: "",
    orderDate: "",
    customerCity: "",
    customerState: "",
    customerCountry: "",
    customerPin: "",
    deliveryOption: "",
    paymentMethod: "",

    packagingType: "",
    packagingWeightKg: "",
    packagingUnits: "",

    warehouseLocation: "",
    transportMode: "",
    distanceKm: "",

    returnFlag: "No",
    returnQuantity: "",
    returnDistanceKm: "",
    returnTransportMode: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const loggedInBusiness = localStorage.getItem("useruserId");

  if (!loggedInBusiness) {
    // This early return prevents rendering when not logged-in; rest of component relies on business context.
  }
  const username = loggedInBusiness;
  const adminId = loggedInBusiness;


  // console.log(loggedInBusiness)

  const API_BASE = "http://62.72.59.146:8080";

  useEffect(() => {
    if (!loggedInBusiness) return;
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/emission/${encodeURIComponent(username)}`);
        if (!res.ok) {
          setEntries([]);
        } else {
          const data = await res.json();
          const arr = Array.isArray(data) ? data : (data.entries || []);
          setEntries(arr);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInBusiness]);

  const handleLogout = () => {
    localStorage.removeItem("useruserId");
    window.location.href = "/user/login";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onAdd = async (e) => {
    e.preventDefault();

    // validate required fields (based on your list)
    const required = [
      "orderId", "orderDate", "customerCity", "customerState", "customerCountry", "customerPin",
      "deliveryOption", "packagingType", "packagingWeightKg", "packagingUnits",
      "warehouseLocation", "transportMode", "distanceKm", "returnFlag"
    ];
    for (const key of required) {
      if (form[key] === "" || form[key] == null) {
        alert(`Please fill: ${key}`);
        return;
      }
    }

    // parse numbers
    const packagingWeightKg = Number(form.packagingWeightKg || 0);
    const distanceKm = Number(form.distanceKm || 0);

    if (packagingWeightKg < 0 || distanceKm < 0) {
      alert("Packaging weight and distance must be non-negative.");
      return;
    }

    // Derived factors
    const packagingEmissionFactor = PACKAGING_EMISSION_FACTORS[form.packagingType] || 0;
    const transportEmissionFactor = TRANSPORT_EMISSION_FACTORS_TONNE_KM[form.transportMode] || 0;

    // Product emission: cannot be auto-calculated without product weight or SKU mapping.
    // Per your selection (auto-calc), we set productEmission = 0 here and expose a derived field productEmissionFactor = 0.
    // If you provide productWeightKg or a product catalogue later, replace this with a proper lookup.
    const productEmissionFactor = 0;
    const productEmission = 0;

    // Total mass proxy: packaging weight only (kg) since product weight not available in provided field list
    const totalMassKg = packagingWeightKg; // NOTE: conservative proxy; replace when product weight is available

    const packagingEmission = calculatePackagingEmission(packagingWeightKg, form.packagingType); // kg CO2e
    const transportEmission = calculateTransportEmission(totalMassKg, distanceKm, form.transportMode); // kg CO2e

    // Returns emissions (if applicable)
    let returnsEmission = 0;
    let returnTransportFactor = 0;
    if (form.returnFlag === "Yes") {
      const rq = Number(form.returnQuantity || 0);
      const rDistance = Number(form.returnDistanceKm || 0);
      returnTransportFactor = TRANSPORT_EMISSION_FACTORS_TONNE_KM[form.returnTransportMode] || 0;
      // use packaging weight as unit mass proxy per returned unit
      const massPerUnitKg = packagingWeightKg; // proxy
      const totalReturnMassKg = massPerUnitKg * rq;
      returnsEmission = calculateTransportEmission(totalReturnMassKg, rDistance, form.returnTransportMode);
      // we do not double-count packaging in returns here (you can choose to add packaging reprocessing emissions if desired)
    }

    const orderCarbonFootprint = Number(productEmission || 0) + Number(packagingEmission || 0) + Number(transportEmission || 0) + Number(returnsEmission || 0);

    // Carbon intensity (kg CO2e / order value) requires order value which is NOT in your provided field list.
    // So we leave carbonIntensity empty here. Backend may supply orderValue to compute it later.
    const carbonIntensity = null;

    const payload = {
      adminId,
      username,
      // inputs (only the fields you requested)

      orderId: form.orderId,
      orderDate: form.orderDate,
      customerCity: form.customerCity,
      customerState: form.customerState,
      customerCountry: form.customerCountry,
      customerPin: form.customerPin,
      deliveryOption: form.deliveryOption,
      paymentMethod: form.paymentMethod,

      packagingType: form.packagingType,
      packagingWeightKg: packagingWeightKg,
      packagingUnits: form.packagingUnits,

      warehouseLocation: form.warehouseLocation,
      transportMode: form.transportMode,
      distanceKm: distanceKm,

        returnFlag: form.returnFlag === "Yes" ? true : false,
      returnQuantity: Number(form.returnQuantity || 0),
      returnDistanceKm: Number(form.returnDistanceKm || 0),
      returnTransportMode: form.returnTransportMode || "",

      // derived (as requested)
      productEmissionFactor,
      packagingEmissionFactor,
      transportEmissionFactor,
      productEmission,
      packagingEmission,
      transportEmission,
      returnsEmission,
      orderCarbonFootprint,
      carbonIntensity,
      createdAt: new Date().toISOString(),
    };

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/emissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text().catch(() => "");
        throw new Error(err || `Server responded ${res.status}`);
      }

      const saved = await res.json().catch(() => payload);
      const savedEntry = saved.entry || saved;

      setEntries((prev) => [...prev, savedEntry]);
      // reset form (keep returnFlag default No)
      setForm({
        orderId: "",
        orderDate: "",
        customerCity: "",
        customerState: "",
        customerCountry: "",
        customerPin: "",
        deliveryOption: "",
        paymentMethod: "",

        packagingType: "",
        packagingWeightKg: "",
        packagingUnits: "",

        warehouseLocation: "",
        transportMode: "",
        distanceKm: "",

        returnFlag: "No",
        returnQuantity: "",
        returnDistanceKm: "",
        returnTransportMode: "",
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      alert("Failed to save order. See console for details.");
    } finally {
      setSaving(false);
    }
  };

  // Totals
  const totalOrderEmissions = entries.reduce((acc, e) => acc + (Number(e.orderCarbonFootprint) || 0), 0);

  if (!loggedInBusiness) {
    return <div style={{ padding: 20 }}>Not logged in. Please login as a business to view this page.</div>;
  }

  return (
    <>
            <Usernavbar />
    <div style={styles.container}>
      
      <h2 style={styles.title}>Welcome, {loggedInBusiness}</h2>
      <button onClick={handleLogout} style={{ marginTop: "30px", background: "red", color: "white" }}>
        Logout
      </button>

      <form style={styles.form} onSubmit={onAdd}>
        {/* Order-level */}
        <label style={styles.label}>Order ID
          <input name="orderId" style={styles.input} value={form.orderId} onChange={onChange} />
        </label>

         <label style={styles.label}>Product ID
          <input name="ProductId" style={styles.input}/>
        </label>

         <label style={styles.label}>Product Quantity
          <input name="ProductQuantity" style={styles.input}/>
        </label>

        <label style={styles.label}>Order Date
          <input type="date" name="orderDate" style={styles.input} value={form.orderDate} onChange={onChange} />
        </label>

        <label style={styles.label}>Customer City
          <input name="customerCity" style={styles.input} value={form.customerCity} onChange={onChange} />
        </label>

        <label style={styles.label}>Customer State
          <input name="customerState" style={styles.input} value={form.customerState} onChange={onChange} />
        </label>

        <label style={styles.label}>Customer Country
          <input name="customerCountry" style={styles.input} value={form.customerCountry} onChange={onChange} />
        </label>

        <label style={styles.label}>Customer Pin
          <input name="customerPin" style={styles.input} value={form.customerPin} onChange={onChange} />
        </label>

        <label style={styles.label}>Delivery Option
          <select name="deliveryOption" style={styles.input} value={form.deliveryOption} onChange={onChange}>
            <option value="">Select</option>
            {DELIVERY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>

        <label style={styles.label}>Payment Method (optional)
          <input name="paymentMethod" style={styles.input} value={form.paymentMethod} onChange={onChange} />
        </label>

        {/* Packaging */}
        <label style={styles.label}>Packaging Type
          <select name="packagingType" style={styles.input} value={form.packagingType} onChange={onChange}>
            <option value="">Select</option>
            {PACKAGING_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>

        <label style={styles.label}>Packaging Weight (kg)
          <input type="number" min="0" step="0.001" name="packagingWeightKg" style={styles.input} value={form.packagingWeightKg} onChange={onChange} />
        </label>

        <label style={styles.label}>Packaging Units
          <input name="packagingUnits" style={styles.input} value={form.packagingUnits} onChange={onChange} />
        </label>

        {/* Logistics */}
        <label style={styles.label}>Warehouse / Fulfillment Location
          <input name="warehouseLocation" style={styles.input} value={form.warehouseLocation} onChange={onChange} />
        </label>

        <label style={styles.label}>Transport Mode
          <select name="transportMode" style={styles.input} value={form.transportMode} onChange={onChange}>
            <option value="">Select</option>
            {TRANSPORT_MODES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <label style={styles.label}>Distance to Customer (km)
          <input type="number" min="0" step="0.1" name="distanceKm" style={styles.input} value={form.distanceKm} onChange={onChange} />
        </label>

        {/* Returns */}
        <label style={styles.label}>Return Flag
          <select name="returnFlag" style={styles.input} value={form.returnFlag} onChange={onChange}>
            {RETURN_FLAGS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>

        <label style={styles.label}>Return Quantity
          <input type="number" min="0" name="returnQuantity" style={styles.input} value={form.returnQuantity} onChange={onChange} />
        </label>

        <label style={styles.label}>Return Distance (km)
          <input type="number" min="0" name="returnDistanceKm" style={styles.input} value={form.returnDistanceKm} onChange={onChange} />
        </label>

        <label style={styles.label}>Return Transport Mode
          <select name="returnTransportMode" style={styles.input} value={form.returnTransportMode} onChange={onChange}>
            <option value="">Select</option>
            {TRANSPORT_MODES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <button type="submit" style={styles.button} disabled={saving}>
          {saving ? "Saving..." : "Add Order"}
        </button>
      </form>

      {loading ? <p>Loading orders...</p> : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Order Date</th>
                <th style={styles.th}>Customer (City,State,Pin)</th>
                <th style={styles.th}>Delivery Option</th>
                <th style={styles.th}>Payment Method</th>

                <th style={styles.th}>Packaging Type</th>
                <th style={styles.th}>Packaging Weight (kg)</th>
                <th style={styles.th}>Packaging Units</th>

                <th style={styles.th}>Warehouse</th>
                <th style={styles.th}>Transport Mode</th>
                <th style={styles.th}>Distance (km)</th>

                {/* <th style={styles.th}>Return?</th> */}
                <th style={styles.th}>Return Qty</th>
                <th style={styles.th}>Return Distance</th>
                <th style={styles.th}>Return Mode</th>

                <th style={styles.th}>Product EF</th>
                <th style={styles.th}>Pack EF</th>
                <th style={styles.th}>Trans EF</th>

                <th style={styles.th}>Order Carbon (kg CO₂e)</th>
                <th style={styles.th}>Carbon Intensity (kg CO₂e / order value)</th>
              </tr>
            </thead>
            <tbody>
              {entries.length ? entries.map((row, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{row.orderId}</td>
                  <td style={styles.td}>{row.orderDate}</td>
                  <td style={styles.td}>{`${row.customerCity}, ${row.customerState}, ${row.customerPin}`}</td>
                  <td style={styles.td}>{row.deliveryOption}</td>
                  <td style={styles.td}>{row.paymentMethod || '-'}</td>

                  <td style={styles.td}>{row.packagingType}</td>
                  <td style={styles.td}>{row.packagingWeightKg}</td>
                  <td style={styles.td}>{row.packagingUnits}</td>

                  <td style={styles.td}>{row.warehouseLocation}</td>
                  <td style={styles.td}>{row.transportMode}</td>
                  <td style={styles.td}>{row.distanceKm}</td>

                  <td style={styles.td}>{row.returnFlag==true? "Yes" : "No"}</td>
                  {/* <td style={styles.td}>{row.returnQuantity || '-'}</td> */}
                  <td style={styles.td}>{row.returnDistanceKm || '-'}</td>
                  <td style={styles.td}>{row.returnTransportMode || '-'}</td>

                  <td style={styles.td}>{Number(row.productEmissionFactor || 0).toFixed(3)}</td>
                  <td style={styles.td}>{Number(row.packagingEmissionFactor || 0).toFixed(3)}</td>
                  <td style={styles.td}>{Number(row.transportEmissionFactor || 0).toFixed(3)}</td>

                  <td style={styles.td}>{Number(row.orderCarbonFootprint || 0).toFixed(3)}</td>
                  <td style={styles.td}>{row.carbonIntensity ? Number(row.carbonIntensity).toFixed(6) : '-'}</td>
                </tr>
              )) : (
                <tr><td style={styles.td} colSpan={20}>No data yet, please add an order.</td></tr>
              )}
            </tbody>
          </table>

          <div style={styles.total}>
            Combined Total Emissions (all orders): {totalOrderEmissions.toFixed(3)} kg CO₂e
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default BusinessDashboard;
