// App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Recipe from "./Pages/Recipe";
import Explore from "./Pages/Explore"; // ⬅️ import it

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/explore" element={<Explore />} /> {/* ⬅️ add this */}
    </Routes>
  );
}
