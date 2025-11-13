# ISU Design System

[![Build](https://github.com/istinye-university/isu-design-system/actions/workflows/build.yml/badge.svg)](https://github.com/istinye-university/isu-design-system/actions)
[![npm version](https://img.shields.io/npm/v/isu-design-system.svg)](https://www.npmjs.com/package/isu-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Official design system for Istinye University. A Tailwind CSS-based component library and style guide with comprehensive documentation.

## 🚀 Installation

```bash
npm install isu-design-system
```

## 📖 Usage

### Direct HTML Usage
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="path/to/node_modules/isu-design-system/dist/isu.css" />
</head>
<body>
  <button class="isu-button-primary">Primary Button</button>
  <button class="isu-button bg-neutral text-gray-800 border border-gray-300">Secondary Button</button>
</body>
</html>
```

### With Tailwind CSS Preset
```javascript
// tailwind.config.js
module.exports = {
  presets: [
    require('isu-design-system/tailwind-preset.js')
  ],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ]
}
```

### With Tailwind CSS (Custom)
```javascript
// tailwind.config.js
const isuPreset = require('isu-design-system/tailwind-preset.js');

module.exports = {
  presets: [isuPreset],
  // Add your customizations
  theme: {
    extend: {
      colors: {
        brand: isuPreset.theme.extend.colors.primary
      }
    }
  }
}
```

### In JavaScript/TypeScript Applications

#### CSS Import
```javascript
// Import CSS in your main application file
import 'isu-design-system/dist/isu.css';

// For Vite applications
import isuCSS from 'isu-design-system/dist/isu.css?inline';
// or
import 'isu-design-system/dist/isu.css';
```

#### Component Usage
```javascript
// Import individual components
import { createButton, createCard, createInput } from 'isu-design-system/src/components/Button.js';
import { createAlert, createBadge } from 'isu-design-system/src/components/Feedback.js';

// Use components
const button = createButton({
  label: 'Click me',
  variant: 'primary',
  size: 'md'
});

const alert = createAlert({
  type: 'success',
  title: 'Success!',
  description: 'Operation completed successfully.'
});
```

#### React/Vue Integration
```jsx
// React Example
import React from 'react';
import 'isu-design-system/dist/isu.css';

function App() {
  return (
    <div data-theme="light">
      <button className="isu-button isu-button-primary">
        Primary Button
      </button>
      <div className="isu-card">
        <h3 className="isu-heading-3">Card Title</h3>
        <p className="isu-body">Card content here.</p>
      </div>
    </div>
  );
}
```

```vue
<!-- Vue Example -->
<template>
  <div :data-theme="theme">
    <button class="isu-button isu-button-primary">
      Primary Button
    </button>
    <div class="isu-card">
      <h3 class="isu-heading-3">Card Title</h3>
      <p class="isu-body">Card content here.</p>
    </div>
  </div>
</template>

<script setup>
import 'isu-design-system/dist/isu.css';
import { ref } from 'vue';

const theme = ref('light');
</script>
```

#### Theme Switching
```javascript
// JavaScript
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
}

// React Hook
function useTheme() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, toggleTheme };
}
```

## 🎨 Available Components

### Layout Components
- `.isu-container` - Responsive container with max-width
- `.isu-grid`, `.isu-grid-2`, `.isu-grid-3`, `.isu-grid-4` - Responsive grid systems
- `.isu-flex`, `.isu-flex-between`, `.isu-flex-center` - Flexbox utilities
- `.isu-card`, `.isu-card-hover` - Card components with optional hover effects
- `.isu-card.hover-lift` - Card with lift animation on hover
- `.isu-card.stat-card` - Statistic card variant for displaying metrics
- `.isu-section`, `.isu-section-sm`, `.isu-section-lg` - Section spacing utilities

### Typography Components
- `.isu-heading-1` through `.isu-heading-6` - Hierarchical heading styles
- `.isu-body`, `.isu-body-sm`, `.isu-body-lg` - Body text variants
- `.isu-lead` - Lead paragraph styling
- `.isu-caption`, `.isu-caption-sm` - Caption text styles
- `.isu-link`, `.isu-link-subtle` - Link styling variants
- `.isu-quote`, `.isu-quote-author` - Blockquote components

### Form Components
- `.isu-input` - Styled input fields with focus states
- `.isu-textarea` - Multi-line text input
- `.isu-select` - Styled dropdown select
- `.isu-checkbox`, `.isu-radio` - Form control inputs
- `.isu-btn-primary`, `.isu-btn-secondary`, `.isu-btn-ghost`, `.isu-btn-outline` - Button variants
- `.isu-form-group`, `.isu-form-label`, `.isu-form-help`, `.isu-form-error` - Form layout utilities

### Navigation Components
- `.isu-nav`, `.isu-nav-container` - Navigation bar structure
- `.isu-nav-link`, `.isu-nav-mobile-link` - Navigation links
- `.isu-breadcrumb`, `.isu-breadcrumb-link` - Breadcrumb navigation
- `.isu-pagination` - Pagination controls

### Feedback Components
- `.isu-alert-success/error/warning/info` - Alert message variants
- `.isu-badge-primary/secondary/success/warning/error` - Status badges
- `.isu-spinner-sm/md/lg` - Loading spinner sizes
- `.isu-progress`, `.isu-progress-bar` - Progress indicators
- `.isu-toast-success/error/warning` - Toast notification variants

### Process Components
- `.isu-timeline` - Timeline component for process tracking
  - `.isu-timeline-item.completed/active/pending` - Timeline item states
  - `.isu-timeline-marker` - Timeline marker indicator
  - `.isu-timeline-content`, `.isu-timeline-title`, `.isu-timeline-date`, `.isu-timeline-person`, `.isu-timeline-note` - Timeline content elements
- `.isu-step-indicator` - Multi-step form indicator
  - `.isu-step.completed/active/pending` - Step states
  - `.isu-step-circle` - Step number circle
  - `.isu-step-label` - Step label text

### Data Display Components
- `.isu-table` - Styled data table with hover effects
  - `.isu-table thead`, `.isu-table tbody` - Table sections
  - `.isu-table th`, `.isu-table td` - Table cells
- `.isu-score-display` - Score/metric display with gradient background
  - `.isu-score-value` - Large score value
  - `.isu-score-label` - Score label
  - `.isu-score-max` - Maximum value indicator
- `.isu-requirement-check` - Requirement validation display
  - `.isu-requirement-check.met` - Met requirement (green)
  - `.isu-requirement-check.not-met` - Unmet requirement (red)
  - `.isu-requirement-icon` - Check/cross icon
  - `.isu-requirement-text` - Requirement text

### File Upload Component
- `.isu-file-upload` - File upload container
  - `.isu-file-upload-area` - Drag & drop upload area
  - `.isu-file-upload.dragover` - Drag over state
  - `.isu-file-upload-icon` - Upload icon
  - `.isu-file-upload-text` - Upload text
  - `.isu-file-upload-hint` - Helper text

### Button System
- `.isu-button` - Base button component
- Size variants: `.isu-button-sm/md/lg/xl` (small variant now available)
- Color variants: `.isu-button-primary/secondary/ghost/outline/success/warning/error`
- `.isu-button-group` - Button grouping utility
- `.isu-button-loading` - Loading state for buttons
- `.isu-fab` - Floating action button

### Utility Classes
- `.isu-sr-only` - Screen reader only content
- `.isu-focus-ring` - Accessible focus indicators
- `.isu-scroll` - Custom scrollbar styling
- `.isu-text-truncate`, `.isu-text-multiline` - Text truncation utilities
- `.isu-aspect-*` - Aspect ratio utilities
- Animation utilities: `.isu-animate-fade-in`, `.isu-animate-slide-up`, etc.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build design tokens from JSON
npm run tokens

# Development mode with CSS watch
npm run dev

# Build CSS for production
npm run build

# Run Storybook development server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## 🎯 Design Tokens

Design tokens are managed via [Style Dictionary](https://styledictionary.com/) and stored in `tokens/` directory.

### Token Sources
- `tokens/colors.json` - Color palette definitions
- Auto-generated CSS variables in `src/styles/tokens.css`

### Colors
- **Primary**: `var(--color-primary)` → `#007fff`
- **Primary Dark**: `var(--color-primary-dark)` → `#003eff`
- **Neutral**: `var(--color-neutral)` → `#ededed`
- **Neutral Dark**: `var(--color-neutral-dark)` → `#1a1a1a`

