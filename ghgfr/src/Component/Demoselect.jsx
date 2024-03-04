import React, { useState, useEffect } from 'react';

export const Demoselect = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState(createInitialRows());
  const [result, setResult] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(getDataFromLocalStorage());

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    saveDataToLocalStorage();
  }, [rows]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://62.72.59.146:8080/getdata');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function createEmptyRow() {
    const storedData = getDataFromLocalStorage();
    return storedData.length > 0 ? storedData[0] : {
      selectedName: '',
      selectedCategory: '',
      selectedCountry: '',
      selectedType: '',
      selectedBrand: '',
      distance: '',
      result: null,
    };
  }

  function createInitialRows() {
    const storedData = getDataFromLocalStorage();
    return storedData.length > 0 ? storedData : [{ ...createEmptyRow() }];
  }

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const calculateResult = (index) => {
    const selectedRow = rows[index];
    const filteredData = data.filter(
      (item) =>
        (selectedRow.selectedBrand === '' || item.Brand === selectedRow.selectedBrand) &&
        (selectedRow.selectedType === '' || item.Type === selectedRow.selectedType) &&
        (selectedRow.selectedCountry === '' || item.Country === selectedRow.selectedCountry) &&
        (selectedRow.selectedCategory === '' || item.Category === selectedRow.selectedCategory) &&
        (selectedRow.selectedName === '' || item.Name === selectedRow.selectedName)
    );

    if (selectedRow && selectedRow.distance !== '' && filteredData.length > 0) {
      const distanceValue = parseFloat(selectedRow.distance);
      const emissionValue = parseFloat(filteredData[0].Emission);
      const calculatedResult = distanceValue * emissionValue;

      const updatedRows = [...rows];
      updatedRows[index].result = calculatedResult;
      setRows(updatedRows);
    }
  };

  const addNextRow = () => {
    setRows([...rows, { ...createEmptyRow() }]);
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem('demoSelectData', JSON.stringify(rows));
  };

  function getDataFromLocalStorage() {
    const storedData = localStorage.getItem('demoSelectData');
    return storedData ? JSON.parse(storedData) : [];
  }

  const calculateTotalFootprints = () => {
    const totalFootprints = rows.reduce((total, row) => {
      if (row.result !== null) {
        total += row.result;
      }
      return total;
    }, 0);

    setResult(totalFootprints);
  };


  return (
    <div>
      <h1>Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Country</th>
            <th>Type</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Scope</th>
            <th>SKU</th>
            <th>Unit</th>
            <th>Distance</th>
            <th>RESULT</th>
            <th>Calculate</th>
            <th>Add Next</th>
          </tr>
        </thead>
        <tbody>
        {rows.map((row, index) => {
            const filteredData = data.filter(
              (item) =>
                (row.selectedBrand === '' || item.Brand === row.selectedBrand) &&
                (row.selectedType === '' || item.Type === row.selectedType) &&
                (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                (row.selectedName === '' || item.Name === row.selectedName)
            );

            const nameOptions = Array.from(new Set(data.map((item) => item.Name)));
            const categoryOptions = Array.from(
              new Set(
                data
                  .filter((item) => row.selectedName === '' || item.Name === row.selectedName)
                  .map((item) => item.Category)
              )
            );
            const countryOptions = Array.from(
              new Set(
                data
                  .filter(
                    (item) =>
                      (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                      (row.selectedName === '' || item.Name === row.selectedName)
                  )
                  .map((item) => item.Country)
              )
            );
            const typeOptions = Array.from(
              new Set(
                data
                  .filter(
                    (item) =>
                      (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                      (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                      (row.selectedName === '' || item.Name === row.selectedName)
                  )
                  .map((item) => item.Type)
              )
            );
            const brandOptions = Array.from(
              new Set(
                data
                  .filter(
                    (item) =>
                      (row.selectedType === '' || item.Type === row.selectedType) &&
                      (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                      (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                      (row.selectedName === '' || item.Name === row.selectedName)
                  )
                  .map((item) => item.Brand)
              )
            );

            return (
            
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    onChange={(e) => handleRowChange(index, 'selectedName', e.target.value)}
                    value={row.selectedName}
                  >
                    <option value="">Select Name</option>
                    {nameOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleRowChange(index, 'selectedCategory', e.target.value)}
                    value={row.selectedCategory}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleRowChange(index, 'selectedCountry', e.target.value)}
                    value={row.selectedCountry}
                  >
                    <option value="">Select Country</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleRowChange(index, 'selectedType', e.target.value)}
                    value={row.selectedType}
                  >
                    <option value="">Select Type</option>
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleRowChange(index, 'selectedBrand', e.target.value)}
                    value={row.selectedBrand}
                  >
                    <option value="">Select Brand</option>
                    {brandOptions.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{filteredData.length > 0 ? filteredData[0].Description : ''}</td>
                <td>{filteredData.length > 0 ? filteredData[0].Group : ''}</td>
                <td>{filteredData.length > 0 ? filteredData[0].SKU : ''}</td>
                <td>{filteredData.length > 0 ? filteredData[0].Unit : ''}</td>
                <td>
                  <input
                    type="number"
                    value={row.distance}
                    onChange={(e) => handleRowChange(index, 'distance', e.target.value)}
                    placeholder="Enter Distance"
                  />
                </td>
                <td>{row.result !== null ? row.result : 'N/A'}</td>
                <td>
                  <button onClick={() => calculateResult(index)}>Calculate</button>
                </td>
                <td>
                  <button onClick={addNextRow}>Add Next</button>
                </td>
               
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td style={{fontWeight:'bolder'}} colSpan="11">Total Footprints</td>
            <td style={{fontWeight:'bolder'}} >{result !== null ? result : 'N/A'}</td>
            <td>
              <button onClick={calculateTotalFootprints}>CALCULATE FOOTPRINTS</button>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>
      );
};
