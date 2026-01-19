"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

/**
 * Custom 404 Not Found page with mobile optimization and accessibility
 * This page is automatically shown when a route doesn't exist
 */
export default function NotFound() {
  const { isMobile, shouldReduceAnimations } = useMobileOptimizedAnimation();

  return (
    <div className="min-h-screen-mobile flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 safe-top safe-bottom">
      <div className="max-w-md mx-auto text-center px-4 sm:px-6">
        {/* 404 Illustration with animation */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceAnimations ? 0.3 : 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className="relative">
            <motion.h1
              className="text-6xl sm:text-8xl md:text-9xl font-bold text-gray-200 dark:text-gray-200 select-none"
              animate={
                shouldReduceAnimations
                  ? {}
                  : {
                      scale: [1, 1.02, 1],
                    }
              }
              transition={
                shouldReduceAnimations
                  ? {}
                  : {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              role="heading"
              aria-level={1}
              aria-label="Error 404"
            >
              404
            </motion.h1>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{
                delay: shouldReduceAnimations ? 0.1 : 0.3,
                duration: shouldReduceAnimations ? 0.3 : 0.5,
              }}
            >
              <Search
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-500 dark:text-blue-400"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceAnimations ? 0.1 : 0.4,
            duration: shouldReduceAnimations ? 0.3 : 0.6,
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed px-2 sm:px-0">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceAnimations ? 0.2 : 0.7,
            duration: shouldReduceAnimations ? 0.3 : 0.6,
          }}
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size={isMobile ? "md" : "lg"}
              className="w-full sm:w-auto min-w-[140px] flex items-center justify-center gap-2 touch-target"
              aria-label="Return to homepage"
            >
              <Home size={isMobile ? 18 : 20} />
              Go Home
            </Button>
          </Link>

          <Button
            variant="secondary"
            size={isMobile ? "md" : "lg"}
            onClick={() => window.history.back()}
            className="w-full sm:w-auto min-w-[140px] flex items-center justify-center gap-2 touch-target"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={isMobile ? 18 : 20} />
            Go Back
          </Button>
        </motion.div>

        {/* Quick Navigation Links */}
        <motion.div
          className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: shouldReduceAnimations ? 0.3 : 1,
            duration: shouldReduceAnimations ? 0.3 : 0.6,
          }}
          role="navigation"
          aria-label="Quick navigation"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Or explore these sections:
          </p>

          <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
            {[
              { href: "/#about", label: "About" },
              { href: "/#skills", label: "Skills" },
              { href: "/#projects", label: "Projects" },
              { href: "/#contact", label: "Contact" },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceAnimations
                    ? 0.3 + index * 0.05
                    : 1.2 + index * 0.1,
                  duration: shouldReduceAnimations ? 0.2 : 0.4,
                }}
              >
                <Link
                  href={link.href}
                  className="inline-block px-3 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 touch-target focus-mobile-visible"
                  aria-label={`Navigate to ${link.label} section`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Fun Easter Egg */}
        <motion.div
          className="mt-6 sm:mt-8 text-xs text-gray-400 dark:text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: shouldReduceAnimations ? 0.4 : 1.5,
            duration: shouldReduceAnimations ? 0.3 : 0.6,
          }}
          role="complementary"
          aria-label="Encouraging message"
        >
          <p>
            Lost in the code? Don&apos;t worry, even the best developers get
            404s! 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "404 - Page Not Found | Modern Portfolio",
  description: "The page you are looking for could not be found.",
};
