import { useState } from "react";
import PopupForm from "../components/PopupForm";
import { Link } from "react-router-dom";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="main-container">
      <h2>Welcome to the Child Match Monitoring System</h2>
      <p style={{ marginTop: "10px" }}>
        Manage child profiles, monitor active matches, and search the database.
      </p>

      <div className="grid-3" style={{ marginTop: "2rem" }}>
        <button className="card btn-primary" onClick={() => setShowForm(true)}>
          Post Image/Name to Profile
        </button>

        <Link to="/match-monitoring" className="card btn-primary" style={{ textAlign: "center" }}>
          Match Monitoring
        </Link>

        <Link to="/profiles" className="card btn-primary" style={{ textAlign: "center" }}>
          View/Search Profiles
        </Link>
      </div>

      {showForm && <PopupForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
