import React, { useState, useEffect } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Myemission = () => {
  const [users, setUsers] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [scopes, setScopes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedUserEmissionData, setSelectedUserEmissionData] = useState([]);
  const [logoimg, setLogoimg] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  // const [allusermonthly, setAllusermonthly] = useState([]);  
  const [monthlyTotals, setMonthlyTotals] = useState([]);  // New state to store the monthly totals for all users



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

  console.log(monthlyTotals);  

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
  <h2>Monthly Emissions Data</h2>

  <table>
    <thead>
      <tr>
      <th>All</th>

        <th>January</th>
        <th>February</th>
        <th>March</th>
        <th>April</th>
        <th>May</th>
        <th>June</th>
        <th>July</th>
        <th>August</th>
        <th>September</th>
        <th>October</th>
        <th>November</th>
        <th>December</th>
      </tr>
    </thead>
    <tbody>
      {(() => {
        // Initialize an array to hold the emission totals for each month
        const monthlyResults = Array(12).fill(0);

        // Map the months to the appropriate index in the array (January -> 0, February -> 1, etc.)
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Loop through the monthNames and assign the corresponding value from monthlyTotals
        monthNames.forEach((month, index) => {
          if (monthlyTotals[month]) {
            monthlyResults[index] = monthlyTotals[month].toFixed(2); // Use the data from monthlyTotals
          }
        });

        // Render a row for the emissions data
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
