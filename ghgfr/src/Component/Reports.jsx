import React, { useEffect, useState } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Reports = () => {
  const [users, setUsers] = useState([]); // Array of objects with userId
  const [scopes, setScopes] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');
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


  reportRows.push(['Emission Report for All Scopes']);
  reportRows.push(['Generated on:', new Date().toLocaleString()]);
  reportRows.push([]);

  for (const scope of scopesToDownload) {
    let scopeData = [];
    let scopeTotal = 0;
    const nameTotals = {};

    for (const user of users) {
      try {
        const res = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
        const data = await res.json();

        const filtered = data.filter(item => item.group === scope);

        const enriched = filtered.map(item => {
          const emission = parseFloat(item.result || 0);
          scopeTotal += emission;

          const name = item.selectedName || 'Unknown';
          nameTotals[name] = (nameTotals[name] || 0) + emission;

          return {
            userId: user.userId,
            name: name,
            category: item.selectedCategory || '',
            country: item.country || '',
            type: item.selectedType || '',
            brand: item.brand || '',
            emission: emission.toFixed(2),
            scope: item.group || '',
            unit: item.unit || '',
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
      
      // Ensure each value in a row is properly quoted and formatted for CSV
      reportRows.push(...scopeData.map(row =>
        Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`)
      ));

      reportRows.push([]);
      reportRows.push([`Total Emissions per Item in ${scope}:`]);
      Object.entries(nameTotals).forEach(([name, total]) => {
        reportRows.push([name, `"${total.toFixed(2)}"`]); // Ensure total is quoted
      });

      // Show total for each name below the respective scope
      reportRows.push(['Total for this Scope:', `"${scopeTotal.toFixed(2)}"`]); // Ensure scope total is quoted
      reportRows.push([]);
      grandTotal += scopeTotal;
    }
  }

  reportRows.push(['Grand Total Emission (All Scopes):', `"${grandTotal.toFixed(2)}"`]); // Ensure grand total is quoted

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
  if (!selectedUserId) {
    alert("Please select a user first.");
    return;
  }

  try {
    const res = await fetch(`https://backend.climescore.com/getdata12?userId=${selectedUserId}`);
    const data = await res.json();

    if (data.length === 0) {
      alert("No data found for selected user.");
      return;
    }

    let reportRows = [];
    reportRows.push(['Emission Report for User:', selectedUserId]);
    reportRows.push(['Generated on:', new Date().toLocaleString()]);
    reportRows.push([]);

    const scopes = ['Scope 1', 'Scope 2', 'Scope 3'];
    let grandTotal = 0;
    const overallDistanceTotalsByName = {};
    const overallDistanceUnits = {};

    for (const scope of scopes) {
      const scopeData = data.filter(item => item.group === scope);
      if (scopeData.length === 0) continue;

      let scopeTotal = 0;
      const nameTotals = {};
      const distanceTotals = {};
      const distanceUnits = {};

      const formattedData = scopeData.map(item => {
        const emission = parseFloat(item.result || 0);
        scopeTotal += emission;

        const distance = parseFloat(item.distance || 0);
        const name = item.selectedName || 'Unknown';

        if (distance > 0) {
          distanceTotals[name] = (distanceTotals[name] || 0) + distance;
          distanceUnits[name] = item.unit || '';

          overallDistanceTotalsByName[name] = (overallDistanceTotalsByName[name] || 0) + distance;
          overallDistanceUnits[name] = item.unit || '';
        }

        nameTotals[name] = (nameTotals[name] || 0) + emission;

        return {
          name: name,
          category: item.selectedCategory || '',
          country: item.selectedCountry || '',
          type: item.selectedType || '',
          brand: item.brand || '',
          emission: emission.toFixed(2),
          description: item.description || '',
          scope: item.group || '',
          unit: item.unit || '',
          fromDate: item.date || '',
          toDate: item.date1 || ''
        };
      });

      reportRows.push([`${scope} Emissions`]);

      if (formattedData.length > 0) {
        reportRows.push(Object.keys(formattedData[0]));
      }

      reportRows.push(...formattedData.map(row =>
        Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`)
      ));

      reportRows.push([]);
      reportRows.push([`Total Emissions per Item in ${scope}:`]);
      Object.entries(nameTotals).forEach(([name, total]) => {
        reportRows.push([name, `"${total.toFixed(2)}"`]);
      });

      reportRows.push([]);
      reportRows.push([`Total Units per Item in ${scope}:`]);
      Object.entries(distanceTotals).forEach(([name, total]) => {
        const unit = distanceUnits[name] || '';
        reportRows.push([name, `"${total.toFixed(2)}"`, `${unit}`]);
      });

      reportRows.push([]);
      reportRows.push(['Total for this Scope:', `"${scopeTotal.toFixed(2)}"`]);
      reportRows.push([]);

      grandTotal += scopeTotal;
    }

    reportRows.push(['Grand Total Emissions:', `"${grandTotal.toFixed(2)}"`]);
    reportRows.push([]);
    reportRows.push(['Total Units (All Scopes) by Item:']);
    Object.entries(overallDistanceTotalsByName).forEach(([name, total]) => {
      const unit = overallDistanceUnits[name] || '';
      reportRows.push([name, `"${total.toFixed(2)}"`, `Unit: ${unit}`]);
    });



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
    console.error('Error downloading user report:', err);
  }
};


  return (
    <div>
      <Clientnavbar />
      <div className="container">
        <h2>Download Reports</h2>

        <button onClick={handleDownloadAllScopes}>Download All Scope Data</button>

        <div style={{ marginTop: '20px' }}>
          <label>Select User: </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{width:'400px'}}
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
