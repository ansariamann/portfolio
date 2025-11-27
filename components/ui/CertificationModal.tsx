"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  Award,
  Shield,
  User,
  Hash,
} from "lucide-react";
import { Certification, CERTIFICATION_CATEGORIES } from "@/types";
import Modal from "./Modal";
import {
  CertificationImageFallback,
  VerificationLinkFallback,
  ExpiredCertificationFallback,
} from "./CertificationFallbacks";

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificationModal({
  certification,
  isOpen,
  onClose,
}: CertificationModalProps) {
  const [imageError, setImageError] = React.useState(false);
  const [verificationError, setVerificationError] = React.useState(false);

  if (!certification) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = certification.expiryDate
    ? new Date(certification.expiryDate) < new Date()
    : false;

  const getCategoryColor = (category: Certification["category"]) => {
    switch (category) {
      case "technical":
        return "from-blue-500 to-cyan-500";
      case "professional":
        return "from-purple-500 to-pink-500";
      case "academic":
        return "from-green-500 to-emerald-500";
      case "cloud":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl"
      title={`${certification.title} - Certification Details`}
    >
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                id="modal-certification-title"
              >
                {certification.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <User size={18} className="mr-2" aria-hidden="true" />
                <span className="text-base sm:text-lg font-medium">
                  {certification.issuer}
                </span>
              </div>
            </div>

            {/* Badge image with error handling */}
            <div className="flex-shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                {imageError ? (
                  <CertificationImageFallback
                    alt={`${certification.title} certification badge from ${certification.issuer}`}
                    size="lg"
                    className="w-full h-full shadow-lg"
                    onRetry={() => setImageError(false)}
                  />
                ) : (
                  <img
                    src={certification.badgeImage}
                    alt={`${certification.title} certification badge from ${certification.issuer}`}
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Status badges */}
          <div
            className="flex flex-wrap gap-2 sm:gap-3 mb-6"
            role="group"
            aria-label="Certification status and category"
          >
            {/* Category badge */}
            <div
              className={`inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r ${getCategoryColor(
                certification.category
              )} text-white rounded-full text-xs sm:text-sm font-medium shadow-lg`}
              role="status"
              aria-label={`Category: ${
                CERTIFICATION_CATEGORIES[certification.category]
              }`}
            >
              <Tag size={14} className="mr-2" aria-hidden="true" />
              {CERTIFICATION_CATEGORIES[certification.category]}
            </div>

            {/* Featured badge */}
            {certification.featured && (
              <div
                className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg"
                role="status"
                aria-label="This is a featured certification"
              >
                <Award size={14} className="mr-2" aria-hidden="true" />
                Featured
              </div>
            )}

            {/* Status badge */}
            <div
              className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg ${
                isExpired
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
              role="status"
              aria-label={`Certification status: ${
                isExpired ? "Expired" : "Active"
              }`}
            >
              {isExpired ? (
                <Clock size={14} className="mr-2" aria-hidden="true" />
              ) : (
                <CheckCircle size={14} className="mr-2" aria-hidden="true" />
              )}
              {isExpired ? "Expired" : "Active"}
            </div>
          </div>
        </div>

        {/* Certification details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Left column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Issue date */}
            <div
              className="bg-gray-50 rounded-lg p-4"
              role="group"
              aria-labelledby="issue-date-heading"
            >
              <div className="flex items-center mb-2">
                <Calendar
                  size={18}
                  className="text-gray-600 mr-2"
                  aria-hidden="true"
                />
                <h3
                  id="issue-date-heading"
                  className="font-semibold text-gray-900"
                >
                  Issue Date
                </h3>
              </div>
              <p
                className="text-gray-700"
                aria-label={`Issued on ${formatDate(certification.issueDate)}`}
              >
                {formatDate(certification.issueDate)}
              </p>
            </div>

            {/* Expiry date */}
            {certification.expiryDate && (
              <div
                className="bg-gray-50 rounded-lg p-4"
                role="group"
                aria-labelledby="expiry-date-heading"
              >
                <div className="flex items-center mb-2">
                  <Clock
                    size={18}
                    className="text-gray-600 mr-2"
                    aria-hidden="true"
                  />
                  <h3
                    id="expiry-date-heading"
                    className="font-semibold text-gray-900"
                  >
                    Expiry Date
                  </h3>
                </div>
                <p
                  className={`${isExpired ? "text-red-600" : "text-gray-700"}`}
                  aria-label={`${
                    isExpired ? "Expired on" : "Expires on"
                  } ${formatDate(certification.expiryDate)}`}
                >
                  {formatDate(certification.expiryDate)}
                </p>
              </div>
            )}

            {/* Credential ID */}
            <div
              className="bg-gray-50 rounded-lg p-4"
              role="group"
              aria-labelledby="credential-id-heading"
            >
              <div className="flex items-center mb-2">
                <Hash
                  size={18}
                  className="text-gray-600 mr-2"
                  aria-hidden="true"
                />
                <h3
                  id="credential-id-heading"
                  className="font-semibold text-gray-900"
                >
                  Credential ID
                </h3>
              </div>
              <p
                className="text-gray-700 font-mono text-sm break-all"
                aria-label={`Credential ID: ${certification.credentialId}`}
              >
                {certification.credentialId}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Description */}
            <div
              className="bg-gray-50 rounded-lg p-4"
              role="group"
              aria-labelledby="description-heading"
            >
              <h3
                id="description-heading"
                className="font-semibold text-gray-900 mb-3"
              >
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {certification.description}
              </p>
            </div>

            {/* Skills covered */}
            <div
              className="bg-gray-50 rounded-lg p-4"
              role="group"
              aria-labelledby="skills-heading"
            >
              <h3
                id="skills-heading"
                className="font-semibold text-gray-900 mb-3"
              >
                Skills Covered
              </h3>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`${certification.skills.length} skills covered by this certification`}
              >
                {certification.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    role="listitem"
                    aria-label={`Skill: ${skill}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Expired certification warning */}
        {isExpired && (
          <ExpiredCertificationFallback
            certificationTitle={certification.title}
            expiryDate={certification.expiryDate!}
            renewalUrl={certification.verificationUrl}
          />
        )}

        {/* Verification section */}
        {certification.verificationUrl && !isExpired && (
          <div
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100"
            role="region"
            aria-labelledby="verification-heading"
          >
            <div className="flex items-center mb-4">
              <Shield
                size={20}
                className="text-blue-600 mr-2"
                aria-hidden="true"
              />
              <h3
                id="verification-heading"
                className="font-semibold text-gray-900"
              >
                Verification
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              This certification can be verified through the issuer's official
              verification system.
            </p>
            {verificationError ? (
              <VerificationLinkFallback
                certificationTitle={certification.title}
                issuer={certification.issuer}
                originalUrl={certification.verificationUrl}
              />
            ) : (
              <motion.a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg min-h-[44px]"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  // Handle potential verification link errors
                  try {
                    // Link will open normally, but we can catch errors here if needed
                  } catch (error) {
                    e.preventDefault();
                    setVerificationError(true);
                  }
                }}
                aria-label={`Verify ${certification.title} certificate on ${certification.issuer} website (opens in new tab)`}
              >
                <ExternalLink size={18} className="mr-2" aria-hidden="true" />
                Verify Certificate
              </motion.a>
            )}
          </div>
        )}

        {/* Additional information */}
        <div
          className="bg-gray-50 rounded-lg p-4 sm:p-6"
          role="region"
          aria-labelledby="additional-info-heading"
        >
          <h3
            id="additional-info-heading"
            className="font-semibold text-gray-900 mb-4"
          >
            Additional Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Category:</span>
              <span className="ml-2 text-gray-800">
                {CERTIFICATION_CATEGORIES[certification.category]}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <span
                className={`ml-2 font-medium ${
                  isExpired ? "text-red-600" : "text-green-600"
                }`}
                aria-label={`Status: ${isExpired ? "Expired" : "Active"}`}
              >
                {isExpired ? "Expired" : "Active"}
              </span>
            </div>
            {certification.expiryDate && (
              <div>
                <span className="font-medium text-gray-600">Valid Until:</span>
                <span
                  className="ml-2 text-gray-800"
                  aria-label={`Valid until ${formatDate(
                    certification.expiryDate
                  )}`}
                >
                  {formatDate(certification.expiryDate)}
                </span>
              </div>
            )}
            <div>
              <span className="font-medium text-gray-600">Skills Count:</span>
              <span
                className="ml-2 text-gray-800"
                aria-label={`${certification.skills.length} skills covered`}
              >
                {certification.skills.length} skills
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
