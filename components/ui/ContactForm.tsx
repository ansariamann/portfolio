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

  // Apple-style input classes: clean, light bg, subtle border
  const inputClasses = cn(
    "w-full bg-secondary/50 border border-transparent rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all duration-300",
    prefersReducedMotion ? "motion-reduce-essential" : "transition-all duration-300",
    "px-5 py-4 text-base",
    touchDevice && "min-h-[44px]",
    isMobile && "rounded-xl text-base"
  );

  const labelClasses = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1";
  const errorClasses = cn("text-destructive mt-2 font-medium", "text-sm sm:text-xs ml-1");

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
          "w-full space-y-6",
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

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Send a Message
          </h3>
          <p className="text-muted-foreground">
            I usually respond within 24 hours.
          </p>
        </div>

        {/* Name Field */}
        <motion.div
          className="space-y-1"
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
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={inputClasses}
          />
          {errors.name && (
            <motion.p
              className={errorClasses}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="space-y-1"
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
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={inputClasses}
          />
          {errors.email && (
            <motion.p
              className={errorClasses}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Subject Field */}
        <motion.div
          className="space-y-1"
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
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            className={inputClasses}
          />
          {errors.subject && (
            <motion.p
              className={errorClasses}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.subject.message}
            </motion.p>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="space-y-1"
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
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            className={inputClasses}
          />
          {errors.message && (
            <motion.p
              className={errorClasses}
              initial={{ opacity: 0, y: -5 }}
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
          className="pt-4"
        >
          <button
            type="submit"
            disabled={!isValid || !isDirty || submissionStatus === "submitting"}
            className="group relative w-full px-8 py-4 bg-primary text-primary-foreground font-semibold text-base rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden active:scale-[0.98]"
          >
            <div className="relative flex items-center justify-center">
              {submissionStatus === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  <span className="ml-3">Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Status Messages */}
        {submitMessage && (
          <div
            className={`flex items-center p-4 rounded-xl mt-4 ${submissionStatus === "success"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              }`}
          >
            {submissionStatus === "success" ? (
              <CheckCircle size={20} className="mr-3 flex-shrink-0" />
            ) : (
              <AlertCircle size={20} className="mr-3 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{submitMessage}</p>
          </div>
        )}
      </motion.form>
    </>
  );
}

