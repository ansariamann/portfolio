"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { scrollToSection, cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  isPage?: boolean;
}

const navigationItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Coding", href: "#coding-platforms" },
  { label: "Projects", href: "/projects", isPage: true },
  { label: "Case Studies", href: "/case-studies", isPage: true },
  { label: "Contact", href: "#contact" },
];

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || (!stored && prefersDark);
    setIsDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return { isDark, toggle };
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const { isDark, toggle } = useDarkMode();
  const isSubPage = pathname === "/case-studies" || pathname === "/projects";
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle via rAF to avoid layout thrashing on scroll
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setIsScrolled(window.scrollY > 20);

        if (isSubPage) return;

        const sectionIds = navigationItems
          .filter((item) => !item.isPage)
          .map((item) => item.href.substring(1));

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top;
            if (top >= -200 && top <= 300) {
              setActiveSection(id);
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isSubPage]);

  const handleScrollToSection = (href: string) => {
    scrollToSection(href);
    setIsMenuOpen(false);
    setActiveSection(href.substring(1));
  };

  const isItemActive = (item: NavItem) => {
    if (item.isPage) return pathname === item.href;
    return !isSubPage && activeSection === item.href.substring(1);
  };

  return (
    // Use a plain div + CSS transition instead of motion.header for the entry animation
    // (motion.header triggers layout recalculations on every frame during mount)
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform",
        isScrolled
          ? "h-16 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "h-20 bg-transparent"
      )}
      style={{ transform: "translateZ(0)" }} // promote to compositor layer
    >
      <nav className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          Portfolio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const active = isItemActive(item);
            const sharedClass = cn(
              "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            );

            return item.isPage ? (
              <Link key={item.href} href={item.href} className={sharedClass}>
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/90 rounded-full -z-[1]"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}
                {item.label}
              </Link>
            ) : (
              <button
                key={item.href}
                onClick={() => handleScrollToSection(item.href)}
                className={sharedClass}
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/90 rounded-full -z-[1]"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}

          {/* Dark mode toggle — CSS-only scale, no framer on hover */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="ml-2 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors active:scale-90"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile: dark mode + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* Pure CSS hamburger — no framer-motion spans */}
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className="w-full h-0.5 bg-current rounded transition-transform duration-200 origin-left"
                style={{ transform: isMenuOpen ? "rotate(45deg) translateY(-1px)" : "none" }}
              />
              <span
                className="w-full h-0.5 bg-current rounded transition-opacity duration-200"
                style={{ opacity: isMenuOpen ? 0 : 1 }}
              />
              <span
                className="w-full h-0.5 bg-current rounded transition-transform duration-200 origin-left"
                style={{ transform: isMenuOpen ? "rotate(-45deg) translateY(1px)" : "none" }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-1">
              {navigationItems.map((item) =>
                item.isPage ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => handleScrollToSection(item.href)}
                    className="px-4 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
