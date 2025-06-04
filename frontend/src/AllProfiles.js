
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // filters
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchExperience, setSearchExperience] = useState("");

  // contact-modal
  const [showModal, setShowModal] = useState(false);
  const [contactProfile, setContactProfile] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully.");
    navigate("/login");
  };

  const fetchProfiles = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/profiles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((j) =>
        j.status === "success" ? setProfiles(j.data) : alert(j.message)
      )
      .catch(() => alert("Server unreachable"))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    fetch(`http://localhost:5000/profiles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((r) => r.json())
      .then((j) => (j.status === "success" ? fetchProfiles() : alert("Failed to delete profile")))
      .catch(() => alert("Server unreachable"));
  };

  useEffect(() => {
    // Role check removed here — now anyone with token can load this page
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    const expFilterNum = Number(searchExperience);
    const profileExp = Number(p.experience) || 0;

    return (
      (searchName === "" || (p.fullName ?? "").toLowerCase().includes(searchName.toLowerCase())) &&
      (searchCity === "" || (p.city ?? "").toLowerCase().includes(searchCity.toLowerCase())) &&
      (searchTitle === "" || (p.ProfessionalTitle ?? "").toLowerCase().includes(searchTitle.toLowerCase())) &&
      (searchEmail === "" || (p.email ?? "").toLowerCase().includes(searchEmail.toLowerCase())) &&
      (searchPhone === "" || (p.phone ?? "").toLowerCase().includes(searchPhone.toLowerCase())) &&
      (searchExperience === "" || profileExp >= expFilterNum)
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", margin: 0 }}>
            All Profiles
          </h1>
        </div>
        <div style={styles.navButtons}>
          <button style={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Filters */}
      <div style={filterGridStyle}>
        <input
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Search by City"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Search by Phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Search by Experience"
          value={searchExperience}
          onChange={(e) => setSearchExperience(e.target.value)}
          style={inputStyle}
          type="number"
          min="0"
        />
      </div>

      {/* Content */}
      {loading ? (
        <p style={centerTextStyle}>Loading…</p>
      ) : filteredProfiles.length === 0 ? (
        <p style={centerTextStyle}>No profiles found.</p>
      ) : (
        <div style={cardGridStyle}>
          {filteredProfiles.map((p) => (
            <div key={p.id} style={cardStyle}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <h3 style={{ margin: "0 0 6px", color: "#222" }}>{p.fullName}</h3>
                <p style={{ color: "#222" }}>
                  <strong>Title:</strong> {p.ProfessionalTitle || "—"}
                </p>
                <p style={{ color: "#222" }}>
                  <strong>Experience:</strong> {p.experience || 0} yr
                </p>
                <p style={{ color: "#222" }}>
                  <strong>City:</strong> {p.city || "—"}
                </p>
                <p style={{ color: "#222" }}>
                  <strong>Email:</strong> {p.email}
                </p>
                <p style={{ color: "#222" }}>
                  <strong>Phone:</strong> {p.phone}
                </p>

                {p.resume && (
                  <a
                    href={`http://localhost:5000/uploads/resumes/${p.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={resumeLinkStyle}
                  >
                    📄 Download Resume
                  </a>
                )}

                <div>
                  {/* First row: View and Delete */}
                  <div style={buttonRowStyle}>
                    <button
                      onClick={() => navigate(`/view-profile/${p.id}`)}
                      style={blueButtonStyle}
                    >
                      👁 View
                    </button>
                    <button
  onClick={() => {
    setContactProfile(p);
    setShowModal(true);
  }}
  style={{
    backgroundColor: "#f9ab00",
    color: "#fff",
    padding: "12px 28px",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 3px 10px rgba(249,171,0,0.4)",
    transition: "background-color 0.3s ease",
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c27800")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9ab00")}
>
  📞 Contact
