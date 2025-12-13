import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// Fetch function for posts
const fetchPosts = async ({ queryKey }) => {
  const [_, page] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const PostsComponent = () => {
  const [page, setPage] = useState(1);

  // Using useQuery hook with all requested options
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    isFetching,
    isPreviousData 
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: fetchPosts,
    // Requested options:
    cacheTime: 5 * 60 * 1000, // 5 minutes - keeps data in cache for 5 minutes
    refetchOnWindowFocus: true, // Refetches data when window regains focus
    keepPreviousData: true, // Keeps previous data while fetching new data
    
    // Additional useful options
    staleTime: 2 * 60 * 1000, // Data stays fresh for 2 minutes
    retry: 3,
    retryDelay: 1000,
  });

  // Loading state for initial load
  if (isLoading) {
    return (
      <div className="posts-loading">
        <div className="spinner"></div>
        <p>Loading posts from API...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="posts-error">
        <h3>Error Loading Posts</h3>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h2>Posts from JSONPlaceholder API</h2>
      <div className="query-config">
        <h3>React Query Configuration:</h3>
        <ul>
          <li><strong>cacheTime:</strong> 5 minutes (300,000ms)</li>
          <li><strong>refetchOnWindowFocus:</strong> true</li>
          <li><strong>keepPreviousData:</strong> true</li>
          <li><strong>staleTime:</strong> 2 minutes</li>
          <li><strong>Current Page:</strong> {page}</li>
        </ul>
      </div>
      
      <p className="posts-count">
        Showing page {page} • {data?.length || 0} posts
        {isFetching && <span className="fetching-indicator"> (Updating...)</span>}
      </p>
      
      <div className="posts-grid">
        {data?.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-id">#{post.id}</span>
              <span className="user-id">User: {post.userId}</span>
              <span className="page-badge">Page {page}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <div className="post-footer">
              <span className="cache-status">
                {isPreviousData ? 'Previous cached data' : 'Fresh data'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="pagination-btn"
        >
          Previous Page
        </button>
        
        <div className="page-indicator">
          Page: {page}
          {isFetching && <span className="loading-dots">...</span>}
        </div>
        
        <button
          onClick={() => setPage(old => old + 1)}
          disabled={data?.length < 10}
          className="pagination-btn"
        >
          Next Page
        </button>
      </div>

      {/* Query Status Information */}
      <div className="query-status">
        <h4>Query Status Details:</h4>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">isLoading:</span>
            <span className={`status-value ${isLoading ? 'true' : 'false'}`}>
              {isLoading.toString()}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">isError:</span>
            <span className={`status-value ${isError ? 'true' : 'false'}`}>
              {isError.toString()}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">isFetching:</span>
            <span className={`status-value ${isFetching ? 'true' : 'false'}`}>
              {isFetching.toString()}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">isPreviousData:</span>
            <span className={`status-value ${isPreviousData ? 'true' : 'false'}`}>
              {isPreviousData?.toString()}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Data Count:</span>
            <span className="status-value count">
              {data?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Cache Information */}
      <div className="cache-info">
        <h4>Cache Information:</h4>
        <p>
          <strong>cacheTime:</strong> 300000ms (5 minutes) - Data remains in cache for 5 minutes after becoming inactive
        </p>
        <p>
          <strong>refetchOnWindowFocus:</strong> true - Data refetches when you refocus the window
        </p>
        <p>
          <strong>keepPreviousData:</strong> true - Shows old data while fetching new data
        </p>
        <div className="cache-tip">
          💡 <strong>Tip:</strong> Try switching browser tabs and coming back to see refetchOnWindowFocus in action!
        </div>
      </div>

      {/* Debug Info */}
      <div className="debug-info">
        <h4>Debug Information:</h4>
        <p>
          <strong>Window Focus Refetch:</strong> {refetchOnWindowFocus.toString()}
        </p>
        <p>
          <strong>Cache Time:</strong> {cacheTime}ms
        </p>
        <p>
          <strong>Error State:</strong> {isError ? error.message : 'No errors'}
        </p>
      </div>
    </div>
  );
};

export default PostsComponent;