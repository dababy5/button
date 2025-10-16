import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();

  const pageTitle =
    location.pathname === "/"
      ? "Home"
      : location.pathname === "/match-monitoring"
      ? "Match Monitoring"
      : "Profiles & Search";

  return (
    <header className="header">
      {/* Left Section: Page Title */}
      <div className="header-left">
        <h1>{pageTitle}</h1>
      </div>

      {/* Center Section: Branding */}
      <div className="header-center">
        <span className="brand-name">GuardianEye</span>
      </div>

      {/* Right Section: Navigation Links */}
      <nav className="header-right">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/match-monitoring"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Match Monitoring
        </NavLink>
        <NavLink
          to="/profiles"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profiles
        </NavLink>
      </nav>
    </header>
  );
}
