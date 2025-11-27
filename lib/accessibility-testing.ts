/**
 * Accessibility Testing Utilities
 * Helper functions to test and validate accessibility features
 */

export interface AccessibilityTestResult {
  passed: boolean;
  message: string;
  element?: Element;
}

/**
 * Test color contrast ratio
 */
export function testColorContrast(
  foregroundColor: string,
  backgroundColor: string,
  level: "AA" | "AAA" = "AA"
): AccessibilityTestResult {
  // Convert colors to RGB values
  const getRGB = (color: string): [number, number, number] => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];
    return [r, g, b];
  };

  // Calculate relative luminance
  const getLuminance = ([r, g, b]: [number, number, number]): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  try {
    const fgRGB = getRGB(foregroundColor);
    const bgRGB = getRGB(backgroundColor);

    const fgLuminance = getLuminance(fgRGB);
    const bgLuminance = getLuminance(bgRGB);

    const contrast =
      (Math.max(fgLuminance, bgLuminance) + 0.05) /
      (Math.min(fgLuminance, bgLuminance) + 0.05);

    const requiredRatio = level === "AAA" ? 7 : 4.5;
    const passed = contrast >= requiredRatio;

    return {
      passed,
      message: `Contrast ratio: ${contrast.toFixed(
        2
      )}:1 (${level} requires ${requiredRatio}:1)`,
    };
  } catch (error) {
    return {
      passed: false,
      message: `Error calculating contrast: ${error}`,
    };
  }
}

/**
 * Test keyboard navigation
 */
export function testKeyboardNavigation(
  container: Element
): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Find all focusable elements
  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];

  const focusableElements = container.querySelectorAll(
    focusableSelectors.join(", ")
  );

  focusableElements.forEach((element, index) => {
    const tagName = element.tagName.toLowerCase();
    const hasTabIndex = element.hasAttribute("tabindex");
    const tabIndex = element.getAttribute("tabindex");

    // Check if element is properly focusable
    if (tabIndex === "-1") {
      results.push({
        passed: false,
        message: `Element ${tagName} at index ${index} has tabindex="-1" making it unfocusable`,
        element,
      });
    } else {
      results.push({
        passed: true,
        message: `Element ${tagName} at index ${index} is properly focusable`,
        element,
      });
    }

    // Check for ARIA labels
    const hasAriaLabel = element.hasAttribute("aria-label");
    const hasAriaLabelledBy = element.hasAttribute("aria-labelledby");
    const hasAriaDescribedBy = element.hasAttribute("aria-describedby");
    const hasTextContent = element.textContent?.trim();

    if (!hasAriaLabel && !hasAriaLabelledBy && !hasTextContent) {
      results.push({
        passed: false,
        message: `Element ${tagName} at index ${index} lacks accessible name`,
        element,
      });
    }
  });

  return results;
}

/**
 * Test ARIA attributes
 */
export function testAriaAttributes(
  container: Element
): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Find elements with ARIA attributes
  const elementsWithAria = container.querySelectorAll(
    "[aria-label], [aria-labelledby], [aria-describedby], [role]"
  );

  elementsWithAria.forEach((element, index) => {
    const ariaLabel = element.getAttribute("aria-label");
    const ariaLabelledBy = element.getAttribute("aria-labelledby");
    const ariaDescribedBy = element.getAttribute("aria-describedby");
    const role = element.getAttribute("role");

    // Check aria-label
    if (ariaLabel) {
      if (ariaLabel.trim().length === 0) {
        results.push({
          passed: false,
          message: `Element at index ${index} has empty aria-label`,
          element,
        });
      } else {
        results.push({
          passed: true,
          message: `Element at index ${index} has valid aria-label: "${ariaLabel}"`,
          element,
        });
      }
    }

    // Check aria-labelledby references
    if (ariaLabelledBy) {
      const referencedElement = document.getElementById(ariaLabelledBy);
      if (!referencedElement) {
        results.push({
          passed: false,
          message: `Element at index ${index} references non-existent ID in aria-labelledby: "${ariaLabelledBy}"`,
          element,
        });
      } else {
        results.push({
          passed: true,
          message: `Element at index ${index} has valid aria-labelledby reference`,
          element,
        });
      }
    }

    // Check role validity
    if (role) {
      const validRoles = [
        "button",
        "link",
        "heading",
        "banner",
        "main",
        "navigation",
        "complementary",
        "contentinfo",
        "region",
        "article",
        "section",
        "list",
        "listitem",
        "img",
        "presentation",
        "none",
        "dialog",
        "alertdialog",
        "alert",
        "status",
        "log",
        "marquee",
        "timer",
        "tablist",
        "tab",
        "tabpanel",
        "menu",
        "menubar",
        "menuitem",
        "group",
        "radiogroup",
        "radio",
        "checkbox",
        "textbox",
        "searchbox",
        "spinbutton",
        "slider",
        "progressbar",
        "tooltip",
      ];

      if (!validRoles.includes(role)) {
        results.push({
          passed: false,
          message: `Element at index ${index} has invalid role: "${role}"`,
          element,
        });
      } else {
        results.push({
          passed: true,
          message: `Element at index ${index} has valid role: "${role}"`,
          element,
        });
      }
    }
  });

  return results;
}

/**
 * Test image alt text
 */
export function testImageAltText(
  container: Element
): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];
  const images = container.querySelectorAll("img");

  images.forEach((img, index) => {
    const alt = img.getAttribute("alt");
    const ariaHidden = img.getAttribute("aria-hidden");
    const role = img.getAttribute("role");

    if (ariaHidden === "true" || role === "presentation") {
      results.push({
        passed: true,
        message: `Image at index ${index} is properly hidden from screen readers`,
        element: img,
      });
    } else if (alt === null) {
      results.push({
        passed: false,
        message: `Image at index ${index} is missing alt attribute`,
        element: img,
      });
    } else if (alt.trim().length === 0) {
      results.push({
        passed: true,
        message: `Image at index ${index} has empty alt (decorative image)`,
        element: img,
      });
    } else {
      results.push({
        passed: true,
        message: `Image at index ${index} has descriptive alt text: "${alt}"`,
        element: img,
      });
    }
  });

  return results;
}

/**
 * Run comprehensive accessibility tests
 */
export function runAccessibilityTests(container: Element = document.body): {
  passed: number;
  failed: number;
  results: AccessibilityTestResult[];
} {
  const allResults: AccessibilityTestResult[] = [
    ...testKeyboardNavigation(container),
    ...testAriaAttributes(container),
    ...testImageAltText(container),
  ];

  const passed = allResults.filter((r) => r.passed).length;
  const failed = allResults.filter((r) => !r.passed).length;

  return {
    passed,
    failed,
    results: allResults,
  };
}

/**
 * Log accessibility test results to console
 */
export function logAccessibilityResults(
  results: ReturnType<typeof runAccessibilityTests>
): void {
  console.group("🔍 Accessibility Test Results");
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Total: ${results.results.length}`);

  if (results.failed > 0) {
    console.group("❌ Failed Tests");
    results.results
      .filter((r) => !r.passed)
      .forEach((result) => {
        console.warn(result.message, result.element);
      });
    console.groupEnd();
  }

  if (process.env.NODE_ENV === "development") {
    console.group("✅ Passed Tests");
    results.results
      .filter((r) => r.passed)
      .forEach((result) => {
        console.log(result.message, result.element);
      });
    console.groupEnd();
  }

  console.groupEnd();
}
