import React from 'react';

function HomePage() {
  const features = [
    { id: 1, title: 'Feature 1', description: 'Description of feature 1' },
    { id: 2, title: 'Feature 2', description: 'Description of feature 2' },
    { id: 3, title: 'Feature 3', description: 'Description of feature 3' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing features and services tailored for your needs.
        </p>
        
        {/* CTA Button */}
        <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold 
                         rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg 
                         transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                     transition duration-300 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {feature.description}
            </p>
            <a 
              href="#" 
              className="text-blue-600 font-medium hover:text-blue-800 
                       transition duration-200 inline-block"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>

      {/* Additional Content */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-700">
          We provide exceptional services with a focus on quality and customer satisfaction.
        </p>
      </div>
    </div>
  );
}

export default HomePage;