import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>React Query Demo Application</h1>
          <p>Fetching and displaying posts using React Query</p>
        </header>
        
        <main className="App-main">
          <section className="posts-section">
            <h2>Blog Posts</h2>
            <PostsComponent />
          </section>
          
          <section className="info-section">
            <h3>About This App</h3>
            <p>
              This application demonstrates React Query for data fetching, caching, 
              and synchronization. Posts are fetched from JSONPlaceholder API.
            </p>
            <div className="features">
              <h4>Features:</h4>
              <ul>
                <li>Automatic caching of API responses</li>
                <li>Background refetching for stale data</li>
                <li>Loading and error states handling</li>
                <li>Pagination support</li>
                <li>Optimistic updates</li>
              </ul>
            </div>
          </section>
        </main>
        
        <footer className="App-footer">
          <p>React Query Demo &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
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
