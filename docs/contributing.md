# Contributing

We welcome contributions to the ISU Design System! This guide will help you get started.

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/istinyeuniversity/isu-design-system.git
cd isu-design-system

# Install dependencies
npm install

# Start development
npm run dev

# Start documentation
npm run docs:dev
```

## Development Workflow

### 1. Choose an Issue
- Check [GitHub Issues](https://github.com/istinyeuniversity/isu-design-system/issues) for open tasks
- Comment on the issue to indicate you're working on it

### 2. Create a Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 3. Make Changes
- Follow the existing code style
- Add tests for new features
- Update documentation
- Ensure all changes work across different browsers

### 4. Test Your Changes
```bash
# Build the project
npm run build

# Run documentation locally
npm run docs:dev

# Test in different browsers
```

### 5. Commit Your Changes
Use conventional commit format:

```bash
# Features
git commit -m "feat: add new button variant"

# Bug fixes
git commit -m "fix: resolve button hover state issue"

# Documentation
git commit -m "docs: update button component guide"

# Breaking changes
git commit -m "feat: redesign button API (BREAKING CHANGE)"
```

### 6. Create Pull Request
- Push your branch to GitHub
- Create a pull request with a clear description
- Reference any related issues
- Wait for review and address feedback

## Component Development

### Adding New Components

1. **Create CSS file** in `src/css/components/`
```css
/* src/css/components/new-component.css */
@layer components {
  .isu-new-component {
    @apply base-styles;
  }
}
```

2. **Import in main CSS** (`src/css/isu.css`)
```css
@import './components/new-component.css';
```

3. **Create documentation** (`docs/components/new-component.md`)
```markdown
# New Component

Description and usage examples.

## Basic Usage
```html
<div class="isu-new-component">Content</div>
```
```

4. **Update sidebar** in `docs/.vitepress/config.js`

### Component Guidelines

- **Use semantic class names**: `.isu-component-name`
- **Follow BEM principles** when needed
- **Include responsive variants**
- **Support dark mode**
- **Ensure accessibility**
- **Document all props/variants**

### CSS Best Practices

```css
/* Good */
.isu-button {
  @apply px-4 py-2 rounded-lg font-medium;
}

/* Avoid hardcoded values */
.isu-button {
  padding: 0.5rem 1rem; /* Use Tailwind utilities instead */
}
```

## Design Token Updates

### Adding New Tokens

1. **Edit token files** in `tokens/`
```json
// tokens/colors.json
{
  "color": {
    "new-color": { "value": "#123456" }
  }
}
```

2. **Rebuild tokens**
```bash
npm run tokens
```

3. **Use in components**
```css
.my-component {
  color: var(--color-new-color);
}
```

## Testing

### Manual Testing
- Test components in different browsers
- Check responsive behavior
- Verify accessibility with screen readers
- Test keyboard navigation

### Visual Testing
- Compare screenshots across browsers
- Test high contrast mode
- Verify color contrast ratios

## Documentation

### Writing Component Docs

Each component should have:
- **Overview**: What it does and when to use it
- **Basic usage**: Simple code examples
- **Variants**: Different styles and sizes
- **Accessibility**: ARIA attributes and keyboard support
- **Customization**: How to modify appearance

### Code Examples

Use syntax highlighting and provide copy-paste ready code:

````markdown
```html
<button class="isu-btn-primary">Click me</button>
```
````

## Release Process

### For Maintainers

1. **Review PRs** and merge approved changes
2. **Create releases** using semantic versioning:
```bash
npm run release  # Creates tag and updates changelog
git push --follow-tags origin main
```

### Release Types
- **PATCH** (`1.0.0` → `1.0.1`): Bug fixes
- **MINOR** (`1.0.0` → `1.1.0`): New features
- **MAJOR** (`1.0.0` → `2.0.0`): Breaking changes

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn and contribute
- Follow our [Code of Conduct](https://github.com/istinyeuniversity/isu-design-system/blob/main/CODE_OF_CONDUCT.md)

## Getting Help

- **Issues**: Report bugs or request features
- **Discussions**: Ask questions or share ideas
- **Documentation**: Check existing docs first
- **Community**: Join our developer community

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Added to contributors list
- Recognized in release notes
- Invited to community events

Thank you for contributing to the ISU Design System! 🎉
