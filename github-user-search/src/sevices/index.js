// Export all services from a single entry point
export { userService } from './userService';
export { authService } from './authService';
export { postService } from './postService';
export { default as api } from './api';

// You can also export multiple services as a named object
export const services = {
  user: userService,
  auth: authService,
  post: postService,
  api: api
};

export default services;