import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'user',
        avatar: 'https://via.placeholder.com/150',
        isLoggedIn: true
      };
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    isAuthenticated,
    hasRole
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;