"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationItem } from "@/types";
import { scrollToSection } from "@/lib/utils";

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleScrollToSection = (href: string) => {
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Modern Logo */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => handleScrollToSection("#home")}
              className={`text-2xl font-bold transition-all duration-300 ${
                isScrolled ? "text-slate-800" : "text-white"
              } hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent`}
              aria-label="Go to home section"
            >
              <span className="relative">
                John.dev
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
          </motion.div>

          {/* Modern Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleScrollToSection(item.href)}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                aria-label={`Navigate to ${item.label} section`}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Modern hover effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button - Enhanced touch target */}
          <motion.button
            className="nav-mobile-visible touch-target flex flex-col items-center justify-center rounded-lg focus-mobile-visible mobile-tap-highlight touch-feedback p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            <motion.span
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </motion.button>
        </div>

        {/* Mobile Menu - Full screen overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                className="md:hidden modal-mobile-fullscreen bg-white/98 backdrop-blur-md shadow-xl border-t border-gray-200 max-h-[80vh] overflow-y-auto scroll-mobile-smooth"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="container mx-auto px-4 py-6 safe-bottom">
                  <div className="content-mobile-compact">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.href}
                        onClick={() => handleScrollToSection(item.href)}
                        className="block w-full text-left py-4 px-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all duration-300 touch-target focus-mobile-visible mobile-tap-highlight touch-feedback"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-mobile-scale font-semibold">
                            {item.label}
                          </span>
                          <motion.span
                            className="text-blue-600 opacity-0 text-xl"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Mobile menu footer */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-gray-200 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-sm text-gray-500">
                      Tap anywhere outside to close
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
