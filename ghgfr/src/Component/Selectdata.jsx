import React, { useState, useEffect } from 'react';
import '../styles/select.css';

export const Selectdata = () => {
  const [data, setData] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [distance, setDistance] = useState('');
  const [totalEmission, setTotalEmission] = useState(null);

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

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setSelectedName(selectedName);
    setSelectedCountry(''); // Reset country when name changes
    setSelectedBrand(''); // Reset brand when name changes
    setSelectedType(''); // Reset type when name changes
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedBrand(''); // Reset brand when country changes
    setSelectedType(''); // Reset type when country changes
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const calculateTotalEmission = () => {
    const selectedItem = data.find(item => item.Name === selectedName && item.Country === selectedCountry);
    if (selectedItem && distance) {
      const distanceTravelled = parseFloat(distance);
      const total = distanceTravelled * selectedItem.Emission;
      setTotalEmission(total);
    }
  };

  const renderDynamicFields = () => {
    const selectedItem = data.find(item => item.Name === selectedName && item.Country === selectedCountry);
    if (selectedItem && selectedItem.DynamicFields) {
      return (
        <div>
          {Object.entries(selectedItem.DynamicFields).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderAllData = () => {
    const selectedItem = data.find(item => item.Name === selectedName && item.Country === selectedCountry && item.Brand === selectedBrand && item.Type === selectedType);
    if (selectedItem) {
      return (
        <div className='container'>
          <h3>All Data for Selected Information:</h3>
          <p>Name: {selectedItem.Name}</p>
          <p>Country: {selectedItem.Country}</p>
          <p>Brand: {selectedItem.Brand}</p>
          <p>Type: {selectedItem.Type}</p>
          <p>Description: {selectedItem.Description}</p>
          <p>Category: {selectedItem.Category}</p>
          <p>Group: {selectedItem.Group}</p>
          <p>SKU: {selectedItem.SKU}</p>
          <p>Unit: {selectedItem.Unit}</p>
          <p>Emission: {selectedItem.Emission}</p>

          {renderDynamicFields()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='container2'>
      <h2>Selected Data</h2>

      <table>
        <tbody>
          <tr>
            <td>
              <label>Select Name:</label>
              <select onChange={handleNameChange} value={selectedName}>
                <option value="">Select a name</option>
                {data.map(item => (
                  <option key={item._id} value={item.Name}>
                    {item.Name}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <label>Select Country:</label>
              <select onChange={handleCountryChange} value={selectedCountry}>
                <option value="">Select a country</option>
                {data
                  .filter(item => item.Name === selectedName)
                  .map(item => (
                    <option key={item._id} value={item.Country}>
                      {item.Country}
                    </option>
                  ))}
              </select>
            </td>

            <td>
              <label>Select Brand:</label>
              <select onChange={handleBrandChange} value={selectedBrand}>
                <option value="">Select a brand</option>
                {data
                  .filter(item => item.Name === selectedName && item.Country === selectedCountry)
                  .map(item => (
                    <option key={item._id} value={item.Brand}>
                      {item.Brand}
                    </option>
                  ))}
              </select>
            </td>

            <td>
              <label>Select Type:</label>
              <select onChange={handleTypeChange} value={selectedType}>
                <option value="">Select a type</option>
                {data
                  .filter(item => item.Name === selectedName && item.Country === selectedCountry && item.Brand === selectedBrand)
                  .map(item => (
                    <option key={item._id} value={item.Type}>
                      {item.Type}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      {selectedName && (
        <div>
          {renderDynamicFields()}
        </div>
      )}

      {renderAllData()}

      <div className="form-group">
        <label>Enter Distance Travelled (in kilometers):</label>
        <input type="number" value={distance} onChange={handleDistanceChange} />
      </div>

      {totalEmission !== null && (
        <div>
          <h3>Total Emission:</h3>
          <p>{totalEmission}</p>
        </div>
      )}
      <button onClick={calculateTotalEmission}>Calculate Total Emission</button>
    </div>
  );
};