"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import {
  contactFormSchema,
  defaultContactFormValues,
  validateContactForm,
  sanitizeContactFormData,
  type ContactFormData,
} from "@/lib/contact-schema";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { useReducedMotion } from "@/lib/hooks/useScrollAnimations";
import { cn, debugLog } from "@/lib/utils";
import { Button } from "./Button";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultContactFormValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus("submitting");

    try {
      // Sanitize the data before submission
      const sanitizedData = sanitizeContactFormData(data);

      // Validate one more time before submission
      const validation = validateContactForm(sanitizedData);
      if (!validation.success) {
        throw new Error("Validation failed");
      }

      // Log data for debugging/verification
      debugLog("Form Data prepared for submission:", sanitizedData);

      // Submit to Netlify
      const encode = (data: Record<string, string>) => {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...sanitizedData }),
      });

      setSubmissionStatus("success");
      setSubmitMessage("Thank you! Your message has been sent successfully.");
      reset();

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmissionStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again."
      );

      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmissionStatus("idle");
        setSubmitMessage("");
      }, 5000);
    }
  };

  const { isMobile, touchDevice } = useMobileOptimizedAnimation();
  const prefersReducedMotion = useReducedMotion();
  const transition = {
    default: { duration: 0.6 },
    fast: { duration: 0.3 },
  };

  const inputClasses = cn(
    "w-full bg-slate-800 border-2 border-slate-300 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-transparent transition-all duration-300 hover:border-slate-400 relative group",
    // Conditional transition based on motion preference
    prefersReducedMotion
      ? "motion-reduce-essential"
      : "transition-all duration-300",
    // Mobile-first responsive sizing
    "px-5 py-3.5 text-base sm:px-4 sm:py-3 sm:text-sm",
    // Mobile-specific enhancements
    "mobile-tap-highlight",
    touchDevice && "min-h-[44px]",
    isMobile && "rounded-xl text-base", // Prevent zoom on iOS
    // Gradient focus effect
    "focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
  );
  const errorClasses = cn("text-red-600 mt-1.5 font-medium", "text-sm sm:text-xs");

  return (
    <>
      {/* Static form for Netlify detection - hidden from users */}
      <form
        name="contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
      </form>

      {/* Actual React form that users interact with */}
      <motion.form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "w-full max-w-2xl mx-auto space-y-6",
          prefersReducedMotion && "motion-reduce-scroll"
        )}
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
      >
        {/* Hidden honeypot field for spam protection */}
        <input type="hidden" name="form-name" value="contact" />
        <div style={{ display: "none" }}>
          <label>
            Don&apos;t fill this out if you&apos;re human:{" "}
            <input name="bot-field" />
          </label>
        </div>

        <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-purple-700 to-amber-700 bg-clip-text text-transparent mb-10 text-center">
          Send me a message
        </h3>

        {/* Name Field */}
        <motion.div
          className="space-y-2.5"
          initial={
            prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.1, ...transition.default }
          }
        >
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-700"
          >
            Name *
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={inputClasses}
            placeholder="Your full name"
          />
          {errors.name && (
            <motion.p
              className={errorClasses}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : transition.fast
              }
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="space-y-2.5"
          initial={
            prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.2, ...transition.default }
          }
        >
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700"
          >
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={inputClasses}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <motion.p
              className={errorClasses}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : transition.fast
              }
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Subject Field */}
        <motion.div
          className="space-y-2.5"
          initial={
            prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.25, ...transition.default }
          }
        >
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-slate-700"
          >
            Subject *
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            className={inputClasses}
            placeholder="Brief summary of your message"
          />
          {errors.subject && (
            <motion.p
              className={errorClasses}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : transition.fast
              }
            >
              {errors.subject.message}
            </motion.p>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="space-y-2.5"
          initial={
            prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.3, ...transition.default }
          }
        >
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-slate-700"
          >
            Message *
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={6}
            className={inputClasses}
            placeholder="Tell me about your project, question, or just say hello!"
          />
          {errors.message && (
            <motion.p
              className={errorClasses}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.message.message}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <button
            type="submit"
            disabled={!isValid || !isDirty || submissionStatus === "submitting"}
            className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button content */}
            <div className="relative flex items-center justify-center">
              {submissionStatus === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="ml-3">Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Status Messages */}
        {submitMessage && (
          <div
            className={`flex items-center p-4 rounded-lg ${submissionStatus === "success"
              ? "bg-green-900/50 border border-green-500 text-green-300"
              : "bg-red-900/50 border border-red-500 text-red-300"
              }`}
          >
            {submissionStatus === "success" ? (
              <CheckCircle size={20} className="mr-3 flex-shrink-0" />
            ) : (
              <AlertCircle size={20} className="mr-3 flex-shrink-0" />
            )}
            <p>{submitMessage}</p>
          </div>
        )}
      </motion.form>
    </>
  );
}
