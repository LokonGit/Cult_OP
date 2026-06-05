const { verifyToken } = require("../utils/jwt.utils");
const { findUserById } = require("../models/user.model");

// Authenticate user — checks JWT from cookie or session
const authenticateUser = async (req, res, next) => {
  try {
    let token = null;

    // 1. Try cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. Fallback to session
    else if (req.session && req.session.userId) {
      // Session-based: attach user directly
      const user = await findUserById(req.session.userId);
      if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please login." });
      }
      req.user = user;
      return next();
    }
    // 3. Fallback to Bearer token in header (for API clients)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please login." });
    }

    // Verify JWT
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

// Authorize roles — use like: authorizeRoles("admin") or authorizeRoles("admin", "user")
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };