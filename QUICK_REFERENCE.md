# Portfolio Quick Reference Guide

## 🎯 What's New?

Your portfolio now includes:
1. **WCAG-Compliant Color Utilities** - Automatic contrast ratio calculations and adjustments
2. **Project Template System** - Easy-to-use templates for adding new projects
3. **Comprehensive Documentation** - Step-by-step guides and examples

---

## 🚀 Quick Start: Add a New Project

### Option 1: Minimal Setup (Fastest)

```typescript
// In data/projects.ts
import { createProject } from "./project-template";

const newProject = createProject({
  title: "My Awesome Project",
  description: "Brief description here",
  technologies: ["React", "TypeScript", "Node.js"],
  category: "web",
  githubUrl: "https://github.com/username/project",
});

// Add to array
export const projects: Project[] = [
  // ... existing projects
  newProject,
];
```

### Option 2: Full-Featured Project

```typescript
const featuredProject = createProject({
  title: "E-Commerce Platform",
  description: "Full-stack e-commerce solution",
  longDescription: "Detailed description with multiple sentences...",
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
  category: "web",
  githubUrl: "https://github.com/username/ecommerce",
  liveUrl: "https://mystore.com",
  featured: true,
  highlights: [
    "10,000+ active users",
    "Real-time inventory",
    "Payment processing",
  ],
  challenges: ["Database scaling", "Payment security"],
  learnings: ["PostgreSQL optimization", "Stripe integration"],
});
```

---

## 🎨 Quick Start: Use Color Utilities

### Check Contrast Ratio

```typescript
import { getContrastRatio } from "@/lib/color-utils";

const ratio = getContrastRatio("#3B82F6", "#FFFFFF");
console.log(ratio); // 3.62
```

### Auto-Adjust Colors

```typescript
import { adjustColorForContrast } from "@/lib/color-utils";

const accessibleBlue = adjustColorForContrast("#3B82F6", "#FFFFFF", 4.5);
console.log(accessibleBlue); // "#1D4ED8" (darker, meets WCAG AA)
```

### Get Best Text Color

```typescript
import { getAccessibleTextColor } from "@/lib/color-utils";

const textColor = getAccessibleTextColor("#3B82F6");
console.log(textColor); // "#FFFFFF"
```

### Validate Color Combo

```typescript
import { getContrastInfo } from "@/lib/color-utils";

const info = getContrastInfo("#3B82F6", "#FFFFFF");
console.log(info.grade); // "Fail" or "AA" or "AAA"
console.log(info.meetsAA_Normal); // true/false
```

---

## 📁 File Structure

```
portfolio/
├── lib/
│   ├── color-utils.ts          ← Color contrast utilities
│   └── README_COLOR_UTILS.md   ← Detailed API documentation
├── data/
│   ├── projects.ts             ← Your projects (edit this!)
│   └── project-template.ts     ← Helper functions and templates
└── docs/
    └── ADDING_PROJECTS_AND_COLORS.md  ← Complete guide
```

---

## 🔥 Common Tasks

### Task 1: Add a Simple Project

1. Open `data/projects.ts`
2. Import the helper: `import { createProject } from "./project-template";`
3. Copy this template:
   ```typescript
   const myProject = createProject({
     title: "Project Name",
     description: "What it does",
     technologies: ["Tech1", "Tech2"],
     category: "web",
     githubUrl: "https://github.com/user/repo",
   });
   ```
4. Add `myProject` to the `projects` array
5. Save and check with `npm run dev`

### Task 2: Make a Project Featured

Just add `featured: true`:

```typescript
const myProject = createProject({
  title: "Amazing Project",
  description: "...",
  technologies: ["..."],
  category: "web",
  featured: true,  // ← Add this line
  // ... rest of config
});
```

### Task 3: Ensure Button Colors are Accessible

```typescript
import { getAccessibleTextColor } from "@/lib/color-utils";

const MyButton = ({ bgColor }) => {
  const textColor = getAccessibleTextColor(bgColor);
  
  return (
    <button style={{ backgroundColor: bgColor, color: textColor }}>
      Click Me
    </button>
  );
};
```

### Task 4: Fix Low-Contrast Colors

```typescript
import { adjustColorForContrast } from "@/lib/color-utils";

// Before: might have poor contrast
const brandColor = "#FF8800";

// After: guaranteed WCAG AA compliance
const accessibleColor = adjustColorForContrast(brandColor, "#FFFFFF", 4.5);
```

---

## 📊 WCAG Contrast Standards

| Text Type | WCAG AA | WCAG AAA |
|-----------|---------|----------|
| Normal    | 4.5:1   | 7:1      |
| Large (18pt+) | 3:1 | 4.5:1    |

**Recommendation:** Use WCAG AA (4.5:1) as your minimum standard.

---

## 🛠️ Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Create production build
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
```

---

## 💡 Pro Tips

### Tip 1: Use Templates for Consistency

```typescript
import { createProject, webProjectTemplate } from "./project-template";

const myProject = createProject({
  title: "My Web App",
  description: "...",
  technologies: ["React", "Next.js", "TypeScript"],
  category: "web",
});
```

### Tip 2: Test Colors During Development

```typescript
import { getContrastInfo } from "@/lib/color-utils";

// Log contrast info in development
if (process.env.NODE_ENV === 'development') {
  const info = getContrastInfo(textColor, bgColor);
  console.log(`Contrast: ${info.ratio}:1 - Grade: ${info.grade}`);
}
```

### Tip 3: Generate Color Palettes

```typescript
import { generateAccessiblePalette } from "@/lib/color-utils";

const brandColor = "#3B82F6";
const palette = generateAccessiblePalette(brandColor, "#FFFFFF", 5);
// Use palette[0], palette[1], etc. for variations
```

---

## 📚 Need More Help?

- **Full Guide**: `docs/ADDING_PROJECTS_AND_COLORS.md`
- **Color API**: `lib/README_COLOR_UTILS.md`
- **Examples**: `data/project-template.ts`

---

## ✅ Testing Checklist

Before deploying:

- [ ] All new projects added to `data/projects.ts`
- [ ] Project images exist (or using placeholders)
- [ ] GitHub URLs are correct
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] Colors meet WCAG AA standards (use `getContrastInfo`)
- [ ] Test on mobile viewport

---

## 🎉 Example Workflow

1. **Add Project**:
   ```typescript
   const taskApp = createProject({
     title: "Task Manager",
     description: "Collaborative task management app",
     technologies: ["React", "Firebase", "TypeScript"],
     category: "web",
     githubUrl: "https://github.com/me/task-app",
     featured: true,
   });
   ```

2. **Ensure Accessible Colors**:
   ```typescript
   import { adjustColorForContrast } from "@/lib/color-utils";
   const primaryColor = adjustColorForContrast("#6366F1", "#FFFFFF");
   ```

3. **Test**:
   ```bash
   npm run dev
   npm run type-check
   ```

4. **Deploy**! 🚀

---

## 🔗 Quick Links

- Main Guide: `docs/ADDING_PROJECTS_AND_COLORS.md`
- Color Utils: `lib/color-utils.ts`
- Project Templates: `data/project-template.ts`
- Current Projects: `data/projects.ts`

---

**Remember**: The project is set up to be easy to maintain. When in doubt, check the examples or use the templates!

Happy coding! 🎨✨
