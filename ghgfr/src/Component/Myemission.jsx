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
  const [monthlyTotals, setMonthlyTotals] = useState([]);  // New state to store the monthly totals for all users


 // Separate states for each dropdown (Financial Year)
 const [selectedTotalYear, setSelectedTotalYear] = useState(currentYear);
 const [selectedUserYear, setSelectedUserYear] = useState(currentYear);

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
      const aggregatedDataObj = {};
      const monthlyTotals = {};   // Object to accumulate monthly totals for all users

      for (const user of users) {
        try {
          const response = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
          const data = await response.json();

          // Process the data for the current user
          aggregatedDataObj[user.userId] = {};

          for (const item of data) {
            const month = new Date(item.date).toLocaleString('default', { month: 'long' }); // Extract month from date
            const result = parseFloat(item.result); // Ensure result is a number


            // Aggregating data by group (existing functionality)
            if (!aggregatedDataObj[user.userId].hasOwnProperty(item.group)) {
              aggregatedDataObj[user.userId][item.group] = result;
            } else {
              aggregatedDataObj[user.userId][item.group] += result;
            }

            // Calculate monthly totals across all users
            if (!monthlyTotals[month]) {
              monthlyTotals[month] = 0;
            }
            monthlyTotals[month] += result;
          }

          // Push the processed monthly data into allMonthlyData

        } catch (error) {
          console.error('Error fetching emission data:', error);
        }
      }

      // Update states after fetching and processing data
      setAggregatedData(aggregatedDataObj);
      setMonthlyTotals(monthlyTotals);    // Set monthly totals for all users

      // Process scopes (same as before)
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

      {/* Year Dropdown for Total Emissions */}
      <div style={{ textAlign: "left", marginBottom: "10px", padding: "10px" }}>
        <label htmlFor="totalYearSelect">Select Year: </label>
        <select id="totalYearSelect" value={selectedTotalYear} onChange={handleTotalYearChange}>
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
            <th>All</th>
            {monthNames.map((month, index) => (
              <th key={index}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(() => {
            const monthlyResults = Array(12).fill(0);

            monthNames.forEach((month, index) => {
              if (monthlyTotals[month]) {
                monthlyResults[index] = monthlyTotals[month].toFixed(2);
              }
            });

            return (
              <tr key="total-emissions">
                <td>Total</td>
                {monthlyResults.map((result, index) => (
                  <td key={index}>{result}</td>
                ))}
              </tr>
            );
          })()}
        </tbody>
      </table>

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

            selectedUserEmissionData.forEach((item) => {
              const startDate = new Date(item.date);
              const endDate = new Date(item.date1);

              // Extracting correct financial year (April - March)
              const startYear = startDate.getFullYear();
              const endYear = endDate.getFullYear();
              const selectedFYStart = selectedUserYear;
              const selectedFYEnd = selectedUserYear + 1;

              if (
                (startYear === selectedFYStart && startDate.getMonth() >= 3) ||
                (endYear === selectedFYEnd && endDate.getMonth() <= 2)
              ) {
                for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
                  if (
                    (d.getFullYear() === selectedFYStart && d.getMonth() >= 3) ||
                    (d.getFullYear() === selectedFYEnd && d.getMonth() <= 2)
                  ) {
                    const monthIndex = (d.getMonth() + 9) % 12; // Adjust to April-March index
                    const result = parseFloat(item.result) || 0;
                    monthlyResults[monthIndex] += result;
                  }
                }
              }
            });

            if (selectedUserEmissionData.length > 0) {
              const userId = selectedUserEmissionData[0].userId;
              return (
                <tr key={userId}>
                  <td>{userId}</td>
                  {monthlyResults.map((result, index) => (
                    <td key={index}>{result.toFixed(2)}</td>
                  ))}
                </tr>
              );
            } else {
              return (
                <tr>
                  <td colSpan="13">No data available for the selected financial year</td>
                </tr>
              );
            }
          })()}
        </tbody>
      </table>

      <hr />
    </div>








      <div>
        <h2>Emissions Data</h2>
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
            {selectedUserEmissionData.map(item => (
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
        style={{ width: '80px' }}
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
                  {typeof item.result === 'number'
                    ? parseFloat(item.result.toFixed(2))
                    : typeof item.result === 'string'
                      ? parseFloat(item.result.match(/-?\d+(?:\.\d{0,2})?/)[0]).toFixed(2)
                      : item.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
