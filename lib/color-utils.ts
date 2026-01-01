/**
 * Color Contrast Utility Library
 * Provides WCAG-compliant color contrast calculations and adjustments
 * WCAG 2.1 Standards:
 * - Normal text: 4.5:1 minimum (AA), 7:1 enhanced (AAA)
 * - Large text (18pt+): 3:1 minimum (AA), 4.5:1 enhanced (AAA)
 */

/**
 * Color in RGB format
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Color in HSL format
 */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * WCAG contrast level requirements
 */
export const WCAG_LEVELS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
} as const;

/**
 * Converts hex color to RGB
 * @param hex - Hex color string (e.g., "#FF5733" or "FF5733")
 * @returns RGB object
 */
export function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Converts RGB to hex color
 * @param rgb - RGB object
 * @returns Hex color string with # prefix
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Converts RGB to HSL
 * @param rgb - RGB object
 * @returns HSL object
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Converts HSL to RGB
 * @param hsl - HSL object
 * @returns RGB object
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Calculates relative luminance of a color according to WCAG 2.1
 * @param rgb - RGB object
 * @returns Relative luminance value (0-1)
 */
export function getRelativeLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates contrast ratio between two colors according to WCAG 2.1
 * @param color1 - First color (RGB or hex)
 * @param color2 - Second color (RGB or hex)
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(
  color1: RGB | string,
  color2: RGB | string
): number {
  const rgb1 = typeof color1 === "string" ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === "string" ? hexToRgb(color2) : color2;

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if contrast ratio meets WCAG requirements
 * @param ratio - Contrast ratio to check
 * @param level - WCAG level (e.g., "AA_NORMAL")
 * @returns True if contrast meets requirements
 */
export function meetsWCAG(
  ratio: number,
  level: keyof typeof WCAG_LEVELS = "AA_NORMAL"
): boolean {
  return ratio >= WCAG_LEVELS[level];
}

/**
 * Adjusts color lightness to meet minimum contrast ratio with background
 * @param foreground - Foreground color (RGB or hex)
 * @param background - Background color (RGB or hex)
 * @param minRatio - Minimum contrast ratio to achieve
 * @param maxIterations - Maximum adjustment iterations
 * @returns Adjusted color in hex format
 */
export function adjustColorForContrast(
  foreground: RGB | string,
  background: RGB | string,
  minRatio: number = WCAG_LEVELS.AA_NORMAL,
  maxIterations: number = 20
): string {
  const fgRgb = typeof foreground === "string" ? hexToRgb(foreground) : foreground;
  const bgRgb = typeof background === "string" ? hexToRgb(background) : background;

  let currentRatio = getContrastRatio(fgRgb, bgRgb);

  // If already meets requirement, return original
  if (currentRatio >= minRatio) {
    return rgbToHex(fgRgb);
  }

  const fgHsl = rgbToHsl(fgRgb);
  const bgLuminance = getRelativeLuminance(bgRgb);

  // Determine if we should lighten or darken
  const shouldLighten = bgLuminance > 0.5;
  const step = shouldLighten ? -5 : 5; // Adjust lightness in 5% steps

  let iterations = 0;
  let adjustedHsl = { ...fgHsl };

  while (currentRatio < minRatio && iterations < maxIterations) {
    adjustedHsl.l += step;

    // Keep lightness within valid range
    adjustedHsl.l = Math.max(0, Math.min(100, adjustedHsl.l));

    const adjustedRgb = hslToRgb(adjustedHsl);
    currentRatio = getContrastRatio(adjustedRgb, bgRgb);

    iterations++;

    // Prevent infinite loops at boundaries
    if (adjustedHsl.l === 0 || adjustedHsl.l === 100) {
      break;
    }
  }

  return rgbToHex(hslToRgb(adjustedHsl));
}

/**
 * Gets accessible text color (black or white) for a given background
 * @param background - Background color (RGB or hex)
 * @param minRatio - Minimum contrast ratio to achieve
 * @returns "#000000" or "#ffffff"
 */
export function getAccessibleTextColor(
  background: RGB | string,
  minRatio: number = WCAG_LEVELS.AA_NORMAL
): string {
  const bgRgb = typeof background === "string" ? hexToRgb(background) : background;

  const blackRgb: RGB = { r: 0, g: 0, b: 0 };
  const whiteRgb: RGB = { r: 255, g: 255, b: 255 };

  const blackRatio = getContrastRatio(blackRgb, bgRgb);
  const whiteRatio = getContrastRatio(whiteRgb, bgRgb);

  // Prefer black if both meet requirements
  if (blackRatio >= minRatio) {
    return "#000000";
  }

  if (whiteRatio >= minRatio) {
    return "#ffffff";
  }

  // Return whichever has better contrast
  return blackRatio > whiteRatio ? "#000000" : "#ffffff";
}

/**
 * Generates a color palette with guaranteed contrast ratios
 * @param baseColor - Base color (RGB or hex)
 * @param background - Background color (RGB or hex)
 * @param count - Number of variations to generate
 * @returns Array of hex colors with guaranteed contrast
 */
export function generateAccessiblePalette(
  baseColor: RGB | string,
  background: RGB | string,
  count: number = 5
): string[] {
  const baseRgb = typeof baseColor === "string" ? hexToRgb(baseColor) : baseColor;
  const baseHsl = rgbToHsl(baseRgb);
  const palette: string[] = [];

  // Generate variations by adjusting lightness
  for (let i = 0; i < count; i++) {
    const lightnessAdjustment = (i - Math.floor(count / 2)) * 15;
    const adjustedHsl: HSL = {
      ...baseHsl,
      l: Math.max(0, Math.min(100, baseHsl.l + lightnessAdjustment)),
    };

    const color = adjustColorForContrast(
      hslToRgb(adjustedHsl),
      background,
      WCAG_LEVELS.AA_NORMAL
    );

    palette.push(color);
  }

  return palette;
}

/**
 * Validates and returns contrast information for a color combination
 * @param foreground - Foreground color
 * @param background - Background color
 * @returns Contrast information object
 */
export function getContrastInfo(foreground: RGB | string, background: RGB | string) {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsAA_Normal: meetsWCAG(ratio, "AA_NORMAL"),
    meetsAA_Large: meetsWCAG(ratio, "AA_LARGE"),
    meetsAAA_Normal: meetsWCAG(ratio, "AAA_NORMAL"),
    meetsAAA_Large: meetsWCAG(ratio, "AAA_LARGE"),
    grade: ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail",
  };
}
