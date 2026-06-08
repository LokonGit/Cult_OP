const bcrypt = require("bcryptjs");
const { findUserByEmail, createUser, upsertProfile } = require("../models/user.model");
const { generateToken } = require("../utils/jwt.utils");
require("dotenv").config();

const admin_key=process.env.admin_secret_key

const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user (role is set to 'user' in model — not from input)
  const user = await createUser({ name, email, password: hashedPassword });

  // Generate JWT
  const token = generateToken({ id: user.id, role: user.role });


  return { user, token };
};

const loginUser = async ({ email, password }) => {
  // Find user
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = generateToken({ id: user.id, role: user.role });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

const updateUserProfile = async (userId, profileData) => {
  return await upsertProfile(userId, profileData);
};

module.exports = { registerUser, loginUser, updateUserProfile };