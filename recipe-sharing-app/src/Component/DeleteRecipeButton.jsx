import React from "react";
import { useRecipeStore } from "./recipeStore";

function DeleteRecipeButton({ recipeId }) {
  const recipes = useRecipeStore((state) => state.recipes);
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  const handleDelete = () => {
    // Add confirmation to ensure user intent
    if (
      !window.confirm(
        "Are you sure you want to delete this recipe? This cannot be undone."
      )
    ) {
      return; // Exit early if canceled
    }
    console.log("delete", recipes);
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      <p>confirm deletion of recipe</p>
      <button onClick={handleDelete}>Yes delete</button>
    </div>
  );
}

export default DeleteRecipeButton;