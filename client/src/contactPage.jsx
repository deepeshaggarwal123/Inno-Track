import React, { useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Toast from "./components/Toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Thank you for contacting us! We will get back to you shortly.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        showToast("Failed to submit inquiry. Please try again later.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred. Please try again.", "error");
    }
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
      <main className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "left", marginLeft: 0 }}>
            <h2 style={{ fontSize: "3rem" }}>Get in Touch</h2>
            <p>
              Have questions about how Inno-Track can transform your farm? Our
              experts are here to help.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", marginTop: "40px" }}>
            <div className="contact-info-list">
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
                <div className="feature-icon" style={{ borderRadius: "12px", width: "50px", height: "50px", flexShrink: 0 }}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 style={{ color: "var(--primary)" }}>Email Us</h4>
                  <p style={{ color: "var(--text-muted)" }}>support@innotrack-ai.com</p>
                  <p style={{ color: "var(--text-muted)" }}>sales@innotrack-ai.com</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
                <div className="feature-icon" style={{ borderRadius: "12px", width: "50px", height: "50px", flexShrink: 0 }}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 style={{ color: "var(--primary)" }}>Call Us</h4>
                  <p style={{ color: "var(--text-muted)" }}>+1 (555) 123-4567</p>
                  <p style={{ color: "var(--text-muted)" }}>Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
                <div className="feature-icon" style={{ borderRadius: "12px", width: "50px", height: "50px", flexShrink: 0 }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 style={{ color: "var(--primary)" }}>Global HQ</h4>
                  <p style={{ color: "var(--text-muted)" }}>Tech Plaza Agriculture Hub</p>
                  <p style={{ color: "var(--text-muted)" }}>Silicon Valley, CA 94025</p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ background: "white", color: "var(--text-main)" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ddd" }}
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ddd" }}
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ddd" }}
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Subject</label>
                  <select
                    name="subject"
                    style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ddd" }}
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales & Partnerships</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Message</label>
                  <textarea
                    name="message"
                    style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ddd" }}
                    rows="5"
                    placeholder="How can we help you?"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default ContactPage;