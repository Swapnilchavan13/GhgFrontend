import React, { useState, useEffect } from 'react';
import '../styles/climelanding.css';
import { useNavigate } from "react-router-dom";



const ClimeLanding = () => {

  const navigate = useNavigate();

const onProceed = () => {
  navigate("/client/combinedemission");
};

  
  const [emission, setEmission] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmission(prev => (prev >= 12500 ? 12500 : prev + Math.floor(Math.random() * 10)));
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
        <div className="landing-container">
 <button className="proceed-button-top" onClick={onProceed}>
  Proceed to Dashboard →
</button>

  


      <div className="circle bg1" />
      <div className="circle bg2" />
      
      <h1 className="landing-title">
        Welcome to <span>ClimeScore</span>
      </h1>
      <p className="landing-subtitle">
        Understand your environmental impact.<br /> Empower your journey to sustainability.
      </p>

      <div className="co2-display">
        <h2>{emission} kg CO₂</h2>
        <p>Calculating your carbon emissions...</p>
      </div>

      <div className="chart-animated-section">
        {[...Array(10)].map((_, i) => (
          <div className="graph-bar" key={i} style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>
      <p className="chart-caption">Simulating Emission Activity</p>

      <div className="features">
        <div className="feature-box">📊 Visualize carbon footprints with ease</div>
        <div className="feature-box">🌱 Track and optimize sustainability goals</div>
        <div className="feature-box">🔍 Monitor Scope 1, 2, 3 emissions</div>
        <div className="feature-box">📡 Real-time insights and trend monitoring</div>
      </div>

      
    </div>
  );
};

export default ClimeLanding;
