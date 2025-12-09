# Animation System Guide

Apple-style scroll animations and transitions for your Next.js portfolio.

## Components

### 1. ScrollAnimation

Animate elements when they scroll into view.

#### Usage

```tsx
import { ScrollAnimation } from '@/core';

<ScrollAnimation animation="slide-up" delay={200} duration={600}>
  <div>Your content here</div>
</ScrollAnimation>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `'fade' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right' \| 'scale' \| 'blur'` | `'fade'` | Animation type |
| `delay` | `number` | `0` | Delay before animation starts (ms) |
| `duration` | `number` | `600` | Animation duration (ms) |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |
| `once` | `boolean` | `true` | Animate only once |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Fade in
<ScrollAnimation animation="fade">
  <h1>Title</h1>
</ScrollAnimation>

// Slide up with delay
<ScrollAnimation animation="slide-up" delay={300}>
  <p>Paragraph</p>
</ScrollAnimation>

// Continuous animation (not just once)
<ScrollAnimation animation="scale" once={false}>
  <img src="/image.jpg" />
</ScrollAnimation>
```

### 2. StaggeredList

Animate list items with sequential delays (like Apple's product features).

#### Usage

```tsx
import { StaggeredList } from '@/core';

<StaggeredList animation="slide-up" staggerDelay={100}>
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</StaggeredList>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `'fade' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right' \| 'scale'` | `'slide-up'` | Animation type |
| `staggerDelay` | `number` | `100` | Delay between each item (ms) |
| `duration` | `number` | `600` | Animation duration (ms) |
| `threshold` | `number` | `0.1` | Intersection threshold |
| `className` | `string` | `''` | Container CSS classes |
| `itemClassName` | `string` | `''` | Item CSS classes |

#### Examples

```tsx
// Stagger features list
<StaggeredList animation="slide-up" staggerDelay={150}>
  <FeatureCard title="Fast" />
  <FeatureCard title="Reliable" />
  <FeatureCard title="Secure" />
</StaggeredList>

// Stagger images gallery
<StaggeredList
  animation="scale"
  staggerDelay={80}
  className="grid grid-cols-3 gap-4"
>
  {images.map(img => (
    <img key={img.id} src={img.url} />
  ))}
</StaggeredList>
```

### 3. ParallaxSection

Create parallax scrolling effects (Apple-style depth).

#### Usage

```tsx
import { ParallaxSection } from '@/core';

<ParallaxSection speed={0.5}>
  <div>Content that moves slower than scroll</div>
</ParallaxSection>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `0.5` | Parallax speed (-1 to 1) |
| `className` | `string` | `''` | Additional CSS classes |

#### Speed Guide

- `0`: No parallax (moves with scroll)
- `0.5`: Slow parallax (recommended)
- `1`: Fast parallax
- `-0.5`: Reverse parallax (moves opposite direction)

#### Examples

```tsx
// Background image with slow parallax
<ParallaxSection speed={0.3}>
  <div className="h-screen bg-cover" style={{backgroundImage: 'url(/bg.jpg)'}}>
    <h1>Hero Title</h1>
  </div>
</ParallaxSection>

// Layered parallax effect
<div>
  <ParallaxSection speed={0.2}>
    <div className="layer-back">Background layer</div>
  </ParallaxSection>
  <ParallaxSection speed={0.5}>
    <div className="layer-mid">Middle layer</div>
  </ParallaxSection>
  <ParallaxSection speed={0.8}>
    <div className="layer-front">Front layer</div>
  </ParallaxSection>
</div>
```

## Real-World Examples

### Hero Section with Fade In

```tsx
<section data-testid="hero-section">
  <ScrollAnimation animation="fade" duration={800}>
    <h1>Welcome</h1>
  </ScrollAnimation>
  <ScrollAnimation animation="slide-up" delay={200}>
    <p>Your tagline here</p>
  </ScrollAnimation>
  <ScrollAnimation animation="scale" delay={400}>
    <button>Get Started</button>
  </ScrollAnimation>
