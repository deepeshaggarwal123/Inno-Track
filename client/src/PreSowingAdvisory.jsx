import React, { useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Toast from "./components/Toast";

const tabs = ["Soil Analysis", "Crop Matching", "Climate Forecast"];

const PreSowingAdvisory = () => {
  const [activeTab, setActiveTab] = useState("Soil Analysis");
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast("Success! Sowing Schedule has been generated and sent to your registered email and dashboard calendar.");
    }, 1500);
  };

  return (
    <PageTransition>
      <Header />
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />
      <style>{`
        .pre-hero-section {
          padding: 160px 0 80px;
          background: linear-gradient(rgba(26, 60, 94, 0.85), rgba(46, 125, 50, 0.85)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
        }

        .advisor-tabs-container {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 50px;
          flex-wrap: wrap;
        }

        .advisor-tab-button {
          padding: 0.9rem 2.2rem;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: 0.3s;
          font-weight: 600;
        }

        .advisor-tab-button.active {
          background: var(--secondary);
          color: white;
          border-color: var(--secondary);
          box-shadow: 0 4px 15px rgba(46, 125, 50, 0.4);
        }

        .advisor-card {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          border: 1px solid rgba(0,0,0,0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .advisor-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
        }

        .advisor-card-img {
          height: 220px;
          background-size: cover;
          background-position: center;
        }

        .advisor-card-content {
          padding: 2.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .score-pill {
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
        }
      `}</style>

      <section className="pre-hero-section">
        <div className="container">
          <span className="badge" style={{ background: "var(--accent)", color: "var(--primary)", marginBottom: "1.5rem" }}>Smart Foundation</span>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>Pre-Sowing Advisory Service</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", opacity: 0.9 }}>
            Predictive analytics to help you choose the right crop and the perfect time to plant for maximum yield.
          </p>

          <div className="advisor-tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`advisor-tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  showToast(`Switched to analyzing ${tab} metrics.`, "info");
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", color: "var(--primary)" }}>AI-Driven Recommendations</h2>
            <p style={{ maxWidth: "650px", margin: "1rem auto 0" }}>
              Tailored insights based on your farm's historical soil health and upcoming seasonal climate patterns.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="advisor-card">
              <div
                className="advisor-card-img"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
              <div className="advisor-card-content">
                <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Soil Nutrient Profile</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Composition analysis from Sector Alpha indicates high nitrogen levels suitable for high-demand cereal crops.
                </p>

                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: "0.9rem" }}>Nitrogen (N)</span>
                    <span className="score-pill" style={{ background: "#d1fae5", color: "#059669" }}>High (85%)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: "0.9rem" }}>Phosphorus (P)</span>
                    <span className="score-pill" style={{ background: "#d1fae5", color: "#059669" }}>Optimal (72%)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: "0.9rem" }}>Potassium (K)</span>
                    <span className="score-pill" style={{ background: "#fef3c7", color: "#d97706" }}>Average (45%)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                    <span style={{ fontSize: "0.9rem" }}>pH Level</span>
                    <span className="score-pill" style={{ background: "#d1fae5", color: "#059669" }}>6.8 (Neutral)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="advisor-card">
              <div
                className="advisor-card-img"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542614391-42cb5935ca7f?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
              <div className="advisor-card-content">
                <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Best Crop Matches</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Our matching engine suggests the following crops for the upcoming Rabī' season based on current satellite data.
                </p>

                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: "0.9rem" }}>Durum Wheat</span>
                    <span style={{ fontWeight: 700, color: "var(--secondary)", fontSize: "0.9rem" }}><i className="fas fa-star"></i> 95% Match</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: "0.9rem" }}>Chickpeas</span>
                    <span style={{ fontWeight: 700, color: "#fbbf24", fontSize: "0.9rem" }}><i className="fas fa-star-half-alt"></i> 82% Match</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                    <span style={{ fontSize: "0.9rem" }}>Mustard Seeds</span>
                    <span style={{ fontWeight: 700, color: "#94a3b8", fontSize: "0.9rem" }}>70% Match</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: "auto", width: "100%", padding: "1rem" }}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating Schedule..." : "Generate Sowing Schedule"}
                </button>
              </div>
            </div>

            <div className="advisor-card">
              <div
                className="advisor-card-img"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599403378370-d87784013143?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
              <div className="advisor-card-content">
                <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Window of Opportunity</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Jet stream analysis and local micro-climate forecasting suggest the following optimal sowing window.
                </p>

                <div style={{ background: "var(--light-sage)", padding: "1.5rem", borderRadius: "20px", marginTop: "2rem", borderLeft: "5px solid var(--secondary)" }}>
                  <h4 style={{ color: "var(--secondary)", marginBottom: "0.5rem", fontSize: "0.9rem", textTransform: "uppercase" }}>Optimal Window</h4>
                  <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" }}>Oct 15 - Nov 10</p>
                  <div style={{ fontSize: "0.85rem", marginTop: "1rem", color: "var(--primary)", opacity: 0.8, display: "grid", gap: "5px" }}>
                    <span>Temperature: 18°C - 24°C</span>
                    <span>Rainfall Prob: 12%</span>
                  </div>
                </div>

                <p style={{ marginTop: "2rem", fontSize: "0.85rem", fontStyle: "italic", color: "var(--text-muted)" }}>
                  <i className="fas fa-info-circle"></i> Sowing outside this window may reduce yield potential by up to 15%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default PreSowingAdvisory;