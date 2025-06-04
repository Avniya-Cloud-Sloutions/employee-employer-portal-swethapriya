require("dotenv").config(); // Load .env variables

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadsDir = path.join(__dirname, "uploads");
const app = express();



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads/photos", express.static("uploads/photos"));



app.use(cors());
app.use(express.json());


// Ensure upload directories exist
const dirs = ["uploads/photos", "uploads/resumes"];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created folder: ${dir}`);
  }
});

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilePhoto") cb(null, "uploads/photos");
    else if (file.fieldname === "resume") cb(null, "uploads/resumes");
    else cb(new Error("Invalid file field"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "signup",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection error:", err.code || err, err.message || "");
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database");
});

/* ========== AUTH ROUTES ========== */

// Signup
app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("Backend received role:", role);  // <<-- Log role here

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err) => {
      if (err) {
        console.error("Signup error:", err);
        return res.json({ status: "error", message: "Signup failed" });
      }
      res.json({ status: "success", message: "Signup successful" });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ? AND role = ?";
  db.query(sql, [email, password, role], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.json({ status: "error", message: "Database error" });
    }
    result.length > 0
      ? res.json({ status: "success", role: result[0].role })
      : res.json({ status: "error", message: "Invalid credentials" });
  });
});

// Forgot Password
app.post("/forgot-password", (req, res) => {
  const { email, newPassword, role } = req.body;

  if (!email || !newPassword || !role) {
    return res.json({ status: "failed", message: "Missing fields" });
  }

  db.query(
    "UPDATE users SET password = ? WHERE email = ? AND role = ?",
    [newPassword, email, role],
    (err, result) => {
      if (err) {
        console.error("Reset error:", err.code, err.sqlMessage);
        return res.json({ status: "error", message: "Database error" });
      }

      if (result.affectedRows > 0) {
        res.json({ status: "success", message: "Password updated" });
      } else {
        res.json({ status: "failed", message: "Email and role not found" });
      }
    }
  );
});

/* =================== PROFILE ROUTES =================== */
const profileUpload = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

app.post("/profile", profileUpload, (req, res) => {
  const {
    fullName,
    age,
    gender,
    city,
    professionalTitle,
    qualification,
    experience,
    phone,
    alternatePhone,
    email,
    technicalLanguages,
    githubLink,
  } = req.body;

  const photoFile = req.files?.profilePhoto?.[0]?.filename || null;
  const resumeFile = req.files?.resume?.[0]?.filename || null;

  const sql = `
    INSERT INTO profiles
    (fullName, age, gender, city, professionalTitle, qualification, experience,
     phone,alternatePhone, email, technicalLanguages, githubLink, profilePhoto, resume)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

  const values = [
    fullName,
    age ? Number(age) : null,
    gender,
    city,
    professionalTitle,
    qualification,
    experience ? Number(experience) : null,
    phone,
    alternatePhone,
    email,
    technicalLanguages,
    githubLink,
    photoFile,
    resumeFile,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Profile insert error:", err.code, err.sqlMessage);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to add profile" });
    }
    res.json({ status: "success", message: "Profile added successfully" });
  });
});

app.get("/profiles", (_, res) => {
  db.query("SELECT * FROM profiles ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("Fetch profiles error:", err.code, err.sqlMessage);
      return res.status(500).json({ status: "error" });
    }
    res.json({ status: "success", data: rows });
  });
});


app.get("/profiles/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM profiles WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error("Fetch single profile error:", err.code, err.sqlMessage);
      return res.status(500).json({ status: "error" });
    }
    rows.length
      ? res.json({ status: "success", data: rows[0] })
      : res.status(404).json({ status: "error", message: "Profile not found" });
  });
});


app.delete("/profiles/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT profilePhoto, resume FROM profiles WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error("Fetch profile for delete error:", err.code, err.sqlMessage);
      return res.status(500).json({ status: "error", message: "Fetch failed" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const { profilePhoto, resume } = rows[0];

    db.query("DELETE FROM profiles WHERE id = ?", [id], (err) => {
      if (err) {
        console.error("Delete profile error:", err.code, err.sqlMessage);
        return res.status(500).json({ status: "error", message: "Delete failed" });
      }


       if (profilePhoto) {
        const photoPath = path.join(uploadsDir, profilePhoto);
        if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
      }
      if (resume) {
        const resumePath = path.join(uploadsDir, resume);
        if (fs.existsSync(resumePath)) fs.unlinkSync(resumePath);
      }


      res.json({ status: "success", message: "Profile and files deleted" });
    });
  });
});



// 📌 GET: Get all profiles for a specific employee
app.get('/my-profiles/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const profiles = await Profile.find({ userId });
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Error fetching profiles." });
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API ready at http://localhost:${PORT}`));
