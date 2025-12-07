import React, { useState, useEffect } from 'react';

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      
      {/* Loading State with Tailwind */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-lg text-gray-600 font-medium">
              Loading data...
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Data Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Showing {data.length} items from your data source
            </p>
          </div>

          {/* Data Grid with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 
                         hover:shadow-2xl hover:scale-[1.02] 
                         transition-all duration-300 border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                
                {/* Interactive Button */}
                <button 
                  className="px-4 py-2 bg-blue-600 text-white 
                           rounded-lg shadow hover:bg-blue-700 
                           hover:shadow-md transition duration-200
                           font-medium"
                  onClick={() => console.log('Clicked:', item.id)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Statistics Card */}
          <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 
                        rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Data Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{data.length}</p>
                <p className="text-blue-100">Total Items</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {data.filter(item => item.active).length}
                </p>
                <p className="text-blue-100">Active</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default HomePage;