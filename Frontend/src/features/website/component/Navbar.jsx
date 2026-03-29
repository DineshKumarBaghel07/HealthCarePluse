import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const profileLabel = user?.username?.[0]?.toUpperCase() || "P";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const onLogout = async () => {
    await handleLogout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <h2 className="logo">HealthCare+</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          {user ? (
            <div
              className="profile-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="profile-link"
                aria-label="Profile menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="profile-avatar">{profileLabel}</span>
              </button>

              {menuOpen && (
                <div className="profile-dropdown">
                  <Link
                    to="/dashboard"
                    className="profile-dropdown-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="profile-dropdown-item logout-item"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
