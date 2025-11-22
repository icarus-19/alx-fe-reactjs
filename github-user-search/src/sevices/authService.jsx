import api from './api';

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'user@example.com' && password === 'password') {
        const user = {
          id: 1,
          email: email,
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=1',
          token: 'fake-jwt-token-12345'
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('User logged out successfully');
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check authentication
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
