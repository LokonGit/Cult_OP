const supabase = require('../config/supabase');

const createUser = async ({ enrollment_no, name, email, password_hash, role }) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ enrollment_no, name, email, password_hash, role }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

const findByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const findByEnrollmentNo = async (enrollment_no) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('enrollment_no', enrollment_no)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const updateUser = async (enrollment_no, fields) => {
  const { data, error } = await supabase
    .from('users')
    .update(fields)
    .eq('enrollment_no', enrollment_no)
    .select()
    .single();

  if (error) throw error;
  return data;
};

module.exports = {
  createUser,
  findByEmail,
  findByEnrollmentNo,
  updateUser
};