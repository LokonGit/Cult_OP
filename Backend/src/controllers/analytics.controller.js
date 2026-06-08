const analyticsService = require('../services/analytics.service');
const { successResponse } = require('../utils/response');

const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await analyticsService.getDashboardSummary();
    successResponse(res, summary, 'Dashboard summary retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getTopAssets = async (req, res, next) => {
  try {
    const topAssets = await analyticsService.getTopAssets(req.query.limit);
    successResponse(res, topAssets, 'Top assets retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getUtilizationRates = async (req, res, next) => {
  try {
    const utilizationRates = await analyticsService.getUtilizationRates();
    successResponse(res, utilizationRates, 'Utilization rates retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getBookingTrend = async (req, res, next) => {
  try {
    const bookingTrend = await analyticsService.getBookingTrend(req.query.days);
    successResponse(res, bookingTrend, 'Booking trend retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getCategoryDistribution = async (req, res, next) => {
  try {
    const categoryDistribution = await analyticsService.getCategoryDistribution();
    successResponse(res, categoryDistribution, 'Category distribution retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardSummary,
  getTopAssets,
  getUtilizationRates,
  getBookingTrend,
  getCategoryDistribution
};