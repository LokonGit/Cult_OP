const express = require('express');
const { createBookingValidator, updateBookingStatusValidator } = require('../validators/booking.validator');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  issueAsset,
  returnAsset
} = require('../controllers/booking.controller');
const validate = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createBookingValidator, validate, createBooking);
router.get('/my', getMyBookings);
router.get('/', adminOnly, getAllBookings);
router.get('/:id', getBookingById);
router.patch('/:id/approve', adminOnly, approveBooking);
router.patch('/:id/reject', adminOnly, rejectBooking);
router.patch('/:id/issue', adminOnly, issueAsset);
router.patch('/:id/return', adminOnly, returnAsset);

module.exports = router;