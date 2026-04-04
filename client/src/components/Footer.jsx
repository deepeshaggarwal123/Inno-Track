import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <i className="fas fa-seedling"></i> Inno-Track
            </div>
            <p>
              Empowering farmers worldwide with precision technology and
              sustainable practices for a greener tomorrow.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <a href="#">Our Journey</a>
              </li>
              <li>
                <a href="#">Media Kit</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Solutions</h4>
            <ul>
              <li>
                <Link to="/crop-health">Crop Health</Link>
              </li>
              <li>
                <Link to="/irrigation">Irrigation</Link>
              </li>
              <li>
                <Link to="/pre-sowing">Pre-Sowing</Link>
              </li>
              <li>
                <Link to="/farm-mapping">Farm Mapping</Link>
              </li>
              <li>
                <Link to="/yield-profit">Yield & Profit</Link>
              </li>
              <li>
                <Link to="/pest-alerts">Pest Alerts</Link>
              </li>
              <li>
                <Link to="/ai-assistant">AI Assistant</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 Inno-Track AI. All rights reserved. | Sustainable
            Precision Agriculture
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
