import React, { useState, useEffect } from 'react';
import { userService, postService } from './index.jsx';

const ServiceStatus = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    const checkServices = async () => {
      try {
        // Test user service
        const users = await userService.getUsers();
        setUsersCount(users.length);
        
        // Test post service
        const posts = await postService.getPosts();
        setPostsCount(posts.length);
        
        setApiStatus('online');
      } catch (error) {
        setApiStatus('offline');
        console.error('Service check failed:', error);
      }
    };

    checkServices();
  }, []);

  const statusStyle = {
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem 0',
    backgroundColor: apiStatus === 'online' ? '#d4edda' : '#f8d7da',
    border: `1px solid ${apiStatus === 'online' ? '#c3e6cb' : '#f5c6cb'}`,
    color: apiStatus === 'online' ? '#155724' : '#721c24'
  };

  return (
    <div style={statusStyle}>
      <h3>API Service Status: <strong>{apiStatus.toUpperCase()}</strong></h3>
      {apiStatus === 'online' && (
        <div>
          <p>📊 Users Available: {usersCount}</p>
          <p>📝 Posts Available: {postsCount}</p>
        </div>
      )}
      {apiStatus === 'offline' && (
        <p>⚠️ API services are currently unavailable. Please check your connection.</p>
      )}
    </div>
  );
};

export default ServiceStatus;