### Typography
- **Heading**: Space Grotesk
- **Body**: Poppins

### Dark Mode
The design system supports comprehensive dark mode with automatic theme switching:

#### Setup
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="path/to/isu-design-system/dist/isu.css" />
</head>
<body>
  <!-- Content -->
</body>
</html>
```

#### Theme Switching
```javascript
// Switch to dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Switch to light mode
document.documentElement.setAttribute('data-theme', 'light');
```

#### CSS Classes
All components automatically adapt to the current theme:
- Background colors automatically switch
- Text colors adjust for contrast
- Borders and shadows update accordingly
- Semantic colors (success, error, warning) work in both themes

### Token Pipeline
```bash
# Edit tokens/colors.json
# Run token build
npm run tokens

# Tokens are automatically included in build
npm run build
```

## 📚 Storybook Documentation

Comprehensive component documentation is available via Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view:
- **Interactive Components**: All UI components with live controls
- **Design System Guide**: Typography, colors, spacing, and usage guidelines
- **Component Stories**: Real-world usage examples for each component
- **Responsive Testing**: View components at different screen sizes
- **Dark Mode Preview**: Test components in both light and dark themes

### Available Stories
- **Button**: Primary, secondary, ghost, outline, success, warning, error variants
- **Forms**: Input, textarea, select, checkbox, radio, form groups
- **Layout**: Cards (including hover-lift and stat-card variants), grids, containers, flex utilities
- **Feedback**: Alerts, badges, spinners, progress bars, toasts
- **Navigation**: Breadcrumbs, pagination, tabs
- **Typography**: Headings, body text, links, quotes
- **Timeline**: Process tracking with completed/active/pending states
- **Step Indicator**: Multi-step form progress indicator
- **File Upload**: Drag & drop file upload area
- **Requirement Check**: Validation requirement display
- **Score Display**: Metric/score display with gradient
- **Table**: Styled data tables with hover effects

## 🤖 Automated Publishing

This project uses GitHub Actions for automated NPM publishing:

### Release Process
1. Create a new release on GitHub
2. GitHub Actions automatically:
   - Builds the CSS
   - Updates version number
   - Publishes to NPM
   - Updates documentation

### Manual Publishing
1. Go to GitHub Actions tab
2. Run "Publish to NPM" workflow
3. Select version type (patch/minor/major)

### Semantic Versioning
This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated semantic versioning:

```bash
# Create a new release (automatically determines version bump)
npm run release

