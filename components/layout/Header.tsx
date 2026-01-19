"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavigationItem } from "@/types";
import { scrollToSection, cn } from "@/lib/utils";

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
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navigationItems.map((item) => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleScrollToSection = (href: string) => {
    setIsMenuOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      scrollToSection(href);
      setActiveSection(href.substring(1));
    }, 100);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled
            ? "h-16 bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-sm"
            : "h-20 bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleScrollToSection("#hero")}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            Portfolio
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.href}
                  onClick={() => handleScrollToSection(item.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative",
                    isActive
                      ? "bg-white/10 border border-white/20 text-white"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

          {/* Menu Panel */}
          <div
            className="absolute top-16 left-0 right-0 bottom-0 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="container mx-auto px-6 py-8">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleScrollToSection(item.href)}
                      className={cn(
                        "px-6 py-4 text-left text-lg font-medium rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 active:bg-white/10"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
