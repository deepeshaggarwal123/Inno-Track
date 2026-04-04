import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Toast from "./components/Toast";

const features = [
  {
    icon: "fas fa-briefcase-medical",
    title: "Crop Health Analysis",
    description:
      "Real-time monitoring using advanced AI to detect pests, diseases, and nutrient deficiencies early.",
    link: "/crop-health",
  },
  {
    icon: "fas fa-tint",
    title: "Intelligent Irrigation",
    description:
      "Optimize water usage with sensors and AI that trigger irrigation only when your crops actually need it.",
    link: "/irrigation",
  },
  {
    icon: "fas fa-leaf",
    title: "Pre-Sowing Advisory",
    description:
      "Get data-driven recommendations on the best crops to plant based on soil quality and climate forecasts.",
    link: "/pre-sowing",
  },
  {
    icon: "fas fa-map-marked-alt",
    title: "Precision Mapping",
    description:
      "High-resolution farm mapping to monitor growth patterns and soil health across your entire land.",
    link: "/farm-mapping",
  },
  {
    icon: "fas fa-chart-line",
    title: "Yield Prediction",
    description:
      "Accurately forecast your harvest and profit based on historical data and real-time environment factors.",
    link: "/yield-profit",
  },
  {
    icon: "fas fa-robot",
    title: "AI Farm Assistant",
    description:
      "Get 24/7 expert advice and answers to all your agricultural queries from our specialized AI agent.",
    link: "/ai-assistant",
  },
  {
    icon: "fas fa-bug",
    title: "Pest Alerts",
    description:
      "Early warning systems for pest outbreaks in your region, allowing for proactive protection measures.",
    link: "/pest-alerts",
  },
];


function Home() {
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
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
      <main>
        {isVideoModalOpen && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: "80%", maxWidth: "900px", background: "#000", borderRadius: "15px", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
              <button 
                onClick={() => setIsVideoModalOpen(false)} 
                style={{ position: "absolute", top: "15px", right: "20px", background: "rgba(0,0,0,0.5)", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)" }}>
                <i className="fas fa-times"></i>
              </button>
              {/* Placeholder Video Player for the upcoming CapCut Demo */}
              <video 
                controls 
                autoPlay 
                style={{ width: "100%", display: "block" }}
                src="https://www.w3schools.com/html/mov_bbb.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        <section className="hero">
          <div className="hero-image-bg"></div>
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content">
              <span className="hero-tag">Revolutionizing Agriculture</span>
              <h1>AI-Powered Precision Farming</h1>
              <p>
                Harness the power of AI and satellite technology to optimize
                your harvest, reduce costs, and build a sustainable future for
                your farm.
              </p>
              <div className="hero-btns">
                <Link to="/crop-health" className="btn btn-primary">
                  Explore Solutions
                </Link>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="btn btn-outline" 
                  style={{ cursor: "pointer", background: "transparent" }}
                >
                  <i className="fas fa-play" style={{ marginRight: "8px" }}></i> Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Smart Solutions for Every Farmer</h2>
              <p>
                Our comprehensive suite of tools helps you make data-driven
                decisions at every stage of the farming cycle.
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link
                    to={feature.link}
                    style={{
                      color: "var(--secondary)",
                      fontWeight: 600,
                      marginTop: "1rem",
                      display: "inline-block",
                    }}
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}

export default Home;