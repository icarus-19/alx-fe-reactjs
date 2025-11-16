import "./App.css";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import { BrowserRouter, Route, Routes } from "react-router";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <>
      <RecipeList />
      <AddRecipeForm />
      <BrowserRouter>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;