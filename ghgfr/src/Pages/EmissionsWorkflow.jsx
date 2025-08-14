import React, { useState, useEffect } from "react";
import "../styles/EmissionsWorkflow.css";

export default function EmissionsWorkflow() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [onboarding, setOnboarding] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [inputData, setInputData] = useState({});

  // Load all saved entries from localStorage
  const [allEntries, setAllEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("emissionsEntries") || "[]");
  });

  // Save all entries whenever they change
  useEffect(() => {
    localStorage.setItem("emissionsEntries", JSON.stringify(allEntries));
  }, [allEntries]);

  const businessCategories = [
    { key: "scope1", label: "Scope 1 - Direct emissions (company vehicles, generators)" },
    { key: "scope2", label: "Scope 2 - Indirect emissions (purchased electricity, heating, cooling)" },
    { key: "scope3", label: "Scope 3 - Other indirect emissions (purchased goods, logistics, travel)" },
  ];

  const individualCategories = [
    {
      key: "energy",
      label: "Energy (home electricity, cooking)",
      options: ["Electricity usage", "Gas cooking", "Solar panels", "Other fuels"],
    },
    {
      key: "mobility",
      label: "Mobility (car, train, air travel)",
      options: ["Car (petrol/diesel)", "Electric vehicle", "Public transport", "Flights"],
    },
    {
      key: "consumption",
      label: "Consumption (food, clothing, lifestyle)",
      options: ["Meat consumption", "Vegetarian/Vegan diet", "Clothing purchases", "Electronics"],
    },
    {
      key: "waste",
      label: "Waste (recycling habits, landfill waste)",
      options: ["Plastic recycling", "Composting", "General waste", "Hazardous waste disposal"],
    },
  ];

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setOnboarding({});
    setCategoryData({});
    setInputData({});
  };

  const handleOnboardingChange = (e) => {
    setOnboarding({ ...onboarding, [e.target.name]: e.target.value });
  };

  const handleCategoryToggle = (key) => {
    setCategoryData((prev) => ({
      ...prev,
      [key]: prev[key] ? { ...prev[key], selected: !prev[key].selected } : { selected: true, options: [] },
    }));
  };

  const handleOptionToggle = (catKey, option) => {
    setCategoryData((prev) => {
      const currentOptions = prev[catKey]?.options || [];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((o) => o !== option)
        : [...currentOptions, option];
      return {
        ...prev,
        [catKey]: {
          ...prev[catKey],
          options: newOptions,
        },
      };
    });
  };

  const handleInputChange = (category, field, value) => {
    setInputData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
        co2e: field === "amount" ? Number(value) * 2.31 : prev[category]?.co2e,
      },
    }));
  };

  const handleFinish = () => {
    const newEntry = {
      date: new Date().toISOString(),
      role,
      onboarding,
      categoryData,
      inputData
    };
    setAllEntries([...allEntries, newEntry]);
    alert("Data saved! You can view it in the Dashboard.");
    setStep(1);
    setRole("");
    setOnboarding({});
    setCategoryData({});
    setInputData({});
  };

  return (
    <div className="ew-container">
      <h1>Emissions Measurement Workflow</h1>

      {/* ----- STEP 1 ----- */}
      {step === 1 && (
        <div className="ew-step">
          <h2>Account Creation</h2>
          <p>Select your role to personalize your emissions measurement journey.</p>

          <div className="ew-role-buttons">
            {["Individual", "Business", "Government / NGO"].map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSelect(r)}
                className={role === r ? "selected" : ""}
              >
                {r}
              </button>
            ))}
          </div>

          {role && (
            <div className="ew-onboarding">
              <h3>Onboarding Questions</h3>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={onboarding.name || ""}
                  onChange={handleOnboardingChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={onboarding.location || ""}
                  onChange={handleOnboardingChange}
                />
              </label>
              <label>
                Industry / Sector:
                <input
                  type="text"
                  name="sector"
                  value={onboarding.sector || ""}
                  onChange={handleOnboardingChange}
                />
              </label>
              <button
                disabled={!onboarding.name || !onboarding.location}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ----- STEP 2 ----- */}
      {step === 2 && (
        <div className="ew-step">
          <h2>Emissions Categories</h2>

          {(role === "Business" ? businessCategories : individualCategories).map((cat) => (
            <div key={cat.key} className="ew-category">
              <label>
                <input
                  type="checkbox"
                  checked={categoryData[cat.key]?.selected || false}
                  onChange={() => handleCategoryToggle(cat.key)}
                />
                {cat.label}
              </label>

              {role === "Individual" && categoryData[cat.key]?.selected && cat.options && (
                <div className="ew-options">
                  {cat.options.map((opt) => (
                    <label key={opt}>
                      <input
                        type="checkbox"
                        checked={categoryData[cat.key]?.options?.includes(opt) || false}
                        onChange={() => handleOptionToggle(cat.key, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="ew-actions">
            <button onClick={() => setStep(1)}>← Back</button>
            <button
              disabled={!Object.values(categoryData).some((c) => c.selected)}
              onClick={() => setStep(3)}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ----- STEP 3 ----- */}
      {step === 3 && (
        <div className="ew-step">
          <h2>Input Data</h2>

          {Object.keys(categoryData)
            .filter((cat) => categoryData[cat].selected)
            .map((cat) => (
              <div key={cat} className="ew-input-block">
                <h3>{cat.toUpperCase()}</h3>
                <label>
                  Amount:
                  <input
                    type="number"
                    value={inputData[cat]?.amount || ""}
                    onChange={(e) =>
                      handleInputChange(cat, "amount", e.target.value)
                    }
                  />
                </label>
                <label>
                  Source / Notes:
                  <input
                    type="text"
                    value={inputData[cat]?.notes || ""}
                    onChange={(e) =>
                      handleInputChange(cat, "notes", e.target.value)
                    }
                  />
                </label>
                {inputData[cat]?.co2e && (
                  <p>Estimated CO₂e: <strong>{inputData[cat].co2e.toFixed(2)} kg</strong></p>
                )}
              </div>
            ))}

          <div className="ew-actions">
            <button onClick={() => setStep(2)}>← Back</button>
            <button onClick={handleFinish}>Finish →</button>
          </div>
        </div>
      )}
    </div>
  );
}
