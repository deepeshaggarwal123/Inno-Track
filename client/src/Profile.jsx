import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import { useAuth } from "./context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <PageTransition>
        <Header />
        <div className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ marginBottom: "1rem" }}>Access Denied</h2>
            <p style={{ marginBottom: "2rem", opacity: 0.8 }}>Please sign in to view your profile and farm data.</p>
            <Link to="/login" className="btn btn-primary">Sign In Now</Link>
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: "120px", background: "var(--light-sage)", minHeight: "100vh" }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: "left", maxWidth: "none" }}>
              <span style={{ color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Farmer Dashboard</span>
              <h2 style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>Your Profile</h2>
            </div>

            <div className="dashboard-grid">
              {/* User Info Card */}
              <div className="glass-card" style={{ background: "white", padding: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1.5rem" }}>
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--grad-blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem" }}>
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.5rem", color: "var(--primary)" }}>{user.name}</h3>
                    <p style={{ color: "var(--secondary)", fontWeight: 600 }}>Active Farmer</p>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ opacity: 0.6 }}>Contact Number:</span>
                    <span style={{ fontWeight: 600 }}>{user.contactNo}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ opacity: 0.6 }}>Location:</span>
                    <span style={{ fontWeight: 600 }}>India</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ opacity: 0.6 }}>Account Status:</span>
                    <span style={{ color: "var(--secondary)", fontWeight: 700 }}>Verified</span>
                  </div>
                </div>

                <button onClick={handleLogout} className="btn btn-outline" style={{ width: "100%", marginTop: "2rem", border: "2px solid #ff5252", color: "#ff5252" }}>
                  Sign Out
                </button>
              </div>

              {/* Farm Stats Card */}
              <div className="glass-card" style={{ background: "white", padding: "2.5rem" }}>
                <h3 style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>Farm Summary</h3>
                <div className="features-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "15px", textAlign: "center" }}>
                    <h4 style={{ color: "var(--secondary)", fontSize: "1.8rem" }}>4.2</h4>
                    <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>Hectares Owned</p>
                  </div>
                  <div style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "15px", textAlign: "center" }}>
                    <h4 style={{ color: "var(--secondary)", fontSize: "1.8rem" }}>3</h4>
                    <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>Active Crops</p>
                  </div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <h4 style={{ marginBottom: "1rem", fontSize: "0.9rem", opacity: 0.8 }}>Current Activities</h4>
                  <ul style={{ display: "grid", gap: "0.8rem" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "0.9rem" }}>
                      <i className="fas fa-check-circle" style={{ color: "var(--secondary)" }}></i> Irrigation scheduled for tomorrow
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "0.9rem" }}>
                      <i className="fas fa-check-circle" style={{ color: "var(--secondary)" }}></i> Wheat health monitoring active
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: "3rem" }}>
               <h3 style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>Quick Shortcuts</h3>
               <div className="features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                  <Link to="/crop-health" className="glass-card" style={{ background: "white", padding: "1.5rem", textAlign: "center", display: "block" }}>
                    <i className="fas fa-briefcase-medical" style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "0.8rem", display: "block" }}></i>
                    <span style={{ fontWeight: 600 }}>Crop Health</span>
                  </Link>
                  <Link to="/irrigation" className="glass-card" style={{ background: "white", padding: "1.5rem", textAlign: "center", display: "block" }}>
                    <i className="fas fa-tint" style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "0.8rem", display: "block" }}></i>
                    <span style={{ fontWeight: 600 }}>Irrigation</span>
                  </Link>
                  <Link to="/ai-assistant" className="glass-card" style={{ background: "white", padding: "1.5rem", textAlign: "center", display: "block" }}>
                    <i className="fas fa-robot" style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "0.8rem", display: "block" }}></i>
                    <span style={{ fontWeight: 600 }}>Ask AI</span>
                  </Link>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Profile;
