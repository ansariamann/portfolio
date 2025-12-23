"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  AlertCircle,
  Wifi,
  Image as ImageIcon,
  FileX,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

/**
 * Fallback Components
 *
 * Provides graceful fallbacks for missing or unavailable data in coding platform components
 */

// Generic Error Fallback
export const ErrorFallback: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}> = ({
  title = "Something went wrong",
  message = "We encountered an error loading this content.",
  onRetry,
  showRetry = true,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center p-6 sm:p-8 bg-red-50 border border-red-200 rounded-xl text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"
    >
      <AlertCircle className="w-6 h-6 text-red-600" />
    </motion.div>

    <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
    <p className="text-red-700 mb-4 max-w-md">{message}</p>

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

// Network Error Fallback
export const NetworkErrorFallback: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-6 sm:p-8 bg-orange-50 border border-orange-200 rounded-xl text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4"
    >
      <Wifi className="w-6 h-6 text-orange-600" />
    </motion.div>

    <h3 className="text-lg font-semibold text-orange-900 mb-2">
      Connection Error
    </h3>
    <p className="text-orange-700 mb-4 max-w-md">
      Unable to load coding platform data. Please check your internet connection
      and try again.
    </p>

    {onRetry && (
      <motion.button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <RefreshCw className="w-4 h-4" />
        Retry Connection
      </motion.button>
    )}
  </motion.div>
);

// Missing Data Fallback
export const MissingDataFallback: React.FC<{
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}> = ({
  title = "No Data Available",
  message = "There&apos;s no data to display at the moment.",
  icon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-xl text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4"
    >
      {icon || <FileX className="w-6 h-6 text-gray-600" />}
    </motion.div>

    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 max-w-md">{message}</p>
  </motion.div>
);

// Fallback Image Component
export const FallbackImage: React.FC<{
  src?: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
  onError?: () => void;
}> = ({ src, alt, className = "", fallbackIcon, onError }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!src || hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
      >
        {fallbackIcon || <ImageIcon className="w-6 h-6 text-gray-400" />}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
      )}
      <Image
        src={src || ""}
        alt={alt}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        fill
        onError={handleError}
        onLoadingComplete={handleLoad}
        unoptimized={
          typeof src === "string" ? (src.startsWith("data:") || src.endsWith(".svg")) : false
        }
      />
    </div>
  );
};

// Platform Unavailable Fallback
export const PlatformUnavailableFallback: React.FC<{
  platformName: string;
  profileUrl?: string;
}> = ({ platformName, profileUrl }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-6 sm:p-8 bg-blue-50 border border-blue-200 rounded-xl text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto"
    >
      <AlertCircle className="w-6 h-6 text-blue-600" />
    </motion.div>

    <h3 className="text-lg font-semibold text-blue-900 mb-2">
      {platformName} Data Unavailable
    </h3>
    <p className="text-blue-700 mb-4 max-w-md mx-auto">
      We&apos;re currently unable to load data from {platformName}. The platform
      may be temporarily unavailable.
    </p>

    {profileUrl && (
      <motion.a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ExternalLink className="w-4 h-4" />
        View Profile on {platformName}
      </motion.a>
    )}
  </motion.div>
);

// Statistics Unavailable Fallback
export const StatisticsUnavailableFallback: React.FC<{
  platformName: string;
}> = ({ platformName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-center"
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
      <AlertCircle className="w-8 h-8 text-gray-400" />
    </div>

    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Statistics Unavailable
    </h3>
    <p className="text-gray-600 max-w-md mx-auto">
      Unable to load statistics for {platformName}. Please try again later.
    </p>
  </motion.div>
);

// Achievements Unavailable Fallback
export const AchievementsUnavailableFallback: React.FC<{
  platformName: string;
}> = ({ platformName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-center"
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
      <FileX className="w-8 h-8 text-gray-400" />
    </div>

    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No Achievements Found
    </h3>
    <p className="text-gray-600 max-w-md mx-auto">
      No achievements are available for {platformName} at the moment.
    </p>
  </motion.div>
);

// Activity Unavailable Fallback
export const ActivityUnavailableFallback: React.FC<{
  platformName: string;
}> = ({ platformName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-center"
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
      <FileX className="w-8 h-8 text-gray-400" />
    </div>

    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No Recent Activity
    </h3>
    <p className="text-gray-600 max-w-md mx-auto">
      No recent activity data is available for {platformName}.
    </p>
  </motion.div>
);

// Broken Link Fallback
export const BrokenLinkFallback: React.FC<{
  originalUrl?: string;
  linkText?: string;
}> = ({ originalUrl, linkText = "Visit Profile" }) => (
  <span className="inline-flex items-center gap-1 text-gray-400 cursor-not-allowed">
    <ExternalLink className="w-3 h-3" />
    <span className="line-through">{linkText}</span>
    <span className="text-xs">(unavailable)</span>
  </span>
);

const FallbackComponents = {
  ErrorFallback,
  NetworkErrorFallback,
  MissingDataFallback,
  FallbackImage,
  PlatformUnavailableFallback,
  StatisticsUnavailableFallback,
  AchievementsUnavailableFallback,
  ActivityUnavailableFallback,
  BrokenLinkFallback,
};

export default FallbackComponents;
