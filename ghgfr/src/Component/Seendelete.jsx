import React, { useState, useEffect } from 'react';
import '../styles/see.css'

export const Seendelete = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://62.72.59.146:8080/getdata');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make API call to delete the item with the given id
      await fetch(`http://62.72.59.146:8080/deleteData/${id}`, {
        method: 'DELETE',
      });

      // Update the data state after successful deletion
      setData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h2>All Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Country</th>
            <th>Action</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.Name}</td>
              <td>{item.Description}</td>
              <td>{item.Category}</td>
              <td>{item.Brand}</td>
              <td>{item.Country}</td>

              <td>
                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
