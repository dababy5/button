import { useState, useEffect } from "react";
// import axios from "axios"; // 🔒 Uncomment later when backend API is ready

export default function Profiles() {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    /*
    ==========================================================
    📡 API INTEGRATION GUIDE (for future use)
    ----------------------------------------------------------
    ✅ Expected Backend Endpoint:
        GET http://localhost:5000/api/profiles?search=<search>

    🧩 Example Response Schema (JSON):
    [
      {
        id: 1,
        firstName: "Alice",
        lastName: "Brown",
        imageURL: "https://cdn.server.com/images/alice.jpg",
        lastLocation: "Downtown Station",
        lastSeen: "2025-10-12T15:30:00Z",
        referencePhotos: [
          "https://cdn.server.com/images/alice_ref1.jpg",
          "https://cdn.server.com/images/alice_ref2.jpg"
        ],
        matches: 3
      },
      {
        id: 2,
        firstName: "Liam",
        lastName: "Carter",
        imageURL: null,
        lastLocation: null,
        lastSeen: null,
        referencePhotos: [],
        matches: 1
      }
    ]

    ----------------------------------------------------------
    🧠 Each field usage:
    - id → unique identifier
    - firstName, lastName → displayed together as name
    - imageURL → profile photo (null = “No Image”)
    - lastLocation → last known place (null = “Unknown”)
    - lastSeen → ISO timestamp (null = “Unknown”)
    - referencePhotos → array of optional image URLs
    - matches → count of linked matches
    ==========================================================

    🔓 When backend is ready, UNCOMMENT the axios call below:
    
    axios
      .get("http://localhost:5000/api/profiles", { params: { search } })
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error("Error fetching profiles:", err));
    */

    // --- 🧱 Mock Data (for layout & design testing) ---
    setProfiles([
      {
        id: 1,
        firstName: "Alice",
        lastName: "Brown",
        matches: 3,
        imageURL: "",
        lastLocation: "Downtown Station",
        lastSeen: "2025-10-12T15:30:00Z",
        referencePhotos: [
          "https://via.placeholder.com/80",
          "https://via.placeholder.com/81",
        ],
      },
      {
        id: 2,
        firstName: "Liam",
        lastName: "Carter",
        matches: 1,
        imageURL: "",
        lastLocation: "",
        lastSeen: "",
        referencePhotos: [],
      },
    ]);
  }, [search]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Unknown";
    const date = new Date(dateTime);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="main-container" style={{ padding: "2rem" }}>
      <h2>Search Profiles</h2>

      {/* 🔍 Search bar (controlled input) */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "1.5rem",
        }}
      />

      {/* 🧱 Profiles Grid */}
      <div
        className="grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {profiles.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "1rem",
            }}
          >
            {/* 🖼️ Main Image or Placeholder */}
            <div
              style={{
                backgroundColor: "#eaeaea",
                height: "150px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                marginBottom: "0.8rem",
              }}
            >
              {p.imageURL ? (
                <img
                  src={p.imageURL}
                  alt={`${p.firstName} ${p.lastName}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                "No Image"
              )}
            </div>

            {/* 👤 Basic Info */}
            <p>
              <strong>
                {p.firstName} {p.lastName}
              </strong>
            </p>

            <p>
              <strong>Last Known Location:</strong>{" "}
              {p.lastLocation || "Unknown"}
            </p>

            <p>
              <strong>Last Seen:</strong> {formatDateTime(p.lastSeen)}
            </p>

            {/* 🖼️ Reference Photos (if any) */}
            {p.referencePhotos && p.referencePhotos.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  flexWrap: "wrap",
                  marginTop: "5px",
                }}
              >
                {p.referencePhotos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt={`Reference ${i + 1}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </div>
            ) : (
              <p>
                <strong>Reference Photos:</strong> None provided
              </p>
            )}

            {/* 🔗 Matches Link */}
            <a
              href="#"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "600",
                display: "block",
                marginTop: "10px",
              }}
            >
              View Matches ({p.matches})
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
