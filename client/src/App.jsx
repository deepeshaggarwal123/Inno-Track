import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Home from './Home';
import AadhaarLogin from './AadhaarLogin';
import AadhaarRegister from './AadhaarRegister';
import CropHealthMonitoring from './CropHealthMonitoring';
import IrrigationDashboard from './IrrigationDashboard';
import FarmMapping from './FarmMapping';
import AIFarmingAssistant from './AIFarmingAssistant';
import PestDiseaseAlerts from './PestDiseaseAlerts';
import PreSowingAdvisory from './PreSowingAdvisory';
import YieldProfitForecast from './YieldProfitForecast';
import AboutPage from './AboutPage';
import ContactPage from './contactPage';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AadhaarLogin />} />
        <Route path="/register" element={<AadhaarRegister />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/crop-health" element={<ProtectedRoute><CropHealthMonitoring /></ProtectedRoute>} />
        <Route path="/irrigation" element={<ProtectedRoute><IrrigationDashboard /></ProtectedRoute>} />
        <Route path="/farm-mapping" element={<ProtectedRoute><FarmMapping /></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ProtectedRoute><AIFarmingAssistant /></ProtectedRoute>} />
        <Route path="/pest-alerts" element={<ProtectedRoute><PestDiseaseAlerts /></ProtectedRoute>} />
        <Route path="/pre-sowing" element={<ProtectedRoute><PreSowingAdvisory /></ProtectedRoute>} />
        <Route path="/yield-profit" element={<ProtectedRoute><YieldProfitForecast /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;



