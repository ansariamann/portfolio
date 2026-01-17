"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site-config";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact?.email || "",
      href: `mailto:${siteConfig.contact?.email || ""}`,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact?.phone || "",
      href: `tel:${siteConfig.contact?.phone || ""}`,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.contact?.location || "",
      href: "#",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ].filter((item) => item.value);

  return (
    <section
      id="contact"
      className="min-h-screen py-24 bg-secondary/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20"
          >
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              Let&apos;s Connect
            </span>
          </motion.div>

          <AnimatedSectionHeading
            text="Get in Touch"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center"
            preset="default"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-muted-foreground text-lg max-w-2xl font-light leading-relaxed"
          >
            Have a project in mind? Let&apos;s build something extraordinary together.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6 content-start">
            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2rem] flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Availability</h3>
                <p className="text-muted-foreground">
                  {siteConfig.contact?.availability || "Currently open for new opportunities."}
                </p>
              </div>
              <div className="mt-8 flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Online Now</span>
              </div>
            </motion.div>

            {/* Contact Methods List */}
            <div className="grid gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center p-5 rounded-[1.5rem] bg-white dark:bg-gray-900 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`p-3 rounded-full ${method.bg} mr-5 group-hover:scale-110 transition-transform`}>
                    <method.icon size={20} className={method.color} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{method.label}</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem] h-full">
              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
