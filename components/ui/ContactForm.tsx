"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle } from "lucide-react";
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
      const sanitizedData = sanitizeContactFormData(data);
      const validation = validateContactForm(sanitizedData);
      if (!validation.success) throw new Error("Validation failed");

      debugLog("Form Data prepared for submission:", sanitizedData);

      // Prepare FormData for Netlify
      const formData = new FormData();
      formData.append("form-name", "contact");
      formData.append("name", sanitizedData.name);
      formData.append("email", sanitizedData.email);
      formData.append("message", sanitizedData.message);

      // Submit to Netlify
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(
          Object.entries({
            "form-name": "contact",
            name: sanitizedData.name,
            email: sanitizedData.email,
            message: sanitizedData.message,
          })
        ).toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      setSubmissionStatus("success");
      setSubmitMessage(
        "Message sent successfully! I'll get back to you soon. ✨"
      );
      reset();

      setTimeout(() => {
        setSubmissionStatus("idle");
        setSubmitMessage("");
      }, 6000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus("error");
      setSubmitMessage(
        "There was an issue sending your message. Please try again or email directly: iamamanansari786a@gmail.com"
      );

      setTimeout(() => {
        setSubmissionStatus("idle");
        setSubmitMessage("");
      }, 6000);
    }
  };

  const { isMobile, touchDevice } = useMobileOptimizedAnimation();
  const prefersReducedMotion = useReducedMotion();
  const transition = {
    default: { duration: 0.6 },
    fast: { duration: 0.3 },
  };

  // Tall and spacious input and textarea classes matching hashton.dev style
  const inputClasses = cn(
    "w-full rounded-2xl border border-ink/10 bg-background/50 px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/60 transition-[box-shadow,border-color] focus:border-accent focus:outline-none focus:ring-[4px] focus:ring-accent/15",
    "h-14"
  );

  const textareaClasses = cn(
    "w-full rounded-2xl border border-ink/10 bg-background/50 px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/60 transition-[box-shadow,border-color] focus:border-accent focus:outline-none focus:ring-[4px] focus:ring-accent/15",
    "min-h-[160px]"
  );

  const labelClasses =
    "block text-[15px] font-bold text-foreground mb-2";
  const errorClasses = cn(
    "text-destructive mt-2 font-medium",
    "text-sm sm:text-xs ml-1"
  );

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
            className={textareaClasses}
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
            className="group relative w-full h-14 px-8 bg-primary text-primary-foreground font-bold text-base rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 disabled:cursor-not-allowed overflow-hidden active:scale-[0.98] flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              {submissionStatus === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  <span className="ml-3">Sending...</span>
                </>
              ) : (
                <>
                  Send message
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Status Messages */}
        {submitMessage && (
          <div
            className={`flex items-center p-4 rounded-xl mt-4 ${
              submissionStatus === "success"
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
