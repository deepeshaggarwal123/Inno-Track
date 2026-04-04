import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [contactNo, setContactNo] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await axios.post("/api/auth/verify-user", { contactNo });
      setSecurityQuestion(response.data.securityQuestion);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "User not found.");
      setMessageColor("#ff8a80");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageColor("#ff8a80");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageColor("#ff8a80");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/auth/reset-password", {
        contactNo,
        securityAnswer,
        newPassword
      });
      setMessage("Password reset successful! Redirecting to login...");
      setMessageColor("#81c784");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed.");
      setMessageColor("#ff8a80");
    } finally {
      setIsLoading(false);
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
        }

        .step-indicator {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .step {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        .step.active {
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }
      `}</style>

      <div className="auth-page-container">
        <div className="auth-bg-layer"></div>
        <div className="auth-glass-card">
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Reset Password</h2>
            <p style={{ color: "var(--accent)", fontSize: "0.9rem", opacity: 0.9 }}>Recover your account access</p>
          </div>

          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}></div>
          </div>

          {step === 1 && (
            <form onSubmit={handleVerifyUser}>
              <div className="auth-input-wrapper">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  maxLength="10"
                  placeholder="Enter Contact No"
                  className="auth-input"
                  required
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value.replace(/[^0-9]/g, ""))}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: "100%", padding: "1.1rem", borderRadius: "15px" }}>
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Find Account"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "15px", textAlign: "center" }}>
                <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>Security Question</p>
                <p style={{ fontWeight: 600 }}>{securityQuestion}</p>
              </div>

              <div className="auth-input-wrapper">
                <i className="fas fa-key"></i>
                <input
                  type="text"
                  placeholder="Your Answer"
                  className="auth-input"
                  required
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                />
              </div>

              <div className="auth-input-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="New Password"
                  className="auth-input"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="auth-input-wrapper">
                <i className="fas fa-check-circle"></i>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="auth-input"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: "100%", padding: "1.1rem", borderRadius: "15px" }}>
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Reset Password"}
              </button>
              
              <button type="button" onClick={() => setStep(1)} style={{ width: "100%", background: "none", border: "none", color: "white", opacity: 0.6, marginTop: "1rem", cursor: "pointer" }}>
                Go Back
              </button>
            </form>
          )}

          {message && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", borderLeft: `4px solid ${messageColor}`, fontSize: "0.9rem", color: messageColor, textAlign: "center" }}>
              {message}
            </div>
          )}

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.95rem" }}>
            <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Back to Login</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
