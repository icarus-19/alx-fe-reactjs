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
            <h1>React Blog Application</h1>
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/posts">Blog Posts</Link></li>
                <li><Link to="/blog/1">Blog Post 1</Link></li>
                <li><Link to="/blog/2">Blog Post 2</Link></li>
                <li><Link to="/blog/3">Blog Post 3</Link></li>
                <li><Link to="/register">Registration</Link></li>
                <li><Link to="/formik">Formik Form</Link></li>
              </ul>
            </nav>
          </header>

          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/posts" element={<PostsComponent />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/formik" element={<FormikForm />} />
              
              {/* Dynamic route for blog posts - EXACT PATTERN REQUESTED */}
              <Route path="/blog/:id" element={<BlogPost />} />
              
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer className="App-footer">
            <div className="footer-links">
              <Link to="/">Home</Link> | 
              <Link to="/posts">Blog Posts</Link> | 
              <Link to="/blog/1">Blog Post 1</Link> | 
              <Link to="/blog/2">Blog Post 2</Link> | 
              <Link to="/blog/3">Blog Post 3</Link> | 
              <Link to="/profile">Profile</Link> | 
              <Link to="/register">Register</Link>
            </div>
            <p>React Blog Demo &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;