import React, { useState, useEffect } from 'react';

const AREAS = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 
  'Indore', 'Bhopal', 'Chandigarh', 'Coimbatore', 'Kochi'
];

const TRANSPORT_MODES = ['Surface', 'Air', 'Sea'];
const VEHICLES = ['MCV', 'LCV', 'Three Wheeler', 'Two Wheeler', 'Bus', 'Ship', 'Airplane'];
const EMISSION_FACTORS = {
  MCV: 0.599,
  LCV: 0.319,
  'Three Wheeler': 0.12,
  'Two Wheeler': 0.035,
  Bus: 0.08,
  Ship: 0.03,
  Airplane: 1.58,
};

// Packing material types and emission factors (kg CO2 per kg)
const PACK_MATERIALS = [
  { name: "Bubble Wrap", factor: 3.5 },
  { name: "Cling Wrap Film", factor: 2.4 },
  { name: "Kraft paper box", factor: 0.94 },
  { name: "Packaging tape", factor: 3.5 },
  { name: "Polythene Bag", factor: 3.5 },
  { name: "Thermal Paper", factor: 0.012 },
  { name: "Copier Paper", factor: 0.05 },
];

const STORAGE_KEY = "ecom_emission_entries_professional_india";

function calculateEmission(weightKg, distanceKm, factorPerTonneKm) {
  const tonnes = weightKg / 1000;
  return tonnes * distanceKm * factorPerTonneKm;
}

const styles = {
  container: {
    maxWidth: '980px',
    margin: '28px auto',
    padding: '32px',
    background: '#f6f9fd',
    borderRadius: '14px',
    fontFamily: '"Segoe UI",sans-serif',
    boxShadow: '0 2px 18px #b1b5bc14',
  },
  title: {
    fontSize: '2.12rem',
    color: '#0d257f',
    fontWeight: 700,
    marginBottom: '30px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    marginBottom: '30px',
    alignItems: 'flex-end'
  },
  input: {
    padding: '9px 12px',
    borderRadius: '6px',
    border: '1px solid #d7dbe7',
    fontSize: '1rem',
    background: '#fff',
    minWidth: '140px'
  },
  label: {
    fontSize: '.98rem',
    color: '#222',
    fontWeight: 500,
    display: 'block',
    marginBottom: '5px',
  },
  button: {
    padding: '10px 32px',
    background: '#0f63be',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'background .2s',
    minWidth: '110px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    background: '#fff',
    borderRadius: '8px',
    margin: '12px 0',
    boxShadow: '0 1px 10px 0 rgba(0,0,0,.06)'
  },
  th: {
    background: '#e0e7f1',
    color: '#14285e',
    fontWeight: 600,
    padding: '8px 10px',
    border: '1px solid #d0d6e0',
    fontSize: '1rem',
    letterSpacing: '.02em'
  },
  td: {
    border: '1px solid #d0d6e0',
    padding: '8px 10px',
    fontSize: '.97rem',
    color: '#262949',
    textAlign: 'center'
  },
  total: {
    fontWeight: 700,
    fontSize: '1.08rem',
    textAlign: 'right',
    marginTop: '15px',
    color: '#0f63be'
  },
  typeBadge: {
    borderRadius: '5px',
    padding: '2px 7px',
    fontWeight: 600,
    fontSize: '.92em',
    color: '#fff',
    background: '#b86c19',
    marginRight: '6px'
  },
  badgeReturn: { background: '#e02e2e' },
  badgeSale: { background: '#0b7b3e' },
};


const defaultForm = {
  transactionType: 'Sale',
  pickup: '',
  drop: '',
  transportMode: '',
  vehicle: '',
  weightKg: '',
  distanceKm: '',
  packMaterial: '',     // new
  packWeightKg: '',     // new
};

