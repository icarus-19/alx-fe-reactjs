import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail() {
  // ✅ ADDED: useParams to get recipe ID from URL
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ✅ ADDED: State management
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ ADDED: useEffect to fetch data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // ✅ ADDED: Fetch from data.json
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const allRecipes = await response.json();
        
        // Find the specific recipe by ID
        const foundRecipe = allRecipes.find(recipe => recipe.id === parseInt(id));
        
        if (!foundRecipe) {
          throw new Error('Recipe not found');
        }
        
        setRecipe(foundRecipe);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching recipe:', err);
      }
    };

    fetchRecipe();
  }, [id]); // Re-fetch when ID changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">
            Loading recipe details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  // ✅ ADDED: Destructure recipe data including ingredients and instructions
  const { 
    title, 
    description, 
    // ✅ ADDED: ingredients array
    ingredients = [], 
    // ✅ ADDED: instructions array or string
    instructions = '',
    // ✅ ADDED: image URL
    image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime,
    cookTime,
    servings,
    difficulty
  } = recipe;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 hover:shadow-md transition flex items-center gap-2"
      >
        <span className="text-xl">←</span> Back to Recipes
      </button>

      {/* Main Recipe Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* ✅ ADDED: Recipe Image Section */}
        <div className="relative h-64 md:h-96">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-90">{description}</p>
          </div>
        </div>

        {/* Recipe Info Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{prepTime || '15'} min</div>
            <div className="text-gray-600 text-sm">Prep Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{cookTime || '30'} min</div>
            <div className="text-gray-600 text-sm">Cook Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{servings || '4'}</div>
            <div className="text-gray-600 text-sm">Servings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 capitalize">{difficulty || 'Medium'}</div>
            <div className="text-gray-600 text-sm">Difficulty</div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* ✅ ADDED: Ingredients Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Ingredients</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {ingredients.length} items
                </span>
              </div>
              
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              {/* Optional: Add to shopping list button */}
              <button className="mt-6 w-full px-4 py-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition font-medium flex items-center justify-center gap-2">
                <span>+</span> Add to Shopping List
              </button>
            </div>

            {/* ✅ ADDED: Instructions Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Instructions</h2>
              
              <div className="space-y-6">
                {Array.isArray(instructions) ? (
                  // If instructions is an array
                  instructions.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">Step {index + 1}</h3>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // If instructions is a string
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {instructions.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Cooking Tips */}
              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <span>💡</span> Pro Tip
                </h3>
                <p className="text-yellow-700">
                  Let the dish rest for 5-10 minutes after cooking for better flavor distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 pt-8 border-t flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow hover:shadow-md">
              Save Recipe
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow hover:shadow-md">
              Print Recipe
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium">
              Share Recipe
            </button>
          </div>
        </div>
      </div>

      {/* Similar Recipes Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-15${num}6069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                alt={`Similar recipe ${num}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Similar Recipe {num}</h3>
                <button 
                  onClick={() => navigate(`/recipe/${num + 10}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Recipe →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;