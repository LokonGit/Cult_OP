const bookingModel = require('../models/booking.model');
const assetModel = require('../models/asset.model');
const auditLogService = require('./auditLog.service');

const requestBooking = async ({ enrollment_no, asset_id, quantity, requested_from, requested_until }) => {
  const asset = await assetModel.getAssetById(asset_id);
  if (!asset) {
    throw new Error('Asset not found');
  }

  if (asset.status !== 'active') {
    throw new Error('Asset is not active');
  }

  if (asset.available_quantity < quantity) {
    throw new Error('Insufficient available quantity');
  }

  if (new Date(requested_from) >= new Date(requested_until)) {
    throw new Error('Invalid date range');
  }

  const booking = await bookingModel.createBooking({
    enrollment_no,
    asset_id,
    quantity,
    requested_from,
    requested_until,
    status: 'pending'
  });

  await auditLogService.log({
    actor_enrollment_no: enrollment_no,
    action: 'booking_created',
    entity_type: 'booking',
    entity_id: booking.id,
    payload: booking
  });

  return booking;
};

const approveBooking = async (id, admin_enrollment_no) => {
  const booking = await bookingModel.getBookingById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.status !== 'pending') {
    throw new Error('Booking is not in pending state');
  }

  const asset = await assetModel.getAssetById(booking.asset_id);
  if (asset.available_quantity < booking.quantity) {
    throw new Error('Insufficient available quantity');
  }

  await bookingModel.updateBookingStatus(id, 'approved', null);
  await auditLogService.log({
    actor_enrollment_no,
    action: 'booking_approved',
    entity_type: 'booking',
    entity_id: id,
    payload: { booking_id: id }
  });

  return await bookingModel.getBookingById(id);
};

const rejectBooking = async (id, admin_enrollment_no, note) => {
  const booking = await bookingModel.getBookingById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.status !== 'pending') {
    throw new Error('Booking is not in pending state');
  }

  await bookingModel.updateBookingStatus(id, 'rejected', note);
  await auditLogService.log({
    actor_enrollment_no,
    action: 'booking_rejected',
    entity_type: 'booking',
    entity_id: id,
    payload: { booking_id: id, note }
  });

  return await bookingModel.getBookingById(id);
};

const issueAsset = async (id, admin_enrollment_no) => {
  const booking = await bookingModel.getBookingById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.status !== 'approved') {
    throw new Error('Booking is not approved');
  }

  await bookingModel.setIssuedAt(id);
  await bookingModel.updateBookingStatus(id, 'issued', null);
  await assetModel.decrementAvailable(booking.asset_id, booking.quantity);

  await auditLogService.log({
    actor_enrollment_no,
    action: 'asset_issued',
    entity_type: 'booking',
    entity_id: id,
    payload: { booking_id: id }
  });

  return await bookingModel.getBookingById(id);
};

const returnAsset = async (id, admin_enrollment_no) => {
  const booking = await bookingModel.getBookingById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (!['issued', 'overdue'].includes(booking.status)) {
    throw new Error('Booking is not in issued or overdue state');
  }

  await bookingModel.setReturnedAt(id);
  await bookingModel.updateBookingStatus(id, 'returned', null);
  await assetModel.incrementAvailable(booking.asset_id, booking.quantity);

  await auditLogService.log({
    actor_enrollment_no,
    action: 'asset_returned',
    entity_type: 'booking',
    entity_id: id,
    payload: { booking_id: id }
  });

  return await bookingModel.getBookingById(id);
};

const getMyBookings = async (enrollment_no, pagination) => {
  return await bookingModel.getBookingsByEnrollment(enrollment_no, pagination);
};

const getAllBookings = async (filters) => {
  return await bookingModel.getAllBookings(filters);
};

const checkOverdue = async () => {
  const overdueBookings = await bookingModel.getOverdueBookings();
  for (const booking of overdueBookings) {
    await bookingModel.updateBookingStatus(booking.id, 'overdue', 'Automatically marked as overdue');
    await auditLogService.log({
      actor_enrollment_no: 'system',
      action: 'booking_overdue_flagged',
      entity_type: 'booking',
      entity_id: booking.id,
      payload: { booking_id: booking.id }
    });
  }
};

module.exports = {
  requestBooking,
  approveBooking,
  rejectBooking,
  issueAsset,
  returnAsset,
  getMyBookings,
  getAllBookings,
  checkOverdue
};