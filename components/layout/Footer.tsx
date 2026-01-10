"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/ansariamann", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/ansariamann", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/ansariamann", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@amanansari.com", label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 relative z-10">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright */}
          <div className="text-slate-400 text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Aman Ansari. All rights reserved.</p>
            <p className="flex items-center justify-center md:justify-start gap-1 mt-1 text-slate-500">
              Made with <Heart size={12} className="text-red-500 fill-red-500" /> using Next.js & Tailwind
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Top</span>
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
              <ChevronUp size={16} />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
