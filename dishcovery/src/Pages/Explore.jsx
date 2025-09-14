import { SiteNavbar } from "./LandingPage";
import food from "../Images/food.png";
import Contact from "./Contact";

export default function Explore() {
  const dishCategories = [
    "Dinner",
    "Vegetarian",
    "Healthy",
    "Instant Pot",
    "Vegan",
    "Seafood",
    "Breakfast",
    "Gluten-Free",
    "Desserts",
    "Quick & Easy",
  ];

  return (
    <>
      <SiteNavbar />

      <div style={styles.page}>
        {/* Smart Tools */}
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

        {/* Explore Dishes */}
        <section style={styles.dishesSection}>
          <h2 style={styles.sectionTitle}>Explore more dishes</h2>
          <div style={styles.dishesGrid}>
            {dishCategories.map((category, index) => (
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
                <img src={food} alt={category} style={styles.cardImage} />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{category}</h3>
                  <button
                    style={styles.cardButton}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#FF9E00";
                      e.target.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#000";
                      e.target.style.color = "#fff";
                    }}
                  >
                    See Recipe →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Contact />
    </>
  );
}

const styles = {
  page: {
    padding: "10px 80px",
    fontFamily: "'Poppins', sans-serif",
  },
  toolsSection: { marginBottom: 60, textAlign: "center" },
  toolsTitle: { fontSize: 22, fontWeight: 600, marginBottom: 25, color: "#222" },
  toolsGrid: {
    display: "flex",
    gap: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },
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
  dishesSection: { marginTop: 40 },
  sectionTitle: { fontSize: 22, fontWeight: 600, marginBottom: 25, color: "#222" },
  dishesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  cardImage: { width: "100%", height: 180, objectFit: "cover" },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 600, marginBottom: 10 },
  cardButton: {
    border: "none",
    background: "#000",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 25,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
