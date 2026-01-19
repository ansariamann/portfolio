import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

// TypeScript type for form data
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Default form values
export const defaultContactFormValues: ContactFormData = {

  email: "",
  subject: "",
  message: "",
};

// Validation function
export const validateContactForm = (data: ContactFormData) => {
  try {
    contactFormSchema.parse(data);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues };
    }
    return { success: false, errors: [{ message: "Validation failed" }] };
  }
};

// Sanitize form data
export const sanitizeContactFormData = (
  data: ContactFormData
): ContactFormData => {
  return {

    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim(),
    message: data.message.trim(),
  };
};
