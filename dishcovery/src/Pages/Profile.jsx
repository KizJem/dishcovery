import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import defaultFood from "../Images/food.png";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

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
      </main>

      <Footer />
    </>
  );
}
