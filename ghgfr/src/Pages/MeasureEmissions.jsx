import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MeasureEmissions.css";

export default function MeasureEmissions() {
  const navigate = useNavigate();

  const handleCTA = () => {
    // navigate to registration or login — change path as required
    navigate("/user/login"); 
  };

  const AudienceCard = ({ title, desc, icon }) => (
    <div className="me-card" role="article" aria-label={title}>
      <div className="me-card-icon" aria-hidden="true">{icon}</div>
      <h3 className="me-card-title">{title}</h3>
      <p className="me-card-desc">{desc}</p>
      <button
        className="me-card-cta"
        onClick={() => navigate(`/auth?role=${title.toLowerCase()}`)}
        aria-label={`Start measurement as ${title}`}
      >
        Get Started
      </button>
    </div>
  );

  return (
    <main className="me-page">
      <section className="me-hero">
        <div className="me-hero-left">
          <h1 className="me-title">Measure Your Emissions</h1>
          <p className="me-lead">
            ClimeScore measures your greenhouse gas footprint with a robust, globally valid methodology so you can act with confidence.
          </p>

          <ul className="me-highlights" aria-hidden="false">
            <li><strong>Accurate:</strong> Built on GHG Protocol & ISO standards.</li>
            <li><strong>Scalable:</strong> For businesses of all sizes and individuals.</li>
            <li><strong>Actionable:</strong> Clear results and next-step recommendations.</li>
          </ul>

          <div className="me-cta-row">
            <button className="me-cta" onClick={handleCTA}>
              Start Measurement
            </button>
            <button
              className="me-ghost"
              onClick={() => navigate("/learn-more")}
              aria-label="Learn more about methodology"
            >
              Learn methodology
            </button>
          </div>

          <p className="me-trust">
            Trusted methodology: <span className="badge">GHG Protocol</span>
            <span className="badge">ISO 14064</span>
            <span className="badge">IPCC Guidelines</span>
          </p>
        </div>

        <div className="me-hero-right" aria-hidden="true">
          {/* Decorative stylized card / illustration built with CSS */}
          <div className="me-card-visual">
            <div className="circle c1" />
            <div className="circle c2" />
            <div className="chart">
              <div className="bar b1" />
              <div className="bar b2" />
              <div className="bar b3" />
              <div className="bar b4" />
            </div>
          </div>
        </div>
      </section>

      <section className="me-audience">
        <h2 className="section-title">Who it's for</h2>
        <p className="section-sub">
          Whether you're running a company, tracking household emissions, or shaping public policy — ClimeScore supports you.
        </p>

        <div className="me-audience-grid">
          <AudienceCard
            title="Businesses"
            desc="Comprehensive corporate emissions measurement, scope 1–3 support, and reporting-ready outputs."
            icon={
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 6v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M17 6v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />

          <AudienceCard
            title="Individuals"
            desc="Estimate home, travel and lifestyle emissions and discover practical ways to reduce them."
            icon={
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 20c1-4 7-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />

          <AudienceCard
            title="Governments"
            desc="Robust, auditable emissions measurement to inform policy, targets and reporting at scale."
            icon={
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l8 4v6c0 5-8 8-8 8s-8-3-8-8V7l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M9 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>
      </section>

      <section className="me-methodology">
        <h2 className="section-title">Globally valid methodology</h2>
        <p className="section-sub">
          ClimeScore aligns with international frameworks and best practice standards for greenhouse gas accounting.
        </p>

        <ul className="method-list" aria-label="Methodology references">
          <li><strong>GHG Protocol</strong> — Corporate and product accounting standards</li>
          <li><strong>ISO 14064</strong> — Specifications for GHG quantification, monitoring & reporting</li>
          <li><strong>IPCC Guidelines</strong> — Emission factors & guidance for national inventories</li>
        </ul>

        <div className="me-disclaimer">
          <small>
            Results are produced using transparent assumptions and input data you provide. Output can be exported for audit and reporting.
          </small>
        </div>
      </section>
    </main>
  );
}
