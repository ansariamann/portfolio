import { z } from "zod";

// Project validation schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().optional(),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  category: z.enum(["web", "mobile", "desktop", "other"]),
  images: z.array(z.string()),
  liveUrl: z
    .string()
    .url("Live URL must be valid")
    .optional()
    .or(z.literal("")),
  githubUrl: z.string().url("GitHub URL must be valid"),
  featured: z.boolean(),
  completedDate: z.date(),
  status: z.enum(["completed", "in-progress", "planned"]),
  highlights: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
});

// Skill validation schema
export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  category: z.enum([
    "frontend",
    "backend",
    "tools",
    "languages",
    "databases",
    "cloud",
  ]),
  proficiency: z.number().min(1).max(5),
  icon: z.string(),
  description: z.string().optional(),
  yearsOfExperience: z.number().min(0).optional(),
  color: z.string().optional(),
  relatedSkills: z.array(z.string()).optional(),
});

// Timeline item validation schema
export const timelineItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  period: z.string().min(1, "Period is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).optional(),
  type: z.enum(["education", "work", "project", "achievement"]),
});

// Achievement validation schema
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  value: z.union([z.string(), z.number()]),
  icon: z.string().optional(),
  color: z.string().optional(),
});

// Form validation helper functions
// Note: validateContactForm is exported from ./contact-schema for better error handling

export const validateProject = (data: unknown) => {
  return projectSchema.safeParse(data);
};

export const validateSkill = (data: unknown) => {
  return skillSchema.safeParse(data);
};

// Error message formatter
export const formatZodErrors = (errors: z.ZodError) => {
  const formattedErrors: Record<string, string> = {};

  errors.issues.forEach((error) => {
    const path = error.path.join(".");
    formattedErrors[path] = error.message;
  });

  return formattedErrors;
};
