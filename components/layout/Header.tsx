"use client";

import { useState, useEffect } from "react";
import { NavigationItem } from "@/types";
import { scrollToSection } from "@/lib/utils";

import DigitalClock from '@/components/ui/DigitalClock';

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Coding", href: "#coding-platforms" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      // Clear inline value so browser uses the stylesheet/default
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // Clear inline value on cleanup
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleScrollToSection = (href: string) => {
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20"
          : "bg-gray-900"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Digital Clock - Fixed from left margin */}
          <div
            className="relative group flex-shrink-0"
            style={{ marginLeft: "0", minWidth: "fit-content" }}
          >
            <div
              onClick={() => handleScrollToSection("#hero")}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleScrollToSection("#hero");
                }
              }}
              aria-label="Go to home section"
            >
              <DigitalClock
                className={`font-bold text-xl ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              />
            </div>
          </div>

          {/* Modern Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleScrollToSection(item.href)}
                className={`relative px-4 py-2 font-medium ${
                  isScrolled
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Optimized */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 ${
                isScrolled ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`w-6 h-0.5 mt-1.5 ${
                isScrolled ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-0.5 mt-1.5 ${
                isScrolled ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu - Full screen overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content - Optimized */}
            <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-4 py-6">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleScrollToSection(item.href)}
                      className="block w-full text-left py-3 px-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg"
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-semibold">{item.label}</span>
                        <span className="text-blue-600 text-xl opacity-60">
                          →
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile menu footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">
                    Tap anywhere outside to close
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
