# Getting Started

## Installation

Install the ISU Design System package:

```bash
npm install isu-design-system
```

## Basic Usage

Import the CSS file in your HTML:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My ISU App</title>
  <link rel="stylesheet" href="path/to/node_modules/isu-design-system/dist/isu.css" />
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

Or import in JavaScript/Vue/React:

```javascript
import 'isu-design-system/dist/isu.css'
```

## Quick Examples

### Buttons
```html
<button class="isu-btn-primary">Primary Button</button>
<button class="isu-btn-secondary">Secondary Button</button>
<button class="isu-btn-outline">Outline Button</button>
```

### Layout
```html
<div class="isu-container">
  <div class="isu-grid-3">
    <div class="isu-card">
      <h3 class="isu-heading-3">Card Title</h3>
      <p class="isu-body">Card content</p>
    </div>
  </div>
</div>
```

### Forms
```html
<div class="isu-form-group">
  <label class="isu-form-label">Email</label>
  <input type="email" class="isu-input" placeholder="Enter email" />
</div>
```

## Design Tokens

The design system uses CSS custom properties for consistent theming:

```css
:root {
  --color-primary: #007fff;
  --color-primary-dark: #003eff;
  --color-neutral: #ededed;
  --color-neutral-dark: #1a1a1a;
}
```

## Dark Mode

Add dark mode support:

```html
<html data-theme="dark">
```

Or toggle with JavaScript:

```javascript
document.documentElement.setAttribute('data-theme', 'dark')
```

## CDN Usage

For prototyping, you can use the CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/isu-design-system@latest/dist/isu.css" />
```

::: warning
CDN usage is not recommended for production applications.
:::

## Next Steps

- [Browse Components](./components/)
- [Learn about Design Tokens](./tokens)
- [Contributing Guide](./contributing)
