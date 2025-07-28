import { z } from "zod";

/**
 * Validation constants for contact form fields
 * Centralized configuration for easy maintenance
 */
export const CONTACT_VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s'-]+$/,
  },
  EMAIL: {
    MAX_LENGTH: 100,
  },
  COMPANY: {
    MAX_LENGTH: 100,
  },
  SUBJECT: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
} as const;

/**
 * Zod validation schema for the contact form
 * Simplified schema with just name, email, and message
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      CONTACT_VALIDATION.NAME.MIN_LENGTH,
      `Name must be at least ${CONTACT_VALIDATION.NAME.MIN_LENGTH} characters`
    )
    .max(
      CONTACT_VALIDATION.NAME.MAX_LENGTH,
      `Name must be less than ${CONTACT_VALIDATION.NAME.MAX_LENGTH} characters`
    )
    .regex(
      CONTACT_VALIDATION.NAME.PATTERN,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(
      CONTACT_VALIDATION.EMAIL.MAX_LENGTH,
      `Email must be less than ${CONTACT_VALIDATION.EMAIL.MAX_LENGTH} characters`
    ),

  message: z
    .string()
    .trim()
    .min(
      CONTACT_VALIDATION.MESSAGE.MIN_LENGTH,
      `Message must be at least ${CONTACT_VALIDATION.MESSAGE.MIN_LENGTH} characters`
    )
    .max(
      CONTACT_VALIDATION.MESSAGE.MAX_LENGTH,
      `Message must be less than ${CONTACT_VALIDATION.MESSAGE.MAX_LENGTH} characters`
    ),
});

/**
 * Type inference from the Zod schema
 * Ensures type safety throughout the application
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Default form values for initialization
 */
export const defaultContactFormValues: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

/**
 * Validates contact form data and returns formatted errors
 * @param data - Form data to validate
 * @returns Validation result with formatted errors
 */
export const validateContactForm = (data: unknown) => {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      formattedErrors[path] = issue.message;
    });
    return { success: false, errors: formattedErrors, data: null };
  }

  return { success: true, errors: {}, data: result.data };
};

/**
 * Sanitizes form data for safe processing
 * @param data - Raw form data
 * @returns Sanitized form data
 */
export const sanitizeContactFormData = (
  data: ContactFormData
): ContactFormData => {
  return {
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    message: data.message.trim(),
  };
};
