const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const sessionConfig = require("./config/session");
const authRoutes = require("./routes/auth.routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Required for cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionConfig));

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Inventory Auth API is running 🚀" });
});

// Error handler (always last)
app.use(errorHandler);

module.exports = app;