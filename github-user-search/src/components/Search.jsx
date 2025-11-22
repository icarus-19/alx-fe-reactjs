import React, { useState } from 'react';
import { githubService } from '../services/githubService';

const Search = ({ onSearch, loading = false, userData = null, error = null }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [language, setLanguage] = useState('');
  const [searchType, setSearchType] = useState('user'); // 'user' or 'advanced'
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalUserData, setInternalUserData] = useState(null);
  const [internalError, setInternalError] = useState('');

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'minRepos':
        setMinRepos(value);
        break;
      case 'language':
        setLanguage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (searchType === 'user' && !username.trim()) {
      setInternalError('Username is required for basic search');
      return;
    }

    if (searchType === 'advanced' && !username.trim() && !location.trim()) {
      setInternalError('At least one search criteria is required for advanced search');
      return;
    }

    setInternalLoading(true);
    setInternalError('');
    setInternalUserData(null);

    try {
      let searchData = {};
      
      if (searchType === 'user') {
        // Basic user search
        const data = await githubService.fetchUserData(username.trim());
        setInternalUserData(data);
        searchData = { username: username.trim(), data };
      } else {
        // Advanced search - in a real app, you'd call a different endpoint
        const data = await githubService.fetchUserData(username.trim());
        
        // Filter results based on advanced criteria (client-side filtering for demo)
        const filteredData = filterUserByCriteria(data, { location, minRepos, language });
        setInternalUserData(filteredData);
        searchData = { 
          username: username.trim(), 
          location, 
          minRepos, 
          language, 
          data: filteredData 
        };
      }
      
      if (onSearch) {
        onSearch(searchData);
      }
    } catch (err) {
      setInternalError(err.message);
    } finally {
      setInternalLoading(false);
    }
  };

  const filterUserByCriteria = (userData, criteria) => {
    // Client-side filtering for demo purposes
    // In a real app, this would be done server-side with GitHub's search API
    const meetsCriteria = {
      location: !criteria.location || 
                (userData.location && userData.location.toLowerCase().includes(criteria.location.toLowerCase())),
      minRepos: !criteria.minRepos || userData.public_repos >= parseInt(criteria.minRepos),
      language: true // Language filtering would require additional API calls
    };

    return Object.values(meetsCriteria).every(Boolean) ? userData : null;
  };

  const handleClear = () => {
    setUsername('');
    setLocation('');
    setMinRepos('');
    setLanguage('');
    setInternalUserData(null);
    setInternalError('');
  };

  const handleSearchTypeToggle = () => {
    setSearchType(prev => prev === 'user' ? 'advanced' : 'user');
    setInternalError('');
  };

  const displayLoading = loading || internalLoading;
  const displayUserData = userData || internalUserData;
  const displayError = error || internalError;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub User Search</h1>
        <p className="text-gray-600">Find GitHub users with advanced filtering options</p>
      </div>

      {/* Search Type Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            type="button"
            onClick={() => handleSearchTypeToggle()}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              searchType === 'user'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔍 Basic Search
          </button>
          <button
            type="button"
            onClick={() => handleSearchTypeToggle()}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              searchType === 'advanced'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⚡ Advanced Search
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            GitHub Username *
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter GitHub username (e.g., octocat)"
              disabled={displayLoading}
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-400">👤</span>
            </div>
          </div>
        </div>

        {/* Advanced Search Fields */}
        {searchType === 'advanced' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, country, or region"
                  disabled={displayLoading}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">📍</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
                Minimum Repositories
              </label>
              <div className="relative">
                <input
                  id="minRepos"
                  type="number"
                  value={minRepos}
                  onChange={(e) => handleInputChange('minRepos', e.target.value)}
                  placeholder="e.g., 10"
                  min="0"
                  disabled={displayLoading}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">📦</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Primary Language
              </label>
              <div className="relative">
                <select
                  id="language"
                  value={language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  disabled={displayLoading}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors appearance-none"
                >
                  <option value="">Any language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Go">Go</option>
                  <option value="Ruby">Ruby</option>
                  <option value="PHP">PHP</option>
                  <option value="C++">C++</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400">🔧</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClear}
            disabled={displayLoading || (!username && !location && !minRepos && !language)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Clear All
          </button>
          
          <button
            type="submit"
            disabled={displayLoading || (searchType === 'user' ? !username.trim() : !username.trim() && !location.trim())}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {displayLoading ? (
              <>
                <LoadingSpinner />
                Searching...
              </>
            ) : (
              <>
                <span>🔍</span>
                {searchType === 'user' ? 'Search User' : 'Advanced Search'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {displayLoading && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size="large" />
            <p className="text-lg text-gray-600">Searching GitHub users...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {displayError && !displayLoading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">❌</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Search Failed</h3>
              <p className="text-red-700 mb-2">{displayError}</p>
              <p className="text-red-600 text-sm">Looks like we cant find the user. Please check your search criteria and try again.</p>
            </div>
          </div>
        </div>
      )}

      {/* User Data Display */}
      {displayUserData && !displayLoading && !displayError && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <img 
                src={displayUserData.avatar_url} 
                alt={displayUserData.login}
                className="w-20 h-20 rounded-full border-4 border-gray-100"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {displayUserData.name || displayUserData.login}
                </h2>
                <p className="text-lg text-gray-600 mb-2">@{displayUserData.login}</p>
                {displayUserData.bio && (
                  <p className="text-gray-700 leading-relaxed">{displayUserData.bio}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">{displayUserData.public_repos}</div>
                <div className="text-sm text-blue-600 font-medium">Repositories</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">{displayUserData.followers}</div>
                <div className="text-sm text-green-600 font-medium">Followers</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-700">{displayUserData.following}</div>
                <div className="text-sm text-purple-600 font-medium">Following</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {displayUserData.location && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-gray-700">{displayUserData.location}</span>
                </div>
              )}
              {displayUserData.company && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">🏢</span>
                  <span className="text-gray-700">{displayUserData.company}</span>
                </div>
              )}
              {displayUserData.blog && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">🌐</span>
                  <a href={displayUserData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {displayUserData.blog}
                  </a>
                </div>
              )}
              {displayUserData.twitter_username && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">🐦</span>
                  <a 
                    href={`https://twitter.com/${displayUserData.twitter_username}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    @{displayUserData.twitter_username}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href={displayUserData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <span>View Full Profile on GitHub</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Examples */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Popular GitHub Users to Search</h3>
        <div className="flex flex-wrap gap-2">
          {['octocat', 'torvalds', 'gaearon', 'defunkt', 'mojombo', 'yyx990803'].map((user) => (
            <button
              key={user}
              type="button"
              onClick={() => setUsername(user)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              {user}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
    />
  );
};

export default Search;