import axios from 'axios';

// Create axios instance specifically for GitHub API
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor
githubApi.interceptors.request.use(
  (config) => {
    // Add authentication token if available (optional, increases rate limit)
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    
    console.log(`🚀 Making GitHub API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ GitHub API request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
githubApi.interceptors.response.use(
  (response) => {
    console.log(`✅ GitHub API response received: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ GitHub API response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const githubService = {
  /**
   * Fetch user data from GitHub API
   * @param {string} username - GitHub username to search for
   * @returns {Promise} User data from GitHub API
   */
  fetchUserData: async (username) => {
    try {
      if (!username || username.trim() === '') {
        throw new Error('Username cannot be empty');
      }

      const cleanUsername = username.trim();
      console.log(`🔍 Fetching GitHub data for user: ${cleanUsername}`);
      
      const response = await githubApi.get(`/users/${cleanUsername}`);
      console.log('✅ GitHub API response received:', response.data.login);
      
      return response.data;
      
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Unknown error';
        
        switch (status) {
          case 404:
            throw new Error(`User "${username}" not found on GitHub`);
          case 403:
            if (message.includes('rate limit')) {
              throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
            }
            throw new Error('Access forbidden. Please check your authentication.');
          case 401:
            throw new Error('Authentication failed. Please check your access token.');
          case 422:
            throw new Error('Invalid username format.');
          default:
            throw new Error(`GitHub API error: ${status} - ${message}`);
        }
      } else if (error.request) {
        throw new Error('Network error: Unable to reach GitHub API. Check your internet connection.');
      } else {
        throw new Error(`Unexpected error: ${error.message}`);
      }
    }
  },

  /**
   * Search GitHub users with advanced criteria
   * @param {Object} criteria - Search criteria
   * @param {string} criteria.username - Username to search for
   * @param {string} criteria.location - Location filter
   * @param {number} criteria.minRepos - Minimum repositories
   * @param {string} criteria.language - Programming language
   * @returns {Promise} Search results
   */
  searchUsers: async (criteria = {}) => {
    try {
      const { username, location, minRepos, language } = criteria;
      
      // Build search query
      let query = '';
      const queryParts = [];
      
      if (username) {
        queryParts.push(`${username} in:login`);
      }
      if (location) {
        queryParts.push(`location:${location}`);
      }
      if (minRepos) {
        queryParts.push(`repos:>=${minRepos}`);
      }
      if (language) {
        queryParts.push(`language:${language}`);
      }
      
      // If no specific criteria, fall back to a general search
      if (queryParts.length === 0) {
        query = 'followers:>0';
      } else {
        query = queryParts.join(' ');
      }
      
      console.log(`🔍 Searching GitHub users with query: ${query}`);
      
      const response = await githubApi.get('https://api.github.com/search/users', {
        params: {
          q: query,
          per_page: 10,
          sort: 'followers',
          order: 'desc'
        }
      });
      
      console.log(`✅ Found ${response.data.items.length} users`);
      return response.data;
      
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Unknown error';
        
        switch (status) {
          case 403:
            if (message.includes('rate limit')) {
              throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
            }
            throw new Error('Access forbidden for search.');
          case 422:
            throw new Error('Invalid search criteria.');
          default:
            throw new Error(`GitHub search error: ${status} - ${message}`);
        }
      } else if (error.request) {
        throw new Error('Network error: Unable to reach GitHub API.');
      } else {
        throw new Error(`Search failed: ${error.message}`);
      }
    }
  },

  /**
   * Advanced search with multiple users and filtering
   * @param {Object} criteria - Search criteria
   * @returns {Promise} Filtered user data
   */
  advancedSearch: async (criteria = {}) => {
    try {
      const { username, location, minRepos, language } = criteria;
      
      // If we have a specific username, fetch that user directly
      if (username && !location && !minRepos && !language) {
        const userData = await githubService.fetchUserData(username);
        return {
          total_count: 1,
          incomplete_results: false,
          items: [{
            login: userData.login,
            id: userData.id,
            avatar_url: userData.avatar_url,
            url: userData.url,
            html_url: userData.html_url,
            repos: userData.public_repos,
            location: userData.location,
            matches_criteria: true
          }]
        };
      }
      
      // Otherwise, use the search API
      const searchResults = await githubService.searchUsers(criteria);
      
      // Enhance results with additional user data
      const enhancedResults = await Promise.all(
        searchResults.items.slice(0, 5).map(async (user) => {
          try {
            const userDetails = await githubService.fetchUserData(user.login);
            return {
              ...user,
              public_repos: userDetails.public_repos,
              followers: userDetails.followers,
              following: userDetails.following,
              location: userDetails.location,
              bio: userDetails.bio,
              company: userDetails.company,
              blog: userDetails.blog,
              created_at: userDetails.created_at,
              updated_at: userDetails.updated_at
            };
          } catch (error) {
            console.warn(`Could not fetch details for user ${user.login}:`, error.message);
            return user;
          }
        })
      );
      
      return {
        ...searchResults,
        items: enhancedResults
      };
      
    } catch (error) {
      throw new Error(`Advanced search failed: ${error.message}`);
    }
  },

  /**
   * Get user repositories
   * @param {string} username - GitHub username
   * @returns {Promise} User repositories
   */
  fetchUserRepos: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos`, {
        params: {
          sort: 'updated',
          per_page: 10,
          direction: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.response?.data?.message || error.message}`);
    }
  },

  /**
   * Get user followers
   * @param {string} username - GitHub username
   * @returns {Promise} User followers
   */
  fetchUserFollowers: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}/followers`, {
        params: {
          per_page: 20
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch followers: ${error.response?.data?.message || error.message}`);
    }
  },

  /**
   * Get complete user profile with additional data
   * @param {string} username - GitHub username
   * @returns {Promise} Complete user profile
   */
  fetchCompleteUserProfile: async (username) => {
    try {
      const [userData, repos, followers] = await Promise.all([
        githubService.fetchUserData(username),
        githubService.fetchUserRepos(username),
        githubService.fetchUserFollowers(username)
      ]);

      return {
        profile: userData,
        repositories: repos,
        followers: followers,
        summary: {
          publicRepos: userData.public_repos,
          publicGists: userData.public_gists,
          followers: userData.followers,
          following: userData.following,
          accountAge: new Date(userData.created_at).toLocaleDateString()
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch complete profile: ${error.message}`);
    }
  }
};

// Utility functions
export const githubUtils = {
  /**
   * Build GitHub search query from criteria
   * @param {Object} criteria - Search criteria
   * @returns {string} GitHub search query
   */
  buildSearchQuery: (criteria = {}) => {
    const { username, location, minRepos, language } = criteria;
    const queryParts = [];
    
    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:"${location}"`);
    if (minRepos) queryParts.push(`repos:>=${minRepos}`);
    if (language) queryParts.push(`language:${language}`);
    
    return queryParts.length > 0 ? queryParts.join(' ') : 'followers:>0';
  },

  /**
   * Validate search criteria
   * @param {Object} criteria - Search criteria
   * @returns {Object} Validation result
   */
  validateSearchCriteria: (criteria = {}) => {
    const errors = [];
    const { username, location, minRepos, language } = criteria;
    
    if (!username && !location && !minRepos && !language) {
      errors.push('At least one search criteria is required');
    }
    
    if (minRepos && (isNaN(minRepos) || minRepos < 0)) {
      errors.push('Minimum repositories must be a positive number');
    }
    
    if (username && username.length > 39) {
      errors.push('Username must be less than 39 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Format user data for display
   * @param {Object} userData - Raw user data from GitHub API
   * @returns {Object} Formatted user data
   */
  formatUserData: (userData) => {
    return {
      username: userData.login,
      name: userData.name || userData.login,
      avatar: userData.avatar_url,
      bio: userData.bio || 'No bio available',
      location: userData.location || 'Not specified',
      company: userData.company || 'Not specified',
      blog: userData.blog || null,
      twitter: userData.twitter_username || null,
      email: userData.email || null,
      stats: {
        publicRepos: userData.public_repos,
        publicGists: userData.public_gists,
        followers: userData.followers,
        following: userData.following
      },
      dates: {
        joined: new Date(userData.created_at).toLocaleDateString(),
        updated: new Date(userData.updated_at).toLocaleDateString()
      }
    };
  },

  /**
   * Check GitHub API rate limit status
   * @returns {Promise} Rate limit information
   */
  checkRateLimit: async () => {
    try {
      const response = await githubApi.get('/rate_limit');
      return response.data;
    } catch (error) {
      console.warn('Unable to check rate limit:', error.message);
      return null;
    }
  }
};

export default githubService;