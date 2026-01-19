"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  Tag,
  CheckCircle,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import Modal from "./Modal";
import ImageGallery from "./ImageGallery";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "in-progress":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "planned":
        return <BookOpen className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-5xl">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <div className="flex items-center space-x-2">
              {getStatusIcon(project.status)}
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {getStatusText(project.status)}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 mb-4">
            <Calendar size={16} className="mr-2" />
            <span>Completed: {formatDate(project.completedDate)}</span>
          </div>

          {project.featured && (
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Tag size={14} className="mr-1" />
              Featured Project
            </div>
          )}
        </div>

        {/* Project image gallery */}
        <div className="mb-8">
          <ImageGallery
            images={project.images}
            alt={project.title}
            showThumbnails={project.images.length > 1}
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About This Project
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle
                    className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Challenges Overcome
            </h2>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AlertCircle
                    className="text-yellow-500 mr-3 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Learnings
            </h2>
            <ul className="space-y-2">
              {project.learnings.map((learning, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BookOpen
                    className="text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{learning}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={18} className="mr-2" />
              View Live Demo
            </motion.a>
          )}

          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} className="mr-2" />
            View Source Code
          </motion.a>
        </div>
      </div>
    </Modal>
  );
}
