import api from './api';

export const postService = {
  /**
   * Get all posts
   * @param {Object} params - Query parameters (page, limit, etc.)
   * @returns {Promise} Array of posts
   */
  getPosts: async (params = {}) => {
    try {
      const response = await api.get('/posts', { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  },

  /**
   * Get post by ID
   * @param {number} id - Post ID
   * @returns {Promise} Post object
   */
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch post ${id}: ${error.message}`);
    }
  },

  /**
   * Create new post
   * @param {Object} postData - Post data
   * @returns {Promise} Created post
   */
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  },

  /**
   * Update post
   * @param {number} id - Post ID
   * @param {Object} postData - Updated post data
   * @returns {Promise} Updated post
   */
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update post ${id}: ${error.message}`);
    }
  },

  /**
   * Delete post
   * @param {number} id - Post ID
   * @returns {Promise} Delete result
   */
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete post ${id}: ${error.message}`);
    }
  },

  /**
   * Get comments for a post
   * @param {number} postId - Post ID
   * @returns {Promise} Array of comments
   */
  getPostComments: async (postId) => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch comments for post ${postId}: ${error.message}`);
    }
  },

  /**
   * Add comment to post
   * @param {number} postId - Post ID
   * @param {Object} commentData - Comment data
   * @returns {Promise} Created comment
   */
  addComment: async (postId, commentData) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add comment to post ${postId}: ${error.message}`);
    }
  }
};