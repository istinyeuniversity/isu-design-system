# Layout Components

Layout components provide the foundation for building responsive page structures and organizing content.

## Container

The container component centers content and provides responsive max-widths.

```html
<!-- Basic container -->
<div class="isu-container">
  <p>Centered content with responsive padding</p>
</div>

<!-- Container with background -->
<div class="isu-container bg-gray-50 py-8">
  <h2 class="isu-heading-2">Section Title</h2>
  <p class="isu-body">Container content with background</p>
</div>
```

## Grid System

Responsive grid components for organizing content in columns.

### 2 Column Grid
```html
<div class="isu-grid-2">
  <div class="isu-card">
    <h3 class="isu-heading-4">Column 1</h3>
    <p class="isu-body">Content for first column</p>
  </div>
  <div class="isu-card">
    <h3 class="isu-heading-4">Column 2</h3>
    <p class="isu-body">Content for second column</p>
  </div>
</div>
```

### 3 Column Grid
```html
<div class="isu-grid-3">
  <div class="isu-card">
    <p class="isu-body">Column 1 content</p>
  </div>
  <div class="isu-card">
    <p class="isu-body">Column 2 content</p>
  </div>
  <div class="isu-card">
    <p class="isu-body">Column 3 content</p>
  </div>
</div>
```

### 4 Column Grid
```html
<div class="isu-grid-4">
  <div class="isu-card">
    <p class="isu-body-sm">Column 1</p>
  </div>
  <div class="isu-card">
    <p class="isu-body-sm">Column 2</p>
  </div>
  <div class="isu-card">
    <p class="isu-body-sm">Column 3</p>
  </div>
  <div class="isu-card">
    <p class="isu-body-sm">Column 4</p>
  </div>
</div>
```

## Flex Utilities

Flexbox utility classes for common layout patterns.

### Flex Container
```html
<div class="isu-flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Space Between
```html
<div class="isu-flex-between">
  <span>Left content</span>
  <span>Right content</span>
</div>
```

### Center Content
```html
<div class="isu-flex-center">
  <span>Centered content</span>
</div>
```

## Card Component

Content containers with consistent styling and optional interactions.

### Basic Card
```html
<div class="isu-card">
  <h3 class="isu-heading-4">Card Title</h3>
  <p class="isu-body">Card content with default styling and subtle shadow.</p>
  <button class="isu-btn-primary">Action</button>
</div>
```

### Hover Card
```html
<div class="isu-card-hover">
  <h3 class="isu-heading-4">Interactive Card</h3>
  <p class="isu-body">This card has hover effects with enhanced shadow.</p>
  <button class="isu-btn-secondary">Learn More</button>
</div>
```

## Section Spacing

Consistent spacing for page sections.

### Default Section
```html
<section class="isu-section">
  <div class="isu-container">
    <h2 class="isu-heading-2">Section Title</h2>
    <p class="isu-body">Section content with standard spacing.</p>
  </div>
</section>
```

### Small Section
```html
<section class="isu-section-sm">
  <div class="isu-container">
    <h2 class="isu-heading-3">Compact Section</h2>
    <p class="isu-body">Section with reduced vertical spacing.</p>
  </div>
</section>
```

### Large Section
```html
<section class="isu-section-lg">
  <div class="isu-container">
    <h2 class="isu-heading-2">Hero Section</h2>
    <p class="isu-lead">Section with generous spacing for impact.</p>
  </div>
</section>
```

## Responsive Behavior

All layout components are mobile-first and responsive:

- **Mobile**: Single column, full width
- **Tablet (md)**: Multi-column layouts activate
- **Desktop (lg)**: Full grid layouts with optimal spacing

## CSS Classes Reference

| Class | Description |
|-------|-------------|
| `.isu-container` | Responsive container with max-width |
| `.isu-grid-2/3/4` | Responsive grid systems |
| `.isu-flex` | Basic flex container |
| `.isu-flex-between` | Space between items |
| `.isu-flex-center` | Center align items |
| `.isu-card` | Basic content card |
| `.isu-card-hover` | Interactive card with hover effects |
| `.isu-section` | Standard section spacing |
| `.isu-section-sm/lg` | Small/large section spacing |

## Best Practices

1. **Use semantic containers**: Wrap content in `isu-container` for consistent centering
2. **Choose appropriate grids**: Use `isu-grid-2` for forms, `isu-grid-3` for features
3. **Combine with cards**: Use cards within grids for structured content
4. **Maintain spacing**: Use section classes for consistent vertical rhythm
5. **Test responsiveness**: Verify layouts work across all screen sizes
