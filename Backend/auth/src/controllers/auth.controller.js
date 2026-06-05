const { registerUser, loginUser, updateUserProfile } = require("../services/auth.service");
const { getUserWithProfile } = require("../models/user.model");
const { registerSchema, loginSchema, profileSchema } = require("../validations/auth.validation");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    // Validate input
    const validatedData = registerSchema.parse(req.body);

    // Register user
    const { user, token } = await registerUser(validatedData);

    // Set session
    req.session.userId = user.id;

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { user, token },
    });
  } catch (error) {
    // Zod validation errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
      });
    }
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { user, token } = await loginUser(validatedData);

    // Set session
    req.session.userId = user.id;

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
      });
    }
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ success: false, message: error.message });
    }
    next(error);
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) console.error("Session destroy error:", err);
  });

  // Clear cookie
  res.clearCookie("token");

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const userWithProfile = await getUserWithProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: { user: userWithProfile },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const validatedData = profileSchema.parse(req.body);
    const profile = await updateUserProfile(req.user.id, validatedData);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { profile },
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
      });
    }
    next(error);
  }
};

module.exports = { register, login, logout, getMe, updateProfile };