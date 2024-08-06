import React, { useEffect, useState } from 'react';
import '../styles/upload.css';
import { Adminnavbar } from './Adminnavbar';
import { useNavigate } from 'react-router-dom';

const Addemission = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    Description: '',
    Group: '',
    mainCategory: '', // Added mainCategory field
    Country: '',
    Brand: '',
    SKU: '',
    Type: '',
    Unit: '',
    Emission: '',
    dynamicFields: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    const adminloginstate = localStorage.getItem('adminloginstate');
    if (adminloginstate !== 'true') {
      navigate('/');
    }
  }, [navigate]);

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
      const response = await fetch('https://backend.climescore.com/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data successfully uploaded!');
      } else {
        alert('Failed to upload data.');
      }
    } catch (error) {
      console.error('Error during data upload:', error);
    }
  };

  const renderMainCategoryOptions = () => {
    switch (formData.Group) {
      case 'Scope 1':
        return (
          <>
            <option value="On site fuel consumption">On site fuel consumption</option>
            <option value="Off site fuel consumption">Off site fuel consumption</option>
          </>
        );
      case 'Scope 2':
        return (
          <>
            <option value="Purchased Grid Electricity">Purchased Grid Electricity</option>
            <option value="Purchased Renewable Energy">Purchased Renewable Energy</option>
          </>
        );
      case 'Scope 3':
        return (
          <>
            <option value="Purchase Goods and Services">Purchase Goods and Services</option>
            <option value="Capital Goods">Capital Goods</option>
            <option value="Fuel- and Energy-Related Activities">Fuel- and Energy-Related Activities</option>
            <option value="Upstream Transportation and Distribution">Upstream Transportation and Distribution</option>
            <option value="Waste Generated in Operations">Waste Generated in Operations</option>
            <option value="Business Travel">Business Travel</option>
            <option value="Employee Commuting">Employee Commuting</option>
            <option value="Upstream Leased Assets">Upstream Leased Assets</option>
            <option value="Downstream Transportation and Distribution">Downstream Transportation and Distribution</option>
            <option value="Processing of Sold Products">Processing of Sold Products</option>
            <option value="Use of Sold Products">Use of Sold Products</option>
            <option value="End-of-Life Treatment of Sold Products">End-of-Life Treatment of Sold Products</option>
            <option value="Downstream Leased Assets">Downstream Leased Assets</option>
            <option value="Franchises">Franchises</option>
            <option value="Investments">Investments</option>
            <option value="Food">Food</option>

          </>
        );
      default:
        return <option value="">Select Group first</option>;
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
              ) : fieldName === 'mainCategory' ? (
                <div>
                  <label htmlFor={fieldName}>Main Category:</label>
                  <select
                    id={fieldName}
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleChange}
                  >
                    <option value="">Select Main Category</option>
                    {renderMainCategoryOptions()}
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
