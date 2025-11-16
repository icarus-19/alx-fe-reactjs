import { useState } from "react";
import RecipeDetails from "./RecipeDetails";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const [selectedRecipeId, setSelectedRecipe] = useState(null);

  const handleClick = (recipeId) => {
    setSelectedRecipe(recipeId);
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => handleClick(recipe.id)}>view details</button>
        </div>
      ))}
      {selectedRecipeId && <RecipeDetails recipeId={selectedRecipeId} />}
    </div>
  );
};

export default RecipeList;