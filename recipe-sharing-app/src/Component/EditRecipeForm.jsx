import React, { useState } from "react";
import { useRecipeStore } from "./recipeStore";

function EditRecipeForm({ recipeId }) {
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const recipes = useRecipeStore((state) => state.recipes);

  const handleSubmit = () => {
    const updatedRecipes = useRecipeStore.getState().recipes.map((r) =>
      r.id === recipeId
        ? {
            ...r,
            title: title || r.title,
            description: description || r.description,
          }
        : r
    );
    setRecipes(updatedRecipes);
    console.log(recipes);
    // if(title.trim() || description.trim()) {
    //   setRecipes(recipe)
    // }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>save</button>
    </div>
  );
}

export default EditRecipeForm;