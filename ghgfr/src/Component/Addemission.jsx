import React, { useState } from 'react';
import '../styles/upload.css'
import { Adminnavbar } from './Adminnavbar';

const Addemission = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    Description: '',
    Group: '',
    Country: '',
    Brand: '',
    SKU: '',
    Type: '',
    Unit: '',
    Emission: '',
    dynamicFields: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDynamicFieldChange = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      dynamicFields: {
        ...formData.dynamicFields,
        [fieldName]: fieldValue,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://62.72.59.146:8080/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data successfully uploaded!');
        console.log('Data successfully uploaded!');
      } else {
        alert('Failed to upload data.');
        console.error('Failed to upload data.');
      }
    } catch (error) {
      console.error('Error during data upload:', error);
    }
  };

  return (
    <>
      <Adminnavbar />
    <div className='mdiv'>
      <h1>Add Emissions Data</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((fieldName) => (
          <div style={{ display: fieldName === "dynamicFields" ? 'none' : 'block' }} key={fieldName}>
            {fieldName === 'Group' ? (
              <div>
                <label htmlFor={fieldName}>Scope:</label>
                <select
                  id={fieldName}
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                >
                  <option value="">Select Scope</option>
                  <option value="Scope 1">Scope 1</option>
                  <option value="Scope 2">Scope 2</option>
                  <option value="Scope 3">Scope 3</option>
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor={fieldName}>{fieldName}:</label>
                <input
                  type="text"
                  id={fieldName}
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const dynamicFieldName = prompt('Enter field name:');
            if (dynamicFieldName) {
              const dynamicFieldValue = prompt('Enter field value:');
              if (dynamicFieldValue) {
                handleDynamicFieldChange(dynamicFieldName, dynamicFieldValue);
              }
            }
          }}
        >
          Add Field
        </button>

        {Object.entries(formData.dynamicFields).map(([fieldName, fieldValue]) => (
          <div key={fieldName}>
            <label htmlFor={fieldName}>{fieldName}:</label>
            <input
              type="text"
              id={fieldName}
              name={fieldName}
              value={fieldValue}
              onChange={(e) => handleDynamicFieldChange(fieldName, e.target.value)}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Addemission;
