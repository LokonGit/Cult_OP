const supabase = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
  return data;
};

// Find user by ID
const findUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role, created_at")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// Create new user — role is hardcoded to 'user' here
const createUser = async ({ name, email, password }) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password, role: "user" }]) // role hardcoded!
    .select("id, name, email, role, created_at")
    .single();

  if (error) throw error;
  return data;
};

// Upsert profile (create or update)
const upsertProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        enrollment_number: profileData.enrollmentNumber,
        branch: profileData.branch,
        year: profileData.year,
        contact_number: profileData.contactNumber,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user with profile
const getUserWithProfile = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(`
      id, name, email, role, created_at,
      profiles (
        enrollment_number,
        branch,
        year,
        contact_number,
        updated_at
      )
    `)
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

module.exports = { findUserByEmail, findUserById, createUser, upsertProfile, getUserWithProfile };