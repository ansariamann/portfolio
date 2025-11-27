#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP format and generates optimized versions
 */

const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const INPUT_DIR = path.join(process.cwd(), "public", "images");
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"];

async function optimizeImage(inputPath, outputPath, options = {}) {
  const { quality = 85, width, height, format = "webp" } = options;

  try {
    let pipeline = sharp(inputPath);

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: "cover",
        position: "center",
      });
    }

    // Convert to specified format
    if (format === "webp") {
      pipeline = pipeline.webp({ quality });
    } else if (format === "avif") {
      pipeline = pipeline.avif({ quality });
    } else if (format === "jpeg") {
      pipeline = pipeline.jpeg({ quality, progressive: true });
    }

    await pipeline.toFile(outputPath);

    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);
    const savings = (
      ((inputStats.size - outputStats.size) / inputStats.size) *
      100
    ).toFixed(1);

    console.log(
      `✓ ${path.basename(inputPath)} → ${path.basename(
        outputPath
      )} (${savings}% smaller)`
    );

    return {
      input: inputPath,
      output: outputPath,
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
    return null;
  }
}

async function findImages(dir) {
  const images = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (
        SUPPORTED_FORMATS.includes(path.extname(entry.name).toLowerCase())
      ) {
        images.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}:`, error.message);
  }

  return images;
}

async function generateResponsiveVersions(
  imagePath,
  sizes = [320, 640, 1024, 1920]
) {
  const results = [];
  const ext = path.extname(imagePath);
  const baseName = path.basename(imagePath, ext);
  const dir = path.dirname(imagePath);

  for (const size of sizes) {
    const outputPath = path.join(dir, `${baseName}-${size}w.webp`);
    const result = await optimizeImage(imagePath, outputPath, {
      width: size,
      quality: 85,
      format: "webp",
    });

    if (result) {
      results.push(result);
    }
  }

  return results;
}

async function optimizeHeroImages() {
  console.log("🖼️  Optimizing hero section images...\n");

  const heroImages = ["profile-photo.jpg", "about-photo.jpg"];

  const results = [];

  for (const imageName of heroImages) {
    const imagePath = path.join(INPUT_DIR, imageName);

    try {
      await fs.access(imagePath);

      // Generate WebP version
      const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      const webpResult = await optimizeImage(imagePath, webpPath, {
        quality: 85,
        format: "webp",
      });

      if (webpResult) {
        results.push(webpResult);
      }

      // Generate responsive versions
      const responsiveResults = await generateResponsiveVersions(imagePath);
      results.push(...responsiveResults);
    } catch (error) {
      console.warn(`⚠️  Image not found: ${imageName}`);
    }
  }

  return results;
}

async function optimizeAllImages() {
  console.log("🔍 Finding images to optimize...\n");

  const images = await findImages(INPUT_DIR);
  console.log(`Found ${images.length} images to process\n`);

  const results = [];

  for (const imagePath of images) {
    // Skip if WebP version already exists
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    try {
      await fs.access(webpPath);
      console.log(`⏭️  Skipping ${path.basename(imagePath)} (WebP exists)`);
      continue;
    } catch {
      // WebP doesn't exist, proceed with optimization
    }

    const result = await optimizeImage(imagePath, webpPath, {
      quality: 85,
      format: "webp",
    });

    if (result) {
      results.push(result);
    }
  }

  return results;
}

async function generateImageManifest(results) {
  const manifest = {
    generated: new Date().toISOString(),
    images: results.map((result) => ({
      original: path.relative(process.cwd(), result.input),
      optimized: path.relative(process.cwd(), result.output),
      originalSize: result.originalSize,
      optimizedSize: result.optimizedSize,
      savings: result.savings,
    })),
    totalSavings: results.reduce(
      (acc, result) => acc + (result.originalSize - result.optimizedSize),
      0
    ),
    averageSavings:
      results.length > 0
        ? (
            results.reduce((acc, result) => acc + result.savings, 0) /
            results.length
          ).toFixed(1)
        : 0,
  };

  const manifestPath = path.join(
    process.cwd(),
    "public",
    "images",
    "optimization-manifest.json"
  );
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n📊 Optimization Summary:`);
  console.log(`   Images processed: ${results.length}`);
  console.log(
    `   Total size saved: ${(manifest.totalSavings / 1024 / 1024).toFixed(
      2
    )} MB`
  );
  console.log(`   Average savings: ${manifest.averageSavings}%`);
  console.log(`   Manifest saved: ${manifestPath}`);
}

async function main() {
  try {
    // Check if sharp is available
    try {
      require("sharp");
    } catch (error) {
      console.error("❌ Sharp is required for image optimization.");
      console.error("Install it with: npm install sharp");
      process.exit(1);
    }

    const mode = process.argv[2] || "hero";
    let results = [];

    if (mode === "hero") {
      results = await optimizeHeroImages();
    } else if (mode === "all") {
      results = await optimizeAllImages();
    } else {
      console.error("Usage: node scripts/optimize-images.js [hero|all]");
      process.exit(1);
    }

    if (results.length > 0) {
      await generateImageManifest(results);
    } else {
      console.log("✨ No images needed optimization!");
    }
  } catch (error) {
    console.error("❌ Optimization failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { optimizeImage, optimizeHeroImages, optimizeAllImages };
