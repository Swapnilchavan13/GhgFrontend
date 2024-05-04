import React, { useState, useEffect } from 'react';
import '../styles/see.css';
import { Adminnavbar } from './Adminnavbar';

export const Allemissions = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Name: '',
    Description: '',
    Group: '',
    Emission: '',
    Unit: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://62.72.59.146:8080/getdata');
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
      await fetch(`https://62.72.59.146:8080/deleteData/${id}`, {
        method: 'DELETE',
      });

      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const selectedData = data.find((item) => item._id === id);
    setEditFormData({
      Name: selectedData.Name,
      Description: selectedData.Description,
      Group: selectedData.Group,
      Emission: selectedData.Emission,
      method: 'PUT',
      Unit: selectedData.Unit,
    });
  };

  const handleUpdate = async (id) => {
    try {
      console.log('Updating data for id:', id);
      console.log('Edit form data:', editFormData);
  
      const response = await fetch(`https://62.72.59.146:8080/updateData/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      
      console.log('Response:', response);
  
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...editFormData } : item
          )
        );
        setEditingId(null);
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({
      Name: '',
      Description: '',
      Group: '',
      Emission: '',
      Unit: '',
    });
  };

  const handleSaveChanges = () => {
    handleUpdate(editingId);
  };

  return (
    <>
      <Adminnavbar />
      <div>
        <h2>All Emission Coefficients</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Group</th>
              <th>Emission</th>
              <th>Unit</th>
              <th>Dynamic Fields</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>{item.Group}</td>
                <td>{item.Emission}</td>
                <td>{item.Unit}</td>
                <td>
                  {item.dynamicFields ? (
                    Object.entries(item.dynamicFields).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}: </strong> {value}
                      </div>
                    ))
                  ) : null}
                </td>
                <td>
                  {editingId === item._id ? (
                    <>
                      <button onClick={() => handleUpdate(item._id)}>Update</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item._id)}>Edit</button>
                      <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingId && (
          <div className="edit-form">
            <h3>Edit Data</h3>
            <label>
              Name:
              <input
                type="text"
                value={editFormData.Name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Name: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={editFormData.Description}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Description: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Group:
              <input
                type="text"
                value={editFormData.Group}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Group: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Emission:
              <input
                type="text"
                value={editFormData.Emission}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Emission: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Unit:
              <input
                type="text"
                value={editFormData.Unit}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Unit: e.target.value })
                }
              />
            </label>
            <br />
            <button onClick={handleSaveChanges}>Save</button>
          </div>
        )}
      </div>
    </>
  );
};
