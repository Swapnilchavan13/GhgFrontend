// ShowData.jsx
import React, { useState, useEffect } from 'react';

const ShowData = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/getdata');
      if (response.ok) {
        const data = await response.json();
        setAllData(data);
      } else {
        console.error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error during data fetch:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteData/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Data successfully deleted!');
        fetchData(); // Fetch updated data after deletion
      } else {
        alert('Failed to delete data.');
        console.error('Failed to delete data.');
      }
    } catch (error) {
      console.error('Error during delete request:', error);
    }
  };

  return (
    <>
      <h1>Show All Data</h1>
      <ul>
        {allData.map((data) => (
          <li key={data._id}>
            {Object.entries(data).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
            <button onClick={() => handleDelete(data._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShowData;
