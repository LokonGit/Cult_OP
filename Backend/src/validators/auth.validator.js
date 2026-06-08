const { body } = require('express-validator');

const registerValidator = [
  body('enrollment_no').notEmpty().withMessage('Enrollment number is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidator,
  loginValidator
};