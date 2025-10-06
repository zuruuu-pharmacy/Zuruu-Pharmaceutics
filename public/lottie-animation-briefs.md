# Industry Dashboard - Lottie Animation Briefs

## Overview
This document contains detailed briefs for all Lottie animations required for the Industry Dashboard. Each brief includes specific requirements, timing, and technical specifications.

## 1. KPI Count-up Animation

### Brief
Create a smooth count-up animation for KPI values that counts from 0 to the target value.

### Requirements
- **Duration**: 2 seconds
- **Easing**: easeOutCubic
- **Format**: Lottie JSON
- **Size**: < 50KB
- **FPS**: 60fps max
- **Colors**: Use brand colors (blue, green, purple)

### Technical Specs
- **Start Value**: 0
- **End Value**: Variable (12, 6.2, 98)
- **Decimal Places**: 1 for lead time, 0 for others
- **Suffix**: "%" for traceability, "d" for lead time
- **Animation Type**: Number counter with easing

### Visual Elements
- **Number Style**: Bold, large font
- **Color Transitions**: Smooth color changes
- **Scale Effect**: Slight scale up (1.0 to 1.05) during animation
- **Glow Effect**: Subtle glow that fades in/out

### Deliverables
- `kpi-countup.json` - Main animation file
- `kpi-countup-preview.gif` - Preview GIF
- `kpi-countup-specs.pdf` - Technical specifications

---

## 2. Batch Timeline Dot Movement

### Brief
Create an animation showing a dot moving along a path from origin to destination with pulsing nodes.

### Requirements
- **Duration**: 1.2 seconds per hop
- **Easing**: easeInOutCubic
- **Format**: Lottie JSON
- **Size**: < 100KB
- **FPS**: 60fps max
- **Colors**: Green (origin), Blue (port), Purple (warehouse), Orange (retail)

### Technical Specs
- **Path**: Curved line with 4 nodes
- **Dot Size**: 8px diameter
- **Node Size**: 12px diameter
- **Pulse Duration**: 360ms
- **Stagger Delay**: 200ms between nodes

### Visual Elements
- **Dot Movement**: Smooth along curved path
- **Node Pulse**: Scale from 1.0 to 1.3 and back
- **Color Transitions**: Smooth color changes
- **Path Visibility**: Fade in as dot approaches

### Deliverables
- `batch-timeline-dot.json` - Main animation file
- `batch-timeline-preview.gif` - Preview GIF
- `batch-timeline-specs.pdf` - Technical specifications

---

## 3. Restock Box Slide-in

### Brief
Create an animation of a box sliding up from below and morphing into a checkmark.

### Requirements
- **Duration**: 450ms total
- **Easing**: easeInOutCubic
- **Format**: Lottie JSON
- **Size**: < 80KB
- **FPS**: 60fps max
- **Colors**: Blue box, Green checkmark

### Technical Specs
- **Box Dimensions**: 24x24px
- **Checkmark Size**: 16x16px
- **Slide Distance**: 40px up
- **Morph Duration**: 200ms
- **Scale Effect**: 1.0 to 1.1 during morph

### Visual Elements
- **Box Style**: Rounded corners, subtle shadow
- **Slide Motion**: Smooth upward movement
- **Morph Transition**: Box fades out, checkmark fades in
- **Checkmark Style**: Bold, clean lines
- **Success Glow**: Subtle green glow on completion

### Deliverables
- `restock-box-slide.json` - Main animation file
- `restock-box-preview.gif` - Preview GIF
- `restock-box-specs.pdf` - Technical specifications

---

## 4. Icon Stroke Draw

### Brief
Create a stroke-draw animation for login card icons that draws the icon outline.

