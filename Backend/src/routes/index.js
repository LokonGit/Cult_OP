const express = require('express');
const authRoutes = require('./auth.routes');
const assetRoutes = require('./asset.routes');
const bookingRoutes = require('./booking.routes');
const analyticsRoutes = require('./analytics.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/assets', assetRoutes);
router.use('/bookings', bookingRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;