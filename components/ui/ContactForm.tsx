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
import { cn } from "@/lib/utils";
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

      // TODO: Replace with actual email service integration
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      setSubmissionStatus("success");
      setSubmitMessage("Thank you! Your message has been sent successfully.");
      reset();

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmissionStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } catch {
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
    "w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    // Conditional transition based on motion preference
    prefersReducedMotion
      ? "motion-reduce-essential"
      : "transition-all duration-300",
    // Mobile-first responsive sizing
    "px-4 py-3 text-base sm:px-3 sm:py-2 sm:text-sm",
    // Mobile-specific enhancements
    "mobile-tap-highlight",
    touchDevice && "min-h-[44px]",
    isMobile && "rounded-lg text-base" // Prevent zoom on iOS
  );
  const errorClasses = cn("text-red-400 mt-1", "text-sm sm:text-xs");

  return (
    <motion.form
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
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Send me a message
      </h3>

      {/* Name Field */}
      <motion.div
        className="space-y-2"
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
          className="block text-sm font-medium text-gray-300"
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
        className="space-y-2"
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
          className="block text-sm font-medium text-gray-300"
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

      {/* Message Field */}
      <motion.div
        className="space-y-2"
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
          className="block text-sm font-medium text-gray-300"
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
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid || !isDirty || submissionStatus === "submitting"}
          className="w-full"
        >
          {submissionStatus === "submitting" ? (
            <motion.div
              className="flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span className="ml-2">Sending...</span>
            </motion.div>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>

      {/* Status Messages */}
      {submitMessage && (
        <motion.div
          className={`flex items-center p-4 rounded-lg ${
            submissionStatus === "success"
              ? "bg-green-900/50 border border-green-500 text-green-300"
              : "bg-red-900/50 border border-red-500 text-red-300"
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {submissionStatus === "success" ? (
            <CheckCircle size={20} className="mr-3 flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="mr-3 flex-shrink-0" />
          )}
          <p>{submitMessage}</p>
        </motion.div>
      )}
    </motion.form>
  );
}
