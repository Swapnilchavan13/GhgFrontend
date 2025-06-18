import React, { useEffect, useState } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Reports = () => {
  const [users, setUsers] = useState([]); // Array of objects with userId
  const [scopes, setScopes] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedYear, setSelectedYear] = useState('2024-2025');
    

const financialYears = [
  '2024-2025', // April 2024 to March 2025
  '2025-2026', // April 2025 to March 2026
];
  const navigate = useNavigate();

  let grandDistanceTotal = 0;
let distanceUnit = '';


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) navigate('/client/login');
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://backend.climescore.com/getusers?clientId=${localStorage.getItem('userId')}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const aggregatedDataObj = {};
      const allScopesSet = new Set();

      for (const user of users) {
        try {
          const response = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
          const data = await response.json();

          aggregatedDataObj[user.userId] = {};

          for (const item of data) {
            const result = parseFloat(item.result) || 0;
            const group = item.group;

            if (!aggregatedDataObj[user.userId][group]) {
              aggregatedDataObj[user.userId][group] = 0;
            }
            aggregatedDataObj[user.userId][group] += result;
            allScopesSet.add(group);
          }
        } catch (error) {
          console.error("Error fetching emission data:", error);
        }
      }

      setAggregatedData(aggregatedDataObj);
      setScopes([...allScopesSet]);
    };

    if (users.length > 0) fetchData();
  }, [users]);

