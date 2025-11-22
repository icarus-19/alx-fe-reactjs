import api from './api';

export const authService = {
  // Simulate login
  login: async (email, password) => {
    // In a real app, this would be an actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          const user = {
            id: 1,
            email: email,
            name: 'John Doe',
            token: 'fake-jwt-token'
          };
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Register new user
  register: async (userData) => {
    try {
      // Simulate API call
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};