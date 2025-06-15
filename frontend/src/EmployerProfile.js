import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "sans-serif",
    color: "#000",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1b5edc",
    color: "#fff",
    borderRadius: "10px 10px 0 0",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
  },
  navButtons: {
    display: "flex",
    gap: "12px",
  },
  navButton: {
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    color: "#1b5edc",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  formRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: "6px",
    fontSize: "0.9rem",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#1b5edc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

const EmployerProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    professionalTitle: "",
    qualification: "",
    experience: "",
    phone: "",
    alternatePhone: "",
    email: "",
    technicalLanguages: "",
    githubLink: "",
    profilePhoto: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null) data.append(key, val);
    });

    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "POST",
        body: data,
      });
      if (res.ok) alert("Profile submitted successfully!");
      else alert("Failed to submit profile.");
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

  const handleLogout = () => {
    alert("Logged out.");
    navigate("/login");
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
        <div style={styles.navButtons}>
          <button style={styles.navButton} onClick={() => navigate("/employer-profile")}>
            Add Another Profile
          </button>
           <button style={styles.navButton} onClick={() => navigate("/employer-dashboard")}>
            View All Profiles
          </button>
          <button style={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Form */}
      <div style={styles.container}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Personal Info */}
          <div style={styles.formRow}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Professional Info */}
          <div style={styles.formRow}>
            <div style={styles.field}>
              <label style={styles.label}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Professional Title</label>
              <select
                name="professionalTitle"
                value={form.professionalTitle}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Title</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Content Writer">Content Writer</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Qualification</label>
              <select
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Qualification</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate Course">Certificate Course</option>
                <option value="Bootcamp Graduate">Bootcamp Graduate</option>
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.field}>
              <label style={styles.label}>Experience (Years)</label>
              <input
                name="experience"
                type="number"
                value={form.experience}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone No.</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
             <div style={styles.field}>
  <label style={styles.label}>AlternatePhone</label>
  <input
    name="alternatePhone"
    value={form.alternatePhone}
    onChange={handleChange}
    style={styles.input}
  />
</div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.field}>
              <label style={styles.label}>Technical Languages</label>
              <input
                name="technicalLanguages"
                value={form.technicalLanguages}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>GitHub Link</label>
              <input
                name="githubLink"
                type="url"
                value={form.githubLink}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Profile Photo</label>
              <input
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.field}>
              <label style={styles.label}>Upload Resume</label>
              <input
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button type="submit" style={styles.button}>
              Submit Profile
            </button>
          </div>
        </form>
      </div>

     {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '2rem 1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '1.5rem' }}>🌐</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Address</h3>
          <p>Hyderabad, Telangana - 50000.</p>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem' }}>📧</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Mailbox</h3>
          <p>@gmail.com</p>
          <div style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>
            <a href="#" aria-label="Twitter" style={{ margin: '0 0.5rem', color: '#fff' }}>𝕏</a>
            <a href="#" aria-label="Facebook" style={{ margin: '0 0.5rem', color: '#fff' }}>📘</a>
            <a href="#" aria-label="Instagram" style={{ margin: '0 0.5rem', color: '#fff' }}>📸</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem' }}>📞</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Phone</h3>
          <p>+91 </p>
        </div>
      </footer>

      <div
        style={{
          backgroundColor: '#111',
          color: '#aaa',
          textAlign: 'center',
          padding: '1rem',
          fontSize: '0.9rem',
        }}
      >
        <p>
          Copyright © 2025 . All Rights Reserved. | Designed by
        </p>
      </div>

    </div>
  );
};

export default EmployerProfile;
