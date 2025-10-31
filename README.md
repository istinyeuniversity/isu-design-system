# ISU Design System

[![npm version](https://badge.fury.io/js/isu-design-system.svg)](https://badge.fury.io/js/isu-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

- `.isu-button` - Base button styles
- `.isu-button-primary` - Primary button with university colors
- `.isu-logo` - Properly sized logo component

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

### NPM Token Setup
Add `NPM_TOKEN` secret in repository settings for automated publishing.

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