### Requirements
- **Duration**: 320ms
- **Easing**: easeInOutCubic
- **Format**: Lottie JSON
- **Size**: < 60KB
- **FPS**: 60fps max
- **Colors**: Brand blue (#1F59FF)

### Technical Specs
- **Icon Size**: 24x24px
- **Stroke Width**: 2px
- **Draw Direction**: Clockwise
- **Start Point**: Top of icon
- **End Point**: Same as start point

### Visual Elements
- **Stroke Style**: Clean, consistent width
- **Draw Motion**: Smooth, continuous line
- **Color**: Brand blue with slight gradient
- **Glow Effect**: Subtle glow during drawing
- **Completion**: Brief flash on completion

### Deliverables
- `icon-stroke-draw.json` - Main animation file
- `icon-stroke-preview.gif` - Preview GIF
- `icon-stroke-specs.pdf` - Technical specifications

---

## 5. CTA Ripple Effect

### Brief
Create a ripple effect animation for button clicks that expands outward from the click point.

### Requirements
- **Duration**: 600ms
- **Easing**: easeOutCubic
- **Format**: Lottie JSON
- **Size**: < 40KB
- **FPS**: 60fps max
- **Colors**: White ripple on blue background

### Technical Specs
- **Ripple Count**: 3 concentric circles
- **Max Radius**: 100px
- **Opacity**: 0.3 to 0.0
- **Stagger Delay**: 100ms between ripples
- **Scale**: 0.1 to 1.0

### Visual Elements
- **Circle Style**: Clean, thin stroke
- **Ripple Motion**: Smooth outward expansion
- **Opacity Fade**: Gradual fade to transparent
- **Color**: White with slight blue tint
- **Timing**: Quick start, slow finish

### Deliverables
- `cta-ripple-effect.json` - Main animation file
- `cta-ripple-preview.gif` - Preview GIF
- `cta-ripple-specs.pdf` - Technical specifications

---

## 6. Chart Draw Animation

### Brief
Create an animation that draws a line chart from left to right with data points appearing.

### Requirements
- **Duration**: 600ms
- **Easing**: easeInOutCubic
- **Format**: Lottie JSON
- **Size**: < 120KB
- **FPS**: 60fps max
- **Colors**: Blue line, Green data points

### Technical Specs
- **Line Width**: 3px
- **Data Points**: 12 points
- **Point Size**: 6px diameter
- **Draw Direction**: Left to right
- **Point Delay**: 50ms after line passes

### Visual Elements
- **Line Style**: Smooth, curved
- **Point Style**: Filled circles with glow
- **Draw Motion**: Continuous line drawing
- **Point Animation**: Scale from 0 to 1.0
- **Color Gradient**: Blue to green transition

### Deliverables
- `chart-draw-animation.json` - Main animation file
- `chart-draw-preview.gif` - Preview GIF
- `chart-draw-specs.pdf` - Technical specifications

---

## 7. Loading Spinner

### Brief
Create a modern loading spinner with pharmaceutical theme elements.

### Requirements
- **Duration**: 1.5 seconds (loop)
- **Easing**: Linear
- **Format**: Lottie JSON
- **Size**: < 30KB
- **FPS**: 60fps max
- **Colors**: Brand blue with white accents

### Technical Specs
- **Spinner Size**: 32x32px
- **Rotation**: 360 degrees
- **Element Count**: 8 dots
- **Dot Size**: 4px diameter
- **Stagger Delay**: 100ms between dots

### Visual Elements
- **Dot Style**: Rounded, filled
- **Rotation**: Smooth, continuous
- **Opacity**: Fade in/out effect
- **Scale**: Slight scale variation
- **Color**: Blue with white highlight

### Deliverables
- `loading-spinner.json` - Main animation file
- `loading-spinner-preview.gif` - Preview GIF
- `loading-spinner-specs.pdf` - Technical specifications

---

## 8. Success Checkmark

### Brief
Create a success checkmark animation that appears after successful actions.

### Requirements
- **Duration**: 800ms
- **Easing**: easeOutBack
- **Format**: Lottie JSON
- **Size**: < 45KB
- **FPS**: 60fps max
- **Colors**: Green checkmark with white background

### Technical Specs
- **Checkmark Size**: 24x24px
- **Circle Size**: 32x32px
- **Stroke Width**: 3px
- **Scale Effect**: 0.8 to 1.2 to 1.0
- **Bounce**: Slight bounce on completion

### Visual Elements
- **Circle Style**: Rounded, filled
- **Checkmark Style**: Bold, clean lines
- **Draw Motion**: Smooth stroke drawing
- **Scale Animation**: Bounce effect
- **Color**: Green with white background

### Deliverables
- `success-checkmark.json` - Main animation file
- `success-checkmark-preview.gif` - Preview GIF
- `success-checkmark-specs.pdf` - Technical specifications

---

## 9. Error X Mark

### Brief
Create an error X mark animation that appears when actions fail.

### Requirements
- **Duration**: 600ms
- **Easing**: easeOutCubic
- **Format**: Lottie JSON
- **Size**: < 40KB
- **FPS**: 60fps max
- **Colors**: Red X mark with white background

### Technical Specs
- **X Mark Size**: 24x24px
- **Circle Size**: 32x32px
- **Stroke Width**: 3px
- **Scale Effect**: 0.5 to 1.0
- **Shake Effect**: Slight shake on completion

### Visual Elements
- **Circle Style**: Rounded, filled
- **X Mark Style**: Bold, clean lines
- **Draw Motion**: Simultaneous line drawing
- **Scale Animation**: Grow from center
- **Shake Effect**: Subtle shake on completion

### Deliverables
- `error-x-mark.json` - Main animation file
- `error-x-mark-preview.gif` - Preview GIF
- `error-x-mark-specs.pdf` - Technical specifications

---

## 10. Progress Bar Fill

### Brief
Create a progress bar fill animation that shows completion progress.

### Requirements
- **Duration**: 1 second
- **Easing**: easeInOutCubic
- **Format**: Lottie JSON
- **Size**: < 35KB
- **FPS**: 60fps max
- **Colors**: Blue fill with white background

### Technical Specs
- **Bar Width**: 200px
- **Bar Height**: 8px
- **Fill Direction**: Left to right
- **Progress Range**: 0% to 100%
- **Glow Effect**: Subtle glow during fill

### Visual Elements
- **Bar Style**: Rounded ends
- **Fill Motion**: Smooth left-to-right
- **Color Gradient**: Blue with slight gradient
- **Glow Effect**: Subtle blue glow
- **Completion**: Brief flash on 100%

### Deliverables
- `progress-bar-fill.json` - Main animation file
- `progress-bar-preview.gif` - Preview GIF
- `progress-bar-specs.pdf` - Technical specifications

---

## Technical Requirements

### File Formats
- **Primary**: Lottie JSON (.json)
- **Preview**: GIF (.gif)
- **Documentation**: PDF (.pdf)

### File Naming Convention
- **Format**: `{animation-name}.json`
- **Preview**: `{animation-name}-preview.gif`
- **Specs**: `{animation-name}-specs.pdf`

### Performance Requirements
- **File Size**: < 500KB per animation
- **FPS**: 60fps maximum
- **Compatibility**: Lottie 5.0+
- **Fallback**: CSS animations for older browsers

### Quality Standards
- **Smooth Motion**: No stuttering or frame drops
- **Color Accuracy**: Match brand colors exactly
- **Scalability**: Work at any size
- **Accessibility**: Respect reduced motion preferences

### Delivery Package
- **ZIP File**: `industry-dashboard-animations.zip`
- **Contents**: All JSON files, previews, and specs
- **Documentation**: README with usage instructions
- **License**: Commercial use license included

---

## Usage Instructions

### Integration
1. Place JSON files in `/public/animations/` directory
2. Use `lottie-react` library for React integration
3. Implement fallback CSS animations for older browsers
4. Test on all target devices and browsers

### Performance Optimization
1. Lazy load animations when they come into view
2. Use `will-change: transform` for smooth performance
3. Implement intersection observer for viewport detection
4. Cache animations in memory for repeated use

### Accessibility
1. Respect `prefers-reduced-motion` media query
2. Provide alternative static states
3. Ensure animations don't cause motion sickness
4. Test with screen readers and assistive technologies

---

## Version History

- **v1.0**: Initial animation briefs
- **v1.1**: Added performance requirements
- **v1.2**: Added accessibility guidelines
- **v1.3**: Added technical specifications
