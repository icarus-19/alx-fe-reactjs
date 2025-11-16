import { useState } from "react";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [deleteRecipeId, setDeleteRecipeId] = useState(null);

  const handleEditBtn = (id) => {
    console.log(id);
    setSelectedRecipeId(id);
  };

  const handleDeleteRecipeBtn = (id) => {
    setDeleteRecipeId(id);
  };

  return (
    <div>
      <h1>{recipe?.title}</h1>
      <p>{recipe?.description}</p>
      <button onClick={() => handleEditBtn(recipeId)}>Edit</button>
      <button onClick={() => handleDeleteRecipeBtn(recipeId)}>delete</button>
      {selectedRecipeId && <EditRecipeForm recipeId={recipeId} />}
      {deleteRecipeId && <DeleteRecipeButton recipeId={recipeId} />}
    </div>
  );
};
export default RecipeDetails;
