/**
 * Simple configuration validation utilities
 * Provides basic validation functions for coding platforms configuration
 */

import {
  validateUserConfig,
  validateAndFixConfiguration,
  getConfigurationGuide,
} from "./coding-platforms-config";

/**
 * Quick validation check
 */
export function isConfigurationValid(): boolean {
  const validation = validateUserConfig();
  return validation.isValid;
}

/**
 * Get validation results with details
 */
export function getValidationResults() {
  const validation = validateUserConfig();
  const fixResult = validateAndFixConfiguration();

  return {
    isValid: validation.isValid,
    errors: validation.errors,
    warnings: validation.warnings,
    fixes: fixResult.fixes,
    recommendations: [
      ...(validation.warnings.some((w) => w.includes("default value"))
        ? ["Update usernames and profile URLs with your actual information"]
        : []),
      ...(!validation.isValid
        ? ["Fix configuration errors before deploying"]
        : []),
    ],
  };
}

/**
 * Print validation summary to console
 */
export function printValidationSummary(): void {
  console.log("🔍 Coding Platforms Configuration Validation\n");

  const results = getValidationResults();

  console.log(
    `📋 Configuration Status: ${results.isValid ? "✅ Valid" : "❌ Invalid"}`
  );

  if (results.errors.length > 0) {
    console.log("\n❌ Errors:");
    results.errors.forEach((error) => console.log(`   - ${error}`));
  }

  if (results.warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    results.warnings.forEach((warning) => console.log(`   - ${warning}`));
  }

  if (results.fixes.length > 0) {
    console.log("\n🛠️  Applied Fixes:");
    results.fixes.forEach((fix) => console.log(`   - ${fix}`));
  }

  if (results.recommendations.length > 0) {
    console.log("\n💡 Recommendations:");
    results.recommendations.forEach((rec, index) =>
      console.log(`   ${index + 1}. ${rec}`)
    );
  }

  console.log(
    results.isValid
      ? "\n🎉 Configuration is ready!"
      : "\n⚠️  Please fix the issues above."
  );
}

/**
 * Get setup instructions
 */
export function getSetupInstructions(): void {
  const guide = getConfigurationGuide();

  console.log(`\n📖 ${guide.title}`);
  console.log(`${guide.description}\n`);

  guide.steps.forEach((step) => {
    console.log(`${step.step}. ${step.title}`);
    console.log(`   ${step.description}`);
    if (step.example) {
      console.log(`   Example:\n${step.example}\n`);
    }
  });
}

/**
 * Development helper - run validation in development mode
 */
export function devValidation(): void {
  if (process.env.NODE_ENV === "development") {
    console.log("🚀 Development Mode - Running Configuration Validation\n");
    printValidationSummary();
  }
}

// Export default object with all functions
export default {
  isConfigurationValid,
  getValidationResults,
  printValidationSummary,
  getSetupInstructions,
  devValidation,
};
