# Staggered Text Wave Animations

This document explains the implementation and usage of staggered text wave animations for section headings throughout the portfolio website.

## Overview

The staggered text wave animation creates an engaging visual effect where individual letters in headings animate in sequence with a wave-like motion when users hover over them. This adds interactivity and visual polish to section titles while maintaining accessibility and performance.

## Implementation

### Core Components

1. **StaggeredTextWave** - The base animation component that handles individual letter animations
2. **AnimatedSectionHeading** - A wrapper component that integrates StaggeredTextWave with section headings
3. **Animation Presets** - Pre-configured animation settings for different heading types

### Features

- **Wave Motion**: Letters move in a sine wave pattern for natural, fluid animation
- **Hover Activation**: Animations trigger on mouse hover and keyboard focus
- **Performance Optimized**: GPU acceleration and adaptive quality based on device performance
- **Accessibility Compliant**: Respects reduced motion preferences
- **Mobile Friendly**: Touch-optimized interactions for mobile devices

## Usage

### Basic Implementation

```tsx
import AnimatedSectionHeading, {
  headingPresets,
} from "@/components/ui/AnimatedSectionHeading";

<AnimatedSectionHeading
  text="About Me"
  className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
  gradientClassName="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent"
  animationConfig={headingPresets.section.animationConfig}
  motionProps={{
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay: 0.3 },
  }}
/>;
```

### Animation Presets

Three preset configurations are available:

#### Hero Preset

- **Letter Delay**: 40ms
- **Wave Amplitude**: 12px
- **Duration**: 800ms
- **Use Case**: Main hero headings, maximum impact

#### Section Preset

- **Letter Delay**: 50ms
- **Wave Amplitude**: 8px
- **Duration**: 600ms
- **Use Case**: Primary section headings, balanced effect

#### Subsection Preset

- **Letter Delay**: 60ms
- **Wave Amplitude**: 6px
- **Duration**: 500ms
- **Use Case**: Secondary headings, subtle animation

### Custom Configuration

```tsx
<AnimatedSectionHeading
  text="Custom Heading"
  animationConfig={{
    letterDelay: 70, // Delay between letter animations (ms)
    waveAmplitude: 10, // Height of wave motion (px)
    duration: 750, // Total animation duration (ms)
  }}
/>
```

## Applied Sections

The staggered text animations have been integrated into the following sections:

### ✅ About Section

- **Heading**: "About Me"
- **Style**: Blue to purple gradient
- **Animation**: Section preset

### ✅ Skills Section

- **Heading**: "My Skills"
- **Style**: White to blue gradient on dark background
- **Animation**: Section preset

### ✅ Projects Section

- **Heading**: "Featured Projects"
- **Style**: Indigo to cyan gradient
- **Animation**: Section preset

### ✅ Contact Section

- **Heading**: "Let's Work Together"
- **Style**: White to purple gradient on dark background
- **Animation**: Section preset

### ✅ Coding Platforms Section

- **Heading**: "Coding Platforms"
- **Style**: White to orange gradient on dark background
- **Animation**: Section preset

### ✅ Certifications Section

- **Heading**: "Certifications"
- **Style**: Direct StaggeredTextWave implementation
- **Animation**: Custom configuration (80ms delay, 12px amplitude, 800ms duration)

## Animation Parameters

### Letter Delay

Controls the stagger timing between individual letters:

- **20-40ms**: Fast, snappy animations
- **50-70ms**: Balanced, readable animations
- **80-120ms**: Elegant, deliberate animations

### Wave Amplitude

Controls the vertical movement distance:

- **4-6px**: Subtle, professional wave
- **8-12px**: Noticeable but not distracting
- **15-25px**: Bold, attention-grabbing effect

### Duration

Controls the total animation time:

- **300-500ms**: Quick, energetic feel
- **600-800ms**: Balanced animation timing
- **900-1200ms**: Elegant, luxurious feel

## Performance Considerations

### GPU Acceleration

- Automatically enabled on capable devices
- Uses `will-change` CSS property for optimization
- Adaptive quality based on device performance

### Reduced Motion Support

- Respects `prefers-reduced-motion` setting
- Falls back to simple opacity animation
- Maintains accessibility compliance

### Mobile Optimization

- Touch-friendly hover states
- Reduced animation complexity on low-end devices
- Optimized for 60fps performance

## Accessibility Features

### Screen Reader Support

- Proper ARIA labels and roles
- Hidden individual letters from screen readers
- Maintains semantic heading structure

### Keyboard Navigation

- Focus states trigger animations
- Proper tab order maintained
- Keyboard accessible interactions

### Motion Preferences

- Automatic detection of reduced motion preference
- Graceful fallback animations
- User control over animation intensity

## Browser Compatibility

### Modern Browsers

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Fallbacks

- CSS-only animations for older browsers
- Progressive enhancement approach
- Graceful degradation on unsupported features

## Testing

### Unit Tests

- Component rendering and props
- Hover state management
- Animation configuration
- Accessibility compliance

### Performance Tests

- 60fps animation validation
- Memory usage monitoring
- GPU acceleration verification
- Mobile device optimization

## Best Practices

### Design Guidelines

1. **Hierarchy**: Use different presets to maintain visual hierarchy
2. **Consistency**: Apply similar animations across similar heading levels
3. **Restraint**: Don't overuse - reserve for important headings
4. **Context**: Match animation intensity to section importance

### Performance Guidelines

1. **Limit Concurrent Animations**: Avoid multiple simultaneous text animations
2. **Monitor Performance**: Use performance monitoring for optimization
3. **Test on Devices**: Validate on various devices and browsers
4. **Respect Preferences**: Always honor user motion preferences

### Accessibility Guidelines

1. **Semantic HTML**: Maintain proper heading structure
2. **Focus Management**: Ensure keyboard navigation works correctly
3. **Screen Readers**: Test with assistive technologies
4. **Motion Sensitivity**: Provide reduced motion alternatives

## Future Enhancements

### Planned Features

- [ ] Additional wave patterns (bounce, elastic, etc.)
- [ ] Color-based animations (text color changes)
- [ ] Sound integration for enhanced feedback
- [ ] Advanced easing functions

### Performance Improvements

- [ ] Web Workers for complex calculations
- [ ] Canvas-based rendering for better performance
- [ ] Intersection Observer optimization
- [ ] Lazy loading for off-screen animations

## Troubleshooting

### Common Issues

**Animation not triggering**

- Check hover state management
- Verify component is properly imported
- Ensure motion props are correctly passed

**Performance issues**

- Reduce animation complexity
- Check for multiple concurrent animations
- Verify GPU acceleration is enabled

**Accessibility concerns**

- Test with screen readers
- Verify reduced motion support
- Check keyboard navigation

### Debug Mode

Enable debug logging by setting:

```tsx
const debugMode = process.env.NODE_ENV === "development";
```

This will log animation performance metrics and state changes to the console.
