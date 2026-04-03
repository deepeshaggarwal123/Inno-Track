import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";
import { useAuth } from "./context/AuthContext";

const AadhaarLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#c8e6c9");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const valContact = contactNo.trim();

    if (/^\d{10}$/.test(valContact)) {
      try {
        setIsLoading(true);
        setMessage("Logging in...");
        setMessageColor("#c8e6c9");
        
        const response = await axios.post("/api/auth/login", { contactNo: valContact, password });
        
        setMessage("Login successful! Redirecting...");
        setMessageColor("#81c784");

        if (response.data.token) {
          login(response.data.user, response.data.token);
        }

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setMessage(error.response?.data?.message || "Invalid contact number or password.");
        setMessageColor("#ff8a80");
      } finally {
        setIsLoading(false);
      }
    } else {
      setMessage("Please enter a valid 10-digit contact number.");
      setMessageColor("#ff8a80");
    }
  };

  return (
    <PageTransition>
      <Header />
      <style>{`
        .auth-page-container {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
        }

        .auth-bg-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(26, 60, 94, 0.75), rgba(46, 125, 50, 0.8)), url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80");
          background-size: cover;
          background-position: center;
          z-index: 0;
          animation: authKenBurns 40s linear infinite alternate;
        }

        @keyframes authKenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }

        .auth-glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          padding: 3.5rem;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          color: white;
        }

        .auth-input-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .auth-input-wrapper i {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--accent);
          font-size: 1.1rem;
        }

        .auth-input {
          width: 100%;
          padding: 1.1rem 1.5rem 1.1rem 3.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: 0.3s;
        }

        .auth-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--accent);
          box-shadow: 0 0 15px rgba(118, 186, 27, 0.2);
        }

        .auth-footer-links {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.95rem;
          display: grid;
          gap: 1rem;
        }

        .auth-footer-links a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .auth-footer-links a:hover {
          color: white;
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-page-container">
        <div className="auth-bg-layer"></div>
        <div className="auth-glass-card">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Welcome Back</h2>
            <p style={{ color: "var(--accent)", fontSize: "0.95rem", opacity: 0.9 }}>Login to your account</p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div className="auth-input-wrapper">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                maxLength="10"
                placeholder="Enter 10-digit Contact No"
                className="auth-input"
                required
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value.replace(/[^0-9]/g, ""))}
              />
            </div>
            
            <div className="auth-input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter Password"
                className="auth-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: "100%", padding: "1.1rem", borderRadius: "15px", fontSize: "1rem" }}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Sign In"}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", borderLeft: `4px solid ${messageColor}`, fontSize: "0.9rem", color: messageColor, textAlign: "center" }}>
              {message}
            </div>
          )}

          <div className="auth-footer-links">
            <p style={{ opacity: 0.8 }}>New to Inno-Track? <Link to="/register">Create an account</Link></p>
            <Link to="/" style={{ opacity: 0.6, fontSize: "0.85rem" }}><i className="fas fa-arrow-left"></i> Back to Homepage</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AadhaarLogin;