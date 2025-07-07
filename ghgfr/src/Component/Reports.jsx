import React, { useEffect, useState } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Reports = () => {
  const [users, setUsers] = useState([]); // Array of objects with userId
  const [scopes, setScopes] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedYear, setSelectedYear] = useState('2024-2025');

const [formattedReport, setFormattedReport] = useState('');
const [isGenerating, setIsGenerating] = useState(false);
const [isReadyToPrint, setIsReadyToPrint] = useState(false);

const [formattedUserReport, setFormattedUserReport] = useState('');
const [isUserGenerating, setIsUserGenerating] = useState(false);
const [isUserReadyToPrint, setIsUserReadyToPrint] = useState(false);

const [selectedScope, setSelectedScope] = useState('All');
const [selectedCategory, setSelectedCategory] = useState('All');
const [categories, setCategories] = useState([]);

const [scopeCategoryMap, setScopeCategoryMap] = useState({});


    

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
const allCategoriesSet = new Set();
const map = {}; // temporary map for scope to categories



  for (const user of users) {
    try {
      const response = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
      const data = await response.json();

      aggregatedDataObj[user.userId] = {};

      for (const item of data) {
        const result = parseFloat(item.result) || 0;
        const group = item.group;
        const category = item.selectedCategory;

        if (!aggregatedDataObj[user.userId][group]) {
          aggregatedDataObj[user.userId][group] = 0;
        }

        aggregatedDataObj[user.userId][group] += result;

       allScopesSet.add(group);
if (category) {
  allCategoriesSet.add(category);

  if (!map[group]) {
    map[group] = new Set();
  }
  map[group].add(category);
}

      }
    } catch (error) {
      console.error("Error fetching emission data:", error);
    }
  }

 setAggregatedData(aggregatedDataObj);
setScopes([...allScopesSet]);
setCategories([...allCategoriesSet]); // for default "All"
setScopeCategoryMap(
  Object.fromEntries(
    Object.entries(map).map(([scope, set]) => [scope, Array.from(set)])
  )
); // ✅ Correct closing

  
  
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

       const filtered = data.filter(item =>
  item.group === scope &&
  isInSelectedFinancialYear(item) &&
  (selectedCategory === 'All' || item.selectedCategory === selectedCategory) &&
  item.date // Ensure date exists to avoid runtime errors
);




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

reportRows.push([`Emission Report for ${selectedUserId}`]);
reportRows.push([`Selected Year: ${selectedYear}`]);

if (selectedCategory !== 'All') {
  reportRows.push([`Selected Department: ${selectedCategory}`]);
}

reportRows.push(['Generated on:', new Date().toLocaleString()]);
reportRows.push([]);
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


const handleGenerateOrPrint = async () => {
  if (isReadyToPrint) {
    // Print if report is already generated
    const printWindow = window.open('', '', 'width=1000,height=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2, h3 { margin-bottom: 5px; }
            table { margin-top: 10px; border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${formattedReport}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    
    setIsReadyToPrint(false);
  } else {
    // Generate report

      setIsGenerating(true); // 🔄 Set loading state

    
const scopesToDownload = selectedScope == 'All' ? scopes : [selectedScope];

    let html = `<h2>Emission Report for ${selectedScope} (${selectedYear})</h2>`;
    html += `<p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p><hr/>`;

    for (const scope of scopesToDownload) {
      let scopeData = [];
      let scopeTotal = 0;

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
const filtered = data.filter(item =>
  item.group === scope &&
  isInSelectedFinancialYear(item) &&
  (selectedCategory == 'All' || item.selectedCategory === selectedCategory)
);
          const enriched = filtered.map(item => {
            const emission = parseFloat(item.result || 0);
            scopeTotal += emission;
            return `
              <tr>
                <td>${user.userId}</td>
                <td>${item.selectedName || ''}</td>
                <td>${item.selectedCategory || ''}</td>
                
                <td>${item.group || ''}</td>
                <td>${emission.toFixed(2)}</td>
                <td>${item.unit || ''}</td>
                <td>${item.distance || ''}</td>
                <td>${item.date || ''}</td>
                <td>${item.date1 || ''}</td>
              </tr>
            `;
          });
          scopeData.push(...enriched);
        } catch (err) {
          console.error(err);
        }
      }

      if (scopeData.length > 0) {
        html += `<h3>${scope} Data</h3>`;
        html += `
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Scope</th>
                <th>Emission</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              ${scopeData.join('')}
            </tbody>
          </table>
          <p><strong>Total for ${scope}:</strong> ${scopeTotal.toFixed(2)}</p>
          <hr/>
        `;
      }
    }

    setFormattedReport(html);
          setIsGenerating(false); // 🔄 Set loading state

    setIsReadyToPrint(true);
  }
};