</section>
```

### Features Section with Stagger

```tsx
<section data-testid="features-section">
  <ScrollAnimation animation="fade">
    <h2>Features</h2>
  </ScrollAnimation>

  <StaggeredList
    animation="slide-up"
    staggerDelay={120}
    className="grid md:grid-cols-3 gap-6"
  >
    <FeatureCard icon="🚀" title="Fast" />
    <FeatureCard icon="💪" title="Powerful" />
    <FeatureCard icon="🎨" title="Beautiful" />
  </StaggeredList>
</section>
```

### Parallax Hero Background

```tsx
<section className="relative h-screen overflow-hidden">
  <ParallaxSection speed={0.3}>
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{backgroundImage: 'url(/hero-bg.jpg)'}}
    />
  </ParallaxSection>

  <div className="relative z-10 flex items-center justify-center h-full">
    <ScrollAnimation animation="scale">
      <h1 className="text-6xl font-bold">Your Portfolio</h1>
    </ScrollAnimation>
  </div>
</section>
```

### Publications List with Stagger

```tsx
<section data-testid="publications-section">
  <ScrollAnimation animation="slide-up">
    <h2>Publications</h2>
  </ScrollAnimation>

  <StaggeredList
    animation="slide-left"
    staggerDelay={100}
    itemClassName="mb-4"
  >
    {publications.map(pub => (
      <PublicationCard key={pub.id} {...pub} />
    ))}
  </StaggeredList>
</section>
```

## Best Practices

### 1. Performance

- Use `once={true}` (default) for most animations to prevent re-triggering
- Limit parallax to 1-2 sections per page
- Keep stagger delays under 150ms for better UX

### 2. Accessibility

- Respect `prefers-reduced-motion` (built-in to Tailwind)
- Don't animate critical content that users need immediately
- Keep animations subtle and purposeful

### 3. Timing

- **Fast** (300-400ms): Small elements, buttons, icons
- **Medium** (600ms): Cards, sections, images (default)
- **Slow** (800-1000ms): Large sections, hero elements

### 4. Combinations

```tsx
// Good: Combine animations thoughtfully
<ScrollAnimation animation="fade">
  <ParallaxSection speed={0.5}>
    <StaggeredList animation="slide-up">
      {/* Content */}
    </StaggeredList>
  </ParallaxSection>
</ScrollAnimation>

// Avoid: Too many animations
<ScrollAnimation>
  <ScrollAnimation>
    <ScrollAnimation>
      {/* Too much! */}
    </ScrollAnimation>
  </ScrollAnimation>
</ScrollAnimation>
```

## CSS Utilities

The system also includes CSS utilities in `globals.css`:

```css
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* Accounts for fixed header */
}

/* Keyframe animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Usage */
<div className="animate-on-scroll">Content</div>
```

## Migration Guide

### Before

```tsx
<section>
  <h2>Title</h2>
  <div className="grid grid-cols-3">
    {items.map(item => <Card key={item.id} />)}
  </div>
</section>
```

### After

```tsx
<section>
  <ScrollAnimation animation="fade">
    <h2>Title</h2>
  </ScrollAnimation>

  <StaggeredList
    animation="slide-up"
    className="grid grid-cols-3"
  >
    {items.map(item => <Card key={item.id} />)}
  </StaggeredList>
</section>
```

## Troubleshooting

**Animation not triggering?**
- Check that element is in viewport
- Adjust `threshold` prop (default 0.1)
- Ensure parent doesn't have `overflow: hidden`

**Animations too fast/slow?**
- Adjust `duration` prop (ms)
- Default is 600ms

**Stagger not working?**
- Ensure children are direct React nodes
- Check `staggerDelay` is reasonable (50-200ms)

**Parallax jittery?**
- Reduce `speed` value
- Ensure parent has defined height
- Check for conflicting transforms
