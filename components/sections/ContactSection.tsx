"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site-config";
import AnimatedSectionHeading, {
  headingPresets,
} from "@/components/ui/AnimatedSectionHeading";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact?.email || "",
      href: `mailto:${siteConfig.contact?.email || ""}`,
      color: "text-blue-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact?.phone || "",
      href: `tel:${siteConfig.contact?.phone || ""}`,
      color: "text-green-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.contact?.location || "",
      href: "#",
      color: "text-purple-400",
    },
  ].filter((item) => item.value); // Filter out empty values

  const socialLinks = (siteConfig.contact?.socialLinks || []).map((link) => {
    const iconMap: Record<
      string,
      React.ComponentType<React.ComponentProps<"svg">>
    > = {
      github: Github,
      linkedin: Linkedin,
      twitter: Twitter,
      mail: Mail,
    };

    return {
      ...link,
      icon: iconMap[link.icon as string] || Mail,
    };
  });

  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-gradient-to-br from-slate-900 via-gray-900 via-slate-800 to-gray-900 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/40">
              Get in touch
            </span>
          </motion.div>

          <AnimatedSectionHeading
            text="Let's Work Together"
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            preset="default"
          />

          <motion.p
            className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to bring your ideas to life? I&apos;m always excited to
            discuss new opportunities and creative projects.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                {siteConfig.contact?.availability ||
                  "Available for opportunities"}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 group"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className={`p-3 rounded-lg bg-white/10 ${method.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      {method.label}
                    </p>
                    <p className="text-white font-semibold">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="text-xl font-semibold text-white mb-6">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 group"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon
                      width={20}
                      height={20}
                      className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-200 text-lg mb-6">
            Prefer a more direct approach?
          </p>
          <motion.a
            href={`mailto:${siteConfig.contact?.email || ""}`}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            <span>Send Direct Email</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
