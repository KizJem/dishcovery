import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import food from "../Images/food.png";

export default function LandingPage() {
  const navigate = useNavigate(); // hook for navigation

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.title}>
            Adventure of <span style={styles.highlight}>Dishcovers</span>
          </h1>
          <p style={styles.subtitle}>
            Unlock a world of variety culinary recipes and unleash your inner chef
            the easy way with <b>Dishcovery</b>.
          </p>
          <div style={styles.heroButtons}>
            {/* Navigate to Recipe page */}
            <button
              style={styles.blackBtn}
              onClick={() => navigate("/recipe")}
            >
              Explore Recipes
            </button>
            <button style={styles.whiteBtn}>Get Our Mobile App ↓</button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={food} alt="Dish" style={styles.image} />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featureCard}>
          <h3>User-Centered</h3>
          <p>
            Your feedback shapes our platform, ensuring a seamless and satisfying
            culinary journey.
          </p>
        </div>
        <div style={styles.featureCard}>
          <h3>Diverse Recipes</h3>
          <p>
            We celebrate diverse culinary traditions from around the world,
            inspiring you today.
          </p>
        </div>
        <div style={styles.featureCard}>
          <h3>Fun Community</h3>
          <p>
            We foster a vibrant foodie community where joy comes with sharing
            recipes with us.
          </p>
        </div>
      </section>
    </>
  );
}

const styles = {
  hero: {
    marginTop: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 0px 0px 60px",
    flexWrap: "wrap",
  },
  heroText: {
    flex: 1,
    maxWidth: "600px",
  },
  title: {
    fontSize: "70px",
    fontWeight: "700",
    lineHeight: "1.2",
    color: "#222",
  },
  highlight: {
    color: "#FF9E00",
  },
  subtitle: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.6",
  },
  heroButtons: {
    marginTop: "30px",
    display: "flex",
    gap: "15px",
  },
  blackBtn: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
  },
  whiteBtn: {
    background: "#fff",
    color: "#000",
    border: "1px solid #ddd",
    padding: "12px 24px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
  },
  heroImage: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: "2000px",
    paddingTop: "15px",
  },
  image: {
    width: "100%",
    maxHeight: "600px",
    objectFit: "cover",
    borderRadius: "0px",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "60px 80px",
    background: "#f5f5f5",
  },
  featureCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
