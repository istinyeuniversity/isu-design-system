# @istinyeuniversity/isu-design-system

[![npm version](https://badge.fury.io/js/%40istinyeuniversity%2Fisu-design-system.svg)](https://badge.fury.io/js/%40istinyeuniversity%2Fisu-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official design system for Istinye University. A Tailwind CSS-based component library and style guide.

## 🚀 Installation

```bash
npm install @istinyeuniversity/isu-design-system
```

## 📖 Usage

### Direct HTML Usage
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="path/to/node_modules/@istinyeuniversity/isu-design-system/dist/isu.css" />
</head>
<body>
  <button class="isu-button-primary">Example Button</button>
</body>
</html>
```

### With Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  presets: [
    require('@istinyeuniversity/isu-design-system/tailwind.config.js')
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

# Development mode with watch
npm run dev

# Build for production
npm run build
```

## 🎯 Design Tokens

### Colors
- **Primary**: `#007fff` (Light mode), `#003eff` (Dark mode)
- **Neutral**: `#ededed` (Light mode), `#1a1a1a` (Dark mode)

### Typography
- **Heading**: Space Grotesk
- **Body**: Poppins

### Dark Mode
The design system supports dark mode via `[data-theme="dark"]` attribute.

## 📝 License

MIT License - Istinye University
