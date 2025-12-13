import React from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './Profile.css';

// ProfileDetails Component
const ProfileDetails = () => {
  const userData = {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Senior Frontend Developer with 8+ years of experience in React ecosystem. Passionate about creating beautiful and performant web applications.',
    birthDate: '1990-05-15',
    occupation: 'Senior Frontend Engineer',
    company: 'Tech Innovations Inc.',
    website: 'https://alexjohnson.dev',
    github: 'alexjohnson',
    twitter: '@alexj',
    joinDate: 'March 15, 2020',
    lastLogin: 'Today, 10:30 AM',
  };

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="details-container">
        <div className="details-section">
          <h3>Personal Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{userData.fullName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{userData.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{userData.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Birth Date:</span>
              <span className="detail-value">{userData.birthDate}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>Professional Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Occupation:</span>
              <span className="detail-value">{userData.occupation}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Company:</span>
              <span className="detail-value">{userData.company}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Website:</span>
              <a href={userData.website} className="detail-link">{userData.website}</a>
            </div>
            <div className="detail-item">
              <span className="detail-label">GitHub:</span>
              <a href={`https://github.com/${userData.github}`} className="detail-link">{userData.github}</a>
            </div>
            <div className="detail-item">
              <span className="detail-label">Twitter:</span>
              <a href={`https://twitter.com/${userData.twitter.replace('@', '')}`} className="detail-link">{userData.twitter}</a>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>About Me</h3>
          <div className="bio-container">
            <p>{userData.bio}</p>
          </div>
        </div>

        <div className="details-section">
          <h3>Account Information</h3>
          <div className="account-info">
            <div className="detail-item">
              <span className="detail-label">Member Since:</span>
              <span className="detail-value">{userData.joinDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Login:</span>
              <span className="detail-value">{userData.lastLogin}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Account Status:</span>
              <span className="detail-value status-active">Active</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Verified:</span>
              <span className="detail-value status-verified">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProfileSettings Component
const ProfileSettings = () => {
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    privacyMode: 'friends',
    language: 'english',
    timezone: 'America/Los_Angeles',
    theme: 'light',
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    console.log('Current settings:', settings);
  };

  const handleResetSettings = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: false,
      newsletter: true,
      privacyMode: 'friends',
      language: 'english',
      timezone: 'America/Los_Angeles',
      theme: 'light',
      twoFactorAuth: false,
      loginAlerts: true,
    });
    alert('Settings reset to default values');
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      
      <div className="settings-container">
        <div className="settings-section">
          <h3>Notification Preferences</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive email updates about your account activity</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Push Notifications</h4>
                <p>Receive browser notifications for important updates</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Newsletter Subscription</h4>
                <p>Receive weekly newsletter with updates and tips</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.newsletter}
                  onChange={() => handleToggle('newsletter')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Login Alerts</h4>
                <p>Get notified about new sign-ins to your account</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.loginAlerts}
                  onChange={() => handleToggle('loginAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy & Security</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Profile Visibility</h4>
                <p>Control who can see your profile information</p>
              </div>
              <select
                value={settings.privacyMode}
                onChange={(e) => handleSelectChange('privacyMode', e.target.value)}
                className="setting-select"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Display Preferences</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Language</h4>
                <p>Select your preferred language</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Theme</h4>
                <p>Choose your application theme</p>
              </div>
              <div className="theme-options">
                <button
                  className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleSelectChange('theme', 'light')}
                >
                  Light
                </button>
                <button
                  className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleSelectChange('theme', 'dark')}
                >
                  Dark
                </button>
                <button
                  className={`theme-option ${settings.theme === 'auto' ? 'active' : ''}`}
                  onClick={() => handleSelectChange('theme', 'auto')}
                >
                  Auto
                </button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Timezone</h4>
                <p>Set your local timezone</p>
              </div>
              <select
                value={settings.timezone}
                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                className="setting-select"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSaveSettings}>
          Save Settings
        </button>
        <button className="reset-btn" onClick={handleResetSettings}>
          Reset to Default
        </button>
        <button className="cancel-btn" onClick={() => window.history.back()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

// Main Profile Layout Component
const ProfileLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-layout">
      <div className="profile-header">
        <h1>User Profile Dashboard</h1>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>

      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="user-card">
            <div className="user-avatar">AJ</div>
            <div className="user-info">
              <h3>Alex Johnson</h3>
              <p className="user-email">alex.johnson@example.com</p>
              <p className="user-status">Premium Member</p>
            </div>
          </div>

          <nav className="profile-nav">
            <h4>Profile Navigation</h4>
            <ul>
              <li>
                <Link to="/profile" end className="nav-link">
                  <span className="nav-icon">📊</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile/details" className="nav-link">
                  <span className="nav-icon">👤</span>
                  Profile Details
                </Link>
              </li>
              <li>
                <Link to="/profile/settings" className="nav-link">
                  <span className="nav-icon">⚙️</span>
                  Profile Settings
                </Link>
              </li>
              <li>
                <Link to="/profile/security" className="nav-link">
                  <span className="nav-icon">🔒</span>
                  Security
                </Link>
              </li>
              <li>
                <Link to="/profile/activity" className="nav-link">
                  <span className="nav-icon">📈</span>
                  Activity Log
                </Link>
              </li>
              <li>
                <Link to="/profile/billing" className="nav-link">
                  <span className="nav-icon">💳</span>
                  Billing
                </Link>
              </li>
            </ul>
          </nav>

          <div className="profile-stats">
            <h4>Quick Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">42</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">128</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">56</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="profile-content">
          <Routes>
            <Route path="/" element={<ProfileDashboard />} />
            <Route path="/details" element={<ProfileDetails />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/billing" element={<BillingSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Additional Profile Components
const ProfileDashboard = () => {
  return (
    <div className="profile-dashboard">
      <h2>Profile Dashboard</h2>
      <div className="dashboard-content">
        <div className="welcome-card">
          <h3>Welcome back, Alex! 👋</h3>
          <p>Here's an overview of your profile and recent activity.</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-number">15</div>
              <div className="stat-title">Posts this month</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-content">
              <div className="stat-number">1.2K</div>
              <div className="stat-title">Profile views</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <div className="stat-number">89</div>
              <div className="stat-title">Comments</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-number">256</div>
              <div className="stat-title">Likes received</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/profile/details" className="action-card">
              <span className="action-icon">✏️</span>
              <span className="action-text">Edit Profile</span>
            </Link>
            <Link to="/profile/settings" className="action-card">
              <span className="action-icon">⚙️</span>
              <span className="action-text">Update Settings</span>
            </Link>
            <Link to="/profile/security" className="action-card">
              <span className="action-icon">🔒</span>
              <span className="action-text">Security Settings</span>
            </Link>
            <button className="action-card" onClick={() => alert('Coming soon!')}>
              <span className="action-icon">📤</span>
              <span className="action-text">Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  return (
    <div className="security-settings">
      <h2>Security Settings</h2>
      <p>Security settings will be implemented here.</p>
    </div>
  );
};

const ActivityLog = () => {
  return (
    <div className="activity-log">
      <h2>Activity Log</h2>
      <p>Activity log will be displayed here.</p>
    </div>
  );
};

const BillingSettings = () => {
  return (
    <div className="billing-settings">
      <h2>Billing Settings</h2>
      <p>Billing settings will be implemented here.</p>
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  return (
    <div className="profile-wrapper">
      <Routes>
        <Route path="/*" element={<ProfileLayout />} />
      </Routes>
    </div>
  );
};

export default Profile;
export { ProfileDetails, ProfileSettings };