import React, { useState } from "react";

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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit single buyer form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3005/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert("Buyer added successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Error saving buyer");
    }
  };

  // Handle CSV upload without papaparse
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((row) => row.split(","));

      // Get headers
      const headers = rows[0].map((h) => h.trim());

      // Map rows into objects
      const data = rows.slice(1).map((row) => {
        let obj = {};
        row.forEach((value, index) => {
          if (headers[index]) {
            obj[headers[index]] = value.trim();
          }
        });
        return obj;
      });

      setCsvData(data.filter((d) => Object.keys(d).length > 0));
    };
    reader.readAsText(file);
  };

  // Upload CSV parsed data to backend
  const handleCSVSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/buyers/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(csvData),
      });
      const result = await res.json();
      alert("CSV data uploaded successfully!");
      console.log(result);
    } catch (err) {
      console.error(err);
      alert("Error uploading CSV data");
    }
  };

  return (
    <div className="cms-container">
      <h2>Buyers Data CMS</h2>

      {/* Single buyer form */}
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
        <input name="companySize" placeholder="Company Size (Revenue/Employees/Market Cap)" value={formData.companySize} onChange={handleChange} />
        <input name="contactPerson" placeholder="Contact Person Name" value={formData.contactPerson} onChange={handleChange} />
        <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input name="linkedinOrWebsite" placeholder="LinkedIn / Website" value={formData.linkedinOrWebsite} onChange={handleChange} />
        <input name="officeAddress" placeholder="Office Address" value={formData.officeAddress} onChange={handleChange} />
        <input name="volumePurchased" type="number" placeholder="Volume Purchased (tCO₂e)" value={formData.volumePurchased} onChange={handleChange} />
        <input name="purchasedFrom" placeholder="Purchased From" value={formData.purchasedFrom} onChange={handleChange} />
        <input name="projectLinks" placeholder="Project Links (comma separated)" value={formData.projectLinks} onChange={handleChange} />
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="">Select Frequency</option>
          <option>One-time</option>
          <option>Annual</option>
          <option>Ongoing</option>
        </select>
        <input name="priceRange" placeholder="Price Range ($/tCO₂e)" value={formData.priceRange} onChange={handleChange} />
        <input name="standardPreferred" placeholder="Standard Preferred (Verra, Gold Standard...)" value={formData.standardPreferred} onChange={handleChange} />
        <input name="projectTypePreference" placeholder="Project Type Preference" value={formData.projectTypePreference} onChange={handleChange} />
        <input name="geographyPreference" placeholder="Geography Preference" value={formData.geographyPreference} onChange={handleChange} />
        <input name="coBenefitInterests" placeholder="Co-benefit Interests (SDGs, Biodiversity...)" value={formData.coBenefitInterests} onChange={handleChange} />
        <input name="purposeOfPurchase" placeholder="Purpose of Purchase (Net Zero, CSR...)" value={formData.purposeOfPurchase} onChange={handleChange} />
        <select name="buyerStatus" value={formData.buyerStatus} onChange={handleChange}>
          <option value="">Select Buyer Status</option>
          <option>Active</option>
          <option>Potential</option>
          <option>Former</option>
        </select>
        <input name="sourceOfInfo" placeholder="Source of Info (Registry, Report...)" value={formData.sourceOfInfo} onChange={handleChange} />
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

      <style>{`
        .cms-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }
        .cms-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .cms-form input, .cms-form select, .cms-form textarea {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .cms-form textarea {
          grid-column: span 2;
          resize: vertical;
        }
        .cms-form button, .csv-upload button {
          grid-column: span 2;
          padding: 12px;
          background: #1e88e5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .csv-upload {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};
