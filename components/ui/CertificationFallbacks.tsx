"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Image as ImageIcon,
  FileX,
  RefreshCw,
  ExternalLink,
  Award,
  Shield,
  Clock,
  Wifi,
  AlertTriangle,
} from "lucide-react";

/**
 * Certification-specific Fallback Components
 *
 * Provides graceful fallbacks for certification-related errors and missing data
 */

// Certification Image Fallback
export const CertificationImageFallback: React.FC<{
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onRetry?: () => void;
}> = ({ alt, className = "", size = "md", onRetry }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16 sm:w-20 sm:h-20",
    lg: "w-24 h-24 sm:w-32 sm:h-32",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-blue-300 relative group`}
      title={`Failed to load image: ${alt}`}
    >
      <Award className={`${iconSizes[size]} text-blue-500 mb-1`} />
      <span className="text-xs text-blue-600 font-medium text-center px-1">
        Badge
      </span>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Retry loading image"
        >
          <RefreshCw className="w-4 h-4 text-white" />
        </motion.button>
      )}
    </motion.div>
  );
};

// Certification Card Error Fallback
export const CertificationCardErrorFallback: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}> = ({
  title = "Certification Unavailable",
  message = "Unable to load certification details",
  onRetry,
  showRetry = true,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="h-full min-h-[300px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200 flex flex-col items-center justify-center p-6"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
    >
      <AlertTriangle className="w-8 h-8 text-red-600" />
    </motion.div>

    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
      {title}
    </h3>
    <p className="text-sm text-gray-600 text-center mb-4 max-w-xs">{message}</p>

    {showRetry && onRetry && (
      <motion.button
        onClick={onRetry}
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

// Certification Data Loading Error
export const CertificationDataErrorFallback: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-8 bg-orange-50 border border-orange-200 rounded-xl text-center max-w-md mx-auto"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4"
    >
      <FileX className="w-8 h-8 text-orange-600" />
    </motion.div>

    <h3 className="text-xl font-semibold text-orange-900 mb-2">
      Certification Data Unavailable
    </h3>
    <p className="text-orange-700 mb-6 leading-relaxed">
      We're having trouble loading the certification data. This might be a
      temporary issue.
    </p>

    {onRetry && (
      <motion.button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <RefreshCw className="w-5 h-5" />
        Reload Certifications
      </motion.button>
    )}
  </motion.div>
);

// Network Error for Certification Verification
export const CertificationNetworkErrorFallback: React.FC<{
  certificationTitle?: string;
  onRetry?: () => void;
}> = ({ certificationTitle = "certification", onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-xl text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
    >
      <Wifi className="w-6 h-6 text-blue-600" />
    </motion.div>

    <h3 className="text-lg font-semibold text-blue-900 mb-2">
      Connection Error
    </h3>
    <p className="text-blue-700 mb-4 max-w-sm">
      Unable to verify {certificationTitle}. Please check your internet
      connection.
    </p>

    {onRetry && (
      <motion.button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <RefreshCw className="w-4 h-4" />
        Retry Verification
      </motion.button>
    )}
  </motion.div>
);

// Expired Certification Fallback
export const ExpiredCertificationFallback: React.FC<{
  certificationTitle: string;
  expiryDate: string;
  renewalUrl?: string;
}> = ({ certificationTitle, expiryDate, renewalUrl }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
  >
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Clock className="w-4 h-4 text-yellow-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-yellow-900 mb-1">
          Certification Expired
        </h4>
        <p className="text-sm text-yellow-800 mb-3">
          {certificationTitle} expired on{" "}
          {new Date(expiryDate).toLocaleDateString()}
        </p>
        {renewalUrl && (
          <motion.a
            href={renewalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-3 h-3" />
            Renew Certification
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

// Animation Fallback (when animations fail)
export const AnimationFallbackWrapper: React.FC<{
  children: React.ReactNode;
  fallbackMessage?: string;
}> = ({ children, fallbackMessage = "Animation disabled due to error" }) => {
  const [hasAnimationError, setHasAnimationError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes("animation") ||
        event.message.includes("motion")
      ) {
        setHasAnimationError(true);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasAnimationError) {
    return (
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-full text-xs text-yellow-800">
            <AlertTriangle className="w-3 h-3" />
            {fallbackMessage}
          </div>
        </div>
        <div className="opacity-90">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

// Verification Link Fallback
export const VerificationLinkFallback: React.FC<{
  certificationTitle: string;
  issuer: string;
  originalUrl?: string;
}> = ({ certificationTitle, issuer, originalUrl }) => (
  <div className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
    <Shield className="w-4 h-4" />
    <span className="text-sm line-through">Verify Certificate</span>
    <span className="text-xs">(link unavailable)</span>
  </div>
);

// Modal Loading Error
export const CertificationModalErrorFallback: React.FC<{
  onClose: () => void;
  onRetry?: () => void;
}> = ({ onClose, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto"
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
      Unable to Load Details
    </h3>
    <p className="text-gray-600 text-center mb-6">
      We encountered an error while loading the certification details.
    </p>

    <div className="flex gap-3 w-full">
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
      <motion.button
        onClick={onClose}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 flex-1"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Close
      </motion.button>
    </div>
  </motion.div>
);

// No Certifications Fallback
export const NoCertificationsFallback: React.FC<{
  category?: string;
}> = ({ category }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl text-center max-w-md mx-auto"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6"
    >
      <Award className="w-10 h-10 text-gray-400" />
    </motion.div>

    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {category ? `No ${category} Certifications` : "No Certifications Found"}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {category
        ? `There are currently no certifications in the ${category} category.`
        : "No certifications are available to display at the moment."}
    </p>
  </motion.div>
);

// Browser Compatibility Fallback
export const BrowserCompatibilityFallback: React.FC<{
  feature: string;
  children: React.ReactNode;
}> = ({ feature, children }) => {
  const [isSupported, setIsSupported] = React.useState(true);

  React.useEffect(() => {
    // Check for specific browser features
    const checkSupport = () => {
      switch (feature) {
        case "backdrop-filter":
          return CSS.supports("backdrop-filter", "blur(10px)");
        case "css-grid":
          return CSS.supports("display", "grid");
        case "flexbox":
          return CSS.supports("display", "flex");
        case "transforms":
          return CSS.supports("transform", "translateX(0)");
        default:
          return true;
      }
    };

    setIsSupported(checkSupport());
  }, [feature]);

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-900">
            Limited Browser Support
          </span>
        </div>
        <p className="text-sm text-yellow-800 mb-3">
          Some visual features may not display correctly in your browser.
        </p>
        <div className="opacity-75">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default {
  CertificationImageFallback,
  CertificationCardErrorFallback,
  CertificationDataErrorFallback,
  CertificationNetworkErrorFallback,
  ExpiredCertificationFallback,
  AnimationFallbackWrapper,
  VerificationLinkFallback,
  CertificationModalErrorFallback,
  NoCertificationsFallback,
  BrowserCompatibilityFallback,
};
