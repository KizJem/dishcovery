// App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Recipe from "./Pages/Recipe";
import Explore from "./Pages/Explore";
import About from "./Pages/About"; // ⬅️ import About

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<About />} /> {/* ⬅️ add About route */}
    </Routes>
  );
}
