"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certifications } from "@/data/certifications";
import { ExternalLink, Calendar, Award, Shield } from "lucide-react";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

export default function CertificationsSection() {
  const { touchDevice } = useMobileOptimizedAnimation();

  return (
    <section id="certifications" className="section-shell border-t border-ink/10">
      <div className="container-main">
        <header className="mb-12 max-w-2xl mx-auto text-center">
          <p className="section-label mb-4">Certifications</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.12]">
            Verified credentials.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative flex flex-col h-full ${
                touchDevice ? "active:scale-95" : ""
              }`}
            >
              {/* Card Content */}
              <div className="rounded-2xl border border-ink/10 bg-surface shadow-card p-6 flex flex-col h-full transition-all hover:border-accent/30 hover:shadow-card-hover relative overflow-hidden">
                {/* Header with Badge and Featured Tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-secondary/50 rounded-2xl p-3 flex items-center justify-center">
                    <Image
                      src={cert.badgeImage}
                      alt={cert.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  {cert.featured && (
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      <Shield size={12} />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-all duration-300 line-clamp-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <Award size={16} className="mr-2 text-primary" />
                  <span className="font-semibold">{cert.issuer}</span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                  {cert.description}
                </p>

                {/* Footer with Date and Verify Link */}
                <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
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
                      className="flex items-center gap-1 px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/link"
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
