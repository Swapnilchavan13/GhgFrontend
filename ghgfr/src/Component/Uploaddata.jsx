import React, { useState } from 'react';
import '../styles/upload.css'

const Uploaddata = () => {
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
      const response = await fetch('http://localhost:8080/addData', {
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
    <div className='mdiv'>
      <h1>Upload The Data</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((fieldName) => (
          <div style={{ display: fieldName === "dynamicFields" ? 'none' : 'block' }} key={fieldName}>
            {fieldName === 'Group' ? (
              <div>
                <label htmlFor={fieldName}>{fieldName}:</label>
                <select
                  id={fieldName}
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                >
                  <option value="">Select {fieldName}</option>
                  <option value="Group 1">Group 1</option>
                  <option value="Group 2">Group 2</option>
                  <option value="Group 3">Group 3</option>
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
  );
};

export default Uploaddata;
