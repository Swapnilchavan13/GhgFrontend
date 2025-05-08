import React, { useEffect, useState } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Reports = () => {
  const [users, setUsers] = useState([]); // Array of objects with userId
  const [scopes, setScopes] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');
  const navigate = useNavigate();

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

      for (const user of users) {
        try {
          const res = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
          const data = await res.json();

          const filtered = data.filter(item => item.group === scope);

          const enriched = filtered.map(item => {
            const emission = parseFloat(item.result || 0);
            scopeTotal += emission;
            return {
              userId: user.userId,
              name: item.selectedName || '',
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
        reportRows.push(...scopeData.map(row =>
          Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`)
        ));
        reportRows.push([`Total Emission for ${scope}:`, scopeTotal.toFixed(2)]);
        reportRows.push([]);
        grandTotal += scopeTotal;
      }
    }

    reportRows.push(['Grand Total Emission (All Scopes):', grandTotal.toFixed(2)]);

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

      for (const scope of scopes) {
        const scopeData = data.filter(item => item.group === scope);
        if (scopeData.length === 0) continue;

        let scopeTotal = 0;

        const formattedData = scopeData.map(item => {
          const emission = parseFloat(item.result || 0);
          scopeTotal += emission;
          return {
            name: item.userId || '',
            category: item.selectedCategory || '',
            country: item.selectedCountry || '',
            type: item.selectedType || '',
            brand: item.brand || '',
            emission: emission.toFixed(2),
            description: item.description || '',
            Scope: item.group || '',
            unit: item.unit || '',
            fromDate: item.date || '',
            toDate: item.date1 || ''
          };
        });

        reportRows.push([`${scope} Emissions`]);
        reportRows.push(Object.keys(formattedData[0]));
        reportRows.push(...formattedData.map(row =>
          Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`)
        ));
        reportRows.push([`Total for ${scope}:`, scopeTotal.toFixed(2)]);
        reportRows.push([]);

        grandTotal += scopeTotal;
      }

      reportRows.push([`Grand Total Emissions:`, grandTotal.toFixed(2)]);

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
        <h2>Reports</h2>

        <button onClick={handleDownloadAllScopes}>Download All Scope Data</button>

        <div style={{ marginTop: '20px' }}>
          <label>Select User: </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select a user --</option>
            {users.map(user => (
              <option key={user.userId} value={user.userId}>
                {user.userId}
              </option>
            ))}
          </select>

          <button onClick={handleDownloadSelectedUserData} disabled={!selectedUserId}>
            Download Selected User Report
          </button>
        </div>
      </div>
    </div>
  );
};
