const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db"); 

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, MySQL is connected!");
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
