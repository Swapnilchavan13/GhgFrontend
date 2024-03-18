import React, { useState, useEffect } from 'react';
import { Clientnavbar } from './Clientnavbar';
import { useNavigate } from 'react-router-dom';

export const Myusers = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const cid = localStorage.getItem('userId');

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
    fetch(`http://localhost:8080/getusers?clientId=${cid}`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, [cid]); // Include cid in the dependency array to refetch when it changes

  return (
    <div>
      <Clientnavbar />
      <h1>My Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
