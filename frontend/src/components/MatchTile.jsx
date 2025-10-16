export default function MatchTile({ match }) {
  return (
    <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {[match.child1, match.child2].map((child, idx) => (
        <div key={idx}>
          <div
            style={{
              backgroundColor: "#eaeaea",
              borderRadius: "6px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            {child.img ? (
              <img
                src={child.img}
                alt={child.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
              />
            ) : (
              "No Image"
            )}
          </div>
          <p><strong>{child.name}</strong></p>
          <p>{child.location || "Unknown location"}</p>
          <p>{child.date || "Date unknown"}</p>
        </div>
      ))}
    </div>
  );
}
