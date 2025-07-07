import React, { useState, useEffect } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
 
export const Myemission = () => {

  const currentYear = new Date().getFullYear();

  const [users, setUsers] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [scopes, setScopes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedUserEmissionData, setSelectedUserEmissionData] = useState([]);
  const [logoimg, setLogoimg] = useState('');
  // const [allusermonthly, setAllusermonthly] = useState([]);  
  const [monthlyTotalsByYear, setMonthlyTotals] = useState([]);  // New state to store the monthly totals for all users
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("2024-2025");

  const [showGraph, setShowGraph] = useState(false); // State to control the visibility of the graph
  const [showGraph2, setShowGraph2] = useState(false); // State to control the visibility of the graph

  const [selectedScope, setSelectedScope] = useState('');

  const scopeOrder = ['Scope 1', 'Scope 2', 'Scope 3'];

const [selectedYear, setSelectedYear] = useState('2024-2025');


  const [financialYearTotals, setFinancialYearTotals] = useState({});
  const [yearWiseUserScopeData, setYearWiseUserScopeData] = useState({});


  const [selectedUserId, setSelectedUserId] = useState('');
const [userNames, setUserNames] = useState([]);
const [selectedName, setSelectedName] = useState('');



// Extract available financial years dynamically from data
const availableYears = Object.keys(monthlyTotalsByYear).sort();

// Function to handle dropdown change
const handleFinancialYearChange = (event) => {
  setSelectedFinancialYear(event.target.value);
};

const handleShowGraph = () => {
  setShowGraph(!showGraph); // Toggle the graph visibility
};

const handleShowGraph2 = () => {
  setShowGraph2(!showGraph2); // Toggle the graph visibility
};


 // Separate states for each dropdown (Financial Year)
 const [selectedTotalYear, setSelectedTotalYear] = useState(currentYear-1);
 const [selectedUserYear, setSelectedUserYear] = useState(currentYear-1);

 const handleTotalYearChange = (event) => {
   setSelectedTotalYear(parseInt(event.target.value, 10));
 };

 const handleUserYearChange = (event) => {
   setSelectedUserYear(parseInt(event.target.value, 10));
 };

 // Format financial year (April to March)
 const getFinancialYear = (year) => `${year} April - ${year + 1} March`;

 // Define month order (April - March)
 const monthNames = [
   "April", "May", "June", "July", "August", "September",
   "October", "November", "December", "January", "February", "March"
 ];



 const handleDownloadScopeData = async () => {
  if (!selectedScope) {
    alert("Please select a scope.");
    return;
  }

  let allData = [];

  for (const user of users) {
    try {
      const res = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
      const data = await res.json();

      const filtered = data.filter(item => item.group === selectedScope);

      const enriched = filtered.map(item => ({
        userId: user.userId,
        name: item.name || '',
        category: item.category || '',
        country: item.country || '',
        type: item.type || '',
        brand: item.brand || '',
        emission: item.result || '',
        description: item.description || '',
        group: item.group || '',
        sku: item.sku || '',
        unit: item.unit || '',
        image: item.image || '',
        fromDate: item.fromDate || '',
        toDate: item.toDate || ''
      }));

      allData.push(...enriched);

    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }

  if (allData.length === 0) {
    alert("No data found for selected scope.");
    return;
  }

  const csvRows = [
    Object.keys(allData[0]).join(','), // Header
    ...allData.map(row => Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `emissions_${selectedScope}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};



  const calculateTotalWithDays = () => {
    return (
      Object.values(aggregatedData).reduce((total, userData) => {
        return total + Object.values(userData).reduce((acc, val) => acc + val, 0);
      }, 0)
    ).toFixed(2);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!storedIsLoggedIn);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/client/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetch(`https://backend.climescore.com/getusers?clientId=${localStorage.getItem('userId')}`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

useEffect(() => {
  const fetchData = async () => {
    const aggregatedDataObj = {};
    const financialYearTotals = {};
    const monthlyTotalsByYear = {};
    const yearWiseUserScope = {}; // ✅ New structure


for (const user of users) {
  try {
    const response = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
    const data = await response.json();

    aggregatedDataObj[user.userId] = {};

    for (const item of data) {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.toLocaleString('default', { month: 'long' });
      const result = parseFloat(item.result) || 0;
      const scope = item.group;

      // Financial Year
      const financialYear =
        itemDate.getMonth() >= 3
          ? `${itemYear}-${itemYear + 1}`
          : `${itemYear - 1}-${itemYear}`;

      // Init structures
      if (!financialYearTotals[financialYear]) {
        financialYearTotals[financialYear] = 0;
        monthlyTotalsByYear[financialYear] = {};
      }
      financialYearTotals[financialYear] += result;

      if (!monthlyTotalsByYear[financialYear][itemMonth]) {
        monthlyTotalsByYear[financialYear][itemMonth] = 0;
      }
      monthlyTotalsByYear[financialYear][itemMonth] += result;

      if (!aggregatedDataObj[user.userId][scope]) {
        aggregatedDataObj[user.userId][scope] = result;
      } else {
        aggregatedDataObj[user.userId][scope] += result;
      }

      // ✅ Year → User → Scope
      if (!yearWiseUserScope[financialYear]) {
        yearWiseUserScope[financialYear] = {
          _scopeTotals: {},
          _grandTotal: 0
        };
      }

      // Init user block
      if (!yearWiseUserScope[financialYear][user.userId]) {
        yearWiseUserScope[financialYear][user.userId] = {
          _userTotal: 0
        };
      }

      // Add to user scope
      if (!yearWiseUserScope[financialYear][user.userId][scope]) {
        yearWiseUserScope[financialYear][user.userId][scope] = 0;
      }
      yearWiseUserScope[financialYear][user.userId][scope] += result;

      // ✅ Update user total
      yearWiseUserScope[financialYear][user.userId]._userTotal += result;

      // ✅ Update year’s scope total
      if (!yearWiseUserScope[financialYear]._scopeTotals[scope]) {
        yearWiseUserScope[financialYear]._scopeTotals[scope] = 0;
      }
      yearWiseUserScope[financialYear]._scopeTotals[scope] += result;

      // ✅ Update grand total
      yearWiseUserScope[financialYear]._grandTotal += result;
    }
  } catch (error) {
    console.error("Error fetching emission data:", error);
  }
}

    setAggregatedData(aggregatedDataObj);
    setMonthlyTotals(monthlyTotalsByYear);
    setFinancialYearTotals(financialYearTotals);
    setYearWiseUserScopeData(yearWiseUserScope); // ✅ Store result here

    console.log(yearWiseUserScope);

    // Get unique scopes
    const allScopes = new Set();
    for (const userId in aggregatedDataObj) {
      for (const scope in aggregatedDataObj[userId]) {
        allScopes.add(scope);
      }
    }
    setScopes([...allScopes]);
  };

  fetchData();
}, [users]);


  



  const handleUserChange = async (userId) => {
    setSelectedUserId(userId);
    setSelectedName('');
    setUserNames([]);
  
    if (!userId) return;
  
    try {
      const res = await fetch(`https://backend.climescore.com/getdata12?userId=${userId}`);
      const data = await res.json();
  
      const uniqueNames = [...new Set(data.map(item => item.selectedName).filter(Boolean))];
      setUserNames(uniqueNames);
    } catch (err) {
      console.error("Failed to fetch names for user:", err);
    }
  };

  

  const handleDownloadByName = async () => {
    if (!selectedUserId || !selectedName) {
      alert("Please select both User ID and Name.");
      return;
    }
  
    try {
      const res = await fetch(`https://backend.climescore.com/getdata12?userId=${selectedUserId}`);
      const data = await res.json();
  
      const filtered = data.filter(item => item.selectedName === selectedName);
  
      if (filtered.length === 0) {
        alert("No data found for selected name.");
        return;
      }
  
      const enriched = filtered.map(item => ({
        userId: selectedUserId,
        name: item.selectedName || '',
        category: item.category || '',
        country: item.country || '',
        type: item.type || '',
        brand: item.brand || '',
        emission: item.result || '',
        description: item.description || '',
        group: item.group || '',
        sku: item.sku || '',
        unit: item.unit || '',
        image: item.image || '',
        fromDate: item.fromDate || '',
        toDate: item.toDate || ''
      }));
  
      const csvRows = [
        Object.keys(enriched[0]).join(','), // Header
        ...enriched.map(row => Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
      ];
  
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `data_${selectedName}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
    } catch (err) {
      console.error("Error downloading name data:", err);
    }
  };
  





  const handleShowData = async (userId) => {
    try {
      const response = await fetch(`https://backend.climescore.com/getdata12?userId=${userId}`);
      const data = await response.json();
      setSelectedUserEmissionData(data);
    } catch (error) {
      console.error('Error fetching emission data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const agg = {}, monthly = {};
      for (const user of users) {
        try {
          const res = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
          const data = await res.json();
          agg[user.userId] = {};

          for (const item of data) {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const result = parseFloat(item.result) || 0;
            const fy = date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;

            if (!monthly[fy]) monthly[fy] = {};
            if (!monthly[fy][month]) monthly[fy][month] = 0;
            monthly[fy][month] += result;

            if (!agg[user.userId][item.group]) agg[user.userId][item.group] = 0;
            agg[user.userId][item.group] += result;
          }
        } catch (err) {
          console.error(err);
        }
      }

      setAggregatedData(agg);
      setMonthlyTotals(monthly);

      const scopeSet = new Set();
      Object.values(agg).forEach(userData => {
        Object.keys(userData).forEach(scope => scopeSet.add(scope));
      });
      setScopes([...scopeSet]);
    };
    fetchData();
  }, [users]);

  const chartData = {
    labels: Object.keys(monthlyTotalsByYear[selectedFinancialYear] || {}),
    datasets: [{
      label: 'Monthly Emissions',
      data: Object.values(monthlyTotalsByYear[selectedFinancialYear] || {}),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const userLabels = users.map(u => u.userId);
  const userTotals = users.map(u => {
    const total = Object.values(aggregatedData[u.userId] || {}).reduce((a, b) => a + b, 0);
    return +total.toFixed(2);
  });

  const userChartData = {
    labels: userLabels,
    datasets: [{
      label: 'User-wise Total Emissions',
      data: userTotals,
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  const pieChartData = {
    labels: userLabels,
    datasets: [{
      data: userTotals,
      backgroundColor: userLabels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`),
      borderWidth: 1,
    }],
  };



  return (
    <div>
      <Clientnavbar logoimg={logoimg} />

      <h2>Aggregated Data by Scope</h2>
      <h4>Total Users: {users.length}</h4>

      {yearWiseUserScopeData && (
  <div style={{ marginBottom: '1rem' }}>
    <label>Select Financial Year: </label>
    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
      <option value="">-- Select --</option>
      {Object.keys(yearWiseUserScopeData)
        .filter((year) => /^\d{4}-\d{4}$/.test(year)) // ✅ Match pattern like 2023-2024
        .map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
    </select>
  </div>
)}



      {selectedYear && yearWiseUserScopeData[selectedYear] && (
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        {[...scopeOrder].map((scope) => (
          <th key={scope}>{scope}</th>
        ))}
        <th>User Total</th>
        <th>Show Emission</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(yearWiseUserScopeData[selectedYear])
        .filter(([key]) => !key.startsWith('_')) // Skip _scopeTotals and _grandTotal
        .map(([userId, userScopes]) => (
          <tr key={userId}>
            <td>{userId}</td>
            {scopeOrder.map((scope) => (
              <td key={`${userId}-${scope}`}>
                {(userScopes[scope] || 0).toFixed(2)}
              </td>
            ))}
            <td><strong>{(userScopes._userTotal || 0).toFixed(2)}</strong></td>
            <td>
              <button onClick={() => handleShowData(userId)}>Show Emission</button>
            </td>
          </tr>
        ))}
    </tbody>
    <tfoot>
      <tr>
        <td><strong>Scope Totals</strong></td>
        {scopeOrder.map((scope) => (
          <td key={`total-${scope}`}>
            <strong>{(yearWiseUserScopeData[selectedYear]._scopeTotals?.[scope] || 0).toFixed(2)}</strong>
          </td>
        ))}
        <td colSpan="2"><strong>Grand Total: {(yearWiseUserScopeData[selectedYear]._grandTotal || 0).toFixed(2)}</strong></td>
      </tr>
    </tfoot>
  </table>
)}



    <div>
      {/* Monthly Total Emissions Section */}
      <h2>Monthly Total Emissions ({getFinancialYear(selectedTotalYear)})</h2>

      <div>
    {/* Dropdown for selecting financial year */}
    <div style={{ textAlign: "left", marginBottom: "10px", padding: "10px" }}>
      <label htmlFor="financialYearSelect">Select Financial Year: </label>
      <select id="financialYearSelect" value={selectedFinancialYear} onChange={handleFinancialYearChange}>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year} (April - March)
          </option>
        ))}
      </select>
    </div>

    {/* Monthly Total Emissions Table (Horizontal) */}
    <h2>Monthly Total Emissions ({selectedFinancialYear})</h2>

    <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "center" }}>
      <thead>
        <tr>
          <th>All</th>
          {monthNames.map((month, index) => (
            <th key={index}>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total</td>
          {monthNames.map((month, index) => (
            <td key={index}>
              {monthlyTotalsByYear[selectedFinancialYear]?.[month]
                ? monthlyTotalsByYear[selectedFinancialYear][month].toFixed(2)
                : "0.00"}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
</div>
      <br />
      <hr />

      <div style={{ marginTop: '20px' }}>
        <button className='toggle-btn' onClick={handleShowGraph}>
          {showGraph ? 'Hide Graphical Data' : 'Show Graphical Data'}
        </button>

        {showGraph && (
  <div className="graph-wrapper">
    <h2>Graph of Monthly Total Emissions ({selectedFinancialYear})</h2>
    <div className="chart-container1">
      <Bar data={chartData} />
    </div>

<div className='graphdiv'>
  <div>
    <h2>User-wise Total Emissions</h2>
    <div className="chart-container">
      <Bar data={userChartData} />
    </div>
  </div>
<div>

    <h2>User-wise Emission Pie Chart</h2>
    <div className="chart-container pie">
      <Pie data={pieChartData} />
    </div>
</div>
</div>
  </div>
)}

      </div>

      {/* Monthly User's Emissions Section */}
      <h2>Monthly User's Emissions ({selectedYear})</h2>


      <table>
        <thead>
          <tr>
            <th>User ID</th>
            {monthNames.map((month, index) => (
              <th key={index}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
  {(() => {
    const monthlyResults = Array(12).fill(0);
    const filteredData = selectedUserEmissionData.filter((item) => {
      const startDate = new Date(item.date);
      const endDate = new Date(item.date1);

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      const selectedFYStart = selectedUserYear;
      const selectedFYEnd = selectedUserYear + 1;

      return (
        (startYear === selectedFYStart && startDate.getMonth() >= 3) ||
        (endYear === selectedFYEnd && endDate.getMonth() <= 2)
      );
    });

    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="13" style={{ textAlign: "center" }}>
            No data available for the selected financial year
          </td>
        </tr>
      );
    }

    filteredData.forEach((item) => {
      const startDate = new Date(item.date);
      const endDate = new Date(item.date1);

      for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
        if (
          (d.getFullYear() === selectedUserYear && d.getMonth() >= 3) ||
          (d.getFullYear() === selectedUserYear + 1 && d.getMonth() <= 2)
        ) {
          const monthIndex = (d.getMonth() + 9) % 12;
          const result = parseFloat(item.result) || 0;
          monthlyResults[monthIndex] += result;
        }
      }
    });

    return (
      <tr>
        <td>{filteredData[0].userId}</td>
        {monthlyResults.map((result, index) => (
          <td key={index}>{result.toFixed(2)}</td>
        ))}
      </tr>
    );
  })()}
</tbody>

</table>

      <hr />
    </div>



    <div style={{ padding: '1rem' }}>
  

  <button
    onClick={handleShowGraph2}
    
    style={{
      padding: '0.5rem 1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
  {showGraph2 ? 'Hide Highest Emission Activity Pie' : 'Show Highest Emission Activity Pie'}
    
  </button>
</div>



{showGraph2 && selectedUserEmissionData.length > 0 && (
  <div style={{ width: '600px', margin: '2rem auto' }}>
    <h4 style={{ textAlign: 'center' }}>Emission by Activity (Selected User)</h4>
    <Pie
      data={{
        labels: Object.keys(
          selectedUserEmissionData.reduce((acc, item) => {
            acc[item.selectedName] = (acc[item.selectedName] || 0) + parseFloat(item.result);
            return acc;
          }, {})
        ),
        datasets: [{
          data: Object.values(
            selectedUserEmissionData.reduce((acc, item) => {
              acc[item.selectedName] = (acc[item.selectedName] || 0) + parseFloat(item.result);
              return acc;
            }, {})
          ),
          backgroundColor: Object.keys(selectedUserEmissionData.reduce((acc, item) => {
            acc[item.selectedName] = true;
            return acc;
          }, {})).map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
        }]
      }}
    />
  </div>
)}




    <div>
  <h2>Emissions Data ({getFinancialYear(selectedUserYear)})</h2>

  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Selected Name</th>
        <th>Selected Category</th>
        <th>Selected Country</th>
        <th>Selected Type</th>
        <th>Selected Brand</th>
        <th>Emission</th>
        <th>Description</th>
        <th>Group</th>
        <th>SKU</th>
        <th>Unit</th>
        <th>Image</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      {(() => {
        // Filter data based on the selected financial year
        const filteredEmissionData = selectedUserEmissionData.filter((item) => {
          const startDate = new Date(item.date);
          const endDate = new Date(item.date1);

          const startYear = startDate.getFullYear();
          const endYear = endDate.getFullYear();
          const selectedFYStart = selectedUserYear;
          const selectedFYEnd = selectedUserYear + 1;

          return (
            (startYear === selectedFYStart && startDate.getMonth() >= 3) ||
            (endYear === selectedFYEnd && endDate.getMonth() <= 2)
          );
        });

        if (filteredEmissionData.length === 0) {
          return (
            <tr>
              <td colSpan="15">No data available for the selected financial year</td>
            </tr>
          );
        }

        return filteredEmissionData.map((item) => (
          <tr key={item._id}>
            <td>{item.userId}</td>
            <td>{item.selectedName}</td>
            <td>{item.selectedCategory}</td>
            <td>{item.selectedCountry}</td>
            <td>{item.selectedType}</td>
            <td>{item.selectedBrand}</td>
            <td>{item.distance}</td>
            <td>{item.description}</td>
            <td>{item.group}</td>
            <td>{item.sku}</td>
            <td>{item.unit}</td>
            <td>
              {item.image ? (
                <a
                  href={`https://backend.climescore.com/${item.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: "80px" }}
                    src={`https://backend.climescore.com/${item.image}`}
                    alt="Image"
                  />
                </a>
              ) : (
                <span>N/A</span>
              )}
            </td>
            <td>{item.date}</td>
            <td>{item.date1}</td>
            <td>
              {typeof item.result === "number"
                ? item.result.toFixed(2)
                : typeof item.result === "string"
                ? parseFloat(item.result.match(/-?\d+(?:\.\d{0,2})?/)[0]).toFixed(2)
                : item.result}
            </td>
          </tr>
        ));
      })()}
    </tbody>
  </table>
</div>

    </div>
  );
};
