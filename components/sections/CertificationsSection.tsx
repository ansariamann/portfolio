"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certifications } from "@/data/certifications";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";
import { ExternalLink, Calendar, Award } from "lucide-react";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

export default function CertificationsSection() {
  const { touchDevice } = useMobileOptimizedAnimation();

  return (
    <section id="certifications" className="min-h-screen py-20 bg-gray-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-slate-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeading
          text="Certifications"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent text-center"
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
              className={`bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/50 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group flex flex-col h-full ${touchDevice ? "active:scale-95" : ""
                }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="relative w-16 h-16 flex-shrink-0 bg-white/50 rounded-xl p-2 border border-white/60">
                  <Image
                    src={cert.badgeImage}
                    alt={cert.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                {cert.featured && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {cert.title}
              </h3>

              <div className="flex items-center text-slate-600 text-sm mb-4">
                <Award size={16} className="mr-2 text-blue-500" />
                <span className="font-medium">{cert.issuer}</span>
              </div>

              <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                {cert.description}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-200/50 flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-400">
                  <Calendar size={14} className="mr-1.5" />
                  <span>
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
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium group/link"
                  >
                    Verify
                    <ExternalLink
                      size={14}
                      className="ml-1 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
