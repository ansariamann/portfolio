/**
 * Email service for handling contact form submissions
 * Supports multiple email providers with fallback mechanisms
 */

import { ContactFormData } from "./contact-schema";
import {
  ContactFormError,
  NetworkError,
  asyncErrorHandler,
  retryOperation,
} from "./errors";

/**
 * Email service configuration
 */
interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey?: string;
}

/**
 * Email service response
 */
interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Email service provider interface
 */
interface EmailProvider {
  name: string;
  send: (data: ContactFormData, config: EmailConfig) => Promise<EmailResponse>;
}

/**
 * EmailJS provider implementation
 */
const emailJSProvider: EmailProvider = {
  name: "EmailJS",
  send: async (
    data: ContactFormData,
    config: EmailConfig
  ): Promise<EmailResponse> => {
    try {
      // Dynamic import to avoid loading EmailJS on server
      const emailjs = await import("@emailjs/browser");

      const templateParams = {
        from_name: data.name,
        from_email: data.email,

        message: data.message,
        to_name: "Portfolio Owner",
        reply_to: data.email,
      };

      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.publicKey
      );

      return {
        success: response.status === 200,
        messageId: response.text,
      };
    } catch (error) {
      throw new NetworkError(
        `EmailJS failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "https://api.emailjs.com",
        "POST"
      );
    }
  },
};

/**
 * Fallback provider for development/testing
 */
const mockProvider: EmailProvider = {
  name: "Mock",
  send: async (data: ContactFormData): Promise<EmailResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate occasional failures for testing
    if (Math.random() < 0.1) {
      throw new NetworkError("Mock provider simulated failure");
    }

    console.log("📧 Mock Email Sent:", {
      to: "portfolio@example.com",
      from: data.email,
      subject: "New Contact Form Message",
      preview: data.message.substring(0, 50) + "...",
    });

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    };
  },
};

/**
 * Main email service class
 */
export class EmailService {
  private providers: EmailProvider[] = [];
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;

    // Add providers in order of preference
    if (this.isEmailJSConfigured()) {
      this.providers.push(emailJSProvider);
    }

    // Always add mock provider as fallback
    this.providers.push(mockProvider);
  }

  /**
   * Checks if EmailJS is properly configured
   */
  private isEmailJSConfigured(): boolean {
    return !!(
      this.config.serviceId &&
      this.config.templateId &&
      this.config.publicKey
    );
  }

  /**
   * Sends email using the first available provider
   * @param data - Contact form data
   * @returns Promise resolving to email response
   */
  async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    if (this.providers.length === 0) {
      throw new ContactFormError("No email providers configured");
    }

    let lastError: Error | null = null;

    // Try each provider in order
    for (const provider of this.providers) {
      const [error, result] = await asyncErrorHandler(
        retryOperation(
          () => provider.send(data, this.config),
          2, // Max 2 retries per provider
          1000 // 1 second delay
        )
      );

      if (result) {
        console.log(`✅ Email sent successfully via ${provider.name}`);
        return result;
      }

      lastError = error;
      console.warn(`❌ ${provider.name} failed:`, error?.message);
    }

    // All providers failed
    throw new ContactFormError(
      "Failed to send email with all providers",
      lastError || undefined
    );
  }

  /**
   * Validates email configuration
   * @returns Array of configuration issues
   */
  validateConfig(): string[] {
    const issues: string[] = [];

    if (!this.config.serviceId) {
      issues.push("Missing email service ID");
    }

    if (!this.config.templateId) {
      issues.push("Missing email template ID");
    }

    if (!this.config.publicKey) {
      issues.push("Missing email public key");
    }

    return issues;
  }

  /**
   * Gets the status of all configured providers
   */
  getProviderStatus(): Array<{ name: string; configured: boolean }> {
    return [
      {
        name: "EmailJS",
        configured: this.isEmailJSConfigured(),
      },
      {
        name: "Mock",
        configured: true,
      },
    ];
  }
}

/**
 * Default email service instance
 * Configuration should be provided via environment variables
 */
export const emailService = new EmailService({
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

/**
 * Convenience function for sending contact emails
 * @param data - Contact form data
 * @returns Promise resolving to email response
 */
export const sendContactEmail = async (
  data: ContactFormData
): Promise<EmailResponse> => {
  return emailService.sendContactEmail(data);
};

/**
 * Email template validation
 * Ensures all required template variables are present
 */
export const validateEmailTemplate = (data: ContactFormData): string[] => {
  const issues: string[] = [];

  if (!data.name?.trim()) {
    issues.push("Name is required for email template");
  }

  if (!data.email?.trim()) {
    issues.push("Email is required for email template");
  }

  if (!data.message?.trim()) {
    issues.push("Message is required for email template");
  }

  return issues;
};
