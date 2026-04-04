import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

const AadhaarRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    password: "",
    securityQuestion: "What is your favorite crop?",
    securityAnswer: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;
    if (name === "contactNo") {
      cleanedValue = value.replace(/[^0-9]/g, "");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contactNo, password, name } = formData;

    if (!/^\d{10}$/.test(contactNo)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      setMessageColor("#ff8a80");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageColor("#ff8a80");
      return;
    }

    setMessage("Registering your account...");
    setMessageColor("#c8e6c9");

    try {
      await axios.post("/api/auth/register", formData);
      setMessage("✔ Registration Successful! Redirecting...");
      setMessageColor("#81c784");
      setIsSubmitted(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Try again.");
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
          padding: 100px 20px 40px;
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
          max-width: 500px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          color: white;
        }

        .auth-input-wrapper {
          position: relative;
          margin-bottom: 1.2rem;
        }

        .auth-input-wrapper i {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--accent);
          font-size: 1rem;
        }

        .auth-input, .auth-select {
          width: 100%;
          padding: 1rem 1.5rem 1rem 3.2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: 0.3s;
        }

        .auth-input:focus, .auth-select:focus {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.15);
        }

        .auth-select option {
          background: var(--primary);
          color: white;
        }

        .auth-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
        }
      `}</style>

      <div className="auth-page-container">
        <div className="auth-bg-layer"></div>
        <div className="auth-glass-card">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Create Account</h2>
            <p style={{ color: "var(--accent)", fontSize: "0.95rem", opacity: 0.9 }}>Join Inno-Track AI Agriculture Platform</p>
          </div>

          <form onSubmit={handleSubmit} style={{ opacity: isSubmitted ? 0.3 : 1, pointerEvents: isSubmitted ? 'none' : 'auto' }}>
            <div className="auth-input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="auth-input"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="auth-input-wrapper">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                name="contactNo"
                maxLength="10"
                placeholder="Viva Contact No"
                className="auth-input"
                required
                value={formData.contactNo}
                onChange={handleChange}
              />
            </div>

            <div className="auth-input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="auth-input"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="auth-input-wrapper">
              <i className="fas fa-question-circle"></i>
              <select
                name="securityQuestion"
                className="auth-select"
                required
                value={formData.securityQuestion}
                onChange={handleChange}
              >
                <option value="What is your favorite crop?">What is your favorite crop?</option>
                <option value="What was your first pet's name?">What was your first pet's name?</option>
                <option value="In which city were you born?">In which city were you born?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
              </select>
            </div>

            <div className="auth-input-wrapper">
              <i className="fas fa-key"></i>
              <input
                type="text"
                name="securityAnswer"
                placeholder="Security Answer (for password recovery)"
                className="auth-input"
                required
                value={formData.securityAnswer}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "1.1rem", borderRadius: "15px", fontSize: "1rem", marginTop: "1rem" }}>
              Complete Registration
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", borderLeft: `4px solid ${messageColor}`, fontSize: "0.9rem", color: messageColor, textAlign: "center" }}>
              {message}
            </div>
          )}

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.95rem" }}>
            <p style={{ opacity: 0.8 }}>Already have an account? <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Sign In</Link></p>
            <Link to="/" style={{ display: "block", marginTop: "1rem", opacity: 0.6, fontSize: "0.85rem", textDecoration: "none" }}><i className="fas fa-arrow-left"></i> Back to Homepage</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AadhaarRegister;
