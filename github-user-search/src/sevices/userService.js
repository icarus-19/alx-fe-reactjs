import api from './api';

export const userService = {
  // Get all users
  getUsers: () => api.get('/users'),
  
  // Get user by ID
  getUserById: (id) => api.get(`/users/${id}`),
  
  // Create new user
  createUser: (userData) => api.post('/users', userData),
  
  // Update user
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => api.delete(`/users/${id}`),
  
  // Get user posts
  getUserPosts: (userId) => api.get(`/users/${userId}/posts`),
  
  // Get user albums
  getUserAlbums: (userId) => api.get(`/users/${userId}/albums`),
};