import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/profiles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success" && json.data) {
          setProfile(json.data);
        } else {
          alert("Profile not found.");
          navigate("/employer-dashboard");
        }
      })
      .catch(() => {
        alert("Server unreachable");
        navigate("/employer-dashboard");
      });
  }, [id, navigate]);

  if (!profile) return <p style={{ textAlign: "center", color: "#fff" }}>Loading profile...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // purple-blue gradient
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          padding: 30,
          backgroundColor: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          color: "#333",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 30,
            color: "#1a73e8",
            fontWeight: "700",
            fontSize: "2rem",
          }}
        >
          {profile.fullName}'s Profile
        </h1>

        {profile.profilePhoto && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <img
              src={`http://localhost:5000/uploads/photos/${profile.profilePhoto}`}
              alt="Profile"
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #1a73e8",
                boxShadow: "0 4px 15px rgba(26, 115, 232, 0.3)",
              }}
            />
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: 15,
            columnGap: 40,
            fontSize: "1.1rem",
          }}
        >
          <p>
            <strong>Professional Title:</strong> {profile.ProfessionalTitle || "—"}
          </p>
          <p>
            <strong>Experience:</strong> {profile.experience || 0} yr
          </p>
          <p>
            <strong>City:</strong> {profile.city || "—"}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>Alternate Phone:</strong> {profile.AlternatePhone || "—"}
          </p>
          <p>
            <strong>Qualification:</strong> {profile.qualification || "—"}
          </p>
          <p>
            <strong>Technical Languages:</strong> {profile.technicalLanguages || "—"}
          </p>
          <p style={{ gridColumn: "span 2" }}>
            <strong>Github Link:</strong>{" "}
            <a
              href={profile.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a73e8", textDecoration: "underline" }}
            >
              {profile.githubLink || "—"}
            </a>
          </p>
        </div>

  

  {profile.resume && (
          <p style={{ marginTop: 30, textAlign: "center" }}>
            <a
              href={`http://localhost:5000/uploads/resumes/${profile.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1a73e8",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                boxShadow: "0 3px 10px rgba(26,115,232,0.3)",
                display: "inline-block",
              }}
            >
              📄 View Resume
            </a>
          </p>
        )}





<div
  style={{
    textAlign: "center",
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => {
      const shareUrl = `${window.location.origin}/view-profile/${id}`;
      navigator.clipboard.writeText(shareUrl)
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
    📤 Share Profile
  </button>

  <a
    href={`https://wa.me/?text=${encodeURIComponent(`Check out this profile: ${window.location.origin}/view-profile/${id}`)}`}
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
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      style={{ width: 24, height: 24 }}
    />
    Share On WhatsApp
  </a>
</div>



        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={() => navigate("/employer-dashboard")}
            style={{
              backgroundColor: "#e53935",
              color: "#fff",
              padding: "12px 28px",
              border: "none",
              borderRadius: 8,
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow: "0 3px 10px rgba(229,57,53,0.4)",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
          >
            🔙 Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
