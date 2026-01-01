# Color Contrast Utilities

A comprehensive TypeScript library for WCAG-compliant color contrast calculations and adjustments.

## Features

✅ Calculate contrast ratios according to WCAG 2.1 standards  
✅ Automatically adjust colors to meet accessibility requirements  
✅ Convert between color formats (Hex, RGB, HSL)  
✅ Generate accessible color palettes  
✅ Determine optimal text colors for backgrounds  
✅ Validate color combinations against WCAG standards

## Quick Start

```typescript
import {
  getContrastRatio,
  adjustColorForContrast,
  getAccessibleTextColor,
} from "@/lib/color-utils";

// Check contrast
const ratio = getContrastRatio("#3B82F6", "#FFFFFF");

// Auto-adjust color to meet WCAG AA
const accessibleColor = adjustColorForContrast("#3B82F6", "#FFFFFF", 4.5);

// Get best text color
const textColor = getAccessibleTextColor("#3B82F6"); // Returns black or white
```

## WCAG Standards

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA    | 4.5:1       | 3:1        |
| AAA   | 7:1         | 4.5:1      |

## API Reference

### Core Functions

#### `getContrastRatio(color1, color2)`
Calculates the contrast ratio between two colors.

```typescript
const ratio = getContrastRatio("#000000", "#FFFFFF");
// Returns: 21 (maximum contrast)
```

#### `adjustColorForContrast(foreground, background, minRatio?, maxIterations?)`
Adjusts a color to meet the minimum contrast ratio.

```typescript
const adjusted = adjustColorForContrast("#FF6600", "#FFFFFF", 4.5);
// Returns: "#CC5200" (darker orange with sufficient contrast)
```

#### `getAccessibleTextColor(background, minRatio?)`
Returns black or white, whichever provides better contrast.

```typescript
const textColor = getAccessibleTextColor("#3B82F6");
// Returns: "#FFFFFF"
```

#### `getContrastInfo(foreground, background)`
Returns detailed contrast information.

```typescript
const info = getContrastInfo("#3B82F6", "#FFFFFF");
// Returns: {
//   ratio: 3.62,
//   meetsAA_Normal: false,
//   meetsAA_Large: true,
//   meetsAAA_Normal: false,
//   meetsAAA_Large: false,
//   grade: "Fail"
// }
```

#### `generateAccessiblePalette(baseColor, background, count?)`
Generates a palette of colors with guaranteed contrast.

```typescript
const palette = generateAccessiblePalette("#3B82F6", "#FFFFFF", 5);
// Returns: ["#1E3A8A", "#1E40AF", "#1D4ED8", "#2563EB", "#3B82F6"]
```

### Color Conversion

#### `hexToRgb(hex)`
Converts hex color to RGB.

```typescript
const rgb = hexToRgb("#3B82F6");
// Returns: { r: 59, g: 130, b: 246 }
```

#### `rgbToHex(rgb)`
Converts RGB to hex.

```typescript
const hex = rgbToHex({ r: 59, g: 130, b: 246 });
// Returns: "#3B82F6"
```

#### `rgbToHsl(rgb)`
Converts RGB to HSL.

```typescript
const hsl = rgbToHsl({ r: 59, g: 130, b: 246 });
// Returns: { h: 217, s: 91, l: 60 }
```

#### `hslToRgb(hsl)`
Converts HSL to RGB.

```typescript
const rgb = hslToRgb({ h: 217, s: 91, l: 60 });
// Returns: { r: 59, g: 130, b: 246 }
```

### Validation

#### `meetsWCAG(ratio, level?)`
Checks if a contrast ratio meets WCAG requirements.

```typescript
meetsWCAG(4.5, "AA_NORMAL"); // true
meetsWCAG(3.0, "AA_NORMAL"); // false
```

#### `getRelativeLuminance(rgb)`
Calculates relative luminance (used internally for contrast calculations).

```typescript
const luminance = getRelativeLuminance({ r: 59, g: 130, b: 246 });
// Returns: 0.215
```

## Usage Examples

### Example 1: Button Component

```tsx
import { getAccessibleTextColor } from "@/lib/color-utils";

const Button = ({ backgroundColor, children }) => {
  const textColor = getAccessibleTextColor(backgroundColor);
  
  return (
    <button
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {children}
    </button>
  );
};
```

### Example 2: Theme Generator

```typescript
import { adjustColorForContrast, generateAccessiblePalette } from "@/lib/color-utils";

const createAccessibleTheme = (brandColor: string) => {
  return {
    primary: adjustColorForContrast(brandColor, "#FFFFFF", 4.5),
    primaryDark: adjustColorForContrast(brandColor, "#000000", 4.5),
    palette: generateAccessiblePalette(brandColor, "#FFFFFF", 5),
  };
};

const theme = createAccessibleTheme("#FF6600");
```

### Example 3: Color Validator

```typescript
import { getContrastInfo } from "@/lib/color-utils";

const validateColorScheme = (colors: Array<{ fg: string; bg: string; label: string }>) => {
  return colors.map(({ fg, bg, label }) => {
    const info = getContrastInfo(fg, bg);
    return {
      label,
      ...info,
      isAccessible: info.meetsAA_Normal,
    };
  });
};

const results = validateColorScheme([
  { fg: "#3B82F6", bg: "#FFFFFF", label: "Primary Button" },
  { fg: "#FFFFFF", bg: "#1E40AF", label: "Dark Button" },
]);
```

### Example 4: Dynamic Color Adjustment

```typescript
import { adjustColorForContrast, getContrastRatio } from "@/lib/color-utils";

const ensureReadability = (textColor: string, backgroundColor: string) => {
  const currentRatio = getContrastRatio(textColor, backgroundColor);
  
  if (currentRatio < 4.5) {
    console.log(`Adjusting color - current ratio: ${currentRatio.toFixed(2)}:1`);
    return adjustColorForContrast(textColor, backgroundColor, 4.5);
  }
  
  return textColor;
};
```

## TypeScript Support

All functions are fully typed:

```typescript
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

const WCAG_LEVELS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
} as const;
```

## Best Practices

1. **Always test critical text/background combinations**
   ```typescript
   const info = getContrastInfo(textColor, bgColor);
   if (!info.meetsAA_Normal) {
     console.warn("Insufficient contrast!");
   }
   ```

2. **Use AA standard as minimum for body text**
   ```typescript
   const bodyText = adjustColorForContrast(color, bg, 4.5);
   ```

3. **Consider AAA for better accessibility**
   ```typescript
   const highContrastText = adjustColorForContrast(color, bg, 7);
   ```

4. **Test both light and dark modes**
   ```typescript
   const lightMode = adjustColorForContrast(color, "#FFFFFF");
   const darkMode = adjustColorForContrast(color, "#1F2937");
   ```

## Testing

Run the utilities in a test environment:

```typescript
// Test multiple color combinations
const testColors = [
  ["#3B82F6", "#FFFFFF"],
  ["#10B981", "#000000"],
  ["#F59E0B", "#FFFFFF"],
];

testColors.forEach(([fg, bg]) => {
  const info = getContrastInfo(fg, bg);
  console.log(`${fg} on ${bg}: ${info.ratio}:1 - ${info.grade}`);
});
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Understanding Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## License

Part of the portfolio project. Use freely in your own projects!
