import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#3498db' }) => {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px',
  };

  const spinnerStyle = {
    border: `4px solid #f3f3f3`,
    borderTop: `4px solid ${color}`,
    borderRadius: '50%',
    width: sizes[size],
    height: sizes[size],
    animation: 'spin 1s linear infinite',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;