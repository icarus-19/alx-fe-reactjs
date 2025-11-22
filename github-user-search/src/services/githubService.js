import api from './api';

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

      // Clean the username
      const cleanUsername = username.trim();
      
      console.log(`🔍 Fetching GitHub data for user: ${cleanUsername}`);
      
      // Make API call to GitHub users endpoint
      const response = await api.get(`https://api.github.com/users/${cleanUsername}`);
      
      console.log('✅ GitHub API response received:', response.data.login);
      
      return response.data;
      
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // GitHub API returned an error response
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
          case 500:
          case 502:
          case 503:
            throw new Error('GitHub API is currently unavailable. Please try again later.');
          default:
            throw new Error(`GitHub API error: ${status} - ${message}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error: Unable to reach GitHub API. Check your internet connection.');
      } else {
        // Something else happened
        throw new Error(`Unexpected error: ${error.message}`);
      }
    }
  },

  /**
   * Get user repositories
   * @param {string} username - GitHub username
   * @returns {Promise} User repositories
   */
  fetchUserRepos: async (username) => {
    try {
      const response = await api.get(`https://api.github.com/users/${username}/repos`, {
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
      const response = await api.get(`https://api.github.com/users/${username}/followers`, {
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
  },

  /**
   * Search for users (alternative to direct user fetch)
   * @param {string} query - Search query
   * @returns {Promise} Search results
   */
  searchUsers: async (query) => {
    try {
      const response = await api.get(`https://api.github.com/search/users`, {
        params: {
          q: query,
          per_page: 10
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`User search failed: ${error.response?.data?.message || error.message}`);
    }
  }
};

// Utility functions
export const githubUtils = {
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
      hireable: userData.hireable || false,
      stats: {
        publicRepos: userData.public_repos,
        publicGists: userData.public_gists,
        followers: userData.followers,
        following: userData.following
      },
      dates: {
        joined: new Date(userData.created_at).toLocaleDateString(),
        updated: new Date(userData.updated_at).toLocaleDateString()
      },
      links: {
        github: userData.html_url,
        followers: userData.followers_url,
        following: userData.following_url,
        gists: userData.gists_url,
        starred: userData.starred_url,
        subscriptions: userData.subscriptions_url,
        organizations: userData.organizations_url,
        repos: userData.repos_url,
        events: userData.events_url
      }
    };
  },

  /**
   * Validate GitHub username format
   * @param {string} username - GitHub username to validate
   * @returns {Object} Validation result
   */
  validateUsername: (username) => {
    const errors = [];
    
    if (!username || username.trim() === '') {
      errors.push('Username cannot be empty');
    }
    
    if (username.length > 39) {
      errors.push('Username must be less than 39 characters');
    }
    
    // GitHub username regex pattern
    const githubUsernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    if (!githubUsernamePattern.test(username)) {
      errors.push('Username can only contain alphanumeric characters and hyphens, cannot start or end with a hyphen, and cannot have consecutive hyphens');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },

  /**
   * Check GitHub API rate limit status
   * @returns {Promise} Rate limit information
   */
  checkRateLimit: async () => {
    try {
      const response = await api.get('https://api.github.com/rate_limit');
      return response.data;
    } catch (error) {
      console.warn('Unable to check rate limit:', error.message);
      return null;
    }
  }
};

export default githubService;