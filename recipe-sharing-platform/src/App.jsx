import React from 'react';
// ✅ ADD: Import react-router-dom components
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// ✅ ADD: Import your components
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail'; // Create this if needed

function App() {
  return (
    // ✅ ADD: Wrap everything in BrowserRouter
    <Router>
      <div className="App">
        
        {/* ✅ ADD: Optional Navigation Bar */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              Recipe App
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-gray-300 transition duration-200">
                Home
              </Link>
              <Link to="/about" className="hover:text-gray-300 transition duration-200">
                About
              </Link>
              <Link to="/recipes" className="hover:text-gray-300 transition duration-200">
                Recipes
              </Link>
            </div>
          </div>
        </nav>

        {/* ✅ ADD: Main content area with Routes */}
        <main className="container mx-auto p-4">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Recipe Detail Route with ID parameter */}
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            
            {/* About Page Route */}
            <Route path="/about" element={
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-gray-600">This is a recipe sharing platform.</p>
              </div>
            } />
            
            {/* Recipes List Route */}
            <Route path="/recipes" element={
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">All Recipes</h1>
                <p className="text-gray-600">Browse all our recipes here.</p>
              </div>
            } />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                <Link 
                  to="/" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Go Home
                </Link>
              </div>
            } />
          </Routes>
        </main>

        {/* ✅ ADD: Optional Footer */}
        <footer className="bg-gray-100 border-t mt-12 py-8">
          <div className="container mx-auto text-center text-gray-600">
            <p>© 2023 Recipe App. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;