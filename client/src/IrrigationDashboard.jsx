import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Toast from "./components/Toast";

const IrrigationDashboard = () => {
  const [moisture, setMoisture] = useState(68);
  const [aiMode, setAiMode] = useState(true);
  const [pumpOn, setPumpOn] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  useEffect(() => {
    let interval;

    if (pumpOn) {
      interval = setInterval(() => {
        setMoisture((prev) => {
          if (prev < 90) return prev + 1;
          return prev;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [pumpOn]);

  useEffect(() => {
    const fluctuationInterval = setInterval(() => {
      setMoisture((prev) => {
        if (!pumpOn) {
          const next = prev - Math.random() * 0.5;
          return Math.max(0, Math.round(next));
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(fluctuationInterval);
  }, [pumpOn]);

  const statusData = useMemo(() => {
    if (pumpOn) {
      return {
        text: "Irrigating...",
        background: "var(--primary)",
      };
    }

    if (moisture < 40) {
      return {
        text: "Critical Low",
        background: "#f44336",
      };
    }

    if (moisture > 85) {
      return {
        text: "Over-Saturated",
        background: "#ff9800",
      };
    }

    return {
      text: "Optimal Condition",
      background: "var(--grad-green)",
    };
  }, [moisture, pumpOn]);

  const aiInsight = aiMode
    ? "AI Automation re-engaged. System optimizing for overnight moisture retention."
    : "Manual override detected. AI optimization paused. Please monitor soil moisture carefully.";

  const gaugeStyle = {
    background: `conic-gradient(var(--secondary) ${moisture}%, #e2e8f0 ${moisture}%)`,
  };

  const waterEffectStyle = {
    height: pumpOn ? "100%" : "0%",
  };

  const manualControlStyle = {
    opacity: aiMode ? 0.5 : 1,
    pointerEvents: aiMode ? "none" : "auto",
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
        .moisture-circle {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: var(--transition);
        }

        .moisture-circle::before {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          background: white;
          border-radius: 50%;
        }

        .moisture-inner {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .moisture-inner span {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
        }

        .switch-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input { opacity: 0; width: 0; height: 0; }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255,255,255,0.2);
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px; width: 26px;
          left: 4px; bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider { background-color: var(--accent); }
        input:checked + .slider:before { transform: translateX(26px); }

        .water-animation {
          position: absolute;
          bottom: 0; left: 0; width: 100%;
          background: rgba(26, 60, 94, 0.05);
          transition: height 1s ease;
        }
      `}</style>
      <main className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "left", marginLeft: 0 }}>
            <h2 style={{ fontSize: "2.8rem", color: "var(--primary)" }}>
              Intelligent Irrigation Dashboard
            </h2>
            <p>Monitor soil health and automate water delivery with AI precision.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "30px" }}>
            <div className="glass-card" style={{ background: "white", color: "var(--text-main)", position: "relative", overflow: "hidden" }}>
              <div className="water-animation" style={waterEffectStyle}></div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
                <h3>Zone A: Premium Cultivation</h3>
                <span className="badge" style={{ background: statusData.background, color: "white" }}>
                  {statusData.text}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "2rem 0", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 1 }}>
                <div className="moisture-circle" style={gaugeStyle}>
                  <div className="moisture-inner">
                    <span>{moisture}%</span>
                    <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Soil Moisture</label>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: "250px" }}>
                  <div className="info-card">
                    <h4><i className="fas fa-microchip"></i> AI Insight</h4>
                    <p style={{ fontSize: "0.9rem" }}>{aiInsight}</p>
                  </div>

                  <div style={{ background: "var(--light-sage)", padding: "1.5rem", borderRadius: "15px", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <i className="fas fa-cloud-sun" style={{ fontSize: "2.5rem", color: "var(--secondary)" }}></i>
                    <div>
                      <h4 style={{ color: "var(--primary)" }}>Local Forecast</h4>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>28°C | 15% Chance of Rain</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2rem", borderTop: "1px solid #eee", paddingTop: "2rem", position: "relative", zIndex: 1 }}>
                <h4 style={{ marginBottom: "1rem" }}><i className="fas fa-history"></i> Recent Activity</h4>
                <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem" }}>
                  <div style={{ background: "#f8fafc", border: "1px solid #eee", minWidth: "200px", padding: "1rem", borderRadius: "12px" }}>
                    <small>Today, 06:15 AM</small>
                    <p style={{ fontWeight: 600, color: "var(--secondary)" }}>Auto-Irrigation: OFF</p>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Capacity met by dew</span>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #eee", minWidth: "200px", padding: "1rem", borderRadius: "12px" }}>
                    <small>Yesterday, 08:30 PM</small>
                    <p style={{ fontWeight: 600, color: "var(--primary)" }}>Watered: 450 Liters</p>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sector A & B active</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: "var(--primary)", color: "white", padding: "2.5rem", borderRadius: "25px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h3>Control Center</h3>

              <div className="switch-group">
                <div>
                  <p style={{ fontWeight: 600 }}>AI Automation Mode</p>
                  <small style={{ opacity: 0.7 }}>Let Inno-Track decide</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={aiMode}
                    onChange={(e) => {
                      setAiMode(e.target.checked);
                      if (e.target.checked) setPumpOn(false);
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="switch-group" style={manualControlStyle}>
                <div>
                  <p style={{ fontWeight: 600 }}>Manual Pump Switch</p>
                  <small style={{ opacity: 0.7 }}>Emergency override</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={pumpOn}
                    onChange={(e) => setPumpOn(e.target.checked)}
                    disabled={aiMode}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "15px", marginTop: "1rem" }}>
                <h4>System Health</h4>
                <div style={{ marginTop: "1rem", fontSize: "0.9rem", display: "grid", gap: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Sensors Online</span>
                    <span style={{ color: "var(--accent)" }}>100%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Network Latency</span>
                    <span>42ms</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Power Source</span>
                    <span>Solar (85%)</span>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-outline" 
                style={{ width: "100%", borderColor: "rgba(255,255,255,0.3)", marginTop: "auto" }}
                onClick={() => {
                  setIsDownloading(true);
                  setTimeout(() => {
                    setIsDownloading(false);
                    showToast("Historical Usage Report successfully downloaded.");
                  }, 1500);
                }}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <span><i className="fas fa-spinner fa-spin"></i> Compiling Data...</span>
                ) : (
                  "Download Usage Report"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default IrrigationDashboard;