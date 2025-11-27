# How to Update Your Coding Platform Statistics

## 🎯 Quick Setup

Your coding platforms section is now optimized and ready to use! Here's how to keep your stats updated:

## 📊 Current Configuration

Your platforms are configured with these usernames:

- **LeetCode**: `aman-ansari`
- **HackerRank**: `aman_ansari_dev`

## 🔄 Real-time vs Static Data

The system now supports both:

### 1. **Real-time Data** (Automatic)

- Fetches live stats from LeetCode API every 5 minutes
- Shows a green "Live Data" indicator when active
- Falls back to static data if API fails

### 2. **Static Data** (Manual Updates)

- Located in `lib/coding-platforms-config.ts`
- Update the `USER_CONFIG` object with your current stats

## 📝 How to Update Static Stats

Edit `lib/coding-platforms-config.ts` and update these values:

```typescript
export const USER_CONFIG = {
  leetcode: {
    username: "your-actual-username",
    profileUrl: "https://leetcode.com/your-actual-username",
    customStats: {
      totalSolved: 285, // ← Update this
      ranking: 45000, // ← Update this
      currentStreak: 15, // ← Update this
      longestStreak: 42, // ← Update this
      acceptanceRate: 78.5, // ← Update this
      contestRating: 1850, // ← Update this
      contestsParticipated: 18, // ← Update this
      difficultyBreakdown: {
        easy: 145, // ← Update these
        medium: 110, // ← Update these
        hard: 30, // ← Update these
      },
    },
  },
  // Same for HackerRank...
};
```

## 🚀 Performance Optimizations Applied

✅ **Reduced bundle size** - Simplified components
✅ **Faster animations** - Reduced duration from 300ms to 200ms
✅ **Fewer elements** - Limited recent activities and achievements
✅ **Lazy loading** - Components load only when needed
✅ **Caching** - API responses cached for 5 minutes
✅ **Fallback system** - Always shows data even if API fails

## 🔧 Customization Options

### Enable/Disable Real-time Data

In `lib/hooks/useRealTimeStats.ts`, set:

```typescript
const REAL_TIME_CONFIG = {
  enabled: true, // Set to false to use only static data
};
```

### Adjust Refresh Intervals

```typescript
const options = {
  refreshInterval: 5 * 60 * 1000, // 5 minutes (in milliseconds)
};
```

### Hide Platforms

Set `isActive: false` in the config:

```typescript
hackerrank: {
  isActive: false, // This will hide HackerRank
  // ...
}
```

## 🎨 Visual Improvements

- **Live data indicator**: Green dot shows when using real-time data
- **Simplified layout**: Clean, fast-loading design
- **Better mobile support**: Optimized for all screen sizes
- **Smooth transitions**: Reduced animation lag

## 📱 Mobile Performance

The section now loads much faster on mobile devices with:

- Reduced animation complexity
- Smaller data payloads
- Optimized image loading
- Touch-friendly interface

## 🔍 Troubleshooting

### If the section is still slow:

1. Check browser dev tools for console errors
2. Disable real-time data temporarily
3. Reduce `maxRecentActivities` in global config

### If stats don't update:

1. Check your username in the config
2. Verify your profile is public
3. Check browser network tab for API errors

### If you see "N/A" values:

1. Update your static stats in the config file
2. Make sure your profile URLs are correct
3. Check if the platform APIs are accessible

## 🎯 Next Steps

1. **Update your usernames** in the config if they're different
2. **Add your current stats** to get accurate displays
3. **Test the real-time functionality** by checking the green indicator
4. **Customize the refresh intervals** based on your preference

Your coding platforms section should now be much faster and more responsive! 🚀
