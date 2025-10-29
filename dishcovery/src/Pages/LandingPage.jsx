import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import food from "../Images/food.png";
import Footer from "../Components/Footer";
import { signInWithGoogle, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export default function LandingPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#contact") {
      const el = document.getElementById("contact-footer");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  // 🟢 Handle Google Sign In
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <>
      <Navbar />
      <div className="nav-spacer" />

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
            {!user && (
              <button style={styles.blackBtn} onClick={handleGoogleSignIn}>
                Sign In with Google
              </button>
            )}
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={food} alt="Dish" style={styles.image} />
        </div>
      </section>

      <Footer />
    </>
  );
}

const baseFont = { fontFamily: "Poppins, sans-serif" };
const styles = {
  hero: {
    marginTop: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 0 0 60px",
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
    minWidth: 140,
    textAlign: "center",
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
    minWidth: 140,
    textAlign: "center",
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
