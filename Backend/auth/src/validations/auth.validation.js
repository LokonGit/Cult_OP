const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // role is NOT here — never accepted from frontend
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const profileSchema = z.object({
  enrollmentNumber: z.string().min(1, "Enrollment number is required"),
  branch: z.string().min(1, "Branch is required"),
  year: z.number().int().min(1).max(4, "Year must be between 1 and 4"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
});

module.exports = { registerSchema, loginSchema, profileSchema };