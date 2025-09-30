import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  FaHeart, FaRegHeart, FaThLarge, FaCarrot, FaUtensils,
  FaIceCream, FaGlassMartiniAlt, FaLeaf, FaSeedling, FaAppleAlt,
} from "react-icons/fa";
import food from "../Images/food.png";

export default function Explore() {
  // ====== Smart Tools has no state ======

  // ====== Recipes state ======
  const [liked, setLiked] = useState({});
  const [activeCategory, setActiveCategory] = useState("All Recipes");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ====== Search state (NEW) ======
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(""); // triggers fetch

  const navigate = useNavigate();

  // Shimmer once
  useEffect(() => {
    const id = "shimmer-anim";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML =
      "@keyframes shimmer{0%{background-position:100% 0}100%{background-position:0 0}}";
    document.head.appendChild(style);
  }, []);

  const categories = [
    { name: "All Recipes", icon: <FaThLarge /> },
    { name: "Appetizers", icon: <FaCarrot /> },
    { name: "Main Dishes", icon: <FaUtensils /> },
    { name: "Desserts", icon: <FaIceCream /> },
    { name: "Drinks", icon: <FaGlassMartiniAlt /> },
    { name: "Vegetarian", icon: <FaLeaf /> },
    { name: "Vegan", icon: <FaSeedling /> },
    { name: "Healthy", icon: <FaAppleAlt /> },
  ];

  const toggleLike = (id) => setLiked((p) => ({ ...p, [id]: !p[id] }));

  const apiParams = useMemo(() => {
    switch (activeCategory) {
      case "Appetizers": return { type: "appetizer" };
      case "Main Dishes": return { type: "main course" };
      case "Desserts": return { type: "dessert" };
      case "Drinks": return { type: "beverage" };
      case "Vegetarian": return { diet: "vegetarian" };
      case "Vegan": return { diet: "vegan" };
      default: return {};
    }
  }, [activeCategory]);

  // Fetch recipes (reacts to category/diet + submitted search query)
  useEffect(() => {
    const key = import.meta.env.VITE_SPOONACULAR_KEY;
    if (!key) {
      setError("Missing Spoonacular API key in .env.local");
      setLoading(false);
      return;
    }
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const base = new URL("https://api.spoonacular.com/recipes/complexSearch");
        base.searchParams.set("apiKey", key);
        base.searchParams.set("number", "24");
        base.searchParams.set("addRecipeInformation", "true");
        base.searchParams.set("instructionsRequired", "true");
        base.searchParams.set("sort", "random");
        base.searchParams.set("imageType", "jpg");

        if (apiParams.type) base.searchParams.set("type", apiParams.type);
        if (apiParams.diet) base.searchParams.set("diet", apiParams.diet);

        // If user entered a search, include it
        if (submittedQuery.trim()) {
          base.searchParams.set("query", submittedQuery.trim());
          // When searching, random sort can hide obvious matches; prefer relevancy
          base.searchParams.delete("sort");
        }

        const res = await fetch(base.toString(), { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        let results = data?.results ?? [];
        if (activeCategory === "Healthy") {
          results = results.filter((r) => r.veryHealthy || r.healthScore >= 60);
        }
        setItems(results);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [activeCategory, apiParams, submittedQuery]);

  const buildTags = (r) => {
    const tags = [];
    if (Array.isArray(r.diets)) {
      if (r.diets.includes("vegan")) tags.push("Vegan");
      if (r.diets.some((d) => d.includes("vegetarian"))) tags.push("Vegetarian");
    }
    if (r.veryHealthy || r.healthScore >= 60) tags.push("Healthy");
    if (r.readyInMinutes <= 30) tags.push("Quick");
    return tags.slice(0, 3);
  };

  // Submit search handler
  const onSubmitSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchTerm); // triggers useEffect fetch
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSubmittedQuery(""); // back to category-only results
  };

  return (
    <>
      <Navbar />
      <div className="nav-spacer" />

      <div style={styles.page}>
        {/* ===== Smart Tools ===== */}
        <section style={styles.toolsSection}>
          <h2 style={styles.toolsTitle}>Smart tools to plan, shop, and cook.</h2>
          <div style={styles.toolsGrid}>
            {[
              "What's in Your Fridge →",
              "Find by Ingredient →",
              "Nutrition Visualizer →",
              "Instruction Analyzer →",
              "Meal Planner →",
            ].map((tool, index) => (
              <button
                key={index}
                style={styles.toolButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF9E00";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {tool}
              </button>
            ))}
          </div>
        </section>

        {/* ===== What to Cook? ===== */}
        <section style={styles.recipeContainer}>
          <h2 style={styles.heading}>
            What to <span style={styles.highlight}>Cook?</span>
          </h2>

          {/* ===== Search Bar (SEPARATE BUTTON) ===== */}
          <form onSubmit={onSubmitSearch} style={styles.searchRow} role="search" aria-label="Recipe search">
            <div style={styles.searchWrap}>
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  style={styles.clearInside}
                >
                  ×
                </button>
              )}
            </div>

            {/* Standalone button */}
            <button type="submit" style={styles.searchBtn}>Search</button>
          </form>


          {/* Categories */}
          <div style={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  ...styles.categoryButton,
                  ...(activeCategory === cat.name ? styles.activeCategory : {}),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <span style={{ marginRight: 8, color: "#FF9E00" }}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {error && (
            <p style={{ textAlign: "center", color: "#b00020", marginTop: -20, marginBottom: 20 }}>
              {error}
            </p>
          )}

          {/* Recipes Grid */}
          <div style={styles.recipeGrid}>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={`skel-${i}`} style={styles.card}>
                    <div style={styles.cardHeader}>
                      <div style={{ width: 170, height: 16, background: "#eee", borderRadius: 6 }} />
                      <span style={{ width: 18, height: 18, background: "#eee", borderRadius: "50%" }} />
                    </div>
                    <div style={styles.skelImg} />
                    <div style={styles.tags}>
                      <span style={styles.tag}> </span>
                      <span style={styles.tag}> </span>
                    </div>
                    <button style={styles.seeRecipe} disabled>See Recipe →</button>
                  </div>
                ))
              : items.map((r) => {
                  const img = r.image || food;
                  const title = r.title || "Untitled Recipe";
                  const id = r.id;
                  const tags = buildTags(r);

                  return (
                    <div
                      key={id}
                      style={styles.card}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.transition = "transform 0.3s ease";
                      }}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {/* Header with clamped title */}
                      <div style={styles.cardHeader}>
                        <h3 style={styles.titleClamp}>{title}</h3>
                        <button
                          onClick={() => toggleLike(id)}
                          style={styles.heartButton}
                          aria-label="like"
                        >
                          {liked[id] ? <FaHeart color="red" size={18} /> : <FaRegHeart size={18} />}
                        </button>
                      </div>

                      {/* Image */}
                      <img src={img} alt={title} style={styles.cardImg} loading="lazy" />

                      {/* Tags */}
                      <div style={styles.tags}>
                        {tags.map((t, i) => (
                          <span key={i} style={styles.tag}>{t}</span>
                        ))}
                      </div>

                      {/* Button */}
                      <button
                        style={styles.seeRecipe}
                        onMouseEnter={(e) => { e.target.style.background = "#FF9E00"; e.target.style.color = "#000"; }}
                        onMouseLeave={(e) => { e.target.style.background = "#000"; e.target.style.color = "#fff"; }}
                        onClick={() => navigate(`/recipe/${id}`)}
                      >
                        See Recipe ➝
                      </button>
                    </div>
                  );
                })}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  page: { padding: "10px 80px", fontFamily: "'Poppins', sans-serif" },

  // Smart tools
  toolsSection: { marginBottom: 30, textAlign: "center" },
  toolsTitle: { fontSize: 22, fontWeight: 600, marginBottom: 25, color: "#222" },
  toolsGrid: { display: "flex", gap: 15, flexWrap: "wrap", justifyContent: "center" },
  toolButton: {
    padding: "14px 22px",
    border: "none",
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  // Recipes
  recipeContainer: { marginTop: 10 },
  heading: { fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 12 },
  highlight: { color: "#FF9E00" },

  searchRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    margin: "10px 0 26px",
    padding: "0 16px",
    flexWrap: "wrap",
  },
  searchWrap: {
    position: "relative",
    width: "min(640px, 100%)",
  },
  searchInput: {
    width: "100%",
    height: 44,
    padding: "0 48px 0 14px",
    border: "1px solid #e5e5e5",
    borderRadius: 9999,
    fontSize: 14,
    outline: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    boxSizing: "border-box",
  },
  clearInside: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    fontSize: 22,
    lineHeight: 1,
    cursor: "pointer",
    color: "#999",
  },
  searchBtn: {
    height: 44,
    padding: "0 20px",
    border: "none",
    borderRadius: 9999,
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  clearBtn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    fontSize: 22,
    lineHeight: 1,
    cursor: "pointer",
    color: "#999",
  },
  searchCombo: {
  display: "flex",
  alignItems: "center",
  width: "min(640px, 100%)",
  position: "relative",
  },

  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginBottom: 24,
  },
  categoryButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: 25,
    border: "none",
    background: "#f1f1f1",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "transform 0.2s ease",
  },
  activeCategory: { background: "#000", color: "#fff" },

  recipeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "transform 0.3s ease",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  heartButton: { background: "none", border: "none", cursor: "pointer", flexShrink: 0 },
  titleClamp: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "1.35",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    minHeight: 44,
  },
  cardImg: { width: "100%", height: 180, borderRadius: 12, objectFit: "cover", objectPosition: "center", display: "block" },
  tags: { display: "flex", gap: 8, flexWrap: "wrap", minHeight: 28 },
  tag: { background: "#f5f5f5", padding: "4px 10px", borderRadius: 12, fontSize: 12 },
  seeRecipe: {
    marginTop: "auto",
    padding: 10,
    borderRadius: 25,
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s ease",
  },
  skelImg: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    background: "linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  },
};
