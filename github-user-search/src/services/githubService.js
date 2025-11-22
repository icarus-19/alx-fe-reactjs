import api from './api';

export const githubService = {
  /**
   * Fetch complete user data (main function)
   * @param {string} username - GitHub username
   * @returns {Promise} Complete user data
   */
  fetchUserData: async (username) => {
    try {
      const [user, repos] = await Promise.all([
        githubService.getUser(username),
        githubService.getUserRepos(username, 5)
      ]);

      return {
        user,
        repos,
        stats: {
          repoCount: user.public_repos,
          followerCount: user.followers,
          followingCount: user.following,
          gistCount: user.public_gists
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  },

  /**
   * Get GitHub user profile using Axios
   * @param {string} username - GitHub username
   * @returns {Promise} User data
   */
  getUser: async (username) => {
    try {
      const response = await api.get(`https://api.github.com/users/${username}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`User "${username}" not found`);
      } else if (error.response?.status === 403) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`GitHub API error: ${error.response?.status || error.message}`);
      }
    }
  },

  /**
   * Get user repositories using Axios
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of repos per page
   * @returns {Promise} Array of repositories
   */
  getUserRepos: async (username, perPage = 10) => {
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            sort: 'updated',
            per_page: perPage
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Get user followers using Axios
   * @param {string} username - GitHub username
   * @returns {Promise} Array of followers
   */
  getUserFollowers: async (username) => {
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}/followers`,
        {
          params: {
            per_page: 20
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch followers: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Get user following using Axios
   * @param {string} username - GitHub username
   * @returns {Promise} Array of users being followed
   */
  getUserFollowing: async (username) => {
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}/following`,
        {
          params: {
            per_page: 20
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch following: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Search GitHub users using Axios
   * @param {string} query - Search query
   * @param {number} perPage - Results per page
   * @returns {Promise} Search results
   */
  searchUsers: async (query, perPage = 5) => {
    try {
      const response = await api.get(
        `https://api.github.com/search/users`,
        {
          params: {
            q: query,
            per_page: perPage
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`User search failed: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Get repository languages using Axios
   * @param {string} username - GitHub username
   * @param {string} repoName - Repository name
   * @returns {Promise} Repository languages
   */
  getRepoLanguages: async (username, repoName) => {
    try {
      const response = await api.get(
        `https://api.github.com/repos/${username}/${repoName}/languages`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch languages: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Get user organizations using Axios
   * @param {string} username - GitHub username
   * @returns {Promise} Array of organizations
   */
  getUserOrgs: async (username) => {
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}/orgs`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch organizations: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Get user events using Axios
   * @param {string} username - GitHub username
   * @param {number} perPage - Events per page
   * @returns {Promise} Array of events
   */
  getUserEvents: async (username, perPage = 10) => {
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}/events`,
        {
          params: {
            per_page: perPage
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch events: ${error.response?.status || error.message}`);
    }
  },

  /**
   * Get complete user data with all details
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
      const response = await api.get('https://api.github.com/rate_limit');
      return response.data.rate;
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
