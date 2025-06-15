import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchExperience, setSearchExperience] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [contactProfile, setContactProfile] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 8;

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

  useEffect(() => {
    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    const expFilterNum = Number(searchExperience);
    const profileExp = Number(p.experience) || 0;

    return (
      (searchName === "" ||
        (p.fullName ?? "").toLowerCase().includes(searchName.toLowerCase())) &&
      (searchCity === "" ||
        (p.city ?? "").toLowerCase().includes(searchCity.toLowerCase())) &&
      (searchTitle === "" ||
        (p.professionalTitle ?? "")
          .toLowerCase()
          .includes(searchTitle.toLowerCase())) &&
      (searchEmail === "" ||
        (p.email ?? "").toLowerCase().includes(searchEmail.toLowerCase())) &&
      (searchPhone === "" ||
        (p.phone ?? "").toLowerCase().includes(searchPhone.toLowerCase())) &&
      (searchExperience === "" || profileExp >= expFilterNum)
    );
  });

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

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
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#fff",
              color: "#2575fc",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            }}
          >
            🔙 Back
          </button>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
          padding: "1rem 2rem",
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "#000",
        }}
      >
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

      {loading ? (
        <p style={centerTextStyle}>Loading…</p>
      ) : paginatedProfiles.length === 0 ? (
        <p style={centerTextStyle}>No profiles found.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
              padding: "1rem 2rem",
            }}
          >
            {paginatedProfiles.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#fff",
                  color: "#222",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  minWidth: 220,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {p.profilePhoto && (
                    <img
                      src={`http://localhost:5000/uploads/photos/${p.profilePhoto}`}
                      alt="Profile"
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "8px",
                      }}
                    />
                  )}
                </div>

                <h3 style={{ margin: "0 0 6px" }}>{p.fullName}</h3>
                <p style={{ margin: "2px 0" }}>
                  <strong>Title:</strong> {p.professionalTitle}
                </p>
                <p style={{ margin: "2px 0" }}>
                  <strong>Experience:</strong> {p.experience || 0} yr
                </p>
                <p style={{ margin: "2px 0" }}>
                  <strong>City:</strong> {p.city || "—"}
                </p>
                <p style={{ margin: "2px 0" }}>
                  <strong>Phone:</strong> {p.phone}
                </p>

                {p.resume && (
                  <a
                    href={`http://localhost:5000/uploads/resumes/${p.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#2575fc",
                      fontWeight: "bold",
                    }}
                  >
                    📄 Download Resume
                  </a>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "4px",
                    marginTop: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => navigate(`/view-profile/${p.id}`)}
                    style={darkBlueButtonStyle}
                  >
                    👁 View
                  </button>
                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/view-profile/${p.id}`;
                      navigator.clipboard.writeText(shareUrl);
                      alert("Profile URL copied to clipboard!");
                    }}
                    style={orangeButtonStyle}
                  >
                    🔗 Share
                  </button>
                  <button
                    onClick={() => {
                      setContactProfile(p);
                      setShowModal(true);
                    }}
                    style={purpleButtonStyle}
                  >
                    📞 Contact
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
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      style={{ width: 24, height: 24 }}
                    />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
              margin: "1rem auto",
            }}
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                ...blueButtonStyle,
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              ◀ Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  style={{
                    ...blueButtonStyle,
                    backgroundColor:
                      pageNum === currentPage ? "#fff" : "#2575fc",
                    color: pageNum === currentPage ? "#2575fc" : "#fff",
                    border: "2px solid #2575fc",
                    minWidth: 36,
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                ...blueButtonStyle,
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next ▶
            </button>
          </div>
        </>
      )}

      {/* Contact Modal */}
      {showModal && contactProfile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              color: "#222",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Contact Information</h2>
            <p>
              <strong>Email:</strong> {contactProfile.email}
            </p>
            <p>
              <strong>Alternate Phone:</strong> {contactProfile.alternatePhone}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "20px",
                backgroundColor: "#2575fc",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
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

// 🔘 Style Definitions
const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
};

const centerTextStyle = {
  textAlign: "center",
  marginTop: "3rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const blueButtonStyle = {
  backgroundColor: "#2575fc",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 3px 10px rgba(37, 117, 252, 0.4)",
  flexGrow: 1,
};

const darkBlueButtonStyle = {
  backgroundColor: "#1f3b77",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  flexGrow: 1,
};

const orangeButtonStyle = {
  backgroundColor: "#f39c12",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  flexGrow: 1,
};

const purpleButtonStyle = {
  backgroundColor: "#8e44ad",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  flexGrow: 1,
};
