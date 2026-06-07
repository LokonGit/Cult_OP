const supabase = require('../config/supabase');

const getTopAssets = async (limit = 10) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('asset_id, count(*) as booking_count')
    .group('asset_id')
    .order('booking_count', { ascending: false })
    .limit(limit);

  if (error) throw error;

  // Join with assets to get name and category
  const assetIds = data.map(item => item.asset_id);
  const { data: assets, error: assetsError } = await supabase
    .from('assets')
    .select('id, name, category')
    .in('id', assetIds);

  if (assetsError) throw assetsError;

  return data.map(item => {
    const asset = assets.find(a => a.id === item.asset_id);
    return {
      asset_id: item.asset_id,
      name: asset?.name || 'Unknown',
      category: asset?.category || 'Unknown',
      booking_count: item.booking_count
    };
  });
};

const getUtilizationRates = async () => {
  const { data: assets, error } = await supabase.from('assets').select('*');
  if (error) throw error;

  return assets.map(asset => ({
    id: asset.id,
    name: asset.name,
    category: asset.category,
    total_quantity: asset.total_quantity,
    available_quantity: asset.available_quantity,
    utilization_rate: (asset.total_quantity - asset.available_quantity) / asset.total_quantity
  })).sort((a, b) => b.utilization_rate - a.utilization_rate);
};

const getActiveBookingCount = async () => {
  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .in('status', ['approved', 'issued']);

  if (error) throw error;
  return { count };
};

const getAvailableInventorySummary = async () => {
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .gt('available_quantity', 0);

  if (error) throw error;

  return {
    total_assets: assets.length,
    available_assets_count: assets.reduce((sum, asset) => sum + asset.available_quantity, 0),
    assets
  };
};

const getOverdueCount = async () => {
  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'overdue');

  if (error) throw error;
  return { count };
};

const getBookingTrend = async (days = 30) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at')
    .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Group by date
  const trend = {};
  data.forEach(booking => {
    const date = new Date(booking.created_at).toISOString().split('T')[0];
    trend[date] = (trend[date] || 0) + 1;
  });

  return Object.keys(trend).map(date => ({ date, count: trend[date] }));
};

const getCategoryDistribution = async () => {
  const { data, error } = await supabase
    .from('assets')
    .select('category, count(*) as asset_count')
    .group('category');

  if (error) throw error;
  return data;
};

const getDashboardSummary = async () => {
  const [activeBookingCount, overdueCount, inventorySummary, topAssets] = await Promise.all([
    getActiveBookingCount(),
    getOverdueCount(),
    getAvailableInventorySummary(),
    getTopAssets(5)
  ]);

  return {
    activeBookingCount,
    overdueCount,
    inventorySummary,
    topAssets
  };
};

module.exports = {
  getTopAssets,
  getUtilizationRates,
  getActiveBookingCount,
  getAvailableInventorySummary,
  getOverdueCount,
  getBookingTrend,
  getCategoryDistribution,
  getDashboardSummary
};