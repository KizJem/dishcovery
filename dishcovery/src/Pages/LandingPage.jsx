// src/Pages/LandingPage.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa"; // FaUser (not FaUserCircle)
import food from "../Images/food.png";
import Contact from "./Contact";

/** ✅ Exported navbar so all pages share the same one */
export function SiteNavbar() {
  return (
    <header style={styles.navbar}>
      <div style={styles.navInner}>
        {/* Brand */}
        <div style={styles.brand}>Dishecovery</div>

        {/* Search */}
        <form style={styles.search} onSubmit={(e) => e.preventDefault()}>
          <FaSearch style={styles.searchIcon} />
          <input type="text" placeholder="Search.." style={styles.searchInput} />
        </form>

        {/* Links */}
        <nav style={styles.links}>
          <a href="/" style={styles.link}>Home</a>
          <a href="/about" style={styles.link}>About</a>
          <a href="/explore" style={styles.link}>Explore</a>
          <a href="/recipe" style={styles.link}>Recipe</a>
          <a href="/#contact" style={styles.link}>Contact</a>
        </nav>

        {/* Profile (dark circle + orange person) */}
        <div style={styles.profile}>
          <FaUser size={18} color="#FF9E00" />
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { hash } = useLocation();

  // Smooth scroll to contact footer when navigating to /#contact
  useEffect(() => {
    if (hash === "#contact") {
      const el = document.getElementById("contact-footer");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <>
      <SiteNavbar />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.title}>
            Adventure of <span style={styles.highlight}>Dishcovers</span>
          </h1>
          <p style={styles.subtitle}>
            Unlock a world of variety culinary recipes and unleash your inner
            chef the easy way with <b>Dishcovery</b>.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.blackBtn} onClick={() => navigate("/recipe")}>
              Explore Recipes
            </button>
            <button style={styles.whiteBtn}>Get Our Mobile App ↓</button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={food} alt="Dish" style={styles.image} />
        </div>
      </section>

      <Contact />
    </>
  );
}

const baseFont = { fontFamily: "Poppins, sans-serif" };

const styles = {
  /* NAVBAR */
  navbar: {
    position: "sticky",
    top: 0,
    background: "#fff",
    borderBottom: "1px solid #eee",
    zIndex: 100,
    ...baseFont,
  },
  navInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72,
    padding: "0 60px",
    ...baseFont,
  },
  brand: { fontWeight: 800, fontSize: 28, color: "#FF9E00", ...baseFont },
  search: {
    display: "flex",
    alignItems: "center",
    background: "#f5f5f5",
    borderRadius: "25px",
    padding: "6px 14px",
    flex: 1,
    maxWidth: 400,
    margin: "0 40px",
  },
  searchIcon: { marginRight: 10, fontSize: 16, color: "#222" },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 14,
    flex: 1,
    ...baseFont,
  },
  links: { display: "flex", alignItems: "center", gap: "20px" },
  link: {
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 500,
    color: "#222",
    ...baseFont,
  },
  profile: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#1f1f1f",
    display: "grid",
    placeItems: "center",
    marginLeft: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  /* PAGE */
  hero: {
    marginTop: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 0 0 60px",
    flexWrap: "wrap",
    ...baseFont,
  },
  heroText: { flex: 1, maxWidth: 600, ...baseFont },
  title: {
    fontSize: 70,
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#222",
    ...baseFont,
  },
  highlight: { color: "#FF9E00" },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
    lineHeight: 1.6,
    ...baseFont,
  },
  heroButtons: { marginTop: 30, display: "flex", gap: 15 },
  blackBtn: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 25,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    ...baseFont,
  },
  whiteBtn: {
    background: "#fff",
    color: "#000",
    border: "1px solid #ddd",
    padding: "12px 24px",
    borderRadius: 25,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    ...baseFont,
  },
  heroImage: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: 2000,
    paddingTop: 15,
  },
  image: { width: "100%", maxHeight: 600, objectFit: "cover" },
};
