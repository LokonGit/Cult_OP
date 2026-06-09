import api from './axiosInstance';

export const getDashboardSummary = () => api.get('/analytics/dashboard');
export const getTopAssets = () => api.get('/analytics/top-assets');
export const getUtilizationRates = () => api.get('/analytics/utilization');
export const getBookingTrend = () => api.get('/analytics/booking-trend');
export const getCategoryDistribution = () => api.get('/analytics/category-dist');