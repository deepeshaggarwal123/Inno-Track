import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  };

  const colors = {
    success: 'var(--secondary)',
    error: '#ef4444',
    info: 'var(--primary)'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 30, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 9999,
            border: `1px solid rgba(0,0,0,0.05)`,
            minWidth: '350px',
            color: 'var(--text-main)',
            fontWeight: 600
          }}
        >
          <i className={icons[type]} style={{ color: colors[type], fontSize: '1.4rem' }}></i>
          <span style={{ flex: 1 }}>{message}</span>
          <button 
            onClick={onClose}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-muted)',
              fontSize: '1.2rem',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
