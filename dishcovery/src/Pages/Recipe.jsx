import Navbar from "../Components/Navbar";

export default function Recipe() {
  return (
    <>
      <Navbar />

      {/*Main Container*/}
      <div style={styles.container}>
        {/* Search Bar */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search recipes..."
            style={styles.searchBar}
          />
        </div>

        {/*Section Title*/}
        <h2 style={styles.title}>What to <span style={styles.highlight}>Cook?</span></h2>

        {/*Filter Buttons*/}
        <div style={styles.filters}>
          {[
            "All Types", "Appetizers", "Main Courses", "Salads & Sides",
            "Vegetarian Delights", "International Flavors", "Desserts & Sweets",
            "Healthy Eats", "Quick & Easy Supper"
          ].map((filter, i) => (
            <button key={i} style={i === 0 ? styles.activeFilter : styles.filterBtn}>
              {filter}
            </button>
          ))}
        </div>

        {/*Recipe Cards Grid*/}
        <div style={styles.grid}>
          {recipes.map((recipe, i) => (
            <div key={i} style={styles.card}>
              <img src={recipe.image} alt={recipe.title} style={styles.cardImg} />
              <h3 style={styles.cardTitle}>{recipe.title}</h3>
              <button style={styles.cardBtn}>See Complete Recipe</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// SAMPLE DATA
const recipes = [
  { title: "Fresh Salad with Tahini Sauce", image: "https://source.unsplash.com/400x300/?salad" },
  { title: "Chili con Carne with Nachos Chips", image: "https://source.unsplash.com/400x300/?chili" },
  { title: "Sour & Spicy Korean Kimchi", image: "https://source.unsplash.com/400x300/?kimchi" },
  { title: "Flat Noodles with Shrimp Veggie", image: "https://source.unsplash.com/400x300/?noodles" },
  { title: "Classic Italian Beef Maltagliati", image: "https://source.unsplash.com/400x300/?pasta" },
  { title: "Cauliflower Steak Chimichurri Spices", image: "https://source.unsplash.com/400x300/?cauliflower" },
];

const styles = {
  container: {
    padding: "140px 60px 60px", // pushes below navbar
    fontFamily: "Poppins, sans-serif",
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  searchBar: {
    width: "60%",
    padding: "16px 20px",
    borderRadius: "30px",
    border: "1px solid #ccc",
    fontSize: "18px",
    outline: "none",
  },
  title: {
    fontSize: "34px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "25px",
    color: "#222",
  },
  highlight: {
    color: "#FF9E00",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "50px",
  },
  filterBtn: {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  activeFilter: {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    background: "#000",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "15px",
    textAlign: "center",
  },
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#222",
  },
  cardBtn: {
    padding: "10px 18px",
    borderRadius: "25px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};
