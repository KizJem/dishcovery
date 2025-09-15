import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/About";
import Explore from "./Pages/Explore";
import Recipe from "./Pages/Recipe";
import RecipeDetails from "./Pages/RecipeDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      {/* Contact is in LandingPage footer; use /#contact */}
    </Routes>
  );
}
