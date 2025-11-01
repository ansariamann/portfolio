# Design Document

## Overview

This design document outlines the architecture and implementation approach for integrating LeetCode and HackerRank profiles into the existing modern portfolio website. The feature will add a new "Coding Platforms" section that showcases competitive programming achievements, problem-solving statistics, and coding activity in a visually engaging way that complements the existing skills section.

## Architecture

### Integration Approach

The coding platforms section will be implemented as a new section component that follows the same architectural patterns as the existing SkillsSection. It will be positioned strategically in the portfolio flow, likely between the Skills and Projects sections, to create a natural progression from technical skills to practical problem-solving abilities to actual project implementations.

### Technology Stack Alignment

**Frontend Framework:**

- Consistent with existing Next.js 14 with TypeScript implementation
- React 18 components following established patterns
- Integration with existing App Router structure

**Styling & Animation:**

- Tailwind CSS classes following the established design system
- Framer Motion animations matching existing section patterns
- Consistent color palette and typography from the current theme

**Data Management:**

- TypeScript interfaces for platform data structures
- Static data files following the pattern of skills.ts
- Configurable data approach for easy updates

## Components and Interfaces

### Core Data Interfaces

```typescript
interface CodingPlatform {
  id: "leetcode" | "hackerrank";
  name: string;
  username: string;
  profileUrl: string;
  logoUrl: string;
  primaryColor: string;
  statistics: PlatformStatistics;
  achievements: Achievement[];
  recentActivity: RecentActivity[];
}

interface PlatformStatistics {
  totalSolved: number;
  ranking?: number;
  currentStreak: number;
  longestStreak: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
  acceptanceRate?: number;
  contestRating?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  earnedDate: Date;
  category: "badge" | "certificate" | "contest" | "milestone";
}

interface RecentActivity {
  problemTitle: string;
  difficulty: "Easy" | "Medium" | "Hard";
  solvedDate: Date;
  problemUrl?: string;
  tags: string[];
}
```

### Component Architecture

**CodingPlatformsSection Component:**

- Main section wrapper with scroll-triggered animations
- Platform selector/tabs for switching between LeetCode and HackerRank
- Responsive grid layout for different visualization modes

**PlatformCard Component:**

- Individual platform overview with key statistics
- Animated counters for problems solved, ranking, streaks
- Hover effects revealing additional details
- Click-through to detailed view or external profile

**StatisticsVisualization Component:**

- Interactive charts for difficulty breakdown (donut/pie charts)
- Progress bars for various metrics
- Animated number counters with easing effects
- Trend indicators for improvement over time
  **AchievementsBadges Component:**
- Grid of achievement badges with hover animations
- Tooltip system showing achievement details
- Filtering by achievement category
- Staggered entrance animations

**ActivityHeatmap Component:**

- GitHub-style contribution heatmap for coding activity
- Color intensity based on problems solved per day
- Interactive tooltips showing daily statistics
- Smooth transitions between different time periods

**RecentActivity Component:**

- Timeline-style list of recent problems solved
- Difficulty color coding and tags
- Expandable details for each problem
- Links to actual problems (if available)

### Creative Visualization Modes

**Dashboard Mode:**

- Comprehensive overview with all key metrics
- Card-based layout with animated statistics
- Platform comparison side-by-side
- Quick access to external profiles

**Heatmap Mode:**

- Focus on coding activity patterns
- Calendar-style visualization of problem-solving consistency
- Interactive date range selection
- Streak highlighting and celebration

**Achievement Gallery Mode:**

- Showcase of badges and certifications
- Masonry or grid layout with hover effects
- Achievement timeline or progression view
- Category-based filtering and sorting

**Progress Tracker Mode:**

- Focus on improvement trends and goals
- Animated progress bars and charts
- Difficulty progression visualization
- Personal milestones and targets

## Visual Design System

### Color Palette Integration

**LeetCode Branding:**

