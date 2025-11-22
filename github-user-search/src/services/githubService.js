import api from './api';

export const githubService = {
  /**
   * Get GitHub user profile
   * @param {string} username - GitHub username
   * @returns {Promise} User data
   */
  getUser: async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User "${username}" not found`);
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`GitHub API error: ${response.status}`);
        }
      }
      
      const userData = await response.json();
      return userData;
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Please check your internet connection');
      }
      throw error;
    }
  },

  /**
   * Get user repositories
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of repos per page
   * @returns {Promise} Array of repositories
   */
  getUserRepos: async (username, perPage = 10) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Repository fetch failed: ${error.message}`);
    }
  },

  /**
   * Get user followers
   * @param {string} username - GitHub username
   * @returns {Promise} Array of followers
   */
  getUserFollowers: async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/followers?per_page=20`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch followers: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Followers fetch failed: ${error.message}`);
    }
  },

  /**
   * Get user following
   * @param {string} username - GitHub username
   * @returns {Promise} Array of users being followed
   */
  getUserFollowing: async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/following?per_page=20`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch following: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Following fetch failed: ${error.message}`);
    }
  },

  /**
   * Search GitHub users
   * @param {string} query - Search query
   * @param {number} perPage - Results per page
   * @returns {Promise} Search results
   */
  searchUsers: async (query, perPage = 5) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`User search failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  },

  /**
   * Get repository languages
   * @param {string} username - GitHub username
   * @param {string} repoName - Repository name
   * @returns {Promise} Repository languages
   */
  getRepoLanguages: async (username, repoName) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Languages fetch failed: ${error.message}`);
    }
  },

  /**
   * Get user organizations
   * @param {string} username - GitHub username
   * @returns {Promise} Array of organizations
   */
  getUserOrgs: async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/orgs`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch organizations: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Organizations fetch failed: ${error.message}`);
    }
  },

  /**
   * Get user events
   * @param {string} username - GitHub username
   * @param {number} perPage - Events per page
   * @returns {Promise} Array of events
   */
  getUserEvents: async (username, perPage = 10) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/events?per_page=${perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Events fetch failed: ${error.message}`);
    }
  },

  /**
   * Batch multiple user requests
   * @param {string} username - GitHub username
   * @returns {Promise} Combined user data
   */
  getUserCompleteData: async (username) => {
    try {
      const [user, repos, followers, following, orgs] = await Promise.all([
        githubService.getUser(username),
        githubService.getUserRepos(username, 5),
        githubService.getUserFollowers(username),
        githubService.getUserFollowing(username),
        githubService.getUserOrgs(username)
      ]);

      return {
        user,
        repos,
        followers,
        following,
        orgs,
        stats: {
          repoCount: user.public_repos,
          followerCount: user.followers,
          followingCount: user.following,
          gistCount: user.public_gists
        }
      };
    } catch (error) {
      throw new Error(`Complete data fetch failed: ${error.message}`);
    }
  }
};

// Rate limiting helper
export const rateLimitHelper = {
  checkRateLimit: async () => {
    try {
      const response = await fetch('https://api.github.com/rate_limit');
      const data = await response.json();
      return data.rate;
    } catch (error) {
      console.warn('Could not check rate limit:', error);
      return null;
    }
  },

  getRemainingRequests: async () => {
    const rateLimit = await rateLimitHelper.checkRateLimit();
    return rateLimit ? rateLimit.remaining : 'Unknown';
  }
};

export default githubService;
