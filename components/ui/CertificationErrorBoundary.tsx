"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Award, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  context?: "section" | "card" | "modal" | "animation";
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

/**
 * CertificationErrorBoundary Component
 *
 * Specialized error boundary for certification components with context-aware fallbacks
 */
class CertificationErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error(
        "CertificationErrorBoundary caught an error:",
        error,
        errorInfo
      );
    }

    // Track error for analytics in production
    if (process.env.NODE_ENV === "production") {
      // You can integrate with error tracking services here
      console.warn("Certification component error:", {
        message: error.message,
        context: this.props.context,
        stack: error.stack,
      });
    }
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: this.state.retryCount + 1,
      });
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  getContextualFallback = () => {
    const { context } = this.props;
    const { error, retryCount } = this.state;

    const baseClasses =
      "flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-red-200 shadow-lg";

    switch (context) {
      case "section":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${baseClasses} max-w-2xl mx-auto min-h-[400px]`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
            >
              <Award className="w-10 h-10 text-red-600" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Certifications Section Unavailable
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-md leading-relaxed">
              We're having trouble loading the certifications section. This
              might be due to a temporary issue with the data or animations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              {retryCount < this.maxRetries ? (
                <motion.button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again ({this.maxRetries - retryCount} left)
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200 flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-5 h-5" />
                  Refresh Page
                </motion.button>
              )}
            </div>
          </motion.div>
        );

      case "card":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${baseClasses} h-full min-h-[300px]`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </motion.div>

            <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">
              Card Error
            </h4>
            <p className="text-sm text-gray-600 text-center mb-4">
              Unable to load certification details
            </p>

            {retryCount < this.maxRetries && (
              <motion.button
                onClick={this.handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </motion.button>
            )}
          </motion.div>
        );

      case "modal":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${baseClasses} max-w-md mx-auto`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </motion.div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Modal Error
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Unable to display certification details
            </p>

            <div className="flex gap-3 w-full">
              {retryCount < this.maxRetries && (
                <motion.button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </motion.button>
              )}
              <motion.button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-4 h-4" />
                Close
              </motion.button>
            </div>
          </motion.div>
        );

      case "animation":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">
              Animation temporarily disabled due to an error
            </span>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={baseClasses}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              {error?.message || "An unexpected error occurred"}
            </p>

            {retryCount < this.maxRetries && (
              <motion.button
                onClick={this.handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </motion.button>
            )}
          </motion.div>
        );
    }
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            retry={this.handleRetry}
          />
        );
      }

      // Use contextual fallback
      return this.getContextualFallback();
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping certification components with error boundary
export const withCertificationErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  context: Props["context"] = "card",
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
) => {
  const WrappedComponent = (props: P) => (
    <CertificationErrorBoundary context={context} fallback={fallback}>
      <Component {...props} />
    </CertificationErrorBoundary>
  );

  WrappedComponent.displayName = `withCertificationErrorBoundary(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

export { CertificationErrorBoundary };
export default CertificationErrorBoundary;
