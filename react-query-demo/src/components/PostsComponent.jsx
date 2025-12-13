import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// Fetch function for posts - using the exact URL
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const PostsComponent = () => {
  // Using useQuery hook with all requested properties
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 1000,
  });

  // Loading state
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

  // Success state - display posts
  return (
    <div className="posts-container">
      <h2>Posts from JSONPlaceholder API</h2>
      <p className="posts-count">
        Total Posts: {data?.length || 0}
      </p>
      
      <div className="posts-grid">
        {data?.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-id">#{post.id}</span>
              <span className="user-id">User: {post.userId}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <div className="post-footer">
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>

      {/* API Info */}
      <div className="api-info">
        <h4>API Information:</h4>
        <p>
          <strong>Endpoint:</strong> https://jsonplaceholder.typicode.com/posts
        </p>
        <p>
          <strong>Data Status:</strong> 
          <span className="status-success"> ✓ Loaded successfully</span>
        </p>
        <p>
          <strong>Posts Displayed:</strong> 10 of {data?.length}
        </p>
      </div>

      {/* Debug Info */}
      <div className="debug-info">
        <h4>Query State:</h4>
        <p>
          <strong>isLoading:</strong> {isLoading.toString()} | 
          <strong> isError:</strong> {isError.toString()} | 
          <strong> Data Length:</strong> {data?.length || 0}
        </p>
        {error && (
          <p>
            <strong>Error Message:</strong> {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostsComponent;