import Navbar from "../Components/Navbar";
import food from "../Images/food.png"; // sample image for dishes

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
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <div style={styles.page}>
                {/* Smart Tools Section */}
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
                                    e.target.style.backgroundColor = "#ffe082";
                                    e.target.style.transform = "scale(1.05)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#f5f5f5";
                                    e.target.style.transform = "scale(1)";
                                }}
                            >
                                {tool}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Explore Dishes Section */}
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
        </div>
    );
}

const styles = {
    page: {
        padding: "40px 80px",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "100px",
    },
    toolsSection: {
        marginBottom: "60px",
        textAlign: "center",
    },
    toolsTitle: {
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "25px",
        color: "#222",
    },
    toolsGrid: {
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    toolButton: {
        padding: "14px 22px",
        border: "none",
        borderRadius: "12px",
        backgroundColor: "#f5f5f5",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    dishesSection: {
        marginTop: "40px",
    },
    sectionTitle: {
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "25px",
        color: "#222",
    },
    dishesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
    },
    card: {
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        transition: "transform 0.3s ease", // base transition
    },
    cardImage: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
    },
    cardContent: {
        padding: "15px",
    },
    cardTitle: {
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "10px",
    },
    cardButton: {
        border: "none",
        background: "#000",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "25px",
        fontSize: "14px",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
};
