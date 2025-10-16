import { useState, useEffect } from "react";
import MatchTile from "../components/MatchTile";

export default function MatchMonitoring() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // TODO: Fetch from backend when ready
    // fetch('http://backend-url/api/matches').then(res => res.json()).then(data => setMatches(data))

    // Mock Data
    setMatches([
      {
        id: 1,
        child1: { name: "Alice Brown", location: "NY", date: "2025-10-10" },
        child2: { name: "Bob Carter", location: "NJ", date: "2025-10-11" },
      },
      {
        id: 2,
        child1: { name: "Sara Lee", location: "CA", date: "2025-09-25" },
        child2: { name: "Liam Hill", location: "CA", date: "2025-09-26" },
      },
    ]);
  }, []);

  return (
    <div className="main-container">
      <h2>Recent Matches</h2>
      {matches.length === 0 ? (
        <p>No matches available.</p>
      ) : (
        matches.map((m) => <MatchTile key={m.id} match={m} />)
      )}
    </div>
  );
}
