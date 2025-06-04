import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployerDashboard() {
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

  // pagination
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
    if (localStorage.getItem("role") !== "employer") {
      alert("Access denied. Only employers can access this page.");
      navigate("/login");
      return;
    }
    fetchProfiles();
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
            Employer Dashboard
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={blueButtonStyle}
            onClick={() => navigate("/employer-profile")}
          >
            Add Another Profile
          </button>
          <button style={redButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Filters */}
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
        <input placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} style={inputStyle} />
        <input placeholder="Search by City" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} style={inputStyle} />
        <input placeholder="Search by Title" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} style={inputStyle} />
        <input placeholder="Search by Email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} style={inputStyle} />
        <input placeholder="Search by Phone" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} style={inputStyle} />
        <input placeholder="Search by Experience" value={searchExperience} onChange={(e) => setSearchExperience(e.target.value)} style={inputStyle} type="number" min="0" />
      </div>

      {/* Content */}
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
                <h3 style={{ margin: "0 0 6px" }}>{p.fullName}</h3>
                <p><strong>Title:</strong> {p.ProfessionalTitle || "—"}</p>
                <p><strong>Experience:</strong> {p.experience || 0} yr</p>
                <p><strong>City:</strong> {p.city || "—"}</p>
                <p><strong>Email:</strong> {p.email}</p>
                <p><strong>Phone:</strong> {p.phone}</p>
                {p.resume && (
                  <a
                    href={`http://localhost:5000/uploads/resumes/${p.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#2575fc", fontWeight: "bold" }}
                  >
                    📄 Download Resume
                  </a>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                  <button onClick={() => navigate(`/view-profile/${p.id}`)} style={blueButtonStyle}>👁 View</button>
                  <button onClick={() => handleDelete(p.id)} style={redButtonStyle}>🗑 Delete</button>
                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/view-profile/${p.id}`;
                      navigator.clipboard.writeText(shareUrl);
                      alert("Profile URL copied to clipboard!");
                    }}
                    style={greenButtonStyle}
                  >
                    🔗 Share
                  </button>
                  <button
                    onClick={() => {
                      setContactProfile(p);
                      setShowModal(true);
                    }}
                    style={yellowButtonStyle}
                  >
                    📞 Contact
                  </button>
                </div>
              </div>
            ))}
          </div>




{/* Pagination Controls */}
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px", margin: "1rem auto" }}>
  <button
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    style={{ ...blueButtonStyle, opacity: currentPage === 1 ? 0.5 : 1 }}
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
          backgroundColor: pageNum === currentPage ? "#fff" : "#2575fc",
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
    style={{ ...blueButtonStyle, opacity: currentPage === totalPages ? 0.5 : 1 }}
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
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#222",
              }}
              aria-label="Close Contact Modal"
            >
              &times;
            </button>
            <h2>Contact {contactProfile.fullName}</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactProfile.email}`}>
                {contactProfile.email}
              </a>
            </p>
            <p><strong>Alternate Phone:</strong> {contactProfile.AlternatePhone}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "1rem", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out this profile: ${window.location.origin}/view-profile/${contactProfile.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  flexGrow: 1,
                  textAlign: "center",
                }}
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${contactProfile.email}`}
                style={{
                  backgroundColor: "#0072C6",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  flexGrow: 1,
                  textAlign: "center",
                }}
              >
                Email
              </a>
              <a
                href={`tel:${contactProfile.phone}`}
                style={{
                  backgroundColor: "#34B7F1",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  flexGrow: 1,
                  textAlign: "center",
                }}
              >
                Call
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Common inline styles
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

const redButtonStyle = {
  backgroundColor: "#e63946",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 3px 10px rgba(230, 57, 70, 0.4)",
  flexGrow: 1,
};

const greenButtonStyle = {
  backgroundColor: "#2a9d8f",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 3px 10px rgba(42, 157, 143, 0.4)",
  flexGrow: 1,
};

const yellowButtonStyle = {
  backgroundColor: "#f4c430",
  color: "#000",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 3px 10px rgba(244, 196, 48, 0.6)",
  flexGrow: 1,
};
