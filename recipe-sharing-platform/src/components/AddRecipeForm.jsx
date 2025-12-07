import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipeForm() {
  const navigate = useNavigate();
  
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '4',
    difficulty: 'Medium',
    image: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }
    
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required';
    }
    
    if (formData.prepTime && (isNaN(formData.prepTime) || formData.prepTime < 0)) {
      newErrors.prepTime = 'Prep time must be a positive number';
    }
    
    if (formData.cookTime && (isNaN(formData.cookTime) || formData.cookTime < 0)) {
      newErrors.cookTime = 'Cook time must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Format ingredients as array
      const ingredientsArray = formData.ingredients
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      // Format instructions as array
      const instructionsArray = formData.instructions
        .split('\n')
        .map(step => step.trim())
        .filter(step => step.length > 0);
      
      const recipeData = {
        ...formData,
        ingredients: ingredientsArray,
        instructions: instructionsArray,
        id: Date.now(), // Generate unique ID
        createdAt: new Date().toISOString()
      };
      
      // Here you would typically send data to an API
      console.log('Recipe data to submit:', recipeData);
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Recipe added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        servings: '4',
        difficulty: 'Medium',
        image: ''
      });
      
      // Navigate to home or recipes page
      navigate('/');
      
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: '4',
      difficulty: 'Medium',
      image: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 self-start"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your delicious recipe with the community
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Recipe Title */}
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-semibold mb-3">
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter recipe title (e.g., 'Chocolate Chip Cookies')"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-semibold mb-3">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of your recipe"
              />
            </div>

            {/* Image URL */}
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-semibold mb-3">
                Recipe Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/recipe-image.jpg"
              />
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Recipe preview"
                    className="w-48 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Recipe Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Prep Time */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Prep Time (minutes)
                </label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.prepTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="15"
                />
                {errors.prepTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
                )}
              </div>

              {/* Cook Time */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Cook Time (minutes)
                </label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cookTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="30"
                />
                {errors.cookTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>
                )}
              </div>

              {/* Servings */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Servings
                </label>
                <select
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                    <option key={num} value={num}>{num} serving{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-4">
                {['Easy', 'Medium', 'Hard'].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={formData.difficulty === level}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ingredients Textarea - REQUIRED */}
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-semibold mb-3">
                Ingredients *
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Enter each ingredient on a new line)
                </span>
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2 cups all-purpose flour&#10;1 cup sugar&#10;2 eggs&#10;1 cup milk"
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-2">{errors.ingredients}</p>
              )}
              
              {/* Ingredients Preview */}
              {formData.ingredients && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {formData.ingredients
                      .split('\n')
                      .filter(item => item.trim())
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Preparation Steps Textarea - REQUIRED */}
            <div className="mb-10">
              <label className="block text-gray-700 text-lg font-semibold mb-3">
                Preparation Steps *
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Enter each step on a new line)
                </span>
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="8"
                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.instructions ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Preheat oven to 350°F (175°C)&#10;Mix dry ingredients in a bowl&#10;Add wet ingredients and mix well&#10;Bake for 25-30 minutes"
              />
              {errors.instructions && (
                <p className="text-red-500 text-sm mt-2">{errors.instructions}</p>
              )}
              
              {/* Instructions Preview */}
              {formData.instructions && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
                  <ol className="list-decimal pl-5 text-gray-600">
                    {formData.instructions
                      .split('\n')
                      .filter(step => step.trim())
                      .map((step, index) => (
                        <li key={index} className="mb-2">{step}</li>
                      ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-wrap justify-between items-center pt-6 border-t">
              <div>
                <p className="text-gray-600 text-sm">
                  <span className="text-red-500">*</span> Required fields
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Clear Form
                </button>
                
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow hover:shadow-md"
                >
                  Add Recipe
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">
            💡 Tips for a Great Recipe Submission
          </h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Be specific with measurements (use cups, grams, tablespoons)</li>
            <li>• List ingredients in the order they're used</li>
            <li>• Break down steps into clear, simple instructions</li>
            <li>• Include cooking times and temperatures</li>
            <li>• Add tips or variations if you have them</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;