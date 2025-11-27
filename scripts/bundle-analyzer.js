#!/usr/bin/env node

/**
 * Bundle analyzer script for performance optimization
 * Analyzes webpack bundles and provides optimization recommendations
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class BundleAnalyzer {
  constructor() {
    this.results = {
      bundles: {},
      chunks: {},
      recommendations: [],
      totalSize: 0,
      gzippedSize: 0,
      timestamp: new Date().toISOString(),
    };
  }

  // Analyze Next.js build output
  analyzeBuild() {
    console.log("📦 Analyzing Next.js build output...");

    const buildDir = path.join(process.cwd(), ".next");
    if (!fs.existsSync(buildDir)) {
      console.log('❌ No build directory found. Run "npm run build" first.');
      return;
    }

    // Analyze static chunks
    const staticDir = path.join(buildDir, "static");
    if (fs.existsSync(staticDir)) {
      this.analyzeStaticAssets(staticDir);
    }

    // Analyze build manifest
    const manifestPath = path.join(buildDir, "build-manifest.json");
    if (fs.existsSync(manifestPath)) {
      this.analyzeBuildManifest(manifestPath);
    }

    // Analyze server chunks
    const serverDir = path.join(buildDir, "server");
    if (fs.existsSync(serverDir)) {
      this.analyzeServerChunks(serverDir);
    }
  }

  analyzeStaticAssets(staticDir) {
    console.log("🔍 Analyzing static assets...");

    const analyzeDirectory = (dir, category = "unknown") => {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          analyzeDirectory(filePath, file);
        } else {
          const sizeKB = stat.size / 1024;
          this.results.totalSize += stat.size;

          if (!this.results.bundles[category]) {
            this.results.bundles[category] = {
              files: [],
              totalSize: 0,
              count: 0,
            };
          }

          this.results.bundles[category].files.push({
            name: file,
            size: sizeKB,
            path: filePath.replace(process.cwd(), ""),
          });

          this.results.bundles[category].totalSize += sizeKB;
          this.results.bundles[category].count++;

          // Flag large files
          if (sizeKB > 500) {
            // 500KB threshold
            this.results.recommendations.push({
              type: "large-bundle",
              severity: "warning",
              message: `Large bundle detected: ${file} (${sizeKB.toFixed(
                2
              )}KB)`,
              suggestion: "Consider code splitting or lazy loading",
              file: filePath.replace(process.cwd(), ""),
              size: sizeKB,
            });
          }
        }
      });
    };

    analyzeDirectory(staticDir);
  }

  analyzeBuildManifest(manifestPath) {
    console.log("📋 Analyzing build manifest...");

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

    // Analyze page bundles
    Object.entries(manifest.pages).forEach(([page, files]) => {
      const pageSize = files.reduce((acc, file) => {
        const filePath = path.join(process.cwd(), ".next", "static", file);
        if (fs.existsSync(filePath)) {
          return acc + fs.statSync(filePath).size / 1024;
        }
        return acc;
      }, 0);

      this.results.chunks[page] = {
        files,
        size: pageSize,
        fileCount: files.length,
      };

      // Check for oversized pages
      if (pageSize > 1000) {
        // 1MB threshold
        this.results.recommendations.push({
          type: "large-page",
          severity: "error",
          message: `Page ${page} exceeds size limit: ${pageSize.toFixed(2)}KB`,
          suggestion: "Implement code splitting and lazy loading for this page",
          page,
          size: pageSize,
        });
      }
    });
  }

  analyzeServerChunks(serverDir) {
    console.log("🖥️  Analyzing server chunks...");

    const pagesDir = path.join(serverDir, "pages");
    if (fs.existsSync(pagesDir)) {
      const analyzeServerPages = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            analyzeServerPages(filePath);
          } else if (file.endsWith(".js")) {
            const sizeKB = stat.size / 1024;

            if (sizeKB > 200) {
              // 200KB threshold for server chunks
              this.results.recommendations.push({
                type: "large-server-chunk",
                severity: "warning",
                message: `Large server chunk: ${file} (${sizeKB.toFixed(2)}KB)`,
                suggestion:
                  "Consider optimizing server-side code or splitting functionality",
                file: filePath.replace(process.cwd(), ""),
                size: sizeKB,
              });
            }
          }
        });
      };

      analyzeServerPages(pagesDir);
    }
  }

  // Analyze dependencies impact
  analyzeDependencies() {
    console.log("📚 Analyzing dependency impact...");

    const packageJson = path.join(process.cwd(), "package.json");
    if (!fs.existsSync(packageJson)) {
      return;
    }

    const pkg = JSON.parse(fs.readFileSync(packageJson, "utf8"));
    const dependencies = pkg.dependencies || {};

    // Known heavy dependencies and their alternatives
    const heavyDeps = {
      lodash: {
        size: "~70KB",
        alternative: "lodash-es (tree-shakeable) or native ES6 methods",
        impact: "high",
      },
      moment: {
        size: "~67KB",
        alternative: "date-fns or dayjs (~2KB)",
        impact: "high",
      },
      axios: {
        size: "~15KB",
        alternative: "native fetch API",
        impact: "medium",
      },
      "react-router-dom": {
        size: "~20KB",
        alternative: "Next.js built-in routing",
        impact: "medium",
      },
      "chart.js": {
        size: "~60KB",
        alternative: "lightweight charting libraries or custom SVG",
        impact: "high",
      },
    };

    Object.keys(dependencies).forEach((dep) => {
      if (heavyDeps[dep]) {
        const info = heavyDeps[dep];
        this.results.recommendations.push({
          type: "heavy-dependency",
          severity: info.impact === "high" ? "warning" : "info",
          message: `Heavy dependency: ${dep} (${info.size})`,
          suggestion: `Consider ${info.alternative}`,
          dependency: dep,
          impact: info.impact,
        });
      }
    });

    // Check for unused dependencies
    try {
      const result = execSync("npx depcheck --json", { encoding: "utf8" });
      const depcheck = JSON.parse(result);

      if (depcheck.dependencies && depcheck.dependencies.length > 0) {
        this.results.recommendations.push({
          type: "unused-dependencies",
          severity: "info",
          message: `${depcheck.dependencies.length} unused dependencies found`,
          suggestion: "Remove unused dependencies to reduce bundle size",
          dependencies: depcheck.dependencies,
        });
      }
    } catch (error) {
      console.log(
        "⚠️  Could not check for unused dependencies (depcheck not available)"
      );
    }
  }

  // Check for duplicate code
  checkDuplicates() {
    console.log("🔍 Checking for duplicate code...");

    try {
      // Use webpack-bundle-analyzer output if available
      const analyzeDir = path.join(process.cwd(), ".next", "analyze");
      if (fs.existsSync(analyzeDir)) {
        console.log("✅ Bundle analyzer reports available in .next/analyze/");

        // Look for common duplicate patterns
        const duplicatePatterns = [
          "react",
          "react-dom",
          "framer-motion",
          "chart.js",
        ];

        duplicatePatterns.forEach((pattern) => {
          this.results.recommendations.push({
            type: "potential-duplicate",
            severity: "info",
            message: `Check for duplicate ${pattern} instances in bundle analyzer`,
            suggestion: `Ensure ${pattern} is not bundled multiple times`,
            pattern,
          });
        });
      }
    } catch (error) {
      console.log("⚠️  Could not analyze duplicates");
    }
  }

  // Generate optimization recommendations
  generateOptimizations() {
    console.log("💡 Generating optimization recommendations...");

    const totalSizeMB = this.results.totalSize / (1024 * 1024);

    // Overall size recommendations
    if (totalSizeMB > 5) {
      this.results.recommendations.push({
        type: "overall-size",
        severity: "error",
        message: `Total bundle size is large: ${totalSizeMB.toFixed(2)}MB`,
        suggestion: "Implement aggressive code splitting and lazy loading",
      });
    } else if (totalSizeMB > 2) {
      this.results.recommendations.push({
        type: "overall-size",
        severity: "warning",
        message: `Total bundle size: ${totalSizeMB.toFixed(2)}MB`,
        suggestion: "Consider additional optimizations for better performance",
      });
    }

    // Specific optimizations for coding platforms
    this.results.recommendations.push({
      type: "coding-platforms-optimization",
      severity: "info",
      message: "Coding platforms section optimizations",
      suggestions: [
        "Lazy load StatisticsVisualization component",
        "Implement virtual scrolling for large achievement lists",
        "Use intersection observer for heatmap rendering",
        "Optimize chart.js bundle with tree shaking",
        "Implement progressive image loading",
      ],
    });
  }

  // Generate report
  generateReport() {
    console.log("\n📊 Generating bundle analysis report...");

    const reportPath = path.join(process.cwd(), "bundle-analysis-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    console.log(`✅ Report saved to: ${reportPath}`);

    // Print summary
    console.log("\n📋 Bundle Analysis Summary:");
    console.log(
      `Total size: ${(this.results.totalSize / (1024 * 1024)).toFixed(2)}MB`
    );
    console.log(
      `Total recommendations: ${this.results.recommendations.length}`
    );

    // Bundle breakdown
    console.log("\n📦 Bundle Breakdown:");
    Object.entries(this.results.bundles).forEach(([category, info]) => {
      console.log(
        `  ${category}: ${info.count} files, ${info.totalSize.toFixed(2)}KB`
      );
    });

    // Top recommendations
    if (this.results.recommendations.length > 0) {
      console.log("\n🔧 Top Recommendations:");
      this.results.recommendations
        .sort((a, b) => {
          const severityOrder = { error: 3, warning: 2, info: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        })
        .slice(0, 5)
        .forEach((rec, i) => {
          const emoji =
            rec.severity === "error"
              ? "❌"
              : rec.severity === "warning"
              ? "⚠️"
              : "ℹ️";
          console.log(`  ${i + 1}. ${emoji} ${rec.message}`);
          if (rec.suggestion) {
            console.log(`     💡 ${rec.suggestion}`);
          }
        });
    }
  }

  // Run full analysis
  async run() {
    console.log("🚀 Starting Bundle Analysis...\n");

    this.analyzeBuild();
    this.analyzeDependencies();
    this.checkDuplicates();
    this.generateOptimizations();
    this.generateReport();

    console.log("\n✅ Bundle analysis complete!");

    // Exit with error code if there are critical issues
    const errors = this.results.recommendations.filter(
      (r) => r.severity === "error"
    );
    if (errors.length > 0) {
      console.log(`\n❌ ${errors.length} critical bundle issues found`);
      process.exit(1);
    }
  }
}

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new BundleAnalyzer();
  analyzer.run().catch(console.error);
}

module.exports = BundleAnalyzer;
