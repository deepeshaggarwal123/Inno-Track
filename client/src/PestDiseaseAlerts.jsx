import React, { useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Toast from "./components/Toast";

const PestDiseaseAlerts = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      showToast("Regional Pest & Disease Intelligence Report has been downloaded securely to your device.");
    }, 2000);
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
        .alert-hero-banner {
          padding: 160px 0 80px;
          background: linear-gradient(rgba(26, 60, 94, 0.9), rgba(46, 125, 50, 0.9)), url('https://images.unsplash.com/photo-1599403378370-d87784013143?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
        }

        .alert-item-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow-md);
          border-left: 6px solid var(--accent);
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1.5rem;
          transition: var(--transition);
        }

        .alert-item-card:hover {
          transform: translateX(10px);
          box-shadow: var(--shadow-lg);
        }

        .alert-icon-box {
          width: 65px;
          height: 65px;
          background: var(--light-sage);
          color: var(--secondary);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          flex-shrink: 0;
        }

        .severity-label {
          display: inline-block;
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .risk-fill-bar {
          height: 100%;
          background: linear-gradient(to right, var(--accent), #fbbf24, #ef4444);
          width: 75%;
          border-radius: 10px;
        }
      `}</style>

      <section className="alert-hero-banner">
        <div className="container">
          <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "white", marginBottom: "1.5rem" }}>Biosecurity Shield</span>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Pest & Disease Intelligence</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", opacity: 0.9 }}>Real-time threat monitoring and proactive protection for your crops using satellite AI.</p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="dashboard-grid">
            <div className="alert-feed">
              <h2 style={{ marginBottom: "2rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fas fa-satellite-dish"></i> Regional Live Feed
              </h2>

              <div className="alert-item-card">
                <div className="alert-icon-box">
                  <i className="fas fa-bug"></i>
                </div>
                <div className="alert-details">
                  <span className="severity-label" style={{ background: "#fee2e2", color: "#ef4444" }}>CRITICAL RISK</span>
                  <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Fall Armyworm Outbreak</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Significant activity detected in neighboring sectors. Immediate inspection of maize crops is recommended.
                    Population density: 15/sqm.
                  </p>
                  <div style={{ marginTop: "1.2rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", gap: "1.5rem" }}>
                    <span><i className="fas fa-clock"></i> 45 mins ago</span>
                    <span><i className="fas fa-map-marker-alt"></i> Sector B & C Borders</span>
                  </div>
                </div>
              </div>

              <div className="alert-item-card" style={{ borderLeftColor: "#fbbf24" }}>
                <div className="alert-icon-box" style={{ color: "#fbbf24", background: "#fffcf0" }}>
                  <i className="fas fa-virus"></i>
                </div>
                <div className="alert-details">
                  <span className="severity-label" style={{ background: "#fef3c7", color: "#d97706" }}>ELEVEATED</span>
                  <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Early Blight (Alternaria Solani)</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Humidity levels reaching target threshold for fungal growth. Preventative copper-based fungicide application suggested.
                  </p>
                  <div style={{ marginTop: "1.2rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", gap: "1.5rem" }}>
                    <span><i className="fas fa-clock"></i> 3 hours ago</span>
                    <span><i className="fas fa-cloud-sun"></i> Weather Triggered</span>
                  </div>
                </div>
              </div>

              <div className="alert-item-card" style={{ borderLeftColor: "var(--accent)" }}>
                <div className="alert-icon-box">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="alert-details">
                  <span className="severity-label" style={{ background: "#d1fae5", color: "#10b981" }}>STABLE MONITORING</span>
                  <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Rice Stem Borer</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Population levels within safe threshold. No intervention required at this stage. Keep monitoring light traps.
                  </p>
                  <div style={{ marginTop: "1.2rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", gap: "1.5rem" }}>
                    <span><i className="fas fa-clock"></i> 1 day ago</span>
                    <span><i className="fas fa-calendar-check"></i> Routine Check</span>
                  </div>
                </div>
              </div>
            </div>

            <aside>
              <div className="glass-card" style={{ background: "var(--primary)", color: "white", padding: "2.5rem", borderRadius: "25px", position: "sticky", top: "120px" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>Regional Risk Score</h3>
                <div style={{ height: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", margin: "1.5rem 0", overflow: "hidden" }}>
                  <div className="risk-fill-bar"></div>
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.9 }}>
                  Your farm is currently at <strong>75% Elevated Risk</strong> due to seasonal migration patterns.
                </p>

                <div style={{ marginTop: "2.5rem" }}>
                  <h4 style={{ marginBottom: "1.2rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem" }}>Protection Protocol</h4>
                  <ul style={{ display: "grid", gap: "1rem", fontSize: "0.95rem" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><i className="fas fa-shield-alt" style={{ color: "var(--accent)" }}></i> Activate pheromone traps</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><i className="fas fa-shield-alt" style={{ color: "var(--accent)" }}></i> Inspect Sector A borders</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><i className="fas fa-shield-alt" style={{ color: "var(--accent)" }}></i> Update scout reports</li>
                  </ul>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: "100%", marginTop: "2.5rem", background: "white", color: "var(--primary)", border: "none" }}
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <span><i className="fas fa-spinner fa-spin"></i> Compiling PDF...</span>
                  ) : (
                    "Download Full Report"
                  )}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default PestDiseaseAlerts;