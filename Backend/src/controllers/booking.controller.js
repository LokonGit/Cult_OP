const bookingService = require('../services/booking.service');
const { createdResponse, successResponse } = require('../utils/response');

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.requestBooking({
      ...req.body,
      enrollment_no: req.user.enrollment_no
    });
    createdResponse(res, booking, 'Booking requested successfully');
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getMyBookings(req.user.enrollment_no, req.query);
    successResponse(res, bookings, 'Bookings retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings(req.query);
    successResponse(res, bookings, 'Bookings retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    successResponse(res, booking, 'Booking retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const approveBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.approveBooking(req.params.id, req.user.enrollment_no);
    successResponse(res, booking, 'Booking approved successfully');
  } catch (error) {
    next(error);
  }
};

const rejectBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.rejectBooking(req.params.id, req.user.enrollment_no, req.body?.note || null);
    successResponse(res, booking, 'Booking rejected successfully');
  } catch (error) {
    next(error);
  }
};

const issueAsset = async (req, res, next) => {
  try {
    const booking = await bookingService.issueAsset(req.params.id, req.user.enrollment_no);
    successResponse(res, booking, 'Asset issued successfully');
  } catch (error) {
    next(error);
  }
};

const returnAsset = async (req, res, next) => {
  try {
    const booking = await bookingService.returnAsset(req.params.id, req.user.enrollment_no);
    successResponse(res, booking, 'Asset returned successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  issueAsset,
  returnAsset
};