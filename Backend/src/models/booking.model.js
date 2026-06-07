const supabase = require('../config/supabase');

const createBooking = async (data) => {
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return booking;
};

const getBookingById = async (id) => {
  const { data, error } = await supabase
    .from('bookings')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const getBookingsByEnrollment = async (enrollment_no, { page = 1, limit = 20 }) => {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*', { count: 'exact' })
    .eq('enrollment_no', enrollment_no)
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return { data, total: count };
};

const getAllBookings = async ({ status, asset_id, enrollment_no, page = 1, limit = 20 }) => {
  let query = supabase.from('bookings').select('*', { count: 'exact' });

  if (status) query = query.eq('status', status);
  if (asset_id) query = query.eq('asset_id', asset_id);
  if (enrollment_no) query = query.eq('enrollment_no', enrollment_no);

  const { data, error, count } = await query
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return { data, total: count };
};

const updateBookingStatus = async (id, status, admin_note) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status, admin_note })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const setIssuedAt = async (id) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ issued_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const setReturnedAt = async (id) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ returned_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const getOverdueBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select()
    .lt('due_date', new Date().toISOString())
    .eq('status', 'issued');

  if (error) throw error;
  return data;
};

module.exports = {
  createBooking,
  getBookingById,
  getBookingsByEnrollment,
  getAllBookings,
  updateBookingStatus,
  setIssuedAt,
  setReturnedAt,
  getOverdueBookings
};