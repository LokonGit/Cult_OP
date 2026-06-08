const authService = require('../services/auth.service');
const { createdResponse, successResponse } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    createdResponse(res, user, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    successResponse(res, req.user, 'User data retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};