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
  
    const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value, 10));
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

      for (const user of users) {
        try {
          const response = await fetch(`https://backend.climescore.com/getdata12?userId=${user.userId}`);
          const data = await response.json();

          aggregatedDataObj[user.userId] = {};
          for (const item of data) {
            if (!aggregatedDataObj[user.userId].hasOwnProperty(item.group)) {
              aggregatedDataObj[user.userId][item.group] = parseFloat(item.result);
            } else {
              aggregatedDataObj[user.userId][item.group] += parseFloat(item.result);
            }
          }
        } catch (error) {
          console.error('Error fetching emission data:', error);
        }
      }

      setAggregatedData(aggregatedDataObj);

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

      {/* Dropdown for selecting the year */}
      <div style={{ textAlign:
        'left', marginBottom: "10px", padding:'10px' }}>
        <label htmlFor="yearSelect">Select Year: </label>
        <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
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
            // Initialize an array to hold monthly totals
            const monthlyResults = Array(12).fill(0);

            // Process the selected user's emission data for the selected year
            selectedUserEmissionData.forEach(item => {
              const startDate = new Date(item.date);
              const endDate = new Date(item.date1);

              // Filter data for the selected year
              if (startDate.getFullYear() === selectedYear || endDate.getFullYear() === selectedYear) {
                // Iterate through each month in the range
                for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
                  if (d.getFullYear() === selectedYear) {
                    const monthIndex = d.getMonth(); // 0 for January, 1 for February, etc.
                    const result = parseFloat(item.result) || 0;
                    monthlyResults[monthIndex] += result;
                  }
                }
              }
            });

            // Render a single row for the selected user
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
                  <td colSpan="13">No data available for the selected year</td>
                </tr>
              );
            }
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
