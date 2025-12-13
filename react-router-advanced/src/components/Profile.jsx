import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate, Outlet } from 'react-router-dom';
import './Profile.css';

// Profile Details Component
const ProfileDetails = () => {
  const profileData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Senior Frontend Developer with 8+ years of experience in React ecosystem. Passionate about creating beautiful and performant web applications.',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    birthdate: '1990-05-15',
    occupation: 'Senior Frontend Engineer',
    company: 'Tech Innovations Inc.',
    website: 'https://alexjohnson.dev',
    joinDate: 'March 2020',
  };

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Full Name:</span>
          <span className="detail-value">{profileData.name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{profileData.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{profileData.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{profileData.phone}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Birth Date:</span>
          <span className="detail-value">{profileData.birthdate}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Occupation:</span>
          <span className="detail-value">{profileData.occupation}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Company:</span>
          <span className="detail-value">{profileData.company}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Website:</span>
          <a href={profileData.website} className="detail-link">{profileData.website}</a>
        </div>
      </div>
      
      <div className="bio-section">
        <h3>Bio</h3>
        <p>{profileData.bio}</p>
      </div>
      
      <div className="account-info">
        <h3>Account Information</h3>
        <p><strong>Member since:</strong> {profileData.joinDate}</p>
        <p><strong>Account Status:</strong> <span className="status-active">Active</span></p>
        <p><strong>Last Login:</strong> Today at 10:30 AM</p>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    privacyMode: 'friends',
    language: 'english',
    timezone: 'America/Los_Angeles',
    theme: 'light',
  });

  const handleSettingChange = (key, value) => {
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
    });
    alert('Settings reset to default');
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      
      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <div className="setting-item">
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <div className="setting-info">
            <strong>Email Notifications</strong>
            <p>Receive email updates about your account activity</p>
          </div>
        </div>
        
        <div className="setting-item">
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <div className="setting-info">
            <strong>Push Notifications</strong>
            <p>Receive browser notifications for important updates</p>
          </div>
        </div>
        
        <div className="setting-item">
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={(e) => handleSettingChange('newsletter', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <div className="setting-info">
            <strong>Newsletter Subscription</strong>
            <p>Receive weekly newsletter with updates and tips</p>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Privacy Settings</h3>
        <div className="setting-item">
          <div className="setting-info">
            <strong>Profile Visibility</strong>
            <p>Control who can see your profile information</p>
          </div>
          <select
            value={settings.privacyMode}
            onChange={(e) => handleSettingChange('privacyMode', e.target.value)}
            className="privacy-select"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Display Settings</h3>
        <div className="setting-item">
          <div className="setting-info">
            <strong>Language</strong>
            <p>Select your preferred language</p>
          </div>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="language-select"
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
            <strong>Theme</strong>
            <p>Choose your application theme</p>
          </div>
          <div className="theme-selector">
            <button
              className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
              onClick={() => handleSettingChange('theme', 'light')}
            >
              Light
            </button>
            <button
              className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleSettingChange('theme', 'dark')}
            >
              Dark
            </button>
            <button
              className={`theme-btn ${settings.theme === 'auto' ? 'active' : ''}`}
              onClick={() => handleSettingChange('theme', 'auto')}
            >
              Auto
            </button>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <strong>Timezone</strong>
            <p>Set your local timezone</p>
          </div>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="timezone-select"
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

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSaveSettings}>
          Save Settings
        </button>
        <button className="reset-btn" onClick={handleResetSettings}>
          Reset to Default
        </button>
      </div>
    </div>
  );
};

