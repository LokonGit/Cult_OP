require("dotenv").config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

module.exports = sessionConfig;