- Primary: #FFA116 (LeetCode Orange)
- Secondary: #FF6B35 (Complementary orange-red)
- Background: Gradient from orange to warm yellow
- Text: Dark gray (#2D3748) on light backgrounds

**HackerRank Branding:**

- Primary: #00EA64 (HackerRank Green)
- Secondary: #00C853 (Darker green accent)
- Background: Gradient from green to teal
- Text: Dark gray (#2D3748) on light backgrounds

**Neutral Elements:**

- Background: Consistent with existing portfolio (gray-900 to slate-900)
- Cards: White/light gray with subtle shadows
- Text: Following existing typography hierarchy
- Accents: Purple and blue gradients matching skills section

### Animation Patterns

**Entrance Animations:**

- Staggered fade-in for platform cards (0.1s delays)
- Counter animations with easing for statistics
- Slide-up animations for achievement badges
- Smooth transitions between visualization modes

**Interaction Animations:**

- Hover scale effects (1.05x) for interactive elements
- Color transitions on hover (300ms duration)
- Tooltip fade-in/out with slight scale effect
- Button press animations with scale-down effect

**Loading States:**

- Skeleton loaders matching card layouts
- Shimmer effects for loading statistics
- Progressive disclosure of content sections
- Smooth transitions from loading to loaded states

## Data Models

### Platform Configuration

```typescript
// Static configuration for supported platforms
const CODING_PLATFORMS = {
  leetcode: {
    name: "LeetCode",
    baseUrl: "https://leetcode.com",
    logoUrl: "/images/platforms/leetcode-logo.svg",
    primaryColor: "#FFA116",
    secondaryColor: "#FF6B35",
  },
  hackerrank: {
    name: "HackerRank",
    baseUrl: "https://www.hackerrank.com",
    logoUrl: "/images/platforms/hackerrank-logo.svg",
    primaryColor: "#00EA64",
    secondaryColor: "#00C853",
  },
} as const;
```

### Sample Data Structure

```typescript
// Example data for LeetCode profile
const leetcodeProfile: CodingPlatform = {
  id: "leetcode",
  name: "LeetCode",
  username: "your-username",
  profileUrl: "https://leetcode.com/your-username",
  logoUrl: "/images/platforms/leetcode-logo.svg",
  primaryColor: "#FFA116",
  statistics: {
    totalSolved: 150,
    ranking: 125000,
    currentStreak: 7,
    longestStreak: 23,
    difficultyBreakdown: {
      easy: 80,
      medium: 55,
      hard: 15,
    },
    acceptanceRate: 68.5,
  },
  achievements: [
    {
      id: "annual-badge-2024",
      title: "Annual Badge 2024",
      description: "Solved problems consistently throughout 2024",
      iconUrl: "/images/badges/leetcode-annual-2024.svg",
      earnedDate: new Date("2024-12-31"),
      category: "badge",
    },
  ],
  recentActivity: [
    {
      problemTitle: "Two Sum",
      difficulty: "Easy",
      solvedDate: new Date("2024-01-15"),
      tags: ["Array", "Hash Table"],
    },
  ],
};
```

## Error Handling

### Data Availability

**Missing Platform Data:**

- Graceful fallback to placeholder statistics
- Clear messaging about data availability
- Option to hide platforms with no data
- Skeleton loaders during data fetching

**External Link Failures:**

- Fallback behavior for broken profile links
- Visual indicators for link status
- Alternative contact methods if profiles are unavailable
- Error boundaries for component failures

**Image Loading Issues:**

- Fallback icons for platform logos
- Placeholder images for achievement badges
- Progressive image loading with blur effects
- Alt text for accessibility compliance

### Performance Considerations

**Large Dataset Handling:**

- Pagination for extensive achievement lists
- Lazy loading for non-critical components
- Virtualization for long activity lists
- Efficient re-rendering with React.memo

**Animation Performance:**

- Hardware acceleration for transforms
- Reduced motion support for accessibility
- Performance monitoring for 60fps animations
- Graceful degradation on slower devices

## Testing Strategy

### Component Testing

**Unit Tests:**

- Platform data parsing and validation
- Statistics calculation accuracy
- Achievement filtering and sorting
- Animation trigger conditions

**Integration Tests:**

- Section integration with existing portfolio
- Responsive behavior across breakpoints
- Accessibility compliance testing
- Cross-browser compatibility

### Visual Testing

**Screenshot Testing:**

- Visual regression testing for layouts
- Animation state capture and comparison
- Color scheme consistency validation
- Typography and spacing verification

**Performance Testing:**

- Animation performance profiling
- Bundle size impact measurement
- Loading time optimization
- Core Web Vitals monitoring

## Responsive Design Strategy

### Mobile-First Implementation

**Mobile (320px - 768px):**

- Single column layout for platform cards
- Simplified statistics display with key metrics only
- Touch-friendly interactive elements (44px minimum)
- Reduced animation complexity for performance
- Collapsible sections for detailed information

**Tablet (768px - 1024px):**

- Two-column grid for platform comparison
- Expanded statistics with visual charts
- Hover states adapted for touch interaction
- Medium-complexity animations and transitions
- Balanced information density

**Desktop (1024px+):**

- Multi-column layouts with detailed visualizations
- Full animation suite with complex interactions
- Hover effects and micro-interactions
- Comprehensive data display with all features
- Side-by-side platform comparison views

### Content Adaptation

**Progressive Enhancement:**

- Core statistics always visible
- Enhanced visualizations on larger screens
- Optional detailed views based on screen space
- Contextual navigation and controls
- Adaptive typography scaling

**Performance Optimization:**

- Smaller image assets for mobile
- Reduced animation duration on slower devices
- Conditional loading of non-essential features
- Optimized bundle splitting for mobile users
- Efficient CSS delivery for critical rendering path

## Integration Points

### Portfolio Flow Integration

**Section Positioning:**

- Placed between Skills and Projects sections
- Natural progression: Skills → Problem Solving → Projects
- Smooth scroll transitions between sections
- Consistent navigation integration

**Cross-Section References:**

- Link coding platform skills to skills section
- Reference problem-solving in project descriptions
- Consistent achievement theming across portfolio
- Unified call-to-action strategy

### Existing Component Reuse

**Shared UI Components:**

- Reuse existing button and card components
- Consistent loading states and skeletons
- Shared animation utilities and hooks
- Common responsive design patterns
