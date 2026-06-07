const supabase = require('../config/supabase');

const createAsset = async (data) => {
  const { data: asset, error } = await supabase
    .from('assets')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return asset;
};

const getAllAssets = async ({ category, status, search, page = 1, limit = 20 }) => {
  let query = supabase.from('assets').select('*', { count: 'exact' });

  if (category) query = query.eq('category', category);
  if (status) query = query.eq('status', status);
  if (search) query = query.ilike('name', `%${search}%`);

  const { data, error, count } = await query
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return { data, total: count };
};

const getAssetById = async (id) => {
  const { data, error } = await supabase
    .from('assets')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const updateAsset = async (id, fields) => {
  const { data, error } = await supabase
    .from('assets')
    .update(fields)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteAsset = async (id) => {
  const { error } = await supabase.from('assets').delete().eq('id', id);
  if (error) throw error;
};

const decrementAvailable = async (id, qty) => {
  const { error } = await supabase.rpc('decrement_asset_qty', { p_asset_id: id, p_qty: qty });
  if (error) throw error;
};

const incrementAvailable = async (id, qty) => {
  const { error } = await supabase
    .from('assets')
    .update({ available_quantity: supabase.rpc('available_quantity + ?', [qty]) })
    .eq('id', id);

  if (error) throw error;
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  decrementAvailable,
  incrementAvailable
};