# ISU Design System

[![Build](https://github.com/istinye-university/isu-design-system/actions/workflows/build.yml/badge.svg)](https://github.com/istinye-university/isu-design-system/actions)
[![npm version](https://img.shields.io/npm/v/isu-design-system.svg)](https://www.npmjs.com/package/isu-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Official design system for Istinye University. A Tailwind CSS-based component library and style guide with Storybook documentation.

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

### With Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  presets: [
    require('isu-design-system/tailwind.config.js')
  ]
}
```

## 🎨 Available Components

### Layout Components
- `.isu-container` - Responsive container with max-width
- `.isu-grid`, `.isu-grid-2`, `.isu-grid-3`, `.isu-grid-4` - Responsive grid systems
- `.isu-flex`, `.isu-flex-between`, `.isu-flex-center` - Flexbox utilities
- `.isu-card`, `.isu-card-hover` - Card components with optional hover effects
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

### Button System
- `.isu-button` - Base button component
- Size variants: `.isu-button-sm/md/lg/xl`
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
The design system supports dark mode via `[data-theme="dark"]` attribute.

### Token Pipeline
```bash
# Edit tokens/colors.json
# Run token build
npm run tokens

# Tokens are automatically included in build
npm run build
```

## 📚 Storybook Documentation

Component documentation is available via Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view:
- Interactive component examples
- Design system documentation
- Component usage guidelines
- Visual testing interface

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
│   ├── css/isu.css          # Main CSS source
│   ├── components/          # Component stories
│   └── assets/logos/        # University logos
├── dist/isu.css            # Built CSS
├── .storybook/             # Storybook configuration
├── .github/workflows/      # GitHub Actions
└── tailwind.config.js      # Tailwind configuration
```

## 📝 License

MIT License - Istinye University
