import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();

  // Scroll to top every time the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <header className="nav">
        <div className="nav-inner">
          {/* LEFT */}
          <div className="brand">Dishcovery</div>

          {/* MIDDLE */}
          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search.." />
          </form>

          {/* RIGHT */}
          <div className="right-section">
            <nav className="links">
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
              <NavLink to="/explore" className={({ isActive }) => (isActive ? "active" : "")}>
                Explore
              </NavLink>
              <NavLink to="/recipe" className={({ isActive }) => (isActive ? "active" : "")}>
                Recipe
              </NavLink>
            </nav>

            <button className="profile" aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                  fill="#FF9E00"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <style>{`
        * { font-family: 'Poppins', sans-serif; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          background-color: #ffffff; z-index: 1000;
          border-bottom: 1px solid #eee;
        }
        .nav-inner {
          max-width: 1440px; margin: 0 auto; padding: 18px 32px;
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
        }
        .brand {
          font-weight: 800; font-size: 32px; color: #FF9E00; letter-spacing: 0.3px;
        }
        .search {
          flex: 1; max-width: 560px; display: flex; align-items: center; height: 48px;
          background-color: #F7F7F7; border-radius: 12px; padding: 0 16px;
          border: 1px solid rgba(0,0,0,0.06); margin: 0 60px;
        }
        .search-icon { font-size: 18px; color: #6B6B6B; margin-right: 10px; }
        .search input {
          border: none; outline: none; background: transparent; width: 100%;
          font-size: 16px; color: #222;
        }
        .right-section { display: flex; align-items: center; gap: 32px; }
        .links { display: flex; gap: 32px; }
        .links a { text-decoration: none; color: #222; font-size: 18px; font-weight: 500; }
        .links a.active { color: #FF9E00; font-weight: 600; }
        .links a:hover { color: #FF9E00; }
        .profile {
          width: 48px; height: 48px; border-radius: 50%; border: none;
          background-color: #222; color: #fff;
          display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
        }
        /* spacer to push content below the fixed navbar */
        .nav-spacer { height: 84px; }

        @media (max-width: 980px) {
          .nav-inner { flex-wrap: wrap; }
          .search { order: 3; flex: 1; margin: 12px 0; max-width: none; }
          .right-section { width: 100%; justify-content: flex-start; gap: 16px; }
          .links { flex-wrap: wrap; gap: 16px; }
        }
      `}</style>
    </>
  );
}
