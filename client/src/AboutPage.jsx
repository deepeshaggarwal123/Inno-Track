import React from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

const AboutPage = () => {
  return (
    <PageTransition>
      <Header />
      <main style={{ paddingTop: "100px" }}>
        <section
          className="section"
          style={{
            background: "var(--grad-blue)",
            color: "white",
            textAlign: "center",
            padding: "120px 0",
          }}
        >
          <div className="container">
            <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Cultivating the Future
            </h1>
            <p
              style={{
                fontSize: "1.3rem",
                maxWidth: "800px",
                margin: "0 auto",
                opacity: 0.9,
              }}
            >
              We bridge the gap between traditional farming wisdom and cutting-edge
              artificial intelligence to feed a growing world sustainably.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    color: "var(--primary)",
                    marginBottom: "1.5rem",
                    fontSize: "2.5rem",
                  }}
                >
                  Our Mission
                </h2>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.1rem",
                    marginBottom: "2rem",
                  }}
                >
                  Inno-Track was founded on the belief that technology should
                  empower those who feed us. Our mission is to provide every
                  farmer, from smallholders to large estates, with the precision
                  tools needed to thrive in a changing climate.
                </p>

                <div className="info-card">
                  <h4 style={{ color: "var(--secondary)" }}>
                    <i className="fas fa-leaf"></i> Sustainability First
                  </h4>
                  <p style={{ fontSize: "0.9rem" }}>
                    Reducing chemical runoff and water waste through hyper-local data.
                  </p>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable Farming"
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: "var(--shadow-lg)",
                  }}
                />

                <div
                  className="glass-card"
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "-30px",
                    background: "var(--white)",
                    border: "1px solid #eee",
                    padding: "1.5rem",
                    textAlign: "center",
                    color: "var(--text-main)",
                  }}
                >
                  <h2 style={{ color: "var(--secondary)", fontSize: "2.5rem" }}>
                    50K+
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                    Farms Empowered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <div className="section-header">
              <h2>Our Global Impact</h2>
              <p>Driving change across six continents through precision agriculture.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-globe-africa"></i>
                </div>
                <h3>Regional Growth</h3>
                <p>
                  Providing essential tools to developing regions to boost food
                  security.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-microscope"></i>
                </div>
                <h3>R&D Excellence</h3>
                <p>
                  Continuous innovation in machine learning models specifically for
                  crop pathology.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <h3>Community Driven</h3>
                <p>
                  Working directly with farming cooperatives to tailor our AI to
                  real-world needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default AboutPage;