const handleUserGenerateOrPrint = async () => {
  if (isUserReadyToPrint) {
    // Print already generated user report
    const printWindow = window.open('', '', 'width=1000,height=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>User Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2, h3 { margin-bottom: 5px; }
            table { margin-top: 10px; border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${formattedUserReport}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

     // Reset to show Generate Report button again
  setIsUserReadyToPrint(false);
  } else {
    if (!selectedUserId) {
      alert('Please select a user.');
      return;
    }
    setIsUserGenerating(true);
    const scopesToDownload = ['Scope 1', 'Scope 2', 'Scope 3'];
    let html = `<h2>Emission Report for User: ${selectedUserId} (${selectedYear})</h2>`;
    html += `<p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p><hr/>`;

    for (const scope of scopesToDownload) {
      let scopeData = [];
      let scopeTotal = 0;

      const isInSelectedFinancialYear = (item) => {
        const [startYear, endYear] = selectedYear.split('-').map(Number);
        const fromDate = new Date(item.date);
        const toDate = new Date(item.date1);
        const start = new Date(`${startYear}-04-01`);
        const end = new Date(`${endYear}-03-31`);
        return fromDate >= start && toDate <= end;
      };

      try {
        const res = await fetch(`https://backend.climescore.com/getdata12?userId=${selectedUserId}`);
        const data = await res.json();
const filtered = data.filter(item => item.group === scope && isInSelectedFinancialYear(item));
        const enriched = filtered.map(item => {
          const emission = parseFloat(item.result || 0);
          scopeTotal += emission;
          return `
            <tr>
              <td>${item.selectedName || ''}</td>
              <td>${item.selectedCategory || ''}</td>
              
              <td>${item.group || ''}</td>
              <td>${emission.toFixed(2)}</td>
              <td>${item.unit || ''}</td>
              <td>${item.distance || ''}</td>
              <td>${item.date || ''}</td>
              <td>${item.date1 || ''}</td>
            </tr>
          `;
        });
        if (enriched.length > 0) {
          html += `<h3>${scope} Data</h3>`;
          html += `
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Scope</th>
                  <th>Emission</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                ${enriched.join('')}
              </tbody>
            </table>
            <p><strong>Total for ${scope}:</strong> ${scopeTotal.toFixed(2)}</p>
            <hr/>
          `;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setFormattedUserReport(html);
    setIsUserGenerating(false);
    setIsUserReadyToPrint(true);
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

<div style={{ marginBottom: '20px' }}>
  <label>
    Scope-wise Emissions:{' '}
    <br />
    <select style={{ width: '400px' }} value={selectedScope} onChange={(e) => setSelectedScope(e.target.value)}>
      <option value="All">All Scopes</option>
      {scopes.map((scope, idx) => (
        <option key={idx} value={scope}>{scope}</option>
      ))}
    </select>
  </label>

<label style={{ marginLeft: '20px' }}>
  Department-wise Emissions:{' '}
  <br />
  <select disabled={selectedScope == 'All'} style={{ width: '400px' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
    <option value="All">All Departments</option>
    {(selectedScope === 'All'
      ? categories
      : scopeCategoryMap[selectedScope] || []
    ).map((cat, idx) => (
      <option key={idx} value={cat}>{cat}</option>
    ))}
  </select>
</label>

</div>


      {/* <button onClick={() => handleDownloadAllScopes(selectedYear)} disabled={!selectedYear}>
        Download {selectedScope} Data
      </button> */}

      <button
  onClick={handleGenerateOrPrint}
  disabled={isGenerating}
  style={{ marginTop: '20px' }}
>
  {isGenerating ? 'Generating...' : isReadyToPrint ? 'Print Report' : 'Generate Report'}
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
        {/* <button onClick={handleDownloadSelectedUserData} disabled={!selectedUserId}>
          Download Selected User Report
        </button> */}

        <button
  onClick={handleUserGenerateOrPrint}
  disabled={isUserGenerating}
  style={{ marginTop: '20px' }}
>
  {isUserGenerating
    ? 'Generating...'
    : isUserReadyToPrint
    ? 'Print User Report'
    : 'Generate User Report'}
</button>

      </div>
    </div>
  </div>
  );
};
