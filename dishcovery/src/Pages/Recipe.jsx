import { useState } from "react";
import Navbar from "../Components/Navbar";
import {
  FaHeart,
  FaRegHeart,
  FaThLarge,
  FaCarrot,
  FaUtensils,
  FaIceCream,
  FaGlassMartiniAlt,
  FaLeaf,
  FaSeedling,
  FaAppleAlt,
} from "react-icons/fa";
import food from "../Images/food.png"; // sample recipe image

export default function Recipe() {
  const [liked, setLiked] = useState({});
  const [activeCategory, setActiveCategory] = useState("All Recipes");

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  const recipes = Array(10).fill({
    id: 1,
    title: "Spicy Vermicelli Noodles Salad",
    tags: ["Vegetarian", "Healthy", "Quick"],
    image: food,
  });

  return (
    <>
      <Navbar />

      <section style={styles.container}>
        {/* Title */}
        <h2 style={styles.heading}>
          What to <span style={styles.highlight}>Cook?</span>
        </h2>

        {/* Categories */}
        <div style={styles.categories}>
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === cat.name ? styles.activeCategory : {}),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span style={{ marginRight: "8px", color: "#FF9E00" }}>
                {cat.icon}
              </span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div style={styles.recipeGrid}>
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.transition = "transform 0.3s ease";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{recipe.title}</h3>
                <button
                  onClick={() => toggleLike(index)}
                  style={styles.heartButton}
                >
                  {liked[index] ? (
                    <FaHeart color="red" size={18} />
                  ) : (
                    <FaRegHeart size={18} />
                  )}
                </button>
              </div>

              {/* Image */}
              <img src={recipe.image} alt={recipe.title} style={styles.cardImg} />

              {/* Tags */}
              <div style={styles.tags}>
                {recipe.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <button
                style={styles.seeRecipe}
                onMouseEnter={(e) => {
                  e.target.style.background = "#FF9E00";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#000";
                  e.target.style.color = "#fff";
                }}
              >
                See Recipe ➝
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const styles = {
  container: {
    padding: "80px 80px",
    fontFamily: "Poppins, sans-serif",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "20px",
  },
  highlight: {
    color: "#FF9E00",
  },
  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "40px",
  },
  categoryButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    background: "#f1f1f1",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "transform 0.2s ease",
  },
  activeCategory: {
    background: "#000",
    color: "#fff",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.3s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: 0,
  },
  heartButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  cardImg: {
    width: "100%",
    borderRadius: "12px",
    height: "150px",
    objectFit: "cover",
  },
  tags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  tag: {
    background: "#f5f5f5",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
  },
  seeRecipe: {
    marginTop: "auto",
    padding: "10px",
    borderRadius: "25px",
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
};
