import React, { useState } from 'react';

const Search = ({ onSearch, loading = false }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Validate username
  const validateUsername = (username) => {
    if (!username.trim()) {
      return 'Username cannot be empty';
    }
    if (username.length > 39) {
      return 'Username must be less than 39 characters';
    }
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
      return 'Invalid GitHub username format';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Call parent component's search function
    if (onSearch) {
      onSearch(username.trim());
    }
  };

  // Handle clear button
  const handleClear = () => {
    setUsername('');
    setError('');
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <div style={labelContainerStyle}>
            <label htmlFor="github-username" style={labelStyle}>
              GitHub Username
            </label>
            {username && (
              <span style={charCountStyle}>
                {username.length}/39
              </span>
            )}
          </div>
          
          <div style={inputContainerStyle}>
            <input
              id="github-username"
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username (e.g., octocat)"
              disabled={loading}
              style={{
                ...inputStyle,
                ...(error ? errorInputStyle : {}),
                ...(loading ? disabledInputStyle : {})
              }}
              autoComplete="off"
              spellCheck="false"
            />
            
            {/* Search Icon */}
            <span style={searchIconStyle}>
              🔍
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div style={errorStyle}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={buttonGroupStyle}>
          <button
            type="button"
            onClick={handleClear}
            disabled={loading || !username}
            style={{
              ...buttonStyle,
              ...secondaryButtonStyle,
              ...((loading || !username) ? disabledButtonStyle : {})
            }}
          >
            Clear
          </button>
          
          <button
            type="submit"
            disabled={loading || !username.trim()}
            style={{
              ...buttonStyle,
              ...primaryButtonStyle,
              ...((loading || !username.trim()) ? disabledButtonStyle : {})
            }}
          >
            {loading ? (
              <span style={loadingContentStyle}>
                <span style={spinnerStyle}></span>
                Searching...
              </span>
            ) : (
              'Search GitHub'
            )}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div style={helpTextStyle}>
        <p>💡 <strong>Examples:</strong> octocat, torvalds, gaearon, mui</p>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const labelStyle = {
  fontWeight: '600',
  fontSize: '0.9rem',
  color: '#2d3748',
};

const charCountStyle = {
  fontSize: '0.8rem',
  color: '#718096',
};

const inputContainerStyle = {
  position: 'relative',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 3rem 0.75rem 1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const errorInputStyle = {
  borderColor: '#e53e3e',
  backgroundColor: '#fff5f5',
};

const disabledInputStyle = {
  backgroundColor: '#f7fafc',
  cursor: 'not-allowed',
  opacity: 0.7,
};

const searchIconStyle = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.2rem',
  pointerEvents: 'none',
};

const errorStyle = {
  color: '#e53e3e',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const primaryButtonStyle = {
  backgroundColor: '#3182ce',
  color: 'white',
};

const secondaryButtonStyle = {
  backgroundColor: '#e2e8f0',
  color: '#4a5568',
};

const disabledButtonStyle = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

const loadingContentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const spinnerStyle = {
  width: '16px',
  height: '16px',
  border: '2px solid transparent',
  borderTop: '2px solid currentColor',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const helpTextStyle = {
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: '#f7fafc',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
};

// Add CSS animation
const styles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Search;