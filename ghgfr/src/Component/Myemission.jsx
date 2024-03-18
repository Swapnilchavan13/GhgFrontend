import React, { useState, useEffect } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Myemission = () => {
  const [users, setUsers] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [scopes, setScopes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedUserEmissionData, setSelectedUserEmissionData] = useState([]);

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
    fetch(`http://62.72.59.146:8080/getusers?clientId=${localStorage.getItem('userId')}`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const aggregatedDataObj = {};

      for (const user of users) {
        try {
          const response = await fetch(`http://62.72.59.146:8080/getdata12?userId=${user.userId}`);
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
      const response = await fetch(`http://62.72.59.146:8080/getdata12?userId=${userId}`);
      const data = await response.json();
      setSelectedUserEmissionData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching emission data:', error);
    }
  };

  return (
    <div>
      <Clientnavbar />

      <h2>Aggregated Data by Scope</h2>
      <h4>Total Users: {users.length}</h4>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            {scopes.map(scope => (
              <th key={scope}>{scope}</th>
            ))}
            <th>Total</th>
            <th>Show Emission</th> {/* Add button column */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              {scopes.map(scope => (
                <td key={`${user.userId}-${scope}`}>{aggregatedData[user.userId]?.[scope] || 0}</td>
              ))}
              <td>{Object.values(aggregatedData[user.userId] || {}).reduce((acc, val) => acc + val, 0)}</td>
              <td><button onClick={() => handleShowData(user.userId)}>Show Emission</button></td> {/* Button to show data */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={scopes.length + 1}><strong>Total</strong></td>
            <td>
              <strong>
                {Object.values(aggregatedData).reduce((total, userData) => {
                  return total + Object.values(userData).reduce((acc, val) => acc + val, 0);
                }, 0)}
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>

      <div>
        <h2>Emission Data ({selectedUserEmissionData[0].userId})</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Selected Name</th>
              <th>Selected Category</th>
              <th>Selected Country</th>
              <th>Selected Type</th>
              <th>Selected Brand</th>
              <th>Distance</th>
              <th>Description</th>
              <th>Group</th>
              <th>SKU</th>
              <th>Unit</th>
              <th>Image</th>
              <th>Date</th>
              <th>Date1</th>
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
                <td><img style={{ width: '100px' }} src={`http://62.72.59.146:8080/${item.emission}`} alt="Image" /></td>
                <td>{item.date}</td>
                <td>{item.date1}</td>
                <td>{item.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
