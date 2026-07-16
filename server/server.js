const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests. Please try again later."
});

app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.error(err);
    });

// Routes
app.use("/api/auth", require("./routes/auth"));

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Legit Tesla Investment Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});