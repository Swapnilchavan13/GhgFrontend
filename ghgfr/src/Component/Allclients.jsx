import React, { useState, useEffect } from 'react';
import { Adminnavbar } from './Adminnavbar';

export const Allclients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch all clients from the backend when the component mounts
    const fetchClients = async () => {
      try {
        const response = await fetch('http://62.72.59.146:8080/getclients');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClients();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
      <Adminnavbar />
      <div>
        <h2>All Clients</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>User ID</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.username}</td>
                <td>{client.userId}</td>
                <td>{client.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
