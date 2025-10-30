import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import defaultFood from "../Images/food.png";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const navigate = useNavigate();

  const storageKey = (userId) => `dishcovery_favorites_${userId || "guest"}`;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const key = storageKey(user?.uid);
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : {};
      setFavorites(parsed || {});
    } catch (e) {
      console.error("Failed to load favorites for profile", e);
      setFavorites({});
    }
  }, [user]);

  const saveFavorites = (next) => {
    const key = storageKey(user?.uid);
    try {
      localStorage.setItem(key, JSON.stringify(next || {}));
    } catch (e) {
      console.error("Failed to save favorites for profile", e);
    }
  };

const profileStyles = {
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    alignItems: "start",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    padding: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "transform 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    minHeight: 48,
  },
  heartButton: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#FF4D6D", flexShrink: 0 },
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
  cardImg: {
    width: "100%",
    height: 180,
    flexShrink: 0,
    borderRadius: 12,
    objectFit: "cover",
    display: "block",
  },
  tags: { display: "flex", gap: 8, flexWrap: "wrap", minHeight: 28, marginTop: 6 },
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
    transition: "all 0.2s ease",
  },
};

  const handleUnfavorite = (id) => {
    const sid = String(id);
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      delete next[sid];
      saveFavorites(next);
      return next;
    });
  };

  const sortedList = (() => {
    const arr = Object.values(favorites || {}).slice();
    switch (sort) {
      case "oldest":
        return arr.sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));
      case "az":
        return arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      case "za":
        return arr.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
      case "newest":
      default:
        return arr.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    }
  })();

  return (
    <>
      <Navbar />
      <div className="nav-spacer" />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px" }}>
        <section style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img
            src={user?.photoURL || defaultFood}
            alt="avatar"
            style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <h2 style={{ color: "#FF9E00", margin: 0 }}>{user?.displayName || "user 01"}</h2>
            <p style={{ marginTop: 6, color: "#666" }}>✏️ Edit profile</p>
          </div>
        </section>

        <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #ddd" }} />

        <h3 style={{ color: "#FF9E00" }}>My favorites</h3>
        <p style={{ color: "#666" }}>Your favorite recipes will show up here.</p>

        {/* Favorites grid + sort control */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSortOpen((s) => !s)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: "8px 12px", borderRadius: 8, border: "1px solid #eee", background: "#fff", cursor: "pointer" }}
                aria-expanded={sortOpen}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M6 12h12M10 18h4" stroke="#222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontWeight: 600 }}>{sort === "newest" ? "Newest" : sort === "oldest" ? "Oldest" : sort === "az" ? "A - Z" : "Z - A"}</span>
              </button>

              {sortOpen && (
                <div style={{ position: "absolute", left: 0, top: 42, background: "#fff", border: "1px solid #eee", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", borderRadius: 8, overflow: "hidden", zIndex: 1200 }}>
                  <button className="dropdown-item" onClick={() => { setSort("newest"); setSortOpen(false); }} style={{ display: 'block', padding: '8px 12px', width: '200px', textAlign: 'left', background: 'transparent', border: 'none' }}>Newest</button>
                  <button className="dropdown-item" onClick={() => { setSort("oldest"); setSortOpen(false); }} style={{ display: 'block', padding: '8px 12px', width: '200px', textAlign: 'left', background: 'transparent', border: 'none' }}>Oldest</button>
                  <button className="dropdown-item" onClick={() => { setSort("az"); setSortOpen(false); }} style={{ display: 'block', padding: '8px 12px', width: '200px', textAlign: 'left', background: 'transparent', border: 'none' }}>A - Z</button>
                  <button className="dropdown-item" onClick={() => { setSort("za"); setSortOpen(false); }} style={{ display: 'block', padding: '8px 12px', width: '200px', textAlign: 'left', background: 'transparent', border: 'none' }}>Z - A</button>
                </div>
              )}
            </div>
          </div>

          {sortedList.length === 0 ? (
            <p style={{ color: "#666", marginTop: 12 }}>You have no favorite recipes yet. Click the ♥ on Explore to add some!</p>
          ) : (
            <div style={profileStyles.recipeGrid}>
              {sortedList.map((r) => (
                <div key={r.id} style={profileStyles.card}>
                  <div style={profileStyles.cardHeader}>
                    <h3 style={profileStyles.titleClamp}>{r.title}</h3>
                    <button onClick={() => handleUnfavorite(r.id)} style={profileStyles.heartButton} aria-label="unfavorite">❤</button>
                  </div>
                  <img src={r.image || defaultFood} alt={r.title} style={profileStyles.cardImg} />
                  <div style={profileStyles.tags}>{(r.tags || []).map((t, i) => <span key={i} style={profileStyles.tag}>{t}</span>)}</div>
                  <button style={profileStyles.seeRecipe} onClick={() => navigate(`/recipe/${r.id}`)}>See Recipe ➝</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

  const gridStyles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 20,
      marginTop: 12,
    },
    card: {
      background: "#fff",
      borderRadius: 12,
      padding: 12,
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    img: { width: "100%", height: 140, objectFit: "cover", borderRadius: 8 },
    title: { fontSize: 15, margin: 0, fontWeight: 600 },
  };
