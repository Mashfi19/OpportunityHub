const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address format."),
  phone: z.string().regex(/^\d+$/, "Phone number must be digits only.").min(7).max(15),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z.string().min(1, "Password is required.")
});

const profileSchema = z.object({
  citizenship: z.string().length(2, "Citizenship must be a 2-letter ISO code."),
  degree: z.enum(["HighSchool", "Undergraduate", "Graduate", "PhD", "PostDoc", "EarlyCareer"]),
  cgpa: z.number().min(0.0).max(4.0),
  major: z.enum(["STEM", "Humanities", "SocialSciences", "Medicine", "Arts", "Business", "All"]),
  ielts: z.number().min(0.0).max(9.0).nullable().optional(),
  toefl: z.number().int().min(0).max(120).nullable().optional(),
  preferred_countries: z.array(z.string().length(2)).default([])
});

const bookmarkSchema = z.object({
  opportunity_id: z.string().uuid("Invalid opportunity ID."),
  status: z.enum(["wishlist", "applied", "interviewing", "offer"]),
  notes: z.string().optional()
});

module.exports = {
  validateRegister: (data) => registerSchema.safeParse(data),
  validateLogin: (data) => loginSchema.safeParse(data),
  validateProfile: (data) => profileSchema.safeParse(data),
  validateBookmark: (data) => bookmarkSchema.safeParse(data)
};
