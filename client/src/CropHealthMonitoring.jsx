import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

const recommendations = [
  "Vegetation health is optimal. Maintain current irrigation schedule.",
  "Slight water stress detected in sector B. Consider increasing supply.",
  "NDVI levels showing peak growth. Ideal time for nutrient localized application.",
  "Photosynthetic activity suggests high-efficiency growth today.",
];

const CropHealthMonitoring = () => {
  const [ndvi, setNdvi] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [stress, setStress] = useState(0);
  const [recommendation, setRecommendation] = useState(
    "Analyzing environmental data..."
  );

  useEffect(() => {
    const simulateData = () => {
      const nextNdvi = Math.floor(Math.random() * 30) + 65;
      const nextPhoto = Math.floor(Math.random() * 25) + 70;
      const nextStress = Math.floor(Math.random() * 30) + 5;

      setNdvi(nextNdvi);
      setPhoto(nextPhoto);
      setStress(nextStress);
      setRecommendation(
        recommendations[Math.floor(Math.random() * recommendations.length)]
      );
    };

    simulateData();
    const interval = setInterval(simulateData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <Header />
      <main className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>
                Live Crop Health Dashboard
              </h2>
              <p style={{ color: "var(--text-muted)" }}>
                Real-time satellite and AI analysis for your farm units.
              </p>
            </div>

            <span className="badge badge-live">
              <i className="fas fa-circle" style={{ fontSize: "8px", marginRight: "5px" }}></i>
              LIVE FEED
            </span>
          </div>

          <div className="dashboard-grid">
            <div className="glass-card" style={{ background: "white", color: "var(--text-main)" }}>
              <h3 style={{ marginBottom: "2rem", color: "var(--primary)" }}>
                <i className="fas fa-chart-area" style={{ marginRight: "10px", color: "var(--secondary)" }}></i>
                Real-time Indices
              </h3>

              <div className="progress-group">
                <div className="progress-label">
                  <span>NDVI (Vegetation Index)</span>
                  <span>{ndvi}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill progress-fill-green" style={{ width: `${ndvi}%` }}></div>
                </div>
              </div>

              <div className="progress-group">
                <div className="progress-label">
                  <span>Photosynthetic Activity</span>
                  <span>{photo}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill progress-fill-blue" style={{ width: `${photo}%` }}></div>
                </div>
              </div>

              <div className="progress-group">
                <div className="progress-label">
                  <span>Water Stress Level</span>
                  <span>{stress}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill progress-fill-warn" style={{ width: `${stress}%` }}></div>
                </div>
              </div>
            </div>

            <div>
              <div className="info-card">
                <h4 style={{ marginBottom: "0.5rem" }}>
                  <i className="fas fa-info-circle"></i> Understanding NDVI
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Normalized Difference Vegetation Index (NDVI) is used to detect
                  live green vegetation. Higher values indicate healthier, denser
                  crops.
                </p>
              </div>

              <div className="info-card">
                <h4 style={{ marginBottom: "0.5rem" }}>
                  <i className="fas fa-exclamation-triangle"></i> Stress Detection
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Our AI identifies moisture stress and nutrient deficiencies
                  before regular sensors, allowing for early intervention.
                </p>
              </div>

              <div className="feature-card" style={{ marginTop: "1.5rem" }}>
                <h4 style={{ marginBottom: "1rem" }}>
                  <i className="fas fa-robot"></i> AI Recommendation
                </h4>
                <p>{recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default CropHealthMonitoring;
