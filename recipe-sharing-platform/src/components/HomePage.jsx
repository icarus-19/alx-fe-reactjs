import React, { useState, useEffect } from 'react';

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
          { id: 1, title: 'Sample Item 1', description: 'This is a sample description for item 1.' },
          { id: 2, title: 'Sample Item 2', description: 'This is a sample description for item 2.' },
          { id: 3, title: 'Sample Item 3', description: 'This is a sample description for item 3.' },
        ]);
      });
  }, []);

  return (
    // ✅ ADDED: className attribute with Tailwind classes
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      
      {/* ✅ ADDED: Header with text classes */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing features and services. Built with React and Tailwind CSS.
        </p>
      </header>

      {loading ? (
        // ✅ ADDED: Loading spinner with Tailwind classes
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-700 font-medium">
              Loading your data...
            </p>
          </div>
        </div>
      ) : (
        <main>
          {/* ✅ ADDED: Stats bar with rounded and shadow */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Data Overview
              </h2>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {data.length} Items
                </span>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* ✅ ADDED: Data grid with hover, rounded, and shadow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div 
                key={item.id}
                // ✅ ADDED: Multiple Tailwind classes
                className="bg-white rounded-xl shadow-lg p-6 
                         hover:shadow-2xl hover:scale-[1.02] 
                         transition-all duration-300 border border-gray-100
                         transform hover:-translate-y-1"
              >
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
                
                {/* ✅ ADDED: Buttons with hover and shadow */}
                <div className="flex justify-end gap-2 mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white 
                                   rounded-lg shadow hover:bg-blue-700 
                                   hover:shadow-md transition duration-200
                                   font-medium text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 
                                   rounded-lg hover:bg-gray-300 
                                   transition duration-200 font-medium text-sm">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ ADDED: Call to action section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 
                          rounded-2xl shadow-xl p-8 text-white max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of users who are already benefiting from our platform.
              </p>
              <button className="px-8 py-3 bg-white text-blue-600 
                               rounded-full font-bold text-lg
                               hover:bg-gray-100 hover:shadow-lg 
                               transition duration-300 shadow">
                Start Free Trial
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default HomePage;