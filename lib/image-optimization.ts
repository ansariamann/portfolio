/**
 * Image Optimization Utilities
 * Provides comprehensive image optimization, WebP conversion, and performance utilities
 */

/**
 * Image format detection and optimization
 */
export interface ImageOptimizationOptions {
  quality?: number;
  format?: "webp" | "avif" | "jpeg" | "png" | "svg";
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  background?: string;
  progressive?: boolean;
  lossless?: boolean;
}

/**
 * Generate optimized image URL with Next.js Image Optimization API
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  // If it's an external URL or data URL, return as-is
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src;
  }

  // If it's an SVG, return as-is since SVGs are already optimized
  if (src.endsWith(".svg")) {
    return src;
  }

  const { quality = 90, format, width, height, fit = "cover" } = options;

  // Build query parameters for Next.js Image Optimization
  const params = new URLSearchParams();

  if (quality !== 90) params.set("q", quality.toString());
  if (format) params.set("f", format);
  if (width) params.set("w", width.toString());
  if (height) params.set("h", height.toString());
  if (fit !== "cover") params.set("fit", fit);

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Generate responsive image sizes for different screen sizes
 */
export function generateResponsiveSizes(
  baseWidth: number,
  breakpoints: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  }
): string {
  const sizes = Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b)
    .map(([name, width], index, array) => {
      const isLast = index === array.length - 1;
      const imageWidth = Math.round(baseWidth * (width / 1024)); // Scale based on 1024px base

      if (isLast) {
        return `${imageWidth}px`;
      }

      return `(max-width: ${width}px) ${imageWidth}px`;
    });

  return sizes.join(", ");
}

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = "#f3f4f6"
): string {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate gradient blur data URL
 */
export function generateGradientBlurDataURL(
  width: number = 10,
  height: number = 10,
  fromColor: string = "#f3f4f6",
  toColor: string = "#e5e7eb"
): string {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${fromColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${toColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#gradient)"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Check if WebP is supported in the browser
 */
export function isWebPSupported(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

/**
 * Check if AVIF is supported in the browser
 */
export function isAVIFSupported(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  });
}

/**
 * Get the best supported image format
 */
export async function getBestImageFormat(): Promise<"avif" | "webp" | "jpeg"> {
  const [avifSupported, webpSupported] = await Promise.all([
    isAVIFSupported(),
    isWebPSupported(),
  ]);

  if (avifSupported) return "avif";
  if (webpSupported) return "webp";
  return "jpeg";
}

/**
 * Image preloading utility
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(sources: string[]): Promise<void> {
  await Promise.all(sources.map(preloadImage));
}

/**
 * Image lazy loading intersection observer
 */
export function createImageLazyLoader(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

/**
 * Calculate image dimensions while maintaining aspect ratio
 */
export function calculateAspectRatioDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  if (targetWidth && targetHeight) {
    // Both dimensions specified - use them directly
    return { width: targetWidth, height: targetHeight };
  } else if (targetWidth) {
    // Only width specified - calculate height
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    };
  } else if (targetHeight) {
    // Only height specified - calculate width
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
    };
  } else {
    // No dimensions specified - use original
    return { width: originalWidth, height: originalHeight };
  }
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(
  baseSrc: string,
  widths: number[],
  options: ImageOptimizationOptions = {}
): string {
  return widths
    .map((width) => {
      const optimizedSrc = getOptimizedImageUrl(baseSrc, { ...options, width });
      return `${optimizedSrc} ${width}w`;
    })
    .join(", ");
}

/**
 * Platform-specific image optimization presets
 */
export const imagePresets = {
  platformLogo: {
    quality: 95,
    format: "svg" as const,
    sizes: generateResponsiveSizes(32),
    widths: [16, 24, 32, 48, 64],
  },
  achievementBadge: {
    quality: 90,
    format: "svg" as const,
    sizes: generateResponsiveSizes(48),
    widths: [24, 32, 48, 64, 80],
  },
  profileImage: {
    quality: 85,
    format: "webp" as const,
    sizes: generateResponsiveSizes(200),
    widths: [100, 150, 200, 300, 400],
  },
  projectImage: {
    quality: 80,
    format: "webp" as const,
    sizes: generateResponsiveSizes(400),
    widths: [200, 300, 400, 600, 800],
  },
  heroImage: {
    quality: 85,
    format: "webp" as const,
    sizes: generateResponsiveSizes(800),
    widths: [400, 600, 800, 1200, 1600],
  },
} as const;

/**
 * Get preset configuration for image type
 */
export function getImagePreset(type: keyof typeof imagePresets) {
  return imagePresets[type];
}

/**
 * Performance monitoring for images
 */
export interface ImagePerformanceMetrics {
  loadTime: number;
  size: number;
  format: string;
  cached: boolean;
}

export function measureImagePerformance(
  src: string,
  onComplete: (metrics: ImagePerformanceMetrics) => void
): void {
  const startTime = performance.now();
  const img = new Image();

  img.onload = () => {
    const loadTime = performance.now() - startTime;

    // Try to get image size (this is approximate)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    if (ctx) {
      ctx.drawImage(img, 0, 0);

      // Estimate size based on canvas data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const estimatedSize = imageData.data.length;

      onComplete({
        loadTime,
        size: estimatedSize,
        format: src.split(".").pop() || "unknown",
        cached: loadTime < 50, // Assume cached if very fast
      });
    }
  };

  img.src = src;
}

/**
 * Image optimization recommendations
 */
export function getImageOptimizationRecommendations(
  width: number,
  height: number,
  fileSize?: number
): string[] {
  const recommendations: string[] = [];
  const pixels = width * height;

  // Size recommendations
  if (pixels > 2000000) {
    // > 2MP
    recommendations.push(
      "Consider reducing image dimensions for better performance"
    );
  }

  if (fileSize && fileSize > 500000) {
    // > 500KB
    recommendations.push(
      "Image file size is large, consider compression or format optimization"
    );
  }

  // Format recommendations
  if (width > 400 || height > 400) {
    recommendations.push(
      "Consider using WebP or AVIF format for better compression"
    );
  }

  // Responsive recommendations
  if (width > 800) {
    recommendations.push("Implement responsive images with multiple sizes");
  }

  return recommendations;
}

/**
 * Batch image optimization utility
 */
export async function optimizeImageBatch(
  images: Array<{ src: string; options?: ImageOptimizationOptions }>,
  onProgress?: (completed: number, total: number) => void
): Promise<Array<{ src: string; optimizedSrc: string; error?: string }>> {
  const results: Array<{ src: string; optimizedSrc: string; error?: string }> =
    [];

  for (let i = 0; i < images.length; i++) {
    const { src, options = {} } = images[i];

    try {
      const optimizedSrc = getOptimizedImageUrl(src, options);

      // Verify the optimized image loads
      await preloadImage(optimizedSrc);

      results.push({ src, optimizedSrc });
    } catch (error) {
      results.push({
        src,
        optimizedSrc: src, // Fallback to original
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    onProgress?.(i + 1, images.length);
  }

  return results;
}
