// Export all services
export { userService } from './userService.jsx';
export { authService } from './authService.jsx';
export { postService } from './postService.jsx';
export { default as api } from './api.jsx';
export { default as ServiceStatus } from './ServiceStatus.jsx';

// Export as named object
export const services = {
  user: userService,
  auth: authService,
  post: postService,
  api: api
};

export default services;