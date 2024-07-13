import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/myemission.css";
import { Usernavbar } from './Usernavbar';

export const Useremission = () => {
  const [data, setData] = useState([]);
  const [sdata, setSdata] = useState([])
  const [rows, setRows] = useState(createInitialRows());
  const [result, setResult] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
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

  const [image, setImage] = useState(null);
  const [latestImagePath, setLatestImagePath] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Add state for tracking image upload
  const [selectedImagePreview, setSelectedImagePreview] = useState(null); // Add state for selected image preview

  const [showItem1, setShowItem1] = useState(true);
  const [bname, setBname] = useState("Next");

  const [isConsumptionSorted, setIsConsumptionSorted] = useState("");
  const [consumptionSortOrder, setConsumptionSortOrder] = useState(true);


  const useruserId = localStorage.getItem('useruserId') || '';

  const handleNextButtonClick = () => {
    setShowItem1(!showItem1);
    setBname(showItem1 ? "Previous" : "Next");
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Generate preview for selected image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleUpload = async (index) => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      // Upload image to backend
      const response = await axios.post('https://backend.climescore.com/upload', formData);

      // Update the latest image path state with the new image path
      setLatestImagePath(response.data.imagePath);

      // Update the emission field in the row with the new image path
      const updatedRows = [...rows];
      updatedRows[index].emission = response.data.imagePath;
      setRows(updatedRows);

      // Clear the selected image
      setImage(null);
      setIsImageUploaded(true); // Set the state to true when image is uploaded
      alert("Image Uploded")
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigate = useNavigate();

  function createInitialDates() {
    return [];
  }

  useEffect(() => {
    fetchData();
  }, []);

  const resetImageState = () => {
    setImage(null);
  };

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('useruserId') || '';

      const response = await fetch('https://backend.climescore.com/getdata');
      const jsonData = await response.json();
      setData(jsonData);
      // Fetch saved data from the backend
      const savedDataResponse = await fetch(`https://backend.climescore.com/getdata12?userId=${userId}`);
      const savedData = await savedDataResponse.json();
      setSdata(savedData)
      setRows(savedData.rows || createInitialRows());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // console.log(data);

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
      date1: '',
      result: null,
      description: '',
      group: '',
      sku: '',
      unit: '',
      consumption: '',
      emission: '',
      image: '',
    };
  }

  function createInitialRows() {
    return [{ ...createEmptyRow() }];
  }

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === 'date' || field === 'date1') {
      const updatedDates = [...selectedDates];
      updatedDates[index] = value;
      setSelectedDates(updatedDates);
    }
    // Update additional fields
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
    setShowItem1(!showItem1);
    setBname("Next")

    resetImageState(); // Reset the image state

  };

  const saveDataToBackend = async () => {
    try {
      const userId = localStorage.getItem('useruserId') || '';

      const response = await fetch('https://backend.climescore.com/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userId, // Include the Authorization header with the user ID
        },
        body: JSON.stringify({
          rows,
          latestImagePath
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert('Data saved successfully');
        // Update sdata state with the saved data
        setShowItem1(!showItem1);

        setSdata(responseData.savedData.rows || createInitialRows());
        // Update additional fields if needed
      } else {
        console.error('Error saving data:', responseData.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
    window.location.reload(false);
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
    const storedIsLoggedIn = localStorage.getItem('isUserLoggedIn');
    setIsUserLoggedIn(!!storedIsLoggedIn);
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
    if (!isUserLoggedIn) {
      navigate('/user/login');
    }
  }, [isUserLoggedIn, navigate]);


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

  const handleDeleteData = async (id) => {
    try {
      const response = await fetch(`https://backend.climescore.com/deleteEmissionData?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSdata(prevData => prevData.filter(item => item._id !== id));
      } else {
        console.error('Error deleting emission data:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting emission data:', error);
    }
  };

  const handleScopeFilter = (selectedScope) => {
    setScopeFilter(selectedScope);
    // Apply additional filtering logic if needed
  };

  const handleConsumptionSort = () => {
    const sortedData = [...sdata].sort((a, b) => {
      const valueA = parseFloat(a.result) || 0;
      const valueB = parseFloat(b.result) || 0;

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
      <Usernavbar />
      <div>
        <h1>My Emissions ({useruserId})</h1>
        <button className='btnblue' onClick={sortData}>
          {isSorted ? 'Result Sort (Low to High)' : 'Result Sort (High to Low)'}
        </button>
        <div class="carousel-container">
          <div class="carousel">
            {showItem1 ? (
              <div class="carousel-item1">
                <table>
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>Scope</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Country</th>
                      <th>Type</th>
                      <th>Brand</th>
                      <th>Description</th>
                      <th>SKU</th>
                      <th>Unit</th>
                      <th>Extra fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => {
                      const nameOptions = Array.from(new Set(data.map((item) => item.Name)));

                      var fields = Array.from(
                        new Set(
                          data
                            .filter((item) => row.selectedName === '' || item.Name === row.selectedName)
                            .map((item) => item.dynamicFields)
                        )
                      );

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
    type="text"
    value={row.selectedName}
    onChange={(e) => handleRowChange(index, 'selectedName', e.target.value)}
    placeholder="Search Name"
    disabled={row.group === ''}
  />
  {row.selectedName.length > 0 && (
    <div className="search-results" style={{ display: row.selectedName.length >= 2 ? 'none' : 'block' }}>
      {/* Filter names based on selected scope */}
      {nameOptions
        .filter((name) =>
          data.some(
            (item) =>
              item.Name === name &&
              item.Group === row.group // Filter names based on selected scope
          ) && name.toLowerCase().startsWith(row.selectedName.toLowerCase())
        )
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
                              disabled={row.selectedName === ''}
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
                              disabled={row.selectedName === ''}
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
                              disabled={row.selectedName === ''}
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
                              disabled={row.selectedName === ''}
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
                              disabled={row.selectedName === ''}
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
                              disabled={row.selectedName === ''}
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
                              disabled={row.selectedName === ''}
                            >
                              <option value="">Select Unit</option>
                              {unitOptions.map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
                            </select>
                          </td>

                          {row.selectedName !== '' && (
    <td>
        {fields.map((el, index) => (
            <div key={index}>
                {el ? (
                    Object.entries(el).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))
                ) : (
                    <p>N/A</p>
                )}
            </div>
        ))}
    </td>
)}

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div class="carousel-item2">
                <table>
                  <thead>
                    <tr>
                      <th>Consumption Per Kg</th>
                      <th>Date</th>
                      <th>Upload Image</th>
                      <th>RESULT</th>
                      <th>Calculate</th>
                      <th>Add Next</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="number"
                            value={row.distance}
                            onChange={(e) => handleRowChange(index, 'distance', e.target.value)}
                            placeholder="Enter Consumption"
                          />
                        </td>
                        <td>
                          From
                          <input
                            type="date"
                            value={row.date}
                            onChange={(e) => handleRowChange(index, 'date', e.target.value)}
                          />
                          To
                          <input
                            type="date"
                            value={row.date1}
                            onChange={(e) => handleRowChange(index, 'date1', e.target.value)}
                          />
                        </td>
                        <td>
                          <input type="file" accept="image/*" onChange={handleImageChange} />
                          {selectedImagePreview && (
                            <>
                              {/* <img src={selectedImagePreview} alt="Selected Image" style={{ width: '80px' }} /> */}
                              <input
                                type="text"
                                value={latestImagePath}
                                onChange={(e) => handleRowChange(index, 'emission', e.target.value)}
                                readOnly
                              />
                            </>
                          )}
                          <button onClick={() => handleUpload(index)}>
                            {isImageUploaded ? 'Upload Image' : 'Upload Image'}
                          </button>
                        </td>
                        <td>
                          {row.result !== null && typeof row.result === 'number'
                            ? row.result.toFixed(2)
                            : 'N/A'}
                        </td>


                        <td>
                          <button onClick={() => calculateResult(index)}>Calculate</button>
                        </td>
                        <td>
                          <button onClick={addNextRow}>Add Next</button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td style={{ fontWeight: 'bolder' }} colSpan="3">
                        Total Footprints
                      </td>
                      <td style={{ fontWeight: 'bolder' }}>{result !== null ? result : 'N/A'}</td>
                      <td>
                        <button className='btnblue' onClick={calculateTotalFootprints}>CALCULATE FOOTPRINTS</button>
                        <button className='btnblue' style={{ marginTop: '5px' }} onClick={saveDataToBackend}>Save</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
          <button onClick={handleNextButtonClick}>{bname}</button>

        </div>

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
                <th>From Date</th>
                <th>To Date</th>
                <th>Image</th>
                <th onClick={handleConsumptionSort}>
                  RESULT
                  {isConsumptionSorted ? ' (High)' : ' (Low)'}
                </th>
                <th>Delete</th>
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
                    {/* <td>{row.consumption}</td> */}
                    <td>{row.date}</td>
                    <td>{row.date1}</td>
                    <td>
                      <a href={`https://backend.climescore.com/${row.emission}`} target="_blank" rel="noopener noreferrer">
                        <img style={{ width: '80px' }} src={`https://backend.climescore.com/${row.emission}`} alt="Latest Uploaded" />
                      </a>
                    </td>
                    <td>{row.result !== null ? parseFloat(row.result).toFixed(2) : 'N/A'}</td>
                    <td>
                  <button onClick={() => handleDeleteData(row._id)}>Delete</button> {/* Delete button */}
                </td>
                  </tr>
                ))}
              <tr>
                <td style={{ fontWeight: 'bolder' }} colSpan="9">Total</td>
                <td style={{ fontWeight: 'bolder' }}></td>
                <td style={{ fontWeight: 'bolder' }}></td>
                <td style={{ fontWeight: 'bolder' }}></td>
                <td style={{ fontWeight: 'bolder' }}></td>
                <td style={{ fontWeight: 'bolder' }}>{totalResult.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};