// Profile Layout Component
const ProfileLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-layout">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button className="back-home-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
      
      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="user-summary">
            <div className="user-avatar">
              <span>AJ</span>
            </div>
            <div className="user-info">
              <h3>Alex Johnson</h3>
              <p className="user-role">Senior Frontend Developer</p>
              <p className="user-email">alex.johnson@example.com</p>
            </div>
          </div>
          
          <nav className="profile-nav">
            <ul>
              <li>
                <Link to="/profile" end className="nav-link">
                  <span className="nav-icon">👤</span>
                  Profile Overview
                </Link>
              </li>
              <li>
                <Link to="/profile/details" className="nav-link">
                  <span className="nav-icon">📋</span>
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
                <Link to="/profile/activity" className="nav-link">
                  <span className="nav-icon">📊</span>
                  Activity Log
                </Link>
              </li>
              <li>
                <Link to="/profile/security" className="nav-link">
                  <span className="nav-icon">🔒</span>
                  Security
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="profile-stats">
            <div className="stat">
              <div className="stat-number">128</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat">
              <div className="stat-number">1.2K</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat">
              <div className="stat-number">856</div>
              <div className="stat-label">Following</div>
            </div>
          </div>
        </aside>
        
        <main className="profile-content">
          <Routes>
            <Route path="/" element={<ProfileOverview />} />
            <Route path="/details" element={<ProfileDetails />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Additional Profile Components
const ProfileOverview = () => {
  return (
    <div className="profile-overview">
      <h2>Profile Overview</h2>
      <div className="overview-content">
        <div className="welcome-section">
          <h3>Welcome back, Alex! 👋</h3>
          <p>Here's a quick overview of your profile and recent activities.</p>
        </div>
        
        <div className="overview-stats">
          <div className="overview-stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-value">15</div>
              <div className="stat-title">Posts this month</div>
            </div>
          </div>
          <div className="overview-stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">42</div>
              <div className="stat-title">New followers</div>
            </div>
          </div>
          <div className="overview-stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <div className="stat-value">89</div>
              <div className="stat-title">Comments</div>
            </div>
          </div>
          <div className="overview-stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">256</div>
              <div className="stat-title">Likes received</div>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/profile/details" className="action-btn">
              Edit Profile Details
            </Link>
            <Link to="/profile/settings" className="action-btn">
              Update Settings
            </Link>
            <Link to="/profile/security" className="action-btn">
              Security Settings
            </Link>
            <button className="action-btn" onClick={() => alert('Feature coming soon!')}>
              Download Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityLog = () => {
  const activities = [
    { id: 1, action: 'Updated profile picture', time: '2 hours ago', icon: '🖼️' },
    { id: 2, action: 'Changed email settings', time: '1 day ago', icon: '📧' },
    { id: 3, action: 'Posted new article', time: '2 days ago', icon: '📝' },
    { id: 4, action: 'Changed password', time: '1 week ago', icon: '🔐' },
    { id: 5, action: 'Connected GitHub account', time: '1 week ago', icon: '💻' },
    { id: 6, action: 'Updated privacy settings', time: '2 weeks ago', icon: '👁️' },
  ];

  return (
    <div className="activity-log">
      <h2>Activity Log</h2>
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <div className="activity-action">{activity.action}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const [security, setSecurity] = React.useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordLastChanged: '2024-01-15',
  });

  return (
    <div className="security-settings">
      <h2>Security Settings</h2>
      
      <div className="security-section">
        <h3>Two-Factor Authentication</h3>
        <div className="security-item">
          <div className="security-info">
            <strong>Enable 2FA</strong>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={security.twoFactorAuth}
              onChange={(e) => setSecurity(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="security-section">
        <h3>Login Security</h3>
        <div className="security-item">
          <div className="security-info">
            <strong>Login Alerts</strong>
            <p>Get notified about new sign-ins</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={security.loginAlerts}
              onChange={(e) => setSecurity(prev => ({ ...prev, loginAlerts: e.target.checked }))}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="security-item">
          <div className="security-info">
            <strong>Session Timeout</strong>
            <p>Automatically log out after inactivity (minutes)</p>
          </div>
          <select
            value={security.sessionTimeout}
            onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
            className="session-select"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="240">4 hours</option>
          </select>
        </div>
      </div>

      <div className="security-section">
        <h3>Password Information</h3>
        <div className="password-info">
          <p><strong>Last Password Change:</strong> {security.passwordLastChanged}</p>
          <p><strong>Password Strength:</strong> <span className="strength-strong">Strong</span></p>
          <button className="change-password-btn">Change Password</button>
        </div>
      </div>

      <div className="security-actions">
        <button className="save-btn" onClick={() => alert('Security settings saved!')}>
          Save Security Settings
        </button>
      </div>
    </div>
  );
};

// Main Profile Component with Routes
const Profile = () => {
  return (
    <Routes>
      <Route path="/*" element={<ProfileLayout />}>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
};

export default Profile;