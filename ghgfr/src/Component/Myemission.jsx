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
      const aggregatedDataObj = {}; // Stores emissions per user
      const financialYearTotals = {}; // Stores emissions per financial year
      const monthlyTotalsByYear = {}; // Stores emissions per month within each financial year
  
      for (const user of users) {
        try {
          const response = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
          const data = await response.json();
  
          aggregatedDataObj[user.userId] = {};
  
          for (const item of data) {
            const itemDate = new Date(item.date);
            const itemYear = itemDate.getFullYear();
            const itemMonth = itemDate.toLocaleString('default', { month: 'long' });
            const result = parseFloat(item.result) || 0; // Ensure result is a number
  
            // ✅ Determine Financial Year (April - March Cycle)
            const financialYear =
              itemDate.getMonth() >= 3 // April - Dec → Current Year
                ? `${itemYear}-${itemYear + 1}`
                : `${itemYear - 1}-${itemYear}`;
  
            // ✅ Initialize storage for the financial year if not exists
            if (!financialYearTotals[financialYear]) {
              financialYearTotals[financialYear] = 0;
              monthlyTotalsByYear[financialYear] = {}; // Initialize monthly storage
            }
  
            // ✅ Aggregate total emissions for the financial year
            financialYearTotals[financialYear] += result;
  
            // ✅ Aggregate monthly emissions within the financial year
            if (!monthlyTotalsByYear[financialYear][itemMonth]) {
              monthlyTotalsByYear[financialYear][itemMonth] = 0;
            }
            monthlyTotalsByYear[financialYear][itemMonth] += result;
  
            // ✅ Aggregating data by group (existing functionality)
            if (!aggregatedDataObj[user.userId].hasOwnProperty(item.group)) {
              aggregatedDataObj[user.userId][item.group] = result;
            } else {
              aggregatedDataObj[user.userId][item.group] += result;
            }
          }
        } catch (error) {
          console.error("Error fetching emission data:", error);
        }
      }
  
      // ✅ Update states after processing data
      setAggregatedData(aggregatedDataObj);
      // setFinancialYearTotals(financialYearTotals); // Store total emissions per financial year
      setMonthlyTotals(monthlyTotalsByYear); // Store monthly totals per financial year

      console.log(monthlyTotalsByYear)
  
      // ✅ Process scopes (same as before)
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
  

  // console.log(monthlyTotals);  


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


      <div style={{ marginTop: '20px' }}>
  <h3>Select Scope For Download: </h3>
  <select style={{ width: '580px' }} onChange={(e) => setSelectedScope(e.target.value)} value={selectedScope}>
    <option value="">-- Select Scope --</option>
    {scopes.map(scope => (
      <option key={scope} value={scope}>{scope}</option>
    ))}
  </select>
<br />
  <button onClick={handleDownloadScopeData} style={{ marginLeft: '10px' }}>
    Download Scope Data
  </button>
</div>

<div style={{ marginTop: '40px' }}>
  <h3>Download by User and Emission Type</h3>

  <label>Select User: </label>
  <select style={{ width: '580px' }} onChange={(e) => handleUserChange(e.target.value)} value={selectedUserId}>
    <option value="">-- Select User --</option>
    {users.map(user => (
      <option key={user.userId} value={user.userId}>{user.userId}</option>
    ))}
  </select>

  {userNames.length > 0 && (
    <>
      <label style={{ marginLeft: '10px' }}>Select Emission Type: </label>
      <select style={{ width: '580px' }} onChange={(e) => setSelectedName(e.target.value)} value={selectedName}>
        <option value="">-- Select Emission Type --</option>
        {userNames.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
    </>
  )}
  <br />

  <button onClick={handleDownloadByName} style={{ marginLeft: '10px' }} disabled={!selectedName}>
    Download Name Data
  </button>
</div>


      <h2>Aggregated Data by Scope</h2>
      <h4>Total Users: {users.length}</h4>

      <table>
      <thead>
        <tr>
          <th>User ID</th>
          {scopes.map((scope) => (
            <th key={scope}>{scope}</th>
          ))}
          <th>Total</th>
          <th>Show Emission</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            {scopes.map((scope) => (
              <td key={`${user.userId}-${scope}`}>
                {(aggregatedData[user.userId]?.[scope] || 0).toFixed(2)}
              </td>
            ))}
            <td>
              {Object.values(aggregatedData[user.userId] || {})
                .reduce((acc, val) => acc + val, 0)
                .toFixed(2)}
            </td>
            <td>
              <button onClick={() => handleShowData(user.userId)}>
                Show Emission
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={scopes.length + 1}>
            <strong>Total</strong>
          </td>
          <td>
            <strong>{calculateTotalWithDays()}</strong>
          </td>
        
        </tr>
      </tfoot>
    </table>


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
      <h2>Monthly User's Emissions ({getFinancialYear(selectedUserYear)})</h2>

      {/* Year Dropdown for User's Emissions */}
      <div style={{ textAlign: "left", marginBottom: "10px", padding: "10px" }}>
        <label htmlFor="userYearSelect">Select Year: </label>
        <select id="userYearSelect" value={selectedUserYear} onChange={handleUserYearChange}>
          {[...Array(5)].map((_, index) => {
            const year = currentYear - 2 + index;
            return (
              <option key={year} value={year}>
                {year} April - {year + 1} March
              </option>
            );
          })}
        </select>
      </div>      

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
