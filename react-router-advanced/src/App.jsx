import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
            <h1>React Application with Routing</h1>
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/register">Registration</Link></li>
                <li><Link to="/formik">Formik Form</Link></li>
              </ul>
            </nav>
          </header>

          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<PostsComponent />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/formik" element={<FormikForm />} />
              
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer className="App-footer">
            <div className="footer-links">
              <Link to="/">Home</Link> | 
              <Link to="/profile">Profile</Link> | 
              <Link to="/posts">Posts</Link> | 
              <Link to="/register">Register</Link> | 
              <Link to="/formik">Formik</Link>
            </div>
            <p>React Router Demo &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
