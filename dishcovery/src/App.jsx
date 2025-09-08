import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import About from "./Pages/About.jsx";
import Explore from "./Pages/Explore.jsx";
import Recipe from "./Pages/Recipe.jsx";
import Contact from "./Pages/Contact.jsx";

export default function App() {
  return (
    <>
      {/* keep global styles minimal and inline */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background-color: #FFFFFF; font-family: 'Poppins', Arial, sans-serif; color: #222222; }
      `}</style>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
