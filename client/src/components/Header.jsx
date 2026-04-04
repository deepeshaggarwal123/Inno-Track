import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  
  // Choose background based on whether it is Home page hero or other pages
  const isHome = location.pathname === '/';
  const headerStyle = {
    background: isScrolled 
      ? 'var(--grad-blue)' 
      : (isHome ? 'rgba(26, 60, 94, 0.6)' : 'var(--grad-blue)'),
    boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
    borderBottom: isScrolled ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)'
  };

  return (
    <header id="main-header" className={isScrolled ? 'scrolled' : ''} style={headerStyle}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <i className="fas fa-seedling"></i> Inno-Track
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            </li>
            <li className="dropdown">
              <span className="dropdown-trigger">
                Solutions <i className="fas fa-chevron-down"></i>
              </span>
              <div className="dropdown-menu">
                <Link to="/crop-health">Crop Health</Link>
                <Link to="/irrigation">Smart Irrigation</Link>
                <Link to="/pre-sowing">Pre-Sowing Advisory</Link>
                <Link to="/farm-mapping">Precision Mapping</Link>
                <Link to="/yield-profit">Yield Prediction</Link>
                <Link to="/pest-alerts">Pest Alerts</Link>
                <Link to="/ai-assistant">AI Assistant</Link>
              </div>
            </li>
            <li>
              <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            </li>
            <li>
              <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="nav-btns">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline" style={{ borderColor: 'var(--accent)', color: 'var(--white)' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ background: 'var(--grad-green)' }}>Get Started</Link>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <Link to="/profile" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', opacity: 0.9, textDecoration: 'none' }}>
                Hi, {user.name ? user.name.split(' ')[0] : 'User'}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', borderColor: 'var(--accent)' }}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


