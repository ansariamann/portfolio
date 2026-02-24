"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/ansariamann", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/ansariamann", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/ansariamann", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@amanansari.com", label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 relative z-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Label */}
          <h3 className="text-slate-300 text-sm font-semibold uppercase tracking-wider">
            Connect
          </h3>

          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
