import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clientnavbar } from './Clientnavbar';
import "../styles/myemission.css";

export const Myemission = () => {
  const [data, setData] = useState([]);
  const [sdata, setSdata] = useState([])
  const [rows, setRows] = useState(createInitialRows());
  const [result, setResult] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedDates, setSelectedDates] = useState(createInitialDates());
  const [sortOrder, setSortOrder] = useState('asc');
  const [countryFilter, setCountryFilter] = useState('');
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const [scopeFilter, setScopeFilter] = useState('');
  const [uniqueScopes, setUniqueScopes] = useState([]);

  const [consumptionSortOrder, setConsumptionSortOrder] = useState('asc');
  const [isConsumptionSorted, setIsConsumptionSorted] = useState(false);

  const navigate = useNavigate();

  function createInitialDates() {
    return [];
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId') || '';

      const response = await fetch('http://62.72.59.146:8080/getdata');
      const jsonData = await response.json();
      setData(jsonData);
      // Fetch saved data from the backend
      const savedDataResponse = await fetch(`http://62.72.59.146:8080/getdata12?userId=${userId}`);
      const savedData = await savedDataResponse.json();
      setSdata(savedData)
      setRows(savedData.rows || createInitialRows());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function createEmptyRow() {
    const userId = localStorage.getItem('userId') || '';

    return {
      userId: userId,
      selectedName: '',
      selectedCategory: '',
      selectedCountry: '',
      selectedType: '',
      selectedBrand: '',
      distance: '',
      date: '',
      result: null,
      description: '',
      group: '',
      sku: '',
      unit: '',
      consumption: '',
      emission: '',
    };
  }

  function createInitialRows() {
    return [{ ...createEmptyRow() }];
  }

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === 'date') {
      const updatedDates = [...selectedDates];
      updatedDates[index] = value;
      setSelectedDates(updatedDates);
    }

    setRows(updatedRows);
    // Update additional fields

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

  const saveDataToBackend = async () => {
    try {
      const userId = localStorage.getItem('userId') || '';

      const response = await fetch('http://62.72.59.146:8080/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userId, // Include the Authorization header with the user ID
        },
        body: JSON.stringify({
          rows
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert('Data saved successfully');
        // Update sdata state with the saved data
        setSdata(responseData.savedData.rows || createInitialRows());
        // Update additional fields if needed
        window.location.reload(false);
      } else {
        console.error('Error saving data:', responseData.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };



  const calculateTotalFootprints = () => {
    const totalFootprints = rows.reduce((total, row) => {
      if (row.result !== null) {
        total += row.result;
      }
      return total;
    }, 0);

    setResult(totalFootprints);
  };

  const sortData = () => {
    const sortedRows = [...rows].sort((a, b) => {
      if (isSorted) {
        return (a.result || 0) - (b.result || 0);
      } else {
        return (b.result || 0) - (a.result || 0);
      }
    });
    setRows(sortedRows);
    setIsSorted(!isSorted);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!storedIsLoggedIn);
  }, []);

  useEffect(() => {
    // Save data to local storage after each update
    saveDataToLocalStorage();
  }, [rows]);

  const saveDataToLocalStorage = () => {
    localStorage.setItem('demoSelectData', JSON.stringify(rows));
  };


  // Redirect to the login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/client/login');
    }
  }, [isLoggedIn, navigate]);


  const handleSort = (columnName) => {
    const sortedData = [...sdata].sort((a, b) => {
      const valueA = a[columnName].toLowerCase();
      const valueB = b[columnName].toLowerCase();

      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setSdata(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    // Extract unique countries from sdata when sdata changes
    const countries = [...new Set(sdata.map((row) => row.selectedCountry))];
    setUniqueCountries(countries);

    // Extract unique categories from sdata when sdata changes
    const categories = [...new Set(sdata.map((row) => row.selectedCategory))];
    setUniqueCategories(categories);


    // Extract unique scopes from sdata when sdata changes
    const scopes = [...new Set(sdata.map((row) => row.group))];
    setUniqueScopes(scopes);

    // Calculate total consumption and total result for the selected country
    const filteredData = sdata.filter((row) =>
      (!countryFilter || row.selectedCountry === countryFilter) &&
      (!categoryFilter || row.selectedCategory === categoryFilter) &&
      (!scopeFilter || row.group === scopeFilter)

    );

    const totalC = filteredData.reduce((acc, row) => acc + parseFloat(row.consumption) || 0, 0);
    setTotalConsumption(totalC);

    const totalR = filteredData.reduce((acc, row) => acc + parseFloat(row.result) || 0, 0);
    setTotalResult(totalR);
  }, [sdata, countryFilter, categoryFilter, scopeFilter]);



  const handleCountryFilter = (selectedCountry) => {
    setCountryFilter(selectedCountry);
    // Apply additional filtering logic if needed
  };


  const handleCategoryFilter = (selectedCategory) => {
    setCategoryFilter(selectedCategory);
    // Apply additional filtering logic if needed
  };

  const handleScopeFilter = (selectedScope) => {
    setScopeFilter(selectedScope);
    // Apply additional filtering logic if needed
  };

  const handleConsumptionSort = () => {
    const sortedData = [...sdata].sort((a, b) => {
      const valueA = parseFloat(a.consumption) || 0;
      const valueB = parseFloat(b.consumption) || 0;

      if (isConsumptionSorted) {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });

    setSdata(sortedData);
    setConsumptionSortOrder(isConsumptionSorted ? 'asc' : 'desc');
    setIsConsumptionSorted(!isConsumptionSorted);
  };


  return (
    <>
      <Clientnavbar />
      <div>
        <h1>My Emission</h1>
        <button style={{ backgroundColor: 'black' }} onClick={sortData}>
          {isSorted ? 'Result Sort (Low to High)' : 'Result Sort (High to Low)'}
        </button>
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
              <th>SKU</th>
              <th>Unit</th>
              <th>Scope</th>
              <th>Consumption Per Kg</th>
              <th>Date</th>
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

              const descriptionOptions = Array.from(
                new Set(
                  data
                    .filter(
                      (item) =>
                        (row.selectedBrand === '' || item.Brand === row.selectedBrand) &&
                        (row.selectedType === '' || item.Type === row.selectedType) &&
                        (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                        (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                        (row.selectedName === '' || item.Name === row.selectedName)
                    )
                    .map((item) => item.Description)
                )
              );
              const skuOptions = Array.from(
                new Set(
                  data
                    .filter(
                      (item) =>
                        (row.selectedBrand === '' || item.Brand === row.selectedBrand) &&
                        (row.selectedType === '' || item.Type === row.selectedType) &&
                        (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                        (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                        (row.selectedName === '' || item.Name === row.selectedName)
                    )
                    .map((item) => item.SKU)
                )
              );
              const unitOptions = Array.from(
                new Set(
                  data
                    .filter(
                      (item) =>
                        (row.selectedBrand === '' || item.Brand === row.selectedBrand) &&
                        (row.selectedType === '' || item.Type === row.selectedType) &&
                        (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                        (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                        (row.selectedName === '' || item.Name === row.selectedName)
                    )
                    .map((item) => item.Unit)
                )
              );
              const groupOptions = Array.from(
                new Set(
                  data
                    .filter(
                      (item) =>
                        (row.selectedBrand === '' || item.Brand === row.selectedBrand) &&
                        (row.selectedType === '' || item.Type === row.selectedType) &&
                        (row.selectedCountry === '' || item.Country === row.selectedCountry) &&
                        (row.selectedCategory === '' || item.Category === row.selectedCategory) &&
                        (row.selectedName === '' || item.Name === row.selectedName)
                    )
                    .map((item) => item.Group)
                )
              );

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={row.selectedName}
                      onChange={(e) => handleRowChange(index, 'selectedName', e.target.value)}
                      placeholder="Search Name"
                    />
                    {row.selectedName.length > 0 && (
                      <div className="search-results">
                        {nameOptions
                          .filter((name) => name.toLowerCase().includes(row.selectedName.toLowerCase()))
                          .map((filteredName) => (
                            <div
                              key={filteredName}
                              onClick={() => handleRowChange(index, 'selectedName', filteredName)}
                              className="search-result-item"
                            >
                              {filteredName}
                            </div>
                          ))}
                      </div>
                    )}
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
                  <td>
                    {/* Add the dropdown for description */}
                    <select
                      onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                      value={row.description}
                    >
                      <option value="">Select Description</option>
                      {descriptionOptions.map((description) => (
                        <option key={description} value={description}>
                          {description}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {/* Add the dropdown for SKU */}
                    <select
                      onChange={(e) => handleRowChange(index, 'sku', e.target.value)}
                      value={row.sku}
                    >
                      <option value="">Select SKU</option>
                      {skuOptions.map((sku) => (
                        <option key={sku} value={sku}>
                          {sku}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {/* Add the dropdown for unit */}
                    <select
                      onChange={(e) => handleRowChange(index, 'unit', e.target.value)}
                      value={row.unit}
                    >
                      <option value="">Select Unit</option>
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {/* Add the dropdown for group */}
                    <select
                      onChange={(e) => handleRowChange(index, 'group', e.target.value)}
                      value={row.group}
                    >
                      <option value="">Select Group</option>
                      {groupOptions.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.distance}
                      onChange={(e) => handleRowChange(index, 'distance', e.target.value)}
                      placeholder="Enter Consumption"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => handleRowChange(index, 'date', e.target.value)}
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
              <td style={{ fontWeight: 'bolder' }} colSpan="12">
                Total Footprints
              </td>
              <td style={{ fontWeight: 'bolder' }}>{result !== null ? result : 'N/A'}</td>
              <td>
                <button onClick={calculateTotalFootprints}>CALCULATE FOOTPRINTS</button>
                <button onClick={saveDataToBackend}>Save</button>
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
          <h2>Added Emission Table</h2>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th onClick={() => handleSort('selectedName')}>Name</th>
                <th>
                  <select
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </th>

                <th>
                  <select
                    id="countryFilter"
                    value={countryFilter}
                    onChange={(e) => handleCountryFilter(e.target.value)}
                  >
                    <option value="">All Countries</option>
                    {uniqueCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </th>
                <th>Type</th>
                <th>Brand</th>
                <th>Description</th>
                <th>
                  <select
                    id="scopeFilter"
                    value={scopeFilter}
                    onChange={(e) => handleScopeFilter(e.target.value)}
                  >
                    <option value="">All Scopes</option>
                    {uniqueScopes.map((scope) => (
                      <option key={scope} value={scope}>
                        {scope}
                      </option>
                    ))}
                  </select>
                </th>
                <th>SKU</th>
                <th>Unit</th>
                <th onClick={handleConsumptionSort}>
                  Consumption Per Kg
                  {isConsumptionSorted ? ' (High)' : ' (Low)'}
                </th>

                <th>Date</th>
                <th>RESULT</th>
              </tr>
            </thead>
            <tbody>
              {sdata
                .filter((row) =>
                  (!countryFilter || row.selectedCountry === countryFilter) &&
                  (!categoryFilter || row.selectedCategory === categoryFilter) &&
                  (!scopeFilter || row.group === scopeFilter)
                ).map((row, index) => (

                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.selectedName}</td>
                    <td>{row.selectedCategory}</td>
                    <td>{row.selectedCountry}</td>
                    <td>{row.selectedType}</td>
                    <td>{row.selectedBrand}</td>
                    <td>{row.description}</td>
                    <td>{row.group}</td>
                    <td>{row.sku}</td>
                    <td>{row.unit}</td>
                    <td>{row.consumption}</td>
                    <td>{row.date}</td>
                    <td>{row.result !== null ? row.result : 'N/A'}</td>
                  </tr>
                ))}
              <tr>
                <td style={{ fontWeight: 'bolder' }} colSpan="10">Total</td>
                <td style={{ fontWeight: 'bolder' }}>{totalConsumption}</td>
                <td style={{ fontWeight: 'bolder' }}></td>
                <td style={{ fontWeight: 'bolder' }}>{totalResult}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
