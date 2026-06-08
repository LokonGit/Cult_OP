require('dotenv').config();

const requiredEnvVars = [
  'PORT',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'JWT_EXPIRY',
  'admin_secret_key'
];

const missingVars = requiredEnvVars.filter(varName => !(varName in process.env));
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

module.exports = {
  PORT: process.env.PORT,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  ADMIN_SECRET_KEY: process.env.admin_secret_key
};