</button>
                  </div>

                  {/* Second row: Share and Contact */}
                  <div style={buttonRowStyle}>
                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/view-profile/${p.id}`;
                        navigator.clipboard
                          .writeText(shareUrl)
                          .then(() => alert("Profile link copied to clipboard!"))
                          .catch(() => alert("Failed to copy the link."));
                      }}
                      style={{
                        backgroundColor: "#34a853",
                        color: "#fff",
                        padding: "12px 28px",
                        border: "none",
                        borderRadius: 8,
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: 700,
                        boxShadow: "0 3px 10px rgba(52,168,83,0.4)",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0b8043")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#34a853")}
                    >
                      📤 Share
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Check out this profile: ${window.location.origin}/view-profile/${p.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "#25D366",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        textDecoration: "none",
                        boxShadow: "0 3px 10px rgba(37, 211, 102, 0.4)",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="20"
                        height="20"
                        fill="white"
                      >
                        <path d="M19.11 17.04c-.26-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.13s-.66.82-.81.99c-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.08-1.27-.77-.69-1.3-1.53-1.45-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.44-.07-.13-.57-1.37-.78-1.89-.2-.48-.4-.42-.57-.43-.15-.01-.32-.01-.49-.01s-.45.06-.68.32c-.23.26-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.82 2.81 4.4 3.94.61.26 1.08.42 1.45.53.61.19 1.16.17 1.59.1.48-.07 1.5-.61 1.72-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.49-.3z" />
                        <path d="M16 0a16 16 0 0 0-13.85 23.83L0 32l8.37-2.16A16 16 0 1 0 16 0zm0 29.32c-2.26 0-4.34-.56-6.18-1.55l-.44-.26-4.97 1.28 1.33-4.84-.29-.45a12.91 12.91 0 0 1-1.97-6.77c0-7.18 5.83-13 13-13a12.93 12.93 0 0 1 9.16 3.8 12.9 12.9 0 0 1 3.8 9.16c0 7.18-5.83 13-13 13z" />
                      </svg>
                      
                    </a>
                     
           

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

     {showModal && contactProfile && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
    onClick={() => setShowModal(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "1rem 1.5rem",
        maxWidth: "320px",  // smaller max width
        width: "90%",
        maxHeight: "60vh",   // smaller max height for compactness
        overflowY: "auto",
        color: "black",
        boxShadow: "0 0 10px #000000aa",
        display: "flex",
        flexDirection: "column",
        gap: "12px",  // less gap for compact layout
        fontSize: "0.9rem",  // smaller font size
        textAlign: "center"
      }}
    >
      <h2 style={{ margin: "0 0 8px" }}>Contact Information</h2>
      <p>
        <strong>Email:</strong> {contactProfile.email}
      </p>
      <p>
        <strong>Phone:</strong> {contactProfile.phone}
      </p>
      <button
        onClick={() => setShowModal(false)}
        style={{
          marginTop: "1rem",
          padding: "8px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2575fc",
          color: "white",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.9rem",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

// Styles used in the component:
const styles = {
  navButtons: {
    display: "flex",
    gap: "10px",
  },
  navButton: {
    backgroundColor: "white",
    color: "#2575fc",
    padding: "12px 28px",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 3px 10px rgba(37,117,252,0.4)",
    transition: "background-color 0.3s ease",
  },
};

const filterGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "10px",
  padding: "20px",
  backgroundColor: "rgba(255,255,255,0.9)",
  color: "black",
};

const inputStyle = {
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

const centerTextStyle = {
  textAlign: "center",
  padding: "2rem",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
  padding: "20px",
  backgroundColor: "rgba(255,255,255,0.9)",
  flexGrow: 1,
};

const cardStyle = {
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0 3px 10px #00000011",
  display: "flex",
  flexDirection: "column",
};

const resumeLinkStyle = {
  display: "inline-block",
  marginTop: "10px",
  color: "#2575fc",
  textDecoration: "underline",
  fontWeight: "bold",
};

const buttonRowStyle = {
  marginTop: "10px",
  display: "flex",
  gap: "10px",
};

const blueButtonStyle = {
  backgroundColor: "#2575fc",
  color: "white",
  padding: "12px 28px",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  fontWeight: 700,
  boxShadow: "0 3px 10px rgba(37,117,252,0.4)",
};

const redButtonStyle = {
  backgroundColor: "#ff1744",
  color: "white",
  padding: "12px 28px",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  fontWeight: 700,
  boxShadow: "0 3px 10px rgba(255, 23, 68, 0.4)",
};
