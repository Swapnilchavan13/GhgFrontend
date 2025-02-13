import React, { useState, useEffect } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

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

// Extract available financial years dynamically from data
const availableYears = Object.keys(monthlyTotalsByYear).sort();

// Function to handle dropdown change
const handleFinancialYearChange = (event) => {
  setSelectedFinancialYear(event.target.value);
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

  const handleShowData = async (userId) => {
    try {
      const response = await fetch(`https://backend.climescore.com/getdata12?userId=${userId}`);
      const data = await response.json();
      setSelectedUserEmissionData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching emission data:', error);
    }
  };


  useEffect(() => {
    // Fetch client's data including logoimg
    fetch(`https://backend.climescore.com/getclients`)
      .then(response => response.json())
      .then(data => {
        // Find the client data whose userId matches with the one in local storage
        const client = data.find(client => client.userId === localStorage.getItem('userId'));
        if (client) {
          setLogoimg(client.logoimg);
        }
      })
      .catch(error => console.error('Error fetching client data:', error));
  }, []);

  return (
    <div>
      <Clientnavbar logoimg={logoimg} />

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
