# Design Tokens

Design tokens are the foundation of the ISU Design System. They define colors, typography, spacing, and other design decisions in a systematic way.

## Token Management

This project uses [Style Dictionary](https://styledictionary.com/) to manage design tokens. Tokens are defined in JSON format and automatically converted to CSS custom properties.

## Color Tokens

### Primary Colors
```json
{
  "color": {
    "primary": { "value": "#007fff" },
    "primary-dark": { "value": "#003eff" }
  }
}
```

### Neutral Colors
```json
{
  "color": {
    "neutral": { "value": "#ededed" },
    "neutral-dark": { "value": "#1a1a1a" }
  }
}
```

### Generated CSS
```css
:root {
  --color-primary: #007fff;
  --color-primary-dark: #003eff;
  --color-neutral: #ededed;
  --color-neutral-dark: #1a1a1a;
}
```

## Typography Tokens

### Font Families
- **Heading**: Space Grotesk, sans-serif
- **Body**: Poppins, sans-serif

### Font Sizes (Responsive)
```css
.isu-heading-1 { font-size: 2.25rem; line-height: 2.5rem; }      /* 36px */
.isu-heading-2 { font-size: 1.875rem; line-height: 2.25rem; }    /* 30px */
.isu-heading-3 { font-size: 1.5rem; line-height: 2rem; }          /* 24px */
.isu-heading-4 { font-size: 1.25rem; line-height: 1.75rem; }      /* 20px */
.isu-heading-5 { font-size: 1.125rem; line-height: 1.75rem; }     /* 18px */
.isu-heading-6 { font-size: 1rem; line-height: 1.5rem; }          /* 16px */
```

## Spacing Tokens

### Container Max Widths
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Section Spacing
- **Small**: 2rem (32px)
- **Medium**: 3rem (48px)
- **Large**: 4rem (64px)

## Component Tokens

### Button Properties
```css
--button-padding-x: 1rem;
--button-padding-y: 0.5rem;
--button-border-radius: 0.375rem;
--button-font-weight: 500;
```

### Input Properties
```css
--input-padding-x: 1rem;
--input-padding-y: 0.75rem;
--input-border-radius: 0.375rem;
--input-border-width: 1px;
```

### Card Properties
```css
--card-padding: 1.5rem;
--card-border-radius: 0.5rem;
--card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
```

## Using Tokens in Components

### Direct CSS Usage
```css
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

### With Tailwind Classes
```html
<!-- Using design system classes -->
<button class="isu-btn-primary">Button</button>

<!-- Custom component with tokens -->
<div style="background: var(--color-primary)">Custom Component</div>
```

## Dark Mode Tokens

The design system supports automatic dark mode:

```css
[data-theme="dark"] {
  --color-primary: #003eff;
  --color-neutral: #1a1a1a;
}
```

### JavaScript Theme Switching
```javascript
// Light mode
document.documentElement.setAttribute('data-theme', 'light');

// Dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// System preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
```

## Token Pipeline

### Development Workflow
```bash
# Edit tokens
edit tokens/colors.json

# Build tokens
npm run tokens

# Build CSS
npm run build
```

### File Structure
```
tokens/
├── colors.json          # Color definitions
└── ...                  # Future token files

src/styles/
├── tokens.css          # Generated CSS variables
└── ...

dist/
├── isu.css            # Final compiled CSS
└── ...
```

## Extending Tokens

### Adding New Colors
```json
// tokens/colors.json
{
  "color": {
    "primary": { "value": "#007fff" },
    "secondary": { "value": "#10b981" },
    "accent": { "value": "#f59e0b" }
  }
}
```

### Custom Token Files
```json
// tokens/spacing.json
{
  "spacing": {
    "xs": { "value": "0.25rem" },
    "sm": { "value": "0.5rem" },
    "md": { "value": "1rem" },
    "lg": { "value": "1.5rem" },
    "xl": { "value": "2rem" }
  }
}
```

## Best Practices

1. **Use semantic names**: `primary` instead of `blue`
2. **Maintain consistency**: Use the same values across components
3. **Version tokens**: Track token changes in version control
4. **Document usage**: Explain when to use each token
5. **Test thoroughly**: Ensure tokens work across all components

## Migration Guide

### From Hardcoded Values
```css
/* Before */
.my-button {
  background: #007fff;
  color: white;
}

/* After */
.my-button {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
```

### From Utility Classes
```html
<!-- Before -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">Button</button>

<!-- After -->
<button class="isu-btn-primary">Button</button>
```
