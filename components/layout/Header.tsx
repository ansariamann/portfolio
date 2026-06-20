"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Mail, Github, Linkedin } from "lucide-react";
import { scrollToSection, cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  isPage?: boolean;
}

/** Homepage scroll sections only — case studies & projects are separate pages */
const homeNavItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const pageNavItems: NavItem[] = [
  { label: "Projects", href: "/projects", isPage: true },
  { label: "Case Studies", href: "/case-studies", isPage: true },
];

function useDarkMode() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
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
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const { isDark, toggle } = useDarkMode();
  const isHome = pathname === "/";
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        if (!isHome) return;

        for (const item of homeNavItems) {
          const id = item.href.substring(1);
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
  }, [isHome]);

  const handleScrollToSection = (href: string) => {
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    scrollToSection(href);
    setIsMenuOpen(false);
    setActiveSection(href.substring(1));
  };

  const isHomeItemActive = (href: string) =>
    isHome && activeSection === href.substring(1);

  const isPageActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-ink/10 bg-background/95 backdrop-blur-sm transition-colors"
      )}
    >
      <nav className="container-wide flex h-14 sm:h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Aman Ansari
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-1 min-w-0">
          {homeNavItems.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  handleScrollToSection(item.href);
                }
              }}
              className={cn("nav-link", isHomeItemActive(item.href) && "nav-link-active")}
            >
              {item.label}
            </Link>
          ))}
          {pageNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-link", isPageActive(item.href) && "nav-link-active")}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="https://github.com/ansariamann"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden lg:flex size-9 items-center justify-center rounded-md border border-ink/10 transition-colors hover:bg-ink/5"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/-aman-ansari"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden lg:flex size-9 items-center justify-center rounded-md border border-ink/10 transition-colors hover:bg-ink/5"
          >
            <Linkedin size={16} />
          </a>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="size-9 flex items-center justify-center rounded-md border border-ink/10 text-muted-foreground transition-colors hover:bg-ink/5"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link
            href="/#contact"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                handleScrollToSection("#contact");
              }
            }}
            className="btn-primary !min-h-9 !py-2 !px-3.5 !text-sm hidden sm:inline-flex"
          >
            <Mail size={15} aria-hidden />
            Hire me
          </Link>

          <button
            type="button"
            className="lg:hidden size-9 flex items-center justify-center rounded-md border border-ink/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-4 h-3 relative flex flex-col justify-between">
              <span
                className="w-full h-0.5 bg-current rounded transition-transform origin-left"
                style={{
                  transform: isMenuOpen ? "rotate(45deg) translateY(-1px)" : "none",
                }}
              />
              <span
                className="w-full h-0.5 bg-current rounded transition-opacity"
                style={{ opacity: isMenuOpen ? 0 : 1 }}
              />
              <span
                className="w-full h-0.5 bg-current rounded transition-transform origin-left"
                style={{
                  transform: isMenuOpen ? "rotate(-45deg) translateY(1px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-ink/10 bg-background/98 backdrop-blur-xl">
          <div className="container-wide py-3 flex flex-col gap-1">
            {homeNavItems.map((item) => (
              <Link
                key={item.href}
                href={`/${item.href}`}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    handleScrollToSection(item.href);
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
                className="nav-link w-full text-left block"
              >
                {item.label}
              </Link>
            ))}
            {pageNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "nav-link w-full text-left block",
                  isPageActive(item.href) && "nav-link-active"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  handleScrollToSection("#contact");
                } else {
                  setIsMenuOpen(false);
                }
              }}
              className="btn-primary mt-2 w-full text-center block"
            >
              Hire me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
