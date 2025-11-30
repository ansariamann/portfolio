"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import Modal from "./Modal";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ImageGallery({
  images,
  alt,
  className = "",
  showThumbnails = true,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">📷</div>
          <div>No images available</div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main image */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer">
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={currentIndex === 0}
          />

          {/* Overlay with zoom icon */}
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
            onClick={openModal}
          >
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ZoomIn className="text-white" size={32} />
            </motion.div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${alt} - Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  sizes="64px"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-500/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} className="max-w-7xl">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
          >
            <X size={24} />
          </button>

          {/* Main image in modal */}
          <div
            className="relative h-[70vh] rounded-lg overflow-hidden cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Full size ${currentIndex + 1}`}
              fill
              className={`object-contain transition-transform duration-300 ${
                isZoomed ? "scale-150 cursor-zoom-out" : ""
              }`}
              sizes="100vw"
              priority
            />
          </div>

          {/* Modal navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Modal thumbnails */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-blue-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${alt} - Modal thumbnail ${index + 1}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image info */}
          <div className="text-center mt-4 text-gray-600">
            <p className="text-sm">
              Image {currentIndex + 1} of {images.length}
            </p>
            <p className="text-xs mt-1 opacity-75">
              Click image to zoom • Use arrow keys to navigate
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