# Push to GitHub with tags
git push --follow-tags origin main
```

### NPM Token Setup
Add `NPM_TOKEN` secret in repository settings for automated publishing.

### Release Types
- **patch** (`1.0.0` → `1.0.1`): Bug fixes
- **minor** (`1.0.0` → `1.1.0`): New features
- **major** (`1.0.0` → `2.0.0`): Breaking changes

### Commit Convention
Use conventional commits for automatic changelog generation:
- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `BREAKING CHANGE:` - Breaking changes (major version bump)

## 📁 Project Structure

```
isu-design-system/
├── src/
│   ├── css/
│   │   ├── isu.css              # Main CSS source with dark theme
│   │   └── utilities.css        # Additional utility classes
│   ├── components/              # Component JavaScript and Stories
│   │   ├── Button.js            # Button component and stories
│   │   ├── Card.js              # Layout components and stories
│   │   ├── Input.js             # Form components and stories
│   │   ├── Feedback.js          # Alert, badge, spinner components
│   │   ├── Navigation.js        # Breadcrumb, pagination components
│   │   ├── Typography.js        # Text components and stories
│   │   ├── Logo.js              # Logo component
│   │   ├── Timeline.js          # Timeline component for process tracking
│   │   ├── StepIndicator.js     # Multi-step form indicator
│   │   ├── FileUpload.js        # File upload component
│   │   ├── RequirementCheck.js  # Requirement validation display
│   │   ├── ScoreDisplay.js      # Score/metric display component
│   │   └── Table.js              # Data table component
│   ├── styles/
│   │   └── tokens.css           # Auto-generated design tokens
│   └── assets/logos/            # University logos (EN/TR variants)
├── dist/isu.css                # Built CSS for distribution
├── tailwind-preset.js          # Tailwind CSS preset
├── tokens/colors.json          # Color token definitions
├── build-tokens.js             # Style Dictionary build script
├── .storybook/                 # Storybook configuration
├── .github/workflows/          # GitHub Actions CI/CD
├── tailwind.config.js          # Tailwind configuration
├── index.html                  # Demo and testing page
└── package.json                # Project configuration
```

## 📝 License

MIT License - Istinye University
