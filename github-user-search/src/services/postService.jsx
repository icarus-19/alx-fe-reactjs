import api from './api';

export const postService = {
  // Get all posts
  getPosts: async (params = {}) => {
    try {
      const response = await api.get('/posts', { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  },

  // Get post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch post ${id}: ${error.message}`);
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  },

  // Get post comments
  getPostComments: async (postId) => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch comments for post ${postId}: ${error.message}`);
    }
  }
};