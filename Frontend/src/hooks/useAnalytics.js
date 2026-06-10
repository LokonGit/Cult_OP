import { useState, useEffect } from 'react';
import {
  getDashboardSummary,
  getTopAssets,
  getUtilizationRates,
  getBookingTrend,
  getCategoryDistribution,
} from '../api/analytics.api';

const useAnalytics = () => {
  const [data, setData] = useState({
    dashboard: null,
    topAssets: null,
    utilization: null,
    bookingTrend: null,
    categoryDist: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [dashboard, topAssets, utilization, bookingTrend, categoryDist] =
          await Promise.all([
            getDashboardSummary(),
            getTopAssets(),
            getUtilizationRates(),
            getBookingTrend(),
            getCategoryDistribution(),
          ]);
        setData({
          dashboard: dashboard.data.data,
          topAssets: topAssets.data.data,
          utilization: utilization.data.data,
          bookingTrend: bookingTrend.data.data,
          categoryDist: categoryDist.data.data,
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { data, loading, error };
};

export default useAnalytics;