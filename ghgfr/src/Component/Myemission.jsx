import React, { useState, useEffect } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Myemission = () => {
  const [users, setUsers] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [scopes, setScopes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const myclientId = localStorage.getItem('userId')
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!storedIsLoggedIn);
  }, []);

    // Redirect to the login page if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/client/login');
        }
      }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Fetch users from the matching client
    fetch(`http://localhost:8080/getusers?clientId=${myclientId}`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  console.log(users)

  useEffect(() => {
    const fetchData = async () => {
      const aggregatedDataObj = {};

      // Fetch emission data for each user
      for (const user of users) {
        try {
          const response = await fetch(`http://localhost:8080/getdata12?userId=${user.userId}`);
          const data = await response.json();

          // Initialize scope values for the user
          aggregatedDataObj[user.userId] = {};

          for (const item of data) {
            if (!aggregatedDataObj[user.userId].hasOwnProperty(item.group)) {
              aggregatedDataObj[user.userId][item.group] = parseFloat(item.result); // Convert result to number
            } else {
              aggregatedDataObj[user.userId][item.group] += parseFloat(item.result); // Convert result to number
            }
          }
        } catch (error) {
          console.error('Error fetching emission data:', error);
        }
      }

      // Update the state with aggregated data
      setAggregatedData(aggregatedDataObj);

      // Update the scopes state
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

  return (
    <div>
      <Clientnavbar />

      <h2>Aggregated Data by Scope</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            {scopes.map(scope => (
              <th key={scope}>{scope}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              {scopes.map(scope => (
                <td key={`${user.userId}-${scope}`}>{aggregatedData[user.userId]?.[scope] || 0}</td>
              ))}
              <td>
                {Object.values(aggregatedData[user.userId] || {}).reduce((acc, val) => acc + val, 0)}
              </td>
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

      <p>Total Users: {users.length}</p>
    </div>
  );
};