const Ecomemission = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setEntries(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onAdd = e => {
    e.preventDefault();
    const {
      transactionType,
      pickup,
      drop,
      transportMode,
      vehicle,
      weightKg,
      distanceKm,
      packMaterial,
      packWeightKg,
    } = form;
    if (!(pickup && drop && transportMode && vehicle && weightKg && distanceKm)) {
      alert('Please fill in all fields!');
      return;
    }
    if (!(Number(weightKg) > 0 && Number(distanceKm) > 0)) {
      alert('Weight and Distance must be positive.');
      return;
    }

    // Packing emission calculation
    let packEmission = 0;
    let packFactor = 0;
    if (packMaterial && Number(packWeightKg) > 0) {
      const found = PACK_MATERIALS.find(m => m.name === packMaterial);
      if (found) {
        packFactor = found.factor;
        packEmission = Number(packWeightKg) * packFactor;
      }
    }

    const emissionFactor = EMISSION_FACTORS[vehicle] || 0;
    const emission = calculateEmission(Number(weightKg), Number(distanceKm), emissionFactor);

    setEntries([
      ...entries,
      {
        transactionType,
        pickup,
        drop,
        transportMode,
        vehicle,
        weightKg,
        distanceKm,
        emissionFactor,
        emission,
        packMaterial,
        packWeightKg,
        packFactor,
        packEmission,
      },
    ]);
    setForm(defaultForm);
  };

  const totalEmission = entries.reduce(
    (acc, curr) => acc + (Number(curr.emission) || 0) + (Number(curr.packEmission) || 0),
    0
  );
  const totalReturnEmission = entries
    .filter(row => row.transactionType === 'Return')
    .reduce((sum, r) => sum + Number(r.emission || 0) + Number(r.packEmission || 0), 0);
  const totalSaleEmission = entries
    .filter(row => row.transactionType !== 'Return')
    .reduce((sum, r) => sum + Number(r.emission || 0) + Number(r.packEmission || 0), 0);

  return (
    <div style={styles.container}>
      <div style={styles.title}>E-Commerce Emissions Calculator</div>
      <form style={styles.form} onSubmit={onAdd}>
        <label style={styles.label}>
          Transaction Type
          <select
            name="transactionType"
            style={styles.input}
            value={form.transactionType}
            onChange={onChange}
          >
            <option value="Sale">Sale</option>
            <option value="Return">Return</option>
          </select>
        </label>
        <label style={styles.label}>
          Pickup Area
          <select name="pickup" style={styles.input} value={form.pickup} onChange={onChange}>
            <option value="">Select</option>
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label style={styles.label}>
          Drop Area
          <select name="drop" style={styles.input} value={form.drop} onChange={onChange}>
            <option value="">Select</option>
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label style={styles.label}>
          Mode
          <select name="transportMode" style={styles.input} value={form.transportMode} onChange={onChange}>
            <option value="">Select</option>
            {TRANSPORT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
        <label style={styles.label}>
          Vehicle
          <select name="vehicle" style={styles.input} value={form.vehicle} onChange={onChange}>
            <option value="">Select</option>
            {VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label style={styles.label}>
          Weight (Kg)
          <input
            type="number"
            name="weightKg"
            min={0}
            style={styles.input}
            placeholder="e.g. 160"
            value={form.weightKg}
            onChange={onChange}
          />
        </label>
        <label style={styles.label}>
          Distance (Km)
          <input
            type="number"
            name="distanceKm"
            min={0}
            style={styles.input}
            placeholder="e.g. 0.5"
            value={form.distanceKm}
            onChange={onChange}
          />
        </label>
        <label style={styles.label}>
          Packing Material Type
          <select name="packMaterial" style={styles.input} value={form.packMaterial} onChange={onChange}>
            <option value="">Select</option>
            {PACK_MATERIALS.map(m => (
              <option key={m.name} value={m.name}>{m.name}</option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Packing Material Weight (Kg)
          <input
            type="number"
            name="packWeightKg"
            min={0}
            style={styles.input}
            placeholder="e.g. 0.8"
            value={form.packWeightKg}
            onChange={onChange}
          />
        </label>
        <button type="submit" style={styles.button}>Add Entry</button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Pickup</th>
            <th style={styles.th}>Drop</th>
            <th style={styles.th}>Mode</th>
            <th style={styles.th}>Vehicle</th>
            <th style={styles.th}>Weight (Kg)</th>
            <th style={styles.th}>Distance (Km)</th>
            <th style={styles.th}>Factor<br/>(kgCO₂/t·km)</th>
            <th style={styles.th}>Emission<br/>(kgCO₂e)</th>
            <th style={styles.th}>Packing Material Type</th>
            <th style={styles.th}>Packing Weight (Kg)</th>
            <th style={styles.th}>Pack Factor<br/>(kgCO₂/kg)</th>
            <th style={styles.th}>Pack Emission<br/>(kgCO₂e)</th>
          </tr>
        </thead>
        <tbody>
          {entries.length ? entries.map((row, idx) => (
            <tr key={idx}>
              <td style={styles.td}>
                <span style={{
                  ...styles.typeBadge,
                  ...(row.transactionType === 'Return' ? styles.badgeReturn : styles.badgeSale)
                }}>
                  {row.transactionType}
                </span>
              </td>
              <td style={styles.td}>{row.pickup}</td>
              <td style={styles.td}>{row.drop}</td>
              <td style={styles.td}>{row.transportMode}</td>
              <td style={styles.td}>{row.vehicle}</td>
              <td style={styles.td}>{row.weightKg}</td>
              <td style={styles.td}>{row.distanceKm}</td>
              <td style={styles.td}>{row.emissionFactor}</td>
              <td style={styles.td}>{Number(row.emission).toFixed(3)}</td>
              <td style={styles.td}>{row.packMaterial || '-'}</td>
              <td style={styles.td}>{row.packWeightKg || '-'}</td>
              <td style={styles.td}>{row.packFactor || '-'}</td>
              <td style={styles.td}>{row.packEmission ? Number(row.packEmission).toFixed(3) : '-'}</td>
            </tr>
          )) : (
            <tr>
              <td style={styles.td} colSpan={13}>No data yet, please add an entry.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={styles.total}>
        Total Sale Transaction Emissions: {totalSaleEmission.toFixed(3)} kg CO₂e<br/>
        Total Return Transaction Emissions: {totalReturnEmission.toFixed(3)} kg CO₂e<br/>
        <span style={{fontWeight: 800}}>Combined Total Emissions: {totalEmission.toFixed(3)} kg CO₂e</span>
      </div>
    </div>
  );
};

export default Ecomemission;
