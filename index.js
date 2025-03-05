const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db"); // MySQL Connection File

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// ✅ GET API - Fetch All Users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).send("Database error");
        } else {
            res.json(results);
        }
    });
});

// ✅ POST API - Add New User
app.post("/users", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "User added successfully!", userId: result.insertId });
    });
});

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
