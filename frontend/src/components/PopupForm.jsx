import { motion } from "framer-motion";
import { useState } from "react";
// import axios from "axios"; // 🔒 Temporarily disabled API import

export default function PopupForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: null,
    referencePhotos: [], // optional
    lastLocation: "",
    lastSeen: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "referencePhotos") {
        setFormData({ ...formData, referencePhotos: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit (mocked for now)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image || !formData.firstName || !formData.lastName) {
      alert("First name, last name, and one main image are required.");
      return;
    }

    // --- 🧱 Mock API behavior for now ---
    console.log("Form submitted (mock):", formData);
    alert("✅ Form data captured locally! (API not yet active)");
    onClose();

    // --- 🔒 Actual API call commented out ---
    /*
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("image", formData.image);

    if (formData.lastLocation) data.append("lastLocation", formData.lastLocation);
    if (formData.lastSeen) data.append("lastSeen", formData.lastSeen);

    if (formData.referencePhotos.length > 0) {
      formData.referencePhotos.forEach((file) => {
        data.append("referencePhotos", file);
      });
    }

    try {
      await axios.post("http://localhost:5000/api/profiles", data);
      alert("Profile submitted successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting profile.");
    }
    */
  };

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        className="card"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        style={{
          width: "420px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2>Report Lost Child</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            onChange={handleChange}
            required
          />

          <label>Main Photo *</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {/* Optional Fields */}
          <label>Additional Reference Photos (Optional)</label>
          <input
            type="file"
            name="referencePhotos"
            accept="image/*"
            multiple
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastLocation"
            placeholder="Last Known Location (Optional)"
            onChange={handleChange}
          />

          <label>Last Date/Time Seen (Optional)</label>
          <input type="datetime-local" name="lastSeen" onChange={handleChange} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: "#999" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
