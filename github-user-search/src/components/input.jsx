import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  ...props
}) => {
  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={requiredStyle}> *</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          ...inputStyle,
          ...(error ? errorInputStyle : {}),
        }}
        {...props}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
};

const labelStyle = {
  fontWeight: '600',
  fontSize: '0.9rem',
};

const requiredStyle = {
  color: '#e74c3c',
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #bdc3c7',
  borderRadius: '4px',
  fontSize: '1rem',
  transition: 'border-color 0.2s ease',
};

const errorInputStyle = {
  borderColor: '#e74c3c',
};

const errorStyle = {
  color: '#e74c3c',
  fontSize: '0.8rem',
  marginTop: '0.25rem',
};

export default Input;