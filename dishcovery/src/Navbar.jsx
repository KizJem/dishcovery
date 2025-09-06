import { NavLink } from "react-router-dom";

export default function Navbar() {
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
            <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>
            <NavLink to="/explore" className={({isActive}) => isActive ? "active" : ""}>Explore</NavLink>
            <NavLink to="/recipe" className={({isActive}) => isActive ? "active" : ""}>Recipe</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
          </nav>

          <button className="profile" aria-label="Profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" fill="#FF9E00"/>
            </svg>
          </button>
        </div>
      </header>

      <style>{`
        /* --- header --- */
        .nav {
          position: fixed;
          top: 14px;                 /* adds space from the very top */
          left: 0; right: 0;
          background: #FFFFFF;
          z-index: 1000;
          /* removed box-shadow so there's NO line under the navbar */
        }

        /* --- inner row width & spacing --- */
        .nav-inner {
          max-width: 1180px;         /* wider = smaller side margins */
          margin: 0 auto;
          padding: 12px 12px;
          display: grid;
          grid-template-columns: 180px 420px 1fr 36px; /* brand | search | links | profile */
          column-gap: 24px;
          align-items: center;
        }

        .brand { font-weight: 800; font-size: 24px; color: #FF9E00; letter-spacing: 0.2px; }

        .search {
          display: flex; align-items: center;
          height: 36px; background: #F7F7F7;
          border-radius: 10px; padding: 0 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .search-icon { font-size: 13px; color: #6B6B6B; margin-right: 8px; }
        .search input { border: none; outline: none; background: transparent; width: 100%; font-size: 13.5px; color: #222; }

        .links { display: flex; gap: 26px; justify-content: flex-start; }
        .links a { text-decoration: none; color: #222; font-size: 14px; font-weight: 500; }
        .links a.active { color: #FF9E00; font-weight: 600; }

        .profile { width: 36px; height: 36px; border-radius: 50%; border: none; background: #222; color: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }

        /* spacer utility: header height (~52) + top offset (14) */
        .nav-spacer { height: 80px; }

        @media (max-width: 980px) {
          .nav-inner {
            max-width: 100%;
            grid-template-columns: 160px 1fr 36px;
            row-gap: 12px;
          }
          .links { grid-column: 1 / -2; }
        }
      `}</style>
    </>
  );
}
