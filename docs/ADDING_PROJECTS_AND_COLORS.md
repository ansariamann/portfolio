# Portfolio Management Guide

This guide explains how to:
1. Add new projects effortlessly
2. Use color contrast utilities for accessibility
3. Ensure your portfolio meets WCAG standards

---

## Table of Contents
- [Adding New Projects](#adding-new-projects)
- [Color Contrast Utilities](#color-contrast-utilities)
- [Accessibility Best Practices](#accessibility-best-practices)
- [Examples](#examples)

---

## Adding New Projects

### Quick Start

The easiest way to add a new project is using the `createProject` helper:

```typescript
// In data/projects.ts
import { createProject } from "./project-template";

const myNewProject = createProject({
  title: "Weather Dashboard",
  description: "Real-time weather forecasting with interactive maps",
  technologies: ["React", "TypeScript", "OpenWeather API", "Mapbox"],
  category: "web",
  githubUrl: "https://github.com/username/weather-dashboard",
  liveUrl: "https://weather-dashboard.com",
});

// Add to the projects array
export const projects: Project[] = [
  // ... existing projects
  myNewProject,
];
```

### Project Structure

**Required Fields:**
- `title`: Project name
- `description`: Brief description (1-2 sentences)
- `technologies`: Array of technologies used
- `category`: One of: `"web"`, `"mobile"`, `"desktop"`, `"other"`

**Optional Fields:**
- `id`: Auto-generated from title if not provided
- `longDescription`: Detailed project description
- `images`: Array of image paths (defaults to placeholder)
- `liveUrl`: Live demo URL
- `githubUrl`: GitHub repository URL (defaults to "#")
- `featured`: Boolean to mark as featured project
- `highlights`: Array of key achievements
- `challenges`: Array of challenges faced
- `learnings`: Array of lessons learned
- `status`: One of: `"completed"`, `"in-progress"`, `"planned"`
- `completedDate`: Date of completion (defaults to now)

### Using Templates

We provide pre-configured templates for common project types:

```typescript
import { createProject, webProjectTemplate, mlProjectTemplate } from "./project-template";

// Web project
const webProject = createProject({
  ...webProjectTemplate(),
  title: "My Web App",
  description: "Description here",
  githubUrl: "https://github.com/...",
});

// Machine Learning project
const mlProject = createProject({
  ...mlProjectTemplate(),
  title: "Sentiment Analysis Tool",
  description: "NLP-based sentiment analyzer",
  githubUrl: "https://github.com/...",
});
```

### Featured Projects

Featured projects have special styling and are highlighted in the portfolio:

```typescript
const featuredProject = createProject({
  title: "Enterprise Dashboard",
  description: "Analytics platform for business intelligence",
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "D3.js"],
  category: "web",
  featured: true, // Mark as featured
  highlights: [
    "Processes 10M+ data points daily",
    "Real-time analytics dashboard",
    "99.9% uptime SLA",
  ],
  // ... other fields
});
```

### Complete Example

```typescript
const comprehensiveProject = createProject({
  title: "E-Learning Platform",
  description: "Interactive online learning platform with video courses",
  longDescription: "Built a comprehensive e-learning platform featuring video courses, quizzes, progress tracking, and certification. The platform serves 10,000+ active users and hosts 500+ courses across multiple categories.",
  technologies: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "AWS S3",
    "Stripe",
  ],
  category: "web",
  githubUrl: "https://github.com/username/elearning",
  liveUrl: "https://elearning.com",
  featured: true,
  status: "completed",
  completedDate: new Date("2024-06-01"),
  highlights: [
    "10,000+ active users",
    "500+ video courses",
    "Integrated payment processing",
    "Mobile-responsive design",
  ],
  challenges: [
    "Video streaming optimization",
    "Scalable database architecture",
    "Real-time progress synchronization",
  ],
  learnings: [
    "Video CDN optimization",
    "Payment gateway integration",
    "Database performance tuning",
  ],
});
```

---

## Color Contrast Utilities

### Overview

The portfolio includes comprehensive color contrast utilities that ensure all color combinations meet WCAG accessibility standards.

**WCAG Standards:**
- **AA Normal Text**: 4.5:1 minimum contrast ratio
- **AA Large Text**: 3:1 minimum contrast ratio
- **AAA Normal Text**: 7:1 minimum contrast ratio
- **AAA Large Text**: 4.5:1 minimum contrast ratio

### Basic Usage

```typescript
import {
  getContrastRatio,
  adjustColorForContrast,
  getAccessibleTextColor,
  getContrastInfo,
} from "@/lib/color-utils";

// Check contrast ratio between two colors
const ratio = getContrastRatio("#3B82F6", "#FFFFFF");
console.log(ratio); // 3.62

// Adjust a color to meet minimum contrast
const adjusted = adjustColorForContrast(
  "#3B82F6",  // foreground
  "#FFFFFF",  // background
  4.5         // minimum ratio (WCAG AA)
);
console.log(adjusted); // "#1D4ED8" (darker blue)

// Get the best text color (black or white) for a background
const textColor = getAccessibleTextColor("#3B82F6");
console.log(textColor); // "#FFFFFF"

// Get detailed contrast information
const info = getContrastInfo("#000000", "#FFFFFF");
console.log(info);
// {
//   ratio: 21,
//   meetsAA_Normal: true,
//   meetsAA_Large: true,
//   meetsAAA_Normal: true,
//   meetsAAA_Large: true,
//   grade: "AAA"
// }
```

### Practical Examples

#### Example 1: Ensure Button Text is Readable

```typescript
import { adjustColorForContrast, getAccessibleTextColor } from "@/lib/color-utils";

const buttonBg = "#8B00FF"; // Purple background
const buttonText = getAccessibleTextColor(buttonBg);

// Use in component
<button
  style={{
    backgroundColor: buttonBg,
    color: buttonText,
  }}
>
  Click Me
</button>
```

#### Example 2: Adjust Brand Colors for Accessibility

```typescript
import { adjustColorForContrast, WCAG_LEVELS } from "@/lib/color-utils";

const brandColor = "#FF6600"; // Your brand orange
const background = "#FFFFFF"; // White background

// Adjust for normal text (WCAG AA)
const accessibleOrange = adjustColorForContrast(
  brandColor,
  background,
  WCAG_LEVELS.AA_NORMAL
);

// Use in CSS/Tailwind
const styles = {
  color: accessibleOrange,
  backgroundColor: background,
};
```

#### Example 3: Generate Accessible Color Palette

```typescript
import { generateAccessiblePalette } from "@/lib/color-utils";

const baseColor = "#3B82F6"; // Blue
const background = "#FFFFFF";

const palette = generateAccessiblePalette(baseColor, background, 5);
console.log(palette);
// ["#1E3A8A", "#1E40AF", "#1D4ED8", "#2563EB", "#3B82F6"]
// All colors meet WCAG AA standards against white
```

#### Example 4: Validate Color Combinations

```typescript
import { getContrastInfo, WCAG_LEVELS } from "@/lib/color-utils";

const checkColorPair = (fg: string, bg: string) => {
  const info = getContrastInfo(fg, bg);
  
  console.log(`Contrast Ratio: ${info.ratio}:1`);
  console.log(`Grade: ${info.grade}`);
  console.log(`Meets AA Normal: ${info.meetsAA_Normal}`);
  console.log(`Meets AAA Normal: ${info.meetsAAA_Normal}`);
  
  return info.meetsAA_Normal;
};

// Check your color combinations
checkColorPair("#3B82F6", "#FFFFFF"); // Blue on white
checkColorPair("#10B981", "#000000"); // Green on black
```

### Color Conversion Utilities

```typescript
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/color-utils";

// Hex to RGB
const rgb = hexToRgb("#3B82F6");
console.log(rgb); // { r: 59, g: 130, b: 246 }

// RGB to Hex
const hex = rgbToHex({ r: 59, g: 130, b: 246 });
console.log(hex); // "#3B82F6"

// RGB to HSL
const hsl = rgbToHsl({ r: 59, g: 130, b: 246 });
console.log(hsl); // { h: 217, s: 91, l: 60 }

// HSL to RGB
const rgb2 = hslToRgb({ h: 217, s: 91, l: 60 });
console.log(rgb2); // { r: 59, g: 130, b: 246 }
```

---

## Accessibility Best Practices

### Color Contrast Checklist

✅ **Do:**
- Test all text/background combinations
- Use WCAG AA as minimum standard (4.5:1 for normal text)
- Provide sufficient contrast for interactive elements
- Test in both light and dark modes
- Use the color utilities to automatically adjust colors

❌ **Don't:**
- Use low-contrast color combinations
- Rely on color alone to convey information
- Assume light text on light backgrounds is readable
- Ignore warning messages from the utilities

### Testing Your Colors

```typescript
import { getContrastInfo, WCAG_LEVELS } from "@/lib/color-utils";

// Test all your color pairs
const colorPairs = [
  { fg: "#3B82F6", bg: "#FFFFFF", label: "Primary button" },
  { fg: "#FFFFFF", bg: "#1E40AF", label: "Navbar" },
  { fg: "#1F2937", bg: "#F3F4F6", label: "Card text" },
];

colorPairs.forEach(({ fg, bg, label }) => {
  const info = getContrastInfo(fg, bg);
  console.log(`${label}:`);
  console.log(`  Ratio: ${info.ratio}:1`);
  console.log(`  Grade: ${info.grade}`);
  console.log(`  Pass: ${info.meetsAA_Normal ? "✓" : "✗"}`);
  console.log("---");
});
```

### Dark Mode Considerations

```typescript
import { adjustColorForContrast } from "@/lib/color-utils";

// Light mode colors
const lightBg = "#FFFFFF";
const lightFg = adjustColorForContrast("#3B82F6", lightBg);

// Dark mode colors
const darkBg = "#1F2937";
const darkFg = adjustColorForContrast("#60A5FA", darkBg);

// Use in Tailwind classes
const colorClasses = `
  text-[${lightFg}] 
  dark:text-[${darkFg}]
  bg-white 
  dark:bg-gray-800
`;
```

---

## Examples

### Complete Project Addition Workflow

```typescript
// 1. Import utilities
import { createProject, webProjectTemplate } from "./project-template";
import { adjustColorForContrast, getAccessibleTextColor } from "@/lib/color-utils";

// 2. Create your project with accessible colors
const myProject = createProject({
  ...webProjectTemplate(),
  title: "Task Management App",
  description: "Collaborative task management with real-time updates",
  technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
  category: "web",
  githubUrl: "https://github.com/username/task-app",
  liveUrl: "https://mytasks.app",
  featured: true,
  highlights: [
    "Real-time collaboration",
    "Drag-and-drop interface",
    "Offline support",
  ],
});

// 3. Define accessible colors for your project
const projectColors = {
  primary: adjustColorForContrast("#6366F1", "#FFFFFF"),
  background: "#FFFFFF",
  textOnPrimary: getAccessibleTextColor("#6366F1"),
};

// 4. Add to projects array
export const projects: Project[] = [
  // ... existing projects
  myProject,
];
```

### Integration with Components

```tsx
// components/sections/ProjectCard.tsx
import { getAccessibleTextColor } from "@/lib/color-utils";

const ProjectCard = ({ project }: { project: Project }) => {
  const accentColor = "#3B82F6";
  const textColor = getAccessibleTextColor(accentColor);
  
  return (
    <div className="card">
      <div 
        style={{ 
          backgroundColor: accentColor,
          color: textColor,
        }}
        className="p-4"
      >
        <h3>{project.title}</h3>
      </div>
      <p>{project.description}</p>
    </div>
  );
};
```

---

## Need Help?

- Check the [project-template.ts](../data/project-template.ts) file for more examples
- Review [color-utils.ts](../lib/color-utils.ts) for all available functions
- Test your changes with `npm run dev`
- Run type checking with `npm run type-check`

---

## Summary

**Adding Projects:**
1. Use `createProject()` helper
2. Fill in required fields (title, description, technologies, category)
3. Optionally add highlights, challenges, and learnings
4. Add to projects array in `data/projects.ts`

**Color Accessibility:**
1. Import color utilities from `@/lib/color-utils`
2. Use `adjustColorForContrast()` to ensure proper contrast
3. Use `getAccessibleTextColor()` for text on colored backgrounds
4. Test with `getContrastInfo()` to verify WCAG compliance

**Result:** A well-organized, accessible portfolio that's easy to maintain! 🎉
