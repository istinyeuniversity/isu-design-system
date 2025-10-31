# Components

The ISU Design System provides 60+ pre-built components organized into categories.

## Component Categories

### Layout Components
Foundational layout utilities for building page structures.

- [Container](./layout) - Responsive containers
- [Grid](./layout) - Responsive grid systems
- [Flex](./layout) - Flexbox utilities
- [Card](./layout) - Content containers

### Typography
Text styling and hierarchy components.

- [Headings](./typography) - H1-H6 with responsive sizing
- [Body Text](./typography) - Paragraph and text variants
- [Links](./typography) - Styled link components

### Form Components
Input controls and form elements.

- [Buttons](./button) - Action buttons with variants
- [Inputs](./forms) - Text inputs and form controls
- [Select](./forms) - Dropdown selections
- [Checkboxes & Radio](./forms) - Form control inputs

### Navigation
Site navigation and menu components.

- [Navbar](./navigation) - Main navigation bar
- [Breadcrumb](./navigation) - Navigation hierarchy
- [Pagination](./navigation) - Page navigation

### Feedback
User feedback and status components.

- [Alerts](./feedback) - Status messages
- [Badges](./feedback) - Status indicators
- [Loading](./feedback) - Loading states
- [Toast](./feedback) - Notification messages

## Usage Guidelines

### HTML Structure
```html
<!-- Use semantic HTML -->
<button class="isu-btn-primary">Action</button>

<!-- Combine with utilities -->
<div class="isu-card isu-shadow-lg">
  <h3 class="isu-heading-3">Title</h3>
</div>
```

### Responsive Design
All components are mobile-first and responsive by default.

```html
<!-- Responsive grid -->
<div class="isu-grid-2 md:isu-grid-3 lg:isu-grid-4">
  <!-- Content -->
</div>
```

### Customization
Components use CSS custom properties for easy theming:

```css
:root {
  --color-primary: #your-color;
}
```

## Component Status

| Component | Status | Version |
|-----------|--------|---------|
| Button | ✅ Complete | v2.0.0 |
| Layout | ✅ Complete | v2.0.0 |
| Typography | ✅ Complete | v2.0.0 |
| Forms | ✅ Complete | v2.0.0 |
| Navigation | ✅ Complete | v2.0.0 |
| Feedback | ✅ Complete | v2.0.0 |

::: info
All components follow Istinye University's design guidelines and accessibility standards.
:::
