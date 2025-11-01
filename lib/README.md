# Coding Platforms Configuration System

This directory contains the configuration system for coding platforms integration in your portfolio.

## Files Overview

### Core Configuration

- **`coding-platforms-config.ts`** - Main configuration file with user settings
- **`coding-platforms-utils.ts`** - Utility functions for data processing and validation
- **`validate-config.ts`** - Configuration validation and testing tools

### Key Features

1. **Easy Configuration**: Update your profile information in one place
2. **Data Validation**: Built-in validation ensures data consistency
3. **Auto-generation**: Realistic activity and achievement data generation
4. **Type Safety**: Full TypeScript support with comprehensive types
5. **Flexible Display**: Configurable display options and themes

## Quick Setup

1. **Update Configuration**:

   ```typescript
   // In coding-platforms-config.ts
   export const USER_CONFIG = {
     leetcode: {
       username: "your-username",
       profileUrl: "https://leetcode.com/your-username",
       customStats: {
         totalSolved: 150,
         currentStreak: 7,
         // ... other stats
       },
     },
   };
   ```

2. **Validate Configuration**:

   ```typescript
   import { runConfigurationValidation } from "./validate-config";
   runConfigurationValidation();
   ```

3. **Test Integration**:
   ```typescript
   import { codingPlatforms } from "@/data/coding-platforms";
   console.log("Active platforms:", codingPlatforms.length);
   ```

## Configuration Options

### User Profiles

- Platform usernames and URLs
- Custom statistics and achievements
- Activity preferences
- Display settings

### Global Settings

- Animation preferences
- Theme configuration
- Display limits
- Heatmap settings

### Platform Branding

- Colors and gradients
- Logo configurations
- Visual themes

## Validation Tools

### Built-in Validation

```typescript
import { validateUserConfig } from "./coding-platforms-config";
const validation = validateUserConfig();
```

### Platform Data Validation

```typescript
import { validatePlatformData } from "./coding-platforms-utils";
const isValid = validatePlatformData(platformData);
```

### Comprehensive Validation

```typescript
import { runConfigurationValidation } from "./validate-config";
const result = runConfigurationValidation();
```

## Data Processing

### Statistics Calculation

- Difficulty breakdown percentages
- Streak calculations from activity
- Average problems per day
- Progress tracking

### Activity Generation

- Realistic daily patterns
- Proper difficulty distribution
- Streak-aware generation
- Timezone considerations

### Achievement Creation

- Milestone-based achievements
- Streak achievements
- Contest achievements
- Skill certifications

## Best Practices

1. **Keep Data Consistent**: Ensure difficulty breakdown matches total solved
2. **Regular Updates**: Update statistics periodically
3. **Validate Changes**: Run validation after configuration updates
4. **Test Locally**: Preview changes in development environment
5. **Backup Configuration**: Keep backups before major changes

## Troubleshooting

### Common Issues

- **Difficulty Mismatch**: Ensure easy + medium + hard = totalSolved
- **Invalid Percentages**: Check acceptanceRate and globalRanking (0-100)
- **Missing URLs**: Update profile URLs from default values

### Debug Tools

```typescript
// Check configuration validity
import { isConfigurationValid } from "./validate-config";
console.log("Config valid:", isConfigurationValid());

// Get setup instructions
import { getSetupInstructions } from "./validate-config";
getSetupInstructions();
```

## Integration

The configuration system integrates with:

- **Data Layer**: `data/coding-platforms.ts`
- **Components**: All platform components use this configuration
- **Types**: `types/coding-platforms.ts` for type definitions
- **Documentation**: `docs/CODING_PLATFORMS_SETUP.md` for detailed setup

## Development

### Adding New Platforms

1. Add platform config to `PLATFORM_CONFIGS`
2. Add user config section to `USER_CONFIG`
3. Create sample problems in `SAMPLE_PROBLEMS`
4. Update validation functions
5. Add achievement templates

### Customizing Generation

- Modify activity generation patterns
- Adjust achievement criteria
- Update difficulty distributions
- Customize time patterns

For detailed setup instructions, see `docs/CODING_PLATFORMS_SETUP.md`.

## Additional Files

### Validation Tools

- **`validate-config.ts`** - Configuration validation utilities
- **`example-usage.ts`** - Usage examples and demonstrations

### Usage Examples

```typescript
// Run validation
import { printValidationSummary } from "./validate-config";
printValidationSummary();

// Use platform data
import { codingPlatforms } from "@/data/coding-platforms";
console.log("Active platforms:", codingPlatforms.length);

// Run examples
import { runAllExamples } from "./example-usage";
runAllExamples();
```

## Task 12 Completion Status

✅ **Comprehensive sample data** - Created realistic sample data for both LeetCode and HackerRank
✅ **Configuration system** - Built flexible configuration system in `coding-platforms-config.ts`
✅ **Data validation** - Implemented comprehensive validation functions
✅ **Helper functions** - Added data processing and calculation utilities
✅ **Documentation** - Created detailed setup guide and usage examples

The configuration system is now complete and ready for use!
