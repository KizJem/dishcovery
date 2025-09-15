// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Recipe from "./Pages/Recipe";
import Explore from "./Pages/Explore";
import About from "./Pages/About";
import RecipeDetails from "./Pages/RecipeDetails";
import Footer from "./Components/Footer"; // rename properly

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Footer />} />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/recipe" replace />} />
    </Routes>
  );
}
