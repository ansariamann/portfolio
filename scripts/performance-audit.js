#!/usr/bin/env node

/**
 * Performance audit script for the coding platforms integration
 * Analyzes bundle size, Core Web Vitals, and performance metrics
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class PerformanceAuditor {
  constructor() {
    this.results = {
      bundleSize: {},
      webVitals: {},
      recommendations: [],
      timestamp: new Date().toISOString(),
    };
  }

  // Analyze bundle size
  analyzeBundleSize() {
    console.log("📦 Analyzing bundle size...");

    try {
      // Run Next.js build with bundle analyzer
      execSync("ANALYZE=true npm run build", { stdio: "inherit" });

      // Check if .next/analyze exists
      const analyzeDir = path.join(process.cwd(), ".next", "analyze");
      if (fs.existsSync(analyzeDir)) {
        const files = fs.readdirSync(analyzeDir);
        const bundleReport = files.find((f) => f.includes("client"));

        if (bundleReport) {
          console.log(
            `✅ Bundle analysis complete: .next/analyze/${bundleReport}`
          );
          this.results.bundleSize.reportPath = `.next/analyze/${bundleReport}`;
        }
      }

      // Analyze specific chunks
      const buildManifest = path.join(
        process.cwd(),
        ".next",
        "build-manifest.json"
      );
      if (fs.existsSync(buildManifest)) {
        const manifest = JSON.parse(fs.readFileSync(buildManifest, "utf8"));
        this.results.bundleSize.pages = manifest.pages;

        // Check for large chunks
        Object.entries(manifest.pages).forEach(([page, files]) => {
          const totalSize = files.reduce((acc, file) => {
            const filePath = path.join(process.cwd(), ".next", "static", file);
            if (fs.existsSync(filePath)) {
              return acc + fs.statSync(filePath).size;
            }
            return acc;
          }, 0);

          if (totalSize > 500000) {
            // 500KB threshold
            this.results.recommendations.push({
              type: "bundle-size",
              severity: "warning",
              message: `Page ${page} has large bundle size: ${(
                totalSize / 1024
              ).toFixed(2)}KB`,
              suggestion:
                "Consider code splitting or lazy loading for this page",
            });
          }
        });
      }
    } catch (error) {
      console.error("❌ Bundle analysis failed:", error.message);
      this.results.recommendations.push({
        type: "bundle-analysis",
        severity: "error",
        message: "Bundle analysis failed",
        suggestion: "Check build configuration and dependencies",
      });
    }
  }

  // Check for performance anti-patterns
  checkCodePatterns() {
    console.log("🔍 Checking for performance anti-patterns...");

    const patterns = [
      {
        pattern: /import.*from ['"]framer-motion['"]/g,
        file: "components/**/*.tsx",
        message: "Framer Motion imports detected",
        suggestion: "Consider lazy loading Framer Motion components",
      },
      {
        pattern: /useEffect\(\(\) => \{[\s\S]*?\}, \[\]\)/g,
        file: "components/**/*.tsx",
        message: "Empty dependency useEffect detected",
        suggestion: "Ensure useEffect cleanup and proper dependencies",
      },
      {
        pattern: /console\.(log|warn|error)/g,
        file: "**/*.{ts,tsx,js,jsx}",
        message: "Console statements in production code",
        suggestion: "Remove console statements or use proper logging",
      },
    ];

    patterns.forEach(({ pattern, file, message, suggestion }) => {
      try {
        const result = execSync(`grep -r "${pattern.source}" ${file} || true`, {
          encoding: "utf8",
          cwd: process.cwd(),
        });

        if (result.trim()) {
          this.results.recommendations.push({
            type: "code-pattern",
            severity: "info",
            message,
            suggestion,
            files: result.trim().split("\n").slice(0, 5), // Limit to 5 files
          });
        }
      } catch (error) {
        // Ignore grep errors
      }
    });
  }

  // Analyze image optimization
  analyzeImages() {
    console.log("🖼️  Analyzing image optimization...");

    const imageDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(imageDir)) {
      return;
    }

    const analyzeDirectory = (dir) => {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          analyzeDirectory(filePath);
        } else if (/\.(png|jpg|jpeg|gif)$/i.test(file)) {
          const sizeKB = stat.size / 1024;

          if (sizeKB > 100) {
            // 100KB threshold
            this.results.recommendations.push({
              type: "image-optimization",
              severity: "warning",
              message: `Large image file: ${file} (${sizeKB.toFixed(2)}KB)`,
              suggestion:
                "Consider optimizing image or converting to WebP format",
              file: filePath.replace(process.cwd(), ""),
            });
          }
        }
      });
    };

    analyzeDirectory(imageDir);
  }

  // Check dependency sizes
  analyzeDependencies() {
    console.log("📚 Analyzing dependency sizes...");

    const packageJson = path.join(process.cwd(), "package.json");
    if (!fs.existsSync(packageJson)) {
      return;
    }

    const pkg = JSON.parse(fs.readFileSync(packageJson, "utf8"));
    const heavyDependencies = ["lodash", "moment", "axios", "react-router-dom"];

    const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

    heavyDependencies.forEach((dep) => {
      if (dependencies[dep]) {
        this.results.recommendations.push({
          type: "dependency",
          severity: "info",
          message: `Heavy dependency detected: ${dep}`,
          suggestion: `Consider lighter alternatives or tree-shaking for ${dep}`,
        });
      }
    });

    // Check for duplicate dependencies
    const depNames = Object.keys(dependencies);
    const duplicates = depNames.filter((name) =>
      depNames.some((other) => other !== name && other.includes(name))
    );

    if (duplicates.length > 0) {
      this.results.recommendations.push({
        type: "dependency",
        severity: "warning",
        message: "Potential duplicate dependencies detected",
        suggestion: "Review and consolidate similar dependencies",
        dependencies: duplicates,
      });
    }
  }

  // Generate performance budget
  generateBudget() {
    console.log("💰 Generating performance budget...");

    const budget = {
      "First Contentful Paint": "1.8s",
      "Largest Contentful Paint": "2.5s",
      "First Input Delay": "100ms",
      "Cumulative Layout Shift": "0.1",
      "Time to First Byte": "800ms",
      "JavaScript Bundle Size": "500KB",
      "CSS Bundle Size": "100KB",
      "Image Total Size": "1MB",
    };

    this.results.performanceBudget = budget;

    console.log("📊 Performance Budget:");
    Object.entries(budget).forEach(([metric, target]) => {
      console.log(`  ${metric}: ${target}`);
    });
  }

  // Run Lighthouse audit (if available)
  runLighthouseAudit() {
    console.log("🔍 Running Lighthouse audit...");

    try {
      // Check if lighthouse is available
      execSync("which lighthouse", { stdio: "ignore" });

      // Run lighthouse on localhost:3000 (assuming dev server is running)
      const lighthouseCmd = `lighthouse http://localhost:3000 --only-categories=performance --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"`;

      execSync(lighthouseCmd, { stdio: "inherit" });

      const reportPath = path.join(process.cwd(), "lighthouse-report.json");
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
        this.results.lighthouse = {
          score: report.categories.performance.score * 100,
          metrics: report.audits,
        };

        console.log(
          `✅ Lighthouse Performance Score: ${this.results.lighthouse.score}/100`
        );
      }
    } catch (error) {
      console.log("⚠️  Lighthouse not available or server not running");
      this.results.recommendations.push({
        type: "lighthouse",
        severity: "info",
        message: "Lighthouse audit skipped",
        suggestion:
          "Install Lighthouse CLI and ensure dev server is running for detailed performance metrics",
      });
    }
  }

  // Generate report
  generateReport() {
    console.log("\n📋 Generating performance report...");

    const reportPath = path.join(
      process.cwd(),
      "performance-audit-report.json"
    );
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    console.log(`✅ Report saved to: ${reportPath}`);

    // Print summary
    console.log("\n📊 Performance Audit Summary:");
    console.log(
      `Total recommendations: ${this.results.recommendations.length}`
    );

    const severityCounts = this.results.recommendations.reduce((acc, rec) => {
      acc[rec.severity] = (acc[rec.severity] || 0) + 1;
      return acc;
    }, {});

    Object.entries(severityCounts).forEach(([severity, count]) => {
      const emoji =
        severity === "error" ? "❌" : severity === "warning" ? "⚠️" : "ℹ️";
      console.log(`  ${emoji} ${severity}: ${count}`);
    });

    // Show top recommendations
    if (this.results.recommendations.length > 0) {
      console.log("\n🔧 Top Recommendations:");
      this.results.recommendations.slice(0, 5).forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec.message}`);
        console.log(`     💡 ${rec.suggestion}`);
      });
    }
  }

  // Run full audit
  async run() {
    console.log("🚀 Starting Performance Audit...\n");

    this.analyzeBundleSize();
    this.checkCodePatterns();
    this.analyzeImages();
    this.analyzeDependencies();
    this.generateBudget();
    this.runLighthouseAudit();
    this.generateReport();

    console.log("\n✅ Performance audit complete!");

    // Exit with error code if there are critical issues
    const errors = this.results.recommendations.filter(
      (r) => r.severity === "error"
    );
    if (errors.length > 0) {
      console.log(`\n❌ ${errors.length} critical performance issues found`);
      process.exit(1);
    }
  }
}

// Run audit if called directly
if (require.main === module) {
  const auditor = new PerformanceAuditor();
  auditor.run().catch(console.error);
}

module.exports = PerformanceAuditor;
