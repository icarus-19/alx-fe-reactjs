import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

// Import components
import Home from './components/Home';
import Profile from './components/Profile';
import PostsComponent from './components/PostsComponent';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Settings from './components/Settings';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>React Protected Routes Application</h1>
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/admin">Admin Panel</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/posts">Blog Posts</Link></li>
                <li><Link to="/blog/1">Blog Post 1</Link></li>
                <li><Link to="/register">Registration</Link></li>
                <li><Link to="/formik">Formik Form</Link></li>
              </ul>
            </nav>
          </header>

          <main className="App-main">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/posts" element={<PostsComponent />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/formik" element={<FormikForm />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              
              {/* Protected Routes using ProtectedRoute component */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute requiredRoles={['user', 'admin']}>
                  <Settings />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer className="App-footer">
            <div className="footer-links">
              <Link to="/">Home</Link> | 
              <Link to="/login">Login</Link> | 
              <Link to="/profile">Profile</Link> | 
              <Link to="/dashboard">Dashboard</Link> | 
              <Link to="/admin">Admin</Link> | 
              <Link to="/settings">Settings</Link>
            </div>
            <p>Protected Routes Demo &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;