import React, { useState, useEffect } from 'react';
// ✅ ADD: Import Link from react-router-dom
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Fallback mock data if API fails
        setData([
          { 
            id: 1, 
            title: 'Delicious Pasta Carbonara', 
            description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          { 
            id: 2, 
            title: 'Vegetable Stir Fry', 
            description: 'Quick and healthy vegetable stir fry with soy sauce.',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          { 
            id: 3, 
            title: 'Chocolate Cake', 
            description: 'Rich and moist chocolate cake with chocolate frosting.',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Recipe Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing recipes from around the world. Built with React and Tailwind CSS.
        </p>
        
        {/* ✅ ADDED: Navigation Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Home
          </Link>
          <Link 
            to="/recipes" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            All Recipes
          </Link>
          <Link 
            to="/about" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Contact
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-700 font-medium">
              Loading recipes...
            </p>
          </div>
        </div>
      ) : (
        <main>
          {/* Stats bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Recipe Collection
              </h2>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {data.length} Recipes
                </span>
                {/* ✅ ADDED: Link as a button */}
                <Link 
                  to="/add-recipe"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  + Add Recipe
                </Link>
              </div>
            </div>
          </div>

          {/* Recipe Grid with Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 
                         hover:shadow-2xl hover:scale-[1.02] 
                         transition-all duration-300 border border-gray-100
                         transform hover:-translate-y-1"
              >
                {/* ✅ ADDED: Recipe Image */}
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {item.id}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  {/* ✅ ADDED: Link to Recipe Detail */}
                  <Link 
                    to={`/recipe/${item.id}`}
                    className="px-4 py-2 bg-blue-600 text-white 
                             rounded-lg shadow hover:bg-blue-700 
                             hover:shadow-md transition duration-200
                             font-medium text-sm flex items-center gap-2"
                  >
                    <span>View Recipe</span>
                    <span>→</span>
                  </Link>
                  
                  {/* Additional actions */}
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition">
                      Save
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action section with Links */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 
                          rounded-2xl shadow-xl p-8 text-white max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Want More Recipes?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join our community of food lovers and get access to exclusive recipes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {/* ✅ ADDED: More Links */}
                <Link 
                  to="/signup"
                  className="px-8 py-3 bg-white text-blue-600 
                           rounded-full font-bold text-lg
                           hover:bg-gray-100 hover:shadow-lg 
                           transition duration-300 shadow"
                >
                  Sign Up Free
                </Link>
                <Link 
                  to="/premium"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white 
                           rounded-full font-bold text-lg
                           hover:bg-white/10 transition duration-300"
                >
                  Go Premium
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition">
                FAQ
              </Link>
              <Link to="/sitemap" className="text-gray-600 hover:text-blue-600 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default HomePage;