# Visual Assets Documentation

This directory contains all visual assets for the coding platforms integration feature, including platform logos, achievement badges, and other graphics.

## Directory Structure

```
public/images/
├── platforms/          # Platform logos and branding
│   ├── leetcode-logo.svg
│   └── hackerrank-logo.svg
├── badges/             # Achievement badges
│   ├── leetcode-*.svg  # LeetCode achievement badges
│   └── hackerrank-*.svg # HackerRank achievement badges
├── placeholder.svg     # General placeholder image
└── README.md          # This file
```

## Platform Logos

### LeetCode

- **File**: `platforms/leetcode-logo.svg`
- **Size**: 32x32px
- **Colors**: Primary (#FFA116), Secondary (#FF6B35)
- **Format**: SVG (scalable)

### HackerRank

- **File**: `platforms/hackerrank-logo.svg`
- **Size**: 32x32px
- **Colors**: Primary (#00EA64), Secondary (#00C853)
- **Format**: SVG (scalable)

## Achievement Badges

All achievement badges are 48x48px SVG files with consistent styling and branding.

### LeetCode Badges

#### Annual Badges

- `leetcode-annual-2024.svg` - Annual Badge 2024

#### Streak Badges

- `leetcode-30-days.svg` - 30 Days Streak Badge
- `leetcode-50-days.svg` - 50 Days Streak Badge

#### Contest Badges

- `leetcode-contest-participant.svg` - Contest Participant Badge
- `leetcode-contest-rating.svg` - Contest Rating 1500+ Badge

#### Milestone Badges

- `leetcode-50.svg` - 50 Problems Club
- `leetcode-100.svg` - Century Club (100 problems)
- `leetcode-200.svg` - 200 Problems Club
- `leetcode-300.svg` - 300 Problems Club
- `leetcode-500.svg` - 500 Problems Club

#### Difficulty Badges

- `leetcode-hard-solver.svg` - Hard Problems Solver Badge

### HackerRank Badges

#### Skill Certification Badges

- `hackerrank-python-gold.svg` - Python Gold Certification
- `hackerrank-algorithms-silver.svg` - Algorithms Silver Certification
- `hackerrank-data-structures-bronze.svg` - Data Structures Bronze Certification

#### Challenge Badges

- `hackerrank-30-days-of-code.svg` - 30 Days of Code Challenge
- `hackerrank-10-days-of-statistics.svg` - 10 Days of Statistics Challenge
- `hackerrank-interview-preparation-kit.svg` - Interview Preparation Kit

#### Contest Badges

- `hackerrank-contest-participant.svg` - Contest Participant Badge

#### Milestone Badges

- `hackerrank-25.svg` - 25 Problems Solved
- `hackerrank-50.svg` - 50 Problems Solved
- `hackerrank-100.svg` - 100 Problems Solved
- `hackerrank-150.svg` - 150 Problems Solved

## Design Guidelines

### Color Schemes

#### LeetCode Branding

- **Primary**: #FFA116 (Orange)
- **Secondary**: #FF6B35 (Red-Orange)
- **Accent**: #FFD700 (Gold)
- **Background**: #FFFBF0 (Warm White)

#### HackerRank Branding

- **Primary**: #00EA64 (Green)
- **Secondary**: #00C853 (Dark Green)
- **Accent**: #4CAF50 (Material Green)
- **Background**: #F0FFF4 (Mint White)

### Badge Rarity System

#### Common Badges

- **Color**: #6B7280 (Gray)
- **Usage**: Basic achievements, participation badges
- **Examples**: Contest participation, basic challenges

#### Rare Badges

- **Color**: #3B82F6 (Blue)
- **Usage**: Significant milestones, skill certifications
- **Examples**: 100 problems solved, silver certifications

#### Epic Badges

- **Color**: #8B5CF6 (Purple)
- **Usage**: Major achievements, long streaks
- **Examples**: 30+ day streaks, gold certifications

#### Legendary Badges

- **Color**: #F59E0B (Gold)
- **Usage**: Exceptional achievements, rare accomplishments
- **Examples**: 500+ problems solved, 50+ day streaks

### SVG Optimization

All SVG files are optimized for:

- **Small file size**: Minimal code, efficient paths
- **Scalability**: Vector-based for crisp rendering at any size
- **Accessibility**: Proper titles and descriptions
- **Performance**: Optimized for fast loading

### Usage Guidelines

#### Platform Logos

```tsx
import { PlatformLogo } from "@/components/ui/PlatformImage";

<PlatformLogo
  platformId="leetcode"
  platformName="LeetCode"
  size="md"
  showName={true}
/>;
```

#### Achievement Badges

```tsx
import { AchievementBadgeImage } from "@/components/ui/PlatformImage";

<AchievementBadgeImage
  badgeId="30-days-streak"
  platformId="leetcode"
  badgeName="30 Days Streak"
  rarity="epic"
  size="md"
  showGlow={true}
/>;
```

## Performance Considerations

### Image Optimization

- All images are SVG format for optimal scalability and performance
- Minimal file sizes (typically < 2KB per badge)
- No external dependencies or fonts
- Optimized for both light and dark themes

### Loading Strategy

- Platform logos are loaded with high priority
- Achievement badges use lazy loading
- Fallback placeholders for failed loads
- Progressive enhancement approach

### Accessibility

- All images include proper alt text
- Color contrast ratios meet WCAG guidelines
- Screen reader compatible descriptions
- Keyboard navigation support

## Maintenance

### Adding New Badges

1. Create SVG file following naming convention: `{platform}-{badge-id}.svg`
2. Use consistent 48x48px dimensions
3. Apply appropriate rarity colors
4. Update badge configuration in `lib/platform-branding.ts`
5. Add entry to this README

### Updating Existing Assets

1. Maintain backward compatibility
2. Keep file names consistent
3. Preserve aspect ratios and dimensions
4. Test across different screen sizes
5. Validate accessibility compliance

### Quality Checklist

- [ ] SVG is properly formatted and optimized
- [ ] Colors match platform branding guidelines
- [ ] File size is under 3KB
- [ ] Renders correctly at different sizes
- [ ] Accessible alt text provided
- [ ] Cross-browser compatibility verified

## Browser Support

All visual assets are designed to work across:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Screen readers and assistive technologies
- High DPI/Retina displays
- Various color schemes (light/dark mode)

## License

All visual assets in this directory are part of the portfolio project and are subject to the project's license terms. Platform logos are used for identification purposes only and remain the property of their respective owners (LeetCode, HackerRank).
