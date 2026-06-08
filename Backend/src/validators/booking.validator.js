const { body, param } = require('express-validator');

const createBookingValidator = [
  body('asset_id').isUUID().withMessage('Invalid asset ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('requested_from').isISO8601().withMessage('Invalid requested from date'),
  body('requested_until').isISO8601().withMessage('Invalid requested until date'),
];

const updateBookingStatusValidator = [
  param('id').isUUID().withMessage('Invalid booking ID'),
  body('status').isIn(['approved', 'rejected', 'issued', 'returned']).withMessage('Invalid status'),
];

module.exports = {
  createBookingValidator,
  updateBookingStatusValidator
};