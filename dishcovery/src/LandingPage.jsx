import React from "react";

export default function LandingPage() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">Dishcovery</div>

          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <span className="search-icon" aria-hidden>🔍</span>
            <input type="text" placeholder="Search.." />
          </form>

          <nav className="links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a className="active" href="#">Explore</a>
            <a href="#">Recipe</a>
            <a href="#">Contact</a>
          </nav>

          <button className="profile" aria-label="Profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" fill="#FF9E00"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="nav-spacer" />

      <main style={{height:"1200px"}} />

      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap');

* { box-sizing: border-box; }
body { margin: 0; background-color: #FFFFFF; font-family: 'Poppins', Arial, sans-serif; color: #222222; }

/* ===== NAVBAR (fixed, clean) ===== */
.nav {
  position: fixed;
  top: 16px;              /* small gap from the top like the Figma */
  left: 0; right: 0;
  background-color: #FFFFFF;
  z-index: 1000;
}

/* >>> KEY FIX <<<  use a centered, not-full-width container */
.nav-inner {
  max-width: 920px;       /* match Figma canvas width so profile isn't too far right */
  margin: 0 auto;         /* center the row */
  padding: 14px 16px;     /* smaller side padding (no huge gaps) */
  display: grid;
  grid-template-columns: 150px 360px 1fr 36px;  /* brand | search | links | profile */
  column-gap: 20px;       /* tighter gaps so profile sits near links */
  align-items: center;
}

/* Spacer = navbar height + top offset */
.nav-spacer { height: 78px; }

/* Brand */
.brand { font-weight: 800; font-size: 24px; color: #FF9E00; letter-spacing: 0.2px; }

/* Search */
.search {
  display: flex; align-items: center;
  height: 36px; background-color: #F7F7F7;
  border-radius: 10px; padding: 0 12px;
  border: 1px solid rgba(0,0,0,0.06);
}
.search-icon { font-size: 13px; color: #6B6B6B; margin-right: 8px; }
.search input { border: none; outline: none; background: transparent; width: 100%; font-size: 13.5px; color: #222222; }

/* Links */
.links { display: flex; gap: 26px; justify-content: flex-start; }
.links a { text-decoration: none; color: #222222; font-size: 14px; font-weight: 500; }
.links a.active { color: #FF9E00; font-weight: 600; }

/* Profile button (now sits close to links b/c of container width) */
.profile {
  width: 36px; height: 36px; border-radius: 50%;
  border: none; background-color: #222222;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0; cursor: pointer;
}

/* Responsive: wrap links below when narrow */
@media (max-width: 980px) {
  .nav-inner { max-width: 100%; grid-template-columns: 160px 1fr 36px; row-gap: 12px; }
  .links { grid-column: 1 / -2; }
}
      `}</style>
    </>
  );
}
