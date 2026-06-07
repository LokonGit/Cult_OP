const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const userModel = require('../models/user.model');

const register = async ({ enrollment_no, name, email, password }) => {
  const existingUserByEnrollment = await userModel.findByEnrollmentNo(enrollment_no);
  if (existingUserByEnrollment) {
    throw new Error('Enrollment number already taken');
  }

  const existingUserByEmail = await userModel.findByEmail(email);
  if (existingUserByEmail) {
    throw new Error('Email already taken');
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await userModel.createUser({ enrollment_no, name, email, password_hash, role: 'user' });

  // Exclude password_hash from the returned user
  const { password_hash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { enrollment_no: user.enrollment_no, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRY }
  );

  return { token, user: { enrollment_no: user.enrollment_no, name: user.name, email: user.email, role: user.role } };
};

const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

const makeAdmin = async (enrollment_no, secretKey) => {
  if (secretKey !== env.ADMIN_SECRET_KEY) {
    throw new Error('Invalid secret key');
  }

  const user = await userModel.updateUser(enrollment_no, { role: 'admin' });
  return user;
};

module.exports = {
  register,
  login,
  verifyToken,
  makeAdmin
};