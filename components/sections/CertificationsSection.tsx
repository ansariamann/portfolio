"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certifications } from "@/data/certifications";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";
import { ExternalLink, Calendar, Award, Shield } from "lucide-react";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

export default function CertificationsSection() {
  const { touchDevice } = useMobileOptimizedAnimation();

  return (
    <section id="certifications" className="min-h-screen py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-slate-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeading
          text="Certifications"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 tracking-tight bg-gradient-to-r from-slate-900 via-purple-800 to-amber-900 bg-clip-text text-transparent text-center"
          preset="default"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative flex flex-col h-full ${touchDevice ? "active:scale-95" : ""}`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

              {/* Card Content */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60 flex flex-col h-full transition-all duration-300">
                {/* Header with Badge and Featured Tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-purple-100 to-amber-100 rounded-2xl p-3 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-2xl"></div>
                    <Image
                      src={cert.badgeImage}
                      alt={cert.title}
                      fill
                      className="object-contain p-2 relative z-10"
                    />
                  </div>
                  {cert.featured && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-sm opacity-50"></div>
                      <span className="relative px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        <Shield size={12} />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-amber-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div className="flex items-center text-slate-600 text-sm mb-4 group-hover:text-purple-700 transition-colors duration-300">
                  <Award size={16} className="mr-2 text-purple-600 group-hover:text-amber-600 transition-colors duration-300" />
                  <span className="font-semibold">{cert.issuer}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {cert.description}
                </p>

                {/* Footer with Date and Verify Link */}
                <div className="mt-auto pt-5 border-t border-slate-200/70 flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-500 group-hover:text-purple-600 transition-colors duration-300">
                    <Calendar size={14} className="mr-2" />
                    <span className="font-medium">
                      {new Date(cert.issueDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-amber-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300 group/link"
                    >
                      Verify
                      <ExternalLink
                        size={14}
                        className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
