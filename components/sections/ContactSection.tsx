"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
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



  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-white relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 sm:top-40 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-purple-100/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-32 sm:w-80 h-32 sm:h-80 bg-amber-100/40 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
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
            <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-amber-100 rounded-full text-sm font-semibold text-slate-800 border border-purple-200">
              Get in touch
            </span>
          </motion.div>

          <AnimatedSectionHeading
            text="Let's Work Together"
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-r from-slate-900 via-purple-700 to-amber-700 bg-clip-text text-transparent"
            preset="default"
          />

          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
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
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>
              <p className="text-slate-600 text-lg mb-8">
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
                  className="flex items-center space-x-4 p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 ${method.color} group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <method.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      {method.label}
                    </p>
                    <p className="text-slate-900 font-semibold">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>


          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 p-8 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>


      </div>
    </section>
  );
}
