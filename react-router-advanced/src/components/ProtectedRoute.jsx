import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Create a mock auth hook (you can replace this with your actual auth logic)
const useAuth = () => {
  // In a real app, this would check for authentication tokens, user sessions, etc.
  // For demo purposes, we'll check localStorage or use a mock state
  
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    // Check localStorage on initial render
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  const [user, setUser] = React.useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
};

// ProtectedRoute Component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const auth = useAuth();
  const location = useLocation();

  // Check if user is authenticated
  if (!auth.isAuthenticated) {
    // Redirect to login page, but save the attempted location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user has required roles (if any specified)
  if (requiredRoles.length > 0 && auth.user) {
    const hasRequiredRole = requiredRoles.some(role => 
      auth.user.roles?.includes(role)
    );
    
    if (!hasRequiredRole) {
      // Redirect to unauthorized page or home
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If authenticated and authorized, render the children
  return children;
};

// Login Component for demonstration
const Login = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from || '/';

  const handleLogin = () => {
    const mockUser = {
      id: 1,
      username: 'demo_user',
      email: 'demo@example.com',
      roles: ['user', 'admin']
    };
    
    auth.login(mockUser);
    navigate(from, { replace: true });
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 2,
      username: 'guest_user',
      email: 'guest@example.com',
      roles: ['user']
    };
    
    auth.login(guestUser);
    navigate(from, { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>You need to login to access the requested page.</p>
      <div className="login-buttons">
        <button className="login-btn" onClick={handleLogin}>
          Login as Admin
        </button>
        <button className="guest-btn" onClick={handleGuestLogin}>
          Login as Guest
        </button>
      </div>
      <p className="login-info">
        Trying to access: <code>{from}</code>
      </p>
    </div>
  );
};

// Unauthorized Component
const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <button onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

// Logout Component
const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    auth.logout();
    navigate('/login');
  }, [auth, navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>You are being logged out.</p>
    </div>
  );
};

// Auth Status Component (for debugging)
const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-status">
      <h3>Authentication Status</h3>
      <div className="status-info">
        <p><strong>Is Authenticated:</strong> {auth.isAuthenticated ? 'Yes' : 'No'}</p>
        {auth.user && (
          <>
            <p><strong>Username:</strong> {auth.user.username}</p>
            <p><strong>Email:</strong> {auth.user.email}</p>
            <p><strong>Roles:</strong> {auth.user.roles?.join(', ')}</p>
          </>
        )}
      </div>
      <div className="auth-actions">
        {auth.isAuthenticated ? (
          <button onClick={() => navigate('/logout')}>
            Logout
          </button>
        ) : (
          <button onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

// Update App.jsx to use ProtectedRoute
const AppWithProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRoles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute requiredRoles={['user', 'admin']}>
            <Settings />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute requiredRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        } />
        
        {/* Auth Debug Route */}
        <Route path="/auth-status" element={
          <ProtectedRoute>
            <AuthStatus />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Example usage of ProtectedRoute with different components
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! This is a protected route.</p>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <p>User settings page. Protected route.</p>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>Admin-only area. Protected route with admin role required.</p>
    </div>
  );
};

// Alternative: Higher-Order Component version
const withProtectedRoute = (WrappedComponent, requiredRoles = []) => {
  return (props) => (
    <ProtectedRoute requiredRoles={requiredRoles}>
      <WrappedComponent {...props} />
    </ProtectedRoute>
  );
};

// Usage example:
const ProtectedProfile = withProtectedRoute(Profile, ['user']);
const ProtectedAdminPanel = withProtectedRoute(AdminPanel, ['admin']);

// Export everything
export default ProtectedRoute;
export { 
  useAuth, 
  Login, 
  Logout, 
  Unauthorized, 
  AuthStatus,
  withProtectedRoute 
};
