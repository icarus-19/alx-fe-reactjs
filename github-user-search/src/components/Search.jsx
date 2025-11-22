import React, { useState } from 'react';

const Search = ({ onSearch, loading = false, userData = null, error = null }) => {
  const [username, setUsername] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const handleClear = () => {
    setUsername('');
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="github-username" style={labelStyle}>
            GitHub Username
          </label>
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
                ...(loading ? disabledInputStyle : {})
              }}
            />
            <span style={searchIconStyle}>
              🔍
            </span>
          </div>
        </div>

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
                <LoadingSpinner />
                Searching...
              </span>
            ) : (
              'Search GitHub'
            )}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div style={loadingContainerStyle}>
          <LoadingSpinner size="large" />
          <p style={loadingTextStyle}>Searching for user...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={errorContainerStyle}>
          <div style={errorIconStyle}>❌</div>
          <div>
            <h3 style={errorTitleStyle}>Search Failed</h3>
            <p style={errorMessageStyle}>{error}</p>
            <p style={helpTextStyle}>Looks like we can't find the user. Please check the username and try again.</p>
          </div>
        </div>
      )}

      {/* User Data Display */}
      {userData && !loading && !error && (
        <div style={userCardStyle}>
          <div style={userHeaderStyle}>
            <img 
              src={userData.avatar_url} 
              alt={userData.login}
              style={avatarStyle}
            />
            <div style={userInfoStyle}>
              <h2 style={userNameStyle}>
                {userData.name || userData.login}
              </h2>
              <p style={userLoginStyle}>@{userData.login}</p>
              {userData.bio && (
                <p style={userBioStyle}>{userData.bio}</p>
              )}
            </div>
          </div>

          <div style={userStatsStyle}>
            <div style={statItemStyle}>
              <strong>{userData.public_repos}</strong>
              <span>Repositories</span>
            </div>
            <div style={statItemStyle}>
              <strong>{userData.followers}</strong>
              <span>Followers</span>
            </div>
            <div style={statItemStyle}>
              <strong>{userData.following}</strong>
              <span>Following</span>
            </div>
          </div>

          {userData.location && (
            <div style={userMetaStyle}>
              <span>📍 {userData.location}</span>
            </div>
          )}

          <div style={profileLinkStyle}>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
            >
              View Full Profile on GitHub →
            </a>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div style={helpSectionStyle}>
        <p style={helpTitleStyle}>💡 Popular GitHub Users to Search:</p>
        <div style={exampleUsersStyle}>
          {['octocat', 'torvalds', 'gaearon', 'defunkt', 'mojombo'].map((user) => (
            <button
              key={user}
              type="button"
              onClick={() => setUsername(user)}
              style={exampleUserButtonStyle}
            >
              {user}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: '20px',
    medium: '24px',
    large: '32px'
  };

  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #3182ce',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
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
  marginBottom: '2rem',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyle = {
  fontWeight: '600',
  fontSize: '0.9rem',
  color: '#2d3748',
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

const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '3rem',
  backgroundColor: '#f7fafc',
  borderRadius: '12px',
  border: '2px dashed #e2e8f0',
};

const loadingTextStyle = {
  color: '#4a5568',
  fontSize: '1.1rem',
  margin: 0,
};

const errorContainerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  padding: '2rem',
  backgroundColor: '#fed7d7',
  border: '1px solid #feb2b2',
  borderRadius: '12px',
  marginBottom: '2rem',
};

const errorIconStyle = {
  fontSize: '2rem',
  flexShrink: 0,
};

const errorTitleStyle = {
  color: '#c53030',
  margin: '0 0 0.5rem 0',
  fontSize: '1.2rem',
};

const errorMessageStyle = {
  color: '#742a2a',
  margin: '0 0 0.5rem 0',
  fontWeight: '500',
};

const helpTextStyle = {
  color: '#742a2a',
  margin: 0,
  fontSize: '0.9rem',
  opacity: 0.8,
};

const userCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0',
  marginBottom: '2rem',
};

const userHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.5rem',
  marginBottom: '1.5rem',
};

const avatarStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '3px solid #e2e8f0',
};

const userInfoStyle = {
  flex: 1,
};

const userNameStyle = {
  margin: '0 0 0.25rem 0',
  color: '#2d3748',
  fontSize: '1.5rem',
};

const userLoginStyle = {
  margin: '0 0 0.5rem 0',
  color: '#718096',
  fontSize: '1.1rem',
};

const userBioStyle = {
  margin: '0.5rem 0 0 0',
  color: '#4a5568',
  lineHeight: '1.5',
};

const userStatsStyle = {
  display: 'flex',
  gap: '2rem',
  marginBottom: '1rem',
  padding: '1rem 0',
  borderTop: '1px solid #e2e8f0',
  borderBottom: '1px solid #e2e8f0',
};

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem',
};

const userMetaStyle = {
  marginBottom: '1rem',
  color: '#4a5568',
};

const profileLinkStyle = {
  textAlign: 'center',
};

const linkStyle = {
  color: '#3182ce',
  textDecoration: 'none',
  fontWeight: '600',
};

const helpSectionStyle = {
  padding: '1.5rem',
  backgroundColor: '#f7fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};

const helpTitleStyle = {
  margin: '0 0 1rem 0',
  color: '#2d3748',
  fontSize: '0.9rem',
  fontWeight: '600',
};

const exampleUsersStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
};

const exampleUserButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  border: '1px solid #cbd5e0',
  borderRadius: '4px',
  fontSize: '0.8rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
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