const express = require('express');
const {
  getDashboardSummary,
  getTopAssets,
  getUtilizationRates,
  getBookingTrend,
  getCategoryDistribution
} = require('../controllers/analytics.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, adminOnly);

router.get('/dashboard', getDashboardSummary);
router.get('/top-assets', getTopAssets);
router.get('/utilization', getUtilizationRates);
router.get('/booking-trend', getBookingTrend);
router.get('/category-dist', getCategoryDistribution);

module.exports = router;