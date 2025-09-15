import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="nav-spacer" />

      <div style={styles.container}>
        <h1 style={styles.h1}>About Dishcovery</h1>
        <p style={styles.p}>
          Dishcovery helps home cooks explore recipes, plan meals, and learn new techniques
          with a clean, modern experience. We celebrate diverse cuisines and make cooking
          approachable, fun, and delicious.
        </p>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  container: { padding: "40px 80px", fontFamily: "Poppins, sans-serif" },
  h1: { margin: 0, fontSize: 32, fontWeight: 700, color: "#222" },
  p: { marginTop: 14, fontSize: 16, color: "#555", maxWidth: 760, lineHeight: 1.7 },
};
