const { body, param } = require('express-validator');

const createAssetValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('total_quantity').isInt({ min: 1 }).withMessage('Total quantity must be at least 1'),
  body('available_quantity').isInt({ min: 0 }).withMessage('Available quantity must be at least 0'),
];

const updateAssetValidator = [
  param('id').isUUID().withMessage('Invalid asset ID'),
  body('total_quantity').optional().isInt({ min: 1 }).withMessage('Total quantity must be at least 1'),
  body('available_quantity').optional().isInt({ min: 0 }).withMessage('Available quantity must be at least 0'),
];

module.exports = {
  createAssetValidator,
  updateAssetValidator
};