const handleDownloadAllScopes = async () => {
  const scopesToDownload = ['Scope 1', 'Scope 2', 'Scope 3'];
  let reportRows = [];
  let grandTotal = 0;

  reportRows.push([`Emission Report for All Scopes (${selectedYear})`]);

  reportRows.push(['Generated on:', new Date().toLocaleString()]);
  reportRows.push([]);

  for (const scope of scopesToDownload) {
    let scopeData = [];
    let scopeTotal = 0;
    const nameTotals = {};
    const distanceTotals = {};
    const distanceUnits = {};


    const isInSelectedFinancialYear = (item) => {
  const [startYear, endYear] = selectedYear.split('-').map(Number);
  const fromDate = new Date(item.date);
  const toDate = new Date(item.date1);

  const start = new Date(`${startYear}-04-01`);
  const end = new Date(`${endYear}-03-31`);

  return fromDate >= start && toDate <= end;
};



    for (const user of users) {
      try {
        const res = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
        const data = await res.json();

        const filtered = data.filter(item => item.group === scope && isInSelectedFinancialYear(item));


        const enriched = filtered.map(item => {
          const emission = parseFloat(item.result || 0);
          scopeTotal += emission;

          const Name = item.selectedName || 'Unknown';
          nameTotals[Name] = (nameTotals[Name] || 0) + emission;

          const distance = parseFloat(item.distance || 0);
          if (distance > 0) {
            distanceTotals[Name] = (distanceTotals[Name] || 0) + distance;
            if (!distanceUnits[Name]) {
              distanceUnits[Name] = item.unit || '';
            }
          }

          return {
            userId: user.userId,
            Name: Name,
            Category: item.selectedCategory || '',
            // country: item.country || '',
            // type: item.selectedType || '',
            // brand: item.brand || '',
            Emission: emission.toFixed(2),
            Scope: item.group || '',
            Unit: item.unit || '',
            Quantity: distance.toFixed(2),
            fromDate: item.date || '',
            toDate: item.date1 || ''
          };
        });

        scopeData.push(...enriched);
      } catch (err) {
        console.error(`Error fetching data for ${user.userId}:`, err);
      }
    }

    if (scopeData.length > 0) {
      reportRows.push([`${scope} Data:`]);
      reportRows.push(Object.keys(scopeData[0]));
      reportRows.push(...scopeData.map(row =>
        Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`)
      ));
      reportRows.push([]);

      reportRows.push([`Total Emissions and Units per Item in ${scope}:`]);
      reportRows.push(['Item Name', 'Total Emissions', 'Total Units']);

      Object.entries(nameTotals).forEach(([Name, totalEmission]) => {
        const totalDistance = distanceTotals[Name] || 0;
        const unit = distanceUnits[Name] || '';
        reportRows.push([
          Name,
          `"${totalEmission.toFixed(2)}"`,
          totalDistance > 0 ? `"${totalDistance.toFixed(2)} ${unit}"` : ''
        ]);
      });

      reportRows.push([]);
      reportRows.push(['Total for this Scope:', `"${scopeTotal.toFixed(2)}"`]);
      reportRows.push([]);

      grandTotal += scopeTotal;
    }
  }

  reportRows.push(['Grand Total Emission (All Scopes):', `"${grandTotal.toFixed(2)}"`]);

  const csvContent = reportRows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `Emission_Report_All_Scopes.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


 const handleDownloadSelectedUserData = async () => {
  if (!selectedUserId) return;

  const scopes = ['Scope 1', 'Scope 2', 'Scope 3'];
  let reportRows = [];
  let grandTotal = 0;

  reportRows.push([`Emission Report for ${selectedUserId} (${selectedYear})`]);
  reportRows.push(['Generated on:', new Date().toLocaleString()]);
  reportRows.push([]);

  try {
    const res = await fetch(`https://backend.climescore.com/getdata12?userId=${selectedUserId}`);
    const data = await res.json();

    for (const scope of scopes) {
      let scopeData = [];
      let scopeTotal = 0;
      const nameTotals = {};
      const distanceTotals = {};
      const distanceUnits = {};

      const isInSelectedFinancialYear = (item) => {
  const [startYear, endYear] = selectedYear.split('-').map(Number);
  const fromDate = new Date(item.date);
  const toDate = new Date(item.date1);

  const start = new Date(`${startYear}-04-01`);
  const end = new Date(`${endYear}-03-31`);

  return fromDate >= start && toDate <= end;
};


      const filtered = data.filter(item => item.group === scope && isInSelectedFinancialYear(item));


      const enriched = filtered.map(item => {
        const emission = parseFloat(item.result || 0);
        scopeTotal += emission;

        const Name = item.selectedName || 'Unknown';
        nameTotals[Name] = (nameTotals[Name] || 0) + emission;

        const distance = parseFloat(item.distance || 0);
        if (distance > 0) {
          distanceTotals[Name] = (distanceTotals[Name] || 0) + distance;
          if (!distanceUnits[Name]) {
            distanceUnits[Name] = item.unit || '';
          }
        }

        return {
          userId: selectedUserId,
          Name,
          Category: item.selectedCategory || '',
          // country: item.country || '',
          // type: item.selectedType || '',
          // brand: item.brand || '',
          Emission: emission.toFixed(2),
          Scope: item.group || '',
          Unit: item.unit || '',
          Quantity: distance.toFixed(2),
          fromDate: item.date || '',
          toDate: item.date1 || ''
        };
      });

      scopeData.push(...enriched);

      if (scopeData.length > 0) {
        reportRows.push([`${scope} Data:`]);
        reportRows.push(Object.keys(scopeData[0]));
        reportRows.push(...scopeData.map(row =>
          Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`)
        ));
        reportRows.push([]);

        reportRows.push([`Total Emissions and Units per Item in ${scope}:`]);
        reportRows.push(['Item Name', 'Total Emissions', 'Total Units']);

        Object.entries(nameTotals).forEach(([Name, totalEmission]) => {
          const totalDistance = distanceTotals[Name] || 0;
          const unit = distanceUnits[Name] || '';
          reportRows.push([
            Name,
            `"${totalEmission.toFixed(2)}"`,
            totalDistance > 0 ? `"${totalDistance.toFixed(2)} ${unit}"` : ''
          ]);
        });

        reportRows.push([]);
        reportRows.push(['Total for this Scope:', `"${scopeTotal.toFixed(2)}"`]);
        reportRows.push([]);

        grandTotal += scopeTotal;
      }
    }

    reportRows.push(['Grand Total Emission (All Scopes):', `"${grandTotal.toFixed(2)}"`]);

    const csvContent = reportRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `Emission_Report_${selectedUserId}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  } catch (err) {
    console.error('Error downloading data:', err);
  }
};


  return (
    <div>
    <Clientnavbar />
    <div className="container">
      <h2>Download Reports</h2>

      {/* Financial Year Dropdown */}
     <div style={{ marginTop: '20px' }}>
  <label>Select Financial Year: </label>
  <select
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
    style={{ width: '300px', marginLeft: '10px' }}
  >
    {financialYears.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
</div>


      <button onClick={() => handleDownloadAllScopes(selectedYear)} disabled={!selectedYear}>
        Download All Scope Data
      </button>

      <div style={{ marginTop: '20px' }}>
        <label>Select User: </label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ width: '400px' }}
        >
          <option value="">-- Select a user --</option>
          {users.map(user => (
            <option key={user.userId} value={user.userId}>
              {user.userId}
            </option>
          ))}
        </select>
        <br />
        <button onClick={handleDownloadSelectedUserData} disabled={!selectedUserId}>
          Download Selected User Report
        </button>
      </div>
    </div>
  </div>
  );
};
