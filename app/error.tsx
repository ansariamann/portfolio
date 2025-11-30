"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Custom error page for handling runtime errors in the app
 * This page is automatically shown when an unhandled error occurs
 */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error when the component mounts
    console.error("Error occurred:", error, {
      page: "error-page",
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-lg mx-auto text-center px-4">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg
                className="w-full h-full text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>

              {/* Animated pulse effect */}
              <div className="absolute inset-0 w-full h-full rounded-full bg-red-500 opacity-20 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={reset}
            variant="primary"
            className="w-full sm:w-auto min-w-[140px]"
          >
            Try Again
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="secondary"
            className="w-full sm:w-auto min-w-[140px]"
          >
            Go Home
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full sm:w-auto min-w-[140px]"
          >
            Reload Page
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            What can you do?
          </h3>

          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              Try refreshing the page or clicking &ldquo;Try Again&rdquo;
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              Check your internet connection
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              Return to the homepage and navigate from there
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              If the problem persists, please contact support
            </li>
          </ul>
        </div>

        {/* Development Error Details */}
        {process.env.NODE_ENV === "development" && (
          <details className="text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              Error Details (Development Only)
            </summary>
            <div className="mt-4 space-y-2">
              <div>
                <strong className="text-red-600 dark:text-red-400">
                  Error:
                </strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {error.message}
                </p>
              </div>

              {error.digest && (
                <div>
                  <strong className="text-red-600 dark:text-red-400">
                    Digest:
                  </strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono">
                    {error.digest}
                  </p>
                </div>
              )}

              {error.stack && (
                <div>
                  <strong className="text-red-600 dark:text-red-400">
                    Stack Trace:
                  </strong>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 mt-1 overflow-auto bg-white dark:bg-gray-900 p-2 rounded border">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* Footer Message */}
        <div className="mt-8 text-xs text-gray-400 dark:text-gray-600">
          <p>
            Error ID: {error.digest || "N/A"} • {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
