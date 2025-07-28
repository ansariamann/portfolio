/**
 * Custom error classes for better error handling throughout the application
 */

/**
 * Base application error class
 * Extends the native Error class with additional properties
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = "UNKNOWN_ERROR",
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Validation error for form and data validation failures
 */
export class ValidationError extends AppError {
  public readonly field?: string;
  public readonly validationErrors?: Record<string, string>;

  constructor(
    message: string,
    field?: string,
    validationErrors?: Record<string, string>
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.field = field;
    this.validationErrors = validationErrors;
  }
}

/**
 * Network error for API and external service failures
 */
export class NetworkError extends AppError {
  public readonly url?: string;
  public readonly method?: string;

  constructor(message: string, url?: string, method?: string) {
    super(message, "NETWORK_ERROR", 500);
    this.url = url;
    this.method = method;
  }
}

/**
 * Contact form submission error
 */
export class ContactFormError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, "CONTACT_FORM_ERROR", 500);
    if (originalError) {
      this.stack = originalError.stack;
    }
  }
}

/**
 * Error handler utility functions
 */
export class ErrorHandler {
  /**
   * Formats error for user display
   * @param error - Error to format
   * @returns User-friendly error message
   */
  static formatUserError(error: Error): string {
    if (error instanceof ValidationError) {
      return error.message;
    }

    if (error instanceof NetworkError) {
      return "Network error occurred. Please check your connection and try again.";
    }

    if (error instanceof ContactFormError) {
      return "Failed to send message. Please try again later.";
    }

    // Generic fallback for unknown errors
    return "An unexpected error occurred. Please try again.";
  }

  /**
   * Logs error with appropriate level and context
   * @param error - Error to log
   * @param context - Additional context information
   */
  static logError(error: Error, context?: Record<string, any>): void {
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...context,
    };

    if (error instanceof AppError && !error.isOperational) {
      console.error("🚨 Critical Error:", errorInfo);
    } else if (error instanceof ValidationError) {
      console.warn("⚠️ Validation Error:", errorInfo);
    } else {
      console.error("❌ Error:", errorInfo);
    }
  }

  /**
   * Determines if error should be reported to external service
   * @param error - Error to check
   * @returns Whether error should be reported
   */
  static shouldReport(error: Error): boolean {
    // Don't report validation errors or operational errors
    if (error instanceof ValidationError) {
      return false;
    }

    if (error instanceof AppError && error.isOperational) {
      return false;
    }

    return true;
  }
}

/**
 * Error boundary helper for React components
 */
export const createErrorBoundaryError = (
  componentName: string,
  originalError: Error
): AppError => {
  return new AppError(
    `Error in ${componentName} component: ${originalError.message}`,
    "COMPONENT_ERROR",
    500,
    false
  );
};

/**
 * Async error wrapper for handling promises
 * @param promise - Promise to wrap
 * @returns Tuple of [error, result]
 */
export const asyncErrorHandler = async <T>(
  promise: Promise<T>
): Promise<[Error | null, T | null]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
};

/**
 * Retry mechanism for failed operations
 * @param operation - Function to retry
 * @param maxRetries - Maximum number of retry attempts
 * @param delay - Delay between retries in milliseconds
 * @returns Promise that resolves with operation result
 */
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxRetries) {
        throw new AppError(
          `Operation failed after ${maxRetries} attempts: ${lastError.message}`,
          "RETRY_EXHAUSTED",
          500
        );
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
};
