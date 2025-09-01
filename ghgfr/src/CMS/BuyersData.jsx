import React, { useState, useEffect } from "react";

export const BuyersData = () => {
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerType: "",
    industry: "",
    country: "",
    companySize: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    linkedinOrWebsite: "",
    officeAddress: "",
    volumePurchased: "",
    purchasedFrom: "",
    projectLinks: "",
    frequency: "",
    priceRange: "",
    standardPreferred: "",
    projectTypePreference: "",
    geographyPreference: "",
    coBenefitInterests: "",
    purposeOfPurchase: "",
    buyerStatus: "",
    sourceOfInfo: "",
    registryRetirementReference: "",
    notes: "",
  });

  const [csvData, setCsvData] = useState([]);
  const [buyers, setBuyers] = useState([]); // <-- store buyers data

  // Fetch all buyers on load
  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const res = await fetch("http://62.72.59.146:8080/getbuyers");
      const data = await res.json();
      setBuyers(data.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching buyers");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit single buyer form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://62.72.59.146:8080/addbuyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(`Added: ${data.inserted} | Skipped (duplicate): ${data.skipped}`);
      fetchBuyers(); // refresh table
    } catch (error) {
      console.error(error);
      alert("Error saving buyer");
    }
  };

  // Handle CSV upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((row) => row.split(","));
      const headers = rows[0].map((h) => h.trim());

      const data = rows.slice(1).map((row) => {
        let obj = {};
        row.forEach((value, index) => {
          if (headers[index]) obj[headers[index]] = value.trim();
        });
        return obj;
      });

      setCsvData(data.filter((d) => Object.keys(d).length > 0));
    };
    reader.readAsText(file);
  };

  // Upload CSV parsed data
  const handleCSVSubmit = async () => {
    try {
      const res = await fetch("http://62.72.59.146:8080/addbuyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(csvData),
      });
      const result = await res.json();
      alert(`Added: ${result.inserted} | Skipped (duplicate): ${result.skipped}`);
      fetchBuyers(); // refresh table
    } catch (err) {
      console.error(err);
      alert("Error uploading CSV data");
    }
  };

  return (
    <div className="cms-container">
      <h2>Buyers Data CMS</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="cms-form">
        <input name="buyerName" placeholder="Buyer Name" value={formData.buyerName} onChange={handleChange} required />
        <select name="buyerType" value={formData.buyerType} onChange={handleChange} required>
          <option value="">Select Buyer Type</option>
          <option>Corporate</option>
          <option>NGO</option>
          <option>Govt</option>
          <option>Individual</option>
        </select>
        <input name="industry" placeholder="Industry / Sector" value={formData.industry} onChange={handleChange} />
        <input name="country" placeholder="Country / Region" value={formData.country} onChange={handleChange} />
        <input name="companySize" placeholder="Company Size" value={formData.companySize} onChange={handleChange} />
        <input name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} />
        <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input name="linkedinOrWebsite" placeholder="LinkedIn / Website" value={formData.linkedinOrWebsite} onChange={handleChange} />
        <input name="officeAddress" placeholder="Office Address" value={formData.officeAddress} onChange={handleChange} />
        <input name="volumePurchased" type="number" placeholder="Volume Purchased" value={formData.volumePurchased} onChange={handleChange} />
        <input name="purchasedFrom" placeholder="Purchased From" value={formData.purchasedFrom} onChange={handleChange} />
        <input name="projectLinks" placeholder="Project Links" value={formData.projectLinks} onChange={handleChange} />
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="">Select Frequency</option>
          <option>One-time</option>
          <option>Annual</option>
          <option>Ongoing</option>
        </select>
        <input name="priceRange" placeholder="Price Range" value={formData.priceRange} onChange={handleChange} />
        <input name="standardPreferred" placeholder="Standard Preferred" value={formData.standardPreferred} onChange={handleChange} />
        <input name="projectTypePreference" placeholder="Project Type Preference" value={formData.projectTypePreference} onChange={handleChange} />
        <input name="geographyPreference" placeholder="Geography Preference" value={formData.geographyPreference} onChange={handleChange} />
        <input name="coBenefitInterests" placeholder="Co-benefit Interests" value={formData.coBenefitInterests} onChange={handleChange} />
        <input name="purposeOfPurchase" placeholder="Purpose of Purchase" value={formData.purposeOfPurchase} onChange={handleChange} />
        <select name="buyerStatus" value={formData.buyerStatus} onChange={handleChange}>
          <option value="">Select Buyer Status</option>
          <option>Active</option>
          <option>Potential</option>
          <option>Former</option>
        </select>
        <input name="sourceOfInfo" placeholder="Source of Info" value={formData.sourceOfInfo} onChange={handleChange} />
        <input name="registryRetirementReference" placeholder="Registry Retirement Reference" value={formData.registryRetirementReference} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />

        <button type="submit">Add Buyer</button>
      </form>

      {/* CSV Upload */}
      <div className="csv-upload">
        <h3>Bulk Upload Buyers (CSV)</h3>
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
        <button onClick={handleCSVSubmit} disabled={csvData.length === 0}>
          Upload CSV
        </button>
      </div>

      {/* Buyers Table */}
      <div className="buyers-table">
        <h3>All Buyers</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Industry</th>
              <th>Country</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b, i) => (
              <tr key={i}>
                <td>{b.buyerName}</td>
                <td>{b.buyerType}</td>
                <td>{b.industry}</td>
                <td>{b.country}</td>
                <td>{b.contactPerson}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.buyerStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
