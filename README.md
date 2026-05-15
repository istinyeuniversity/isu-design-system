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

### Direct HTML Usage (CSS only)
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

### Plain HTML / Server-Rendered Apps (CSS + JS)

Interactive components (Drawer, Modal, Accordion, Tabs, Tooltip, Switch) require the JavaScript bundle. Add the `dist/isu.js` IIFE bundle; it auto-initializes any element with `data-isu-*` attributes on `DOMContentLoaded` and also exposes a global `window.ISU` for imperative use.

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="/node_modules/isu-design-system/dist/isu.css" />
  <script src="/node_modules/isu-design-system/dist/isu.js" defer></script>
</head>
<body>
  <!-- Drawer trigger + hidden template -->
  <button class="isu-button-primary" data-isu-drawer-target="#profileDrawer">Open Drawer</button>
  <template id="profileDrawer" data-isu-drawer data-side="right" data-size="md" data-title="Profile">
    <p>Put any HTML here. The drawer is mounted on trigger click.</p>
    <button class="isu-button-primary">Save</button>
  </template>
</body>
</html>
```

#### ASP.NET MVC / Razor (.cshtml)

Install the package with npm and expose `node_modules/isu-design-system/dist/` as a static folder, or copy `dist/isu.js` and `dist/isu.css` under `wwwroot/lib/isu/`. Reference them in `Views/Shared/_Layout.cshtml`:

```html
<!-- _Layout.cshtml <head> -->
<link rel="stylesheet" href="~/lib/isu/isu.css" asp-append-version="true" />
<script src="~/lib/isu/isu.js" defer asp-append-version="true"></script>
```

Then use declarative markup in any view:

```html
@* Views/Home/Index.cshtml *@
@{
    ViewData["Title"] = "Home Page";
}

<div class="isu-container">
    <button class="isu-button-primary" data-isu-drawer-target="#demoDrawer">Open Drawer</button>

    <template id="demoDrawer"
              data-isu-drawer
              data-side="right"
              data-size="md"
              data-title="Details">
        <p>This content is cloned into the drawer each time it opens.</p>
    </template>

    <div data-isu-accordion data-type="single" data-collapsible="true">
        <div data-isu-accordion-item data-value="a" data-default-open>
            <div data-isu-accordion-title>Section 1</div>
            <div data-isu-accordion-body>Content 1</div>
        </div>
        <div data-isu-accordion-item data-value="b">
            <div data-isu-accordion-title>Section 2</div>
            <div data-isu-accordion-body>Content 2</div>
        </div>
    </div>
</div>
```

#### FastAPI (Python + Jinja2)

Install the package with npm and copy `dist/isu.css` + `dist/isu.js` under `static/vendor/isu/` (or mount `node_modules/isu-design-system/dist` as a static route). Typical project layout:

```
myapp/
  main.py
  static/
    vendor/
      isu/
        isu.css
        isu.js
  templates/
    base.html
    index.html
```

Wire up static files and Jinja2 in `main.py`:

```python
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
```

Reference the CSS and JS bundle in `templates/base.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{% block title %}ISU App{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', path='vendor/isu/isu.css') }}" />
  <script src="{{ url_for('static', path='vendor/isu/isu.js') }}" defer></script>
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>
```

Then use declarative markup in `templates/index.html`:

```html
{% extends "base.html" %}
{% block title %}Home{% endblock %}

{% block content %}
<div class="isu-container p-6">
  <button class="isu-button-primary" data-isu-drawer-target="#demoDrawer">Open Drawer</button>

  <template id="demoDrawer"
            data-isu-drawer
            data-side="right"
            data-size="md"
            data-title="Details">
    <p>This content is cloned into the drawer each time it opens.</p>
  </template>

  <div class="mt-6" data-isu-accordion data-type="single" data-collapsible="true">
    <div data-isu-accordion-item data-value="a" data-default-open>
      <div data-isu-accordion-title>Section 1</div>
      <div data-isu-accordion-body>Content 1</div>
    </div>
    <div data-isu-accordion-item data-value="b">
      <div data-isu-accordion-title>Section 2</div>
      <div data-isu-accordion-body>Content 2</div>
    </div>
  </div>
</div>
{% endblock %}
```

For HTMX or other partial-response flows, call `ISU.init(newRoot)` after each swap so newly inserted `data-isu-*` elements get wired up:

```html
<body hx-on::after-swap="ISU.init(event.detail.target)">
```

### Declarative Data-Attribute API Reference

All data attributes go on the elements shown. If new markup is inserted after page load (AJAX, partial views), call `window.ISU.init()` to rescan the DOM. The initializer is idempotent.

#### Drawer
```html
<button data-isu-drawer-target="#myDrawer">Open</button>

<template id="myDrawer"
          data-isu-drawer
          data-side="right"                <!-- left | right | top | bottom -->
          data-size="md"                   <!-- sm | md | lg | xl -->
          data-title="My Drawer"
          data-close-on-backdrop="true"
          data-close-on-escape="true"
          data-closable="true">
  <p>Any HTML...</p>
</template>
```

#### Modal
```html
<button data-isu-modal-target="#myModal">Open</button>

<template id="myModal"
          data-isu-modal
          data-size="md"                   <!-- sm | md | lg | xl | full -->
          data-title="Confirm"
          data-description="Optional subtitle"
          data-close-on-backdrop="true"
          data-close-on-escape="true">
  <p>Modal body HTML...</p>
</template>
```

#### Accordion
```html
<div data-isu-accordion
     data-type="single"                   <!-- single | multiple -->
     data-collapsible="true"
     data-ghost="false"
     data-heading-level="3">
  <div data-isu-accordion-item data-value="a" data-default-open>
    <div data-isu-accordion-title>Title</div>
    <div data-isu-accordion-body>Body HTML</div>
  </div>
  <div data-isu-accordion-item data-value="b" data-disabled>
    <div data-isu-accordion-title>Disabled Item</div>
    <div data-isu-accordion-body>...</div>
  </div>
</div>
```

#### Tabs
```html
<div data-isu-tabs
     data-orientation="horizontal"        <!-- horizontal | vertical -->
     data-variant="line"                  <!-- line | pills -->
     data-size="md"                       <!-- sm | md | lg -->
     data-default-value="overview">
  <div data-isu-tab data-value="overview" data-label="Overview">
    Overview panel HTML
  </div>
  <div data-isu-tab data-value="details" data-label="Details">
    Details panel HTML
  </div>
</div>
```

#### Tooltip
```html
<button data-isu-tooltip="Hint text" data-placement="top">?</button>
```

#### Switch
```html
<span data-isu-switch
      data-label="Enable notifications"
      data-description="Optional helper"
      data-checked="true"
      data-size="md"
      data-name="notify"></span>
```

### Imperative JavaScript API

The bundle also exposes every factory on `window.ISU` for ad-hoc use:

```html
<script>
  const drawer = ISU.createDrawer({
    title: 'Profile',
    content: '<p>Custom HTML</p>',
    side: 'right',
    size: 'md',
  });
  document.getElementById('openBtn').addEventListener('click', () => {
    ISU.openDrawer(drawer);
  });
</script>
```

Full list: `createDrawer`, `openDrawer`, `closeDrawer`, `createModal`, `openModal`, `closeModal`, `confirmModal`, `createAccordion`, `createTabs`, `attachTooltip`, `removeTooltip`, `createSwitch`, `createButton`, `createButtonGroup`, `createToggleGroup`, `createImageSlider`, `createDatePicker`, `createTree`, `createDescriptionList`, `createInlineEdit`, `createSplitter`, `createDataTable`, `createCard`, `createAvatar`, `createSlider`, `createRating`, `createFileUpload`, `createSearchbar`, `createCopyLink`, `createSkeleton`, `createKbd`, `createStat`, `createStatCard`, `createStepIndicator`, `createTimeline`, `createTable`, `createBreadcrumb`, `createPagination`, `createNavBar`, `createSidebar`, `createSidebarShell`, `createFooter`, `createEmptyState`, `createFab`, `createLogo`, and `init` (rescan DOM).

### Storybook Examples / Snippets

- Çalıştırma: `npm run storybook`
- Statik çıktı: `npm run build-storybook`
- Storybook Docs içinde “Examples/Showcase” sayfasında canlı önizleme + kod snippet’leri (Canvas + Source) görebilirsiniz.

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
import { createFooter } from 'isu-design-system/src/components/Footer.js';
import { createTimeline } from 'isu-design-system/src/components/Timeline.js';

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

const footer = createFooter({
  logoVariant: 'blue-tr',
  universityName: 'İstinye Üniversitesi',
  contact: {
    email: 'ik@istinye.edu.tr',
    phone: '+90 (216) 577 55 55'
  },
  links: [
    { href: '#', text: 'Gizlilik Politikası' },
    { href: '#', text: 'Kullanım Koşulları' }
  ],
  copyright: '© 2025 İstinye Üniversitesi. Tüm hakları saklıdır.'
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
- `.isu-card-header` - Card header section
- `.isu-stat-icon`, `.isu-stat-content`, `.isu-stat-label`, `.isu-stat-value` - Stat card internal components
- `.isu-view-container` - View container with fade-in animation
- `.isu-view-container-active` - Active state for view container
- `.isu-app-wrapper` - App wrapper for sticky footer layout
- `.isu-layout-shell`, `.isu-layout-sidebar`, `.isu-layout-main`, `.isu-layout-content` - Hybrid desktop/mobile app shell for sidebar layouts
- `.isu-layout-mobile-bar`, `.isu-sidebar-mobile-trigger` - Mobile top bar with drawer trigger
- `.isu-section`, `.isu-section-sm`, `.isu-section-lg` - Section spacing utilities
- `.isu-footer` - Footer component with responsive grid layout
  - `.isu-footer-content`, `.isu-footer-brand`, `.isu-footer-logo`, `.isu-footer-university` - Footer header and branding parts
  - `.isu-footer-contact`, `.isu-footer-links`, `.isu-footer-bottom` - Footer body and bottom strip parts

### Typography Components
- `.isu-heading-1` through `.isu-heading-6` - Hierarchical heading styles
- `.isu-body`, `.isu-body-sm`, `.isu-body-lg` - Body text variants
- `.isu-lead` - Lead paragraph styling
- `.isu-caption`, `.isu-caption-sm` - Caption text styles
- `.isu-link`, `.isu-link-subtle` - Link styling variants
- `.isu-quote`, `.isu-quote-author` - Blockquote components

### Form Components
- `.isu-date-picker` - Date picker input with popover calendar (combobox pattern, TR locale by default)
  - `.isu-date-picker-input-wrap`, `.isu-date-picker-input`, `.isu-date-picker-trigger` - Input field parts
  - `.isu-date-picker-popover` - Calendar dialog
  - `.isu-date-picker-header`, `.isu-date-picker-month-year`, `.isu-date-picker-prev`, `.isu-date-picker-next` - Month navigation
  - `.isu-date-picker-weekdays`, `.isu-date-picker-weekday` - Weekday header row
  - `.isu-date-picker-grid`, `.isu-date-picker-row`, `.isu-date-picker-day` - Day grid
  - `.isu-date-picker-day-today`, `.isu-date-picker-day-selected`, `.isu-date-picker-day-outside`, `.isu-date-picker-day-disabled` - Day state modifiers
  - `.isu-date-picker-footer`, `.isu-date-picker-today-btn`, `.isu-date-picker-clear-btn` - Footer actions
  - Arrow keys / PageUp-Down (month) / Shift+PageUp-Down (year) / Home-End / Enter / Esc — keyboard navigation
- `.isu-input` - Styled input fields with focus states
- `.isu-textarea` - Multi-line text input
- `.isu-select` - Styled dropdown select
- `.isu-checkbox`, `.isu-radio` - Form control inputs
- `.isu-btn-primary`, `.isu-btn-secondary`, `.isu-btn-ghost`, `.isu-btn-outline` - Button variants
- `.isu-form-group`, `.isu-form-label`, `.isu-form-help`, `.isu-form-error` - Form layout utilities
- `.isu-switch` - Toggle switch
  - `.isu-switch-input`, `.isu-switch-track`, `.isu-switch-thumb`, `.isu-switch-label`, `.isu-switch-description` - Switch internal parts
  - `.isu-switch-sm/lg` - Size variants (default md)
- `.isu-searchbar` - Search input with leading icon and clear button
  - `.isu-searchbar-sm/lg` - Size variants (default md)
  - `.isu-searchbar-icon`, `.isu-searchbar-input`, `.isu-searchbar-clear` - Searchbar internal parts
  - `.has-value` - State class that reveals the clear button
- `.isu-slider` - Styled native range input
  - `.isu-slider-sm/lg` - Size variants (default md)
  - `.isu-slider-group`, `.isu-slider-header`, `.isu-slider-label`, `.isu-slider-value` - Slider wrapper parts
  - `--isu-slider-progress` - CSS variable for percent fill on the track

### Navigation Components
- `.isu-nav`, `.isu-nav-container` - Navigation bar structure
- `.isu-nav-link` - Navigation link with active state and hover effects
- `.isu-nav-mobile-link` - Navigation links
- `.isu-breadcrumb`, `.isu-breadcrumb-link` - Breadcrumb navigation
- `.isu-pagination` - Pagination controls
- `.isu-sidebar`, `.isu-sidebar-header`, `.isu-sidebar-section`, `.isu-sidebar-group`, `.isu-sidebar-link` - Sidebar structure with nested groups
- `.isu-sidebar-badge`, `.isu-sidebar-divider`, `.isu-sidebar-footer` - Sidebar utility parts

### Feedback Components
- `.isu-alert-success/error/warning/info` - Alert message variants
- `.isu-badge-primary/secondary/success/warning/error` - Status badges
- `.isu-status-badge` - Status badge with variants (in-progress, pending, hr, completed, rejected)
- `.isu-spinner-sm/md/lg` - Loading spinner sizes
- `.isu-progress`, `.isu-progress-bar` - Progress indicators
- `.isu-toast` - Toast notification component with success/error/info/warning variants
- `.isu-toast-hidden` - Hidden state for toast notifications

### Process Components
- `.isu-timeline` - Timeline component for process tracking
  - `.isu-timeline-item.completed/active/pending` - Timeline item states
  - `.isu-timeline-marker` - Timeline marker indicator
  - `.isu-timeline-content`, `.isu-timeline-title`, `.isu-timeline-date`, `.isu-timeline-person`, `.isu-timeline-note` - Timeline content elements
- `.isu-step-indicator` - Multi-step form indicator
  - `.isu-step.completed/active/pending` - Step states
  - `.isu-step-circle` - Step number circle
  - `.isu-step-label` - Step label text
- `.isu-form-step` - Form step component with active/completed states

### Data Display Components
- `.isu-table` - Styled data table with hover effects (simple, used by `createTable`)
  - `.isu-table thead`, `.isu-table tbody` - Table sections
  - `.isu-table th`, `.isu-table td` - Table cells
- `.isu-data-table` - Advanced table with sort / search / pagination / selection (used by `createDataTable`). **Coexists with `.isu-table`** — existing projects using `createTable` are not affected.
  - `.isu-data-table-toolbar` - Top bar (hosts search input)
  - `.isu-data-table-scroll`, `.isu-data-table-table` - Scroll container + styled `<table>`
  - `.isu-data-table-sticky` - Sticky header modifier on the table
  - `.isu-data-table-compact` - Compact density modifier on the root
  - `.isu-data-table-resizable` - Resizable columns modifier (applied to the `<table>`; switches to `table-layout: fixed` and enables ellipsis on cells)
  - `.isu-data-table-th-resizable`, `.isu-data-table-resize-handle`, `.isu-data-table-resizing` - Drag handle on each resizable header + body state during active drag
  - `.isu-data-table-sort`, `.isu-data-table-sort-asc`, `.isu-data-table-sort-desc`, `.isu-data-table-sort-icon` - Sortable header button + state
  - `.isu-data-table-row-selected` - Selected row state
  - `.isu-data-table-checkbox-col` - Checkbox column width
  - `.isu-data-table-align-center`, `.isu-data-table-align-right` - Cell alignment
  - `.isu-data-table-empty` - Empty state host (embeds `createEmptyState`)
  - `.isu-data-table-footer`, `.isu-data-table-summary`, `.isu-data-table-page-controls`, `.isu-data-table-page-btn`, `.isu-data-table-page-size` - Pagination footer parts
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

### Organization Tree Component
- `.isu-tree` - Tree root (`<ul role="tree">`, recursive nesting via `.isu-tree-children`)
- `.isu-tree-item` - Tree item container (`<li role="treeitem">`)
- `.isu-tree-row` - Clickable row containing toggle, icon, label, badge
- `.isu-tree-row-selected` - Selected state modifier
- `.isu-tree-toggle` - Expand/collapse chevron button
- `.isu-tree-toggle-expanded` - Expanded state (rotates 90°)
- `.isu-tree-toggle-empty` - Spacer for leaf nodes (keeps label alignment)
- `.isu-tree-icon` - Optional icon slot
- `.isu-tree-label` - Item label
- `.isu-tree-badge` - Trailing badge (count, status)
- `.isu-tree-children` - Children container (recursive `<ul role="group">`)
- `.isu-tree-children-show` - Reveals children
- Arrow keys / Home / End / Enter / Space — full ARIA tree keyboard navigation

### Description List
- `.isu-description-list` - Semantic `<dl>` for label-value pairs (profiles, order summaries, specs)
  - `.isu-description-list-item` - Each `<dt>/<dd>` pair wrapper
  - `.isu-description-list-label`, `.isu-description-list-value` - Label and value parts
  - `.isu-description-list-hint` - Optional helper text under value
  - `.isu-description-list-stacked` - Stacked layout (label above value)
  - `.isu-description-list-sm`, `.isu-description-list-lg` - Size variants

### Inline Edit
- `.isu-inline-edit` - Click-to-edit text field
  - `.isu-inline-edit-display` - Display mode (text + edit icon)
  - `.isu-inline-edit-value`, `.isu-inline-edit-placeholder` - Value or placeholder text
  - `.isu-inline-edit-icon` - Edit affordance icon (reveals on hover/focus)
  - `.isu-inline-edit-input`, `.isu-inline-edit-textarea` - Edit mode field
  - `.isu-inline-edit-disabled` - Disabled state
  - Enter commits / Esc cancels / Ctrl+Enter commits in textarea

### Splitter
- `.isu-splitter` - Drag-resizable two-panel container
  - `.isu-splitter-horizontal`, `.isu-splitter-vertical` - Orientation variants
  - `.isu-splitter-panel` - Each panel
  - `.isu-splitter-handle` - Drag divider (`role="separator"`)
  - `.isu-splitter-handle-dragging` - Active drag state
  - Arrow keys (Shift = 5%), Home/End — keyboard resize

### Overlay Components
- `.isu-modal`, `.isu-modal-backdrop`, `.isu-modal-dialog` - Dialog overlay
  - `.isu-modal-sm/md/lg/xl/full` - Size variants
  - `.isu-modal-header`, `.isu-modal-title`, `.isu-modal-description`, `.isu-modal-body`, `.isu-modal-footer`, `.isu-modal-close` - Modal internal parts
  - `.is-open`, `body.isu-no-scroll` - Open state plus scroll-lock on body
- `.isu-drawer-root`, `.isu-drawer`, `.isu-drawer-backdrop` - Side panel overlay
  - `.isu-drawer-left/right/top/bottom` - Side placement variants
  - `.isu-drawer-sm/md/lg/xl` - Size variants
  - `.isu-drawer-header`, `.isu-drawer-title`, `.isu-drawer-body`, `.isu-drawer-footer`, `.isu-drawer-close` - Drawer internal parts
- `[data-tooltip="text"]` - CSS-only tooltip (no JS required)
  - `[data-tooltip-placement="top|right|bottom|left"]` - Placement attribute
  - `:hover`, `:focus-visible`, `.is-open` - Trigger states

### Stat Components
- `.isu-stat` - Key metric display (label + value + trend + description)
  - `.isu-stat-header`, `.isu-stat-icon`, `.isu-stat-label`, `.isu-stat-value`, `.isu-stat-value-unit`, `.isu-stat-description`, `.isu-stat-footer` - Stat internal parts
  - `.isu-stat-trend`, `.isu-stat-trend-up/down/neutral` - Trend indicator with direction variants
  - `.isu-stat-sm/md/lg/xl` - Size variants
- `.isu-stat-card` - Stat wrapped in a card (border + padding)
  - `.isu-stat-card-hover` - Lift on hover modifier
  - `.isu-stat-card-accent` - Top-border accent modifier
  - `.isu-stat-card-success/warning/error/info` - Accent color variants
- `.isu-stat-group` - Responsive grid layout (auto-fit, min 14rem)

### Layout & Navigation Extended
- `.isu-accordion` - Collapsible content sections
  - `.isu-accordion-item`, `.isu-accordion-trigger`, `.isu-accordion-content`, `.isu-accordion-body` - Accordion item parts
  - `.isu-accordion-icon` - Chevron icon (rotates via `aria-expanded="true"`)
  - `.isu-accordion-ghost` - Borderless variant
  - `[data-state="open|closed"]` - Open/closed state attribute on content
  - Arrow keys, Home, End - Keyboard navigation between triggers
- `.isu-tabs` - Tabbed interface
  - `.isu-tabs-list`, `.isu-tabs-trigger`, `.isu-tabs-panels`, `.isu-tabs-panel` - Tabs internal parts
  - `.isu-tabs-vertical` - Vertical orientation (default horizontal)
  - `.isu-tabs-pills` - Pills style variant
  - `.isu-tabs-sm/lg` - Size variants (default md)
  - `[aria-selected="true"]` - Active trigger state (active indicator via `::after`)
  - Arrow keys, Home, End, Enter/Space - Keyboard navigation
- `.isu-menu-root` - Dropdown / popover menu
  - `.isu-menu`, `.isu-menu-item`, `.isu-menu-divider`, `.isu-menu-label` - Menu internal parts
  - `.isu-menu-item-icon`, `.isu-menu-item-label`, `.isu-menu-item-shortcut` - Menu item inner parts
  - `.isu-menu-item-danger` - Danger / destructive item variant
  - `.isu-menu-bottom-start/bottom-end/top-start/top-end` - Placement variants
  - `.is-open` - Toggles visibility and open animation
  - Arrow keys, Home, End, Escape, Tab - Keyboard navigation (Tab closes)

### Display & Feedback Components
- `.isu-avatar` - User avatar (initials, image, icon)
  - `.isu-avatar-xs/sm/md/lg/xl/2xl` - Size variants
  - `.isu-avatar-rounded`, `.isu-avatar-square` - Shape variants (default circle)
  - `.isu-avatar-primary/secondary/success/warning/error/info` - Color variants
  - `.isu-avatar-status`, `.isu-avatar-status-online/offline/busy/away` - Status badge with state variants
  - `.isu-avatar-group` - Overlapping cluster with `+N` overflow
- `.isu-skeleton` - Loading placeholder with shimmer animation
  - `.isu-skeleton-text`, `.isu-skeleton-heading`, `.isu-skeleton-circle`, `.isu-skeleton-rect`, `.isu-skeleton-button` - Shape variants
  - `.isu-skeleton-text-sm/lg` - Text skeleton sizes
  - `prefers-reduced-motion` - Honored for users who prefer reduced motion
- `.isu-empty-state` - Empty state with icon + title + description + actions
  - `.isu-empty-state-sm` - Small size variant (default medium)
  - `.isu-empty-state-icon`, `.isu-empty-state-title`, `.isu-empty-state-description`, `.isu-empty-state-actions` - Empty state internal parts
- `.isu-kbd` - Keyboard shortcut display
  - `.isu-kbd-sm/lg` - Size variants
  - `.isu-kbd-group`, `.isu-kbd-plus` - Multi-key combo group and separator
- `.isu-rating` - Star rating (readonly or interactive, half-star precision)
  - `.isu-rating-sm/lg` - Size variants
  - `.isu-rating-readonly` - Read-only state
  - `[data-fill="empty|half|full"]` - Per-star fill state
  - Arrow keys, Home, End - Keyboard controls (arrow keys adjust, Home/End set min/max)

### Additional Components
- `.isu-icon-placeholder` - Icon placeholder component
- `.isu-lang-btn` - Language selector button with active state
- `.isu-image-slider` - Image carousel for rotating through slides. **Distinct from the form-input `.isu-slider-*` namespace** — `Slider` is a range input, `ImageSlider` is a carousel.
  - `.isu-image-slider-viewport`, `.isu-image-slider-track`, `.isu-image-slider-slide` - Internal layout parts
  - `.isu-image-slider-image`, `.isu-image-slider-caption` - Slide content
  - `.isu-image-slider-prev`, `.isu-image-slider-next` - Navigation arrows
  - `.isu-image-slider-indicators`, `.isu-image-slider-dot`, `.isu-image-slider-dot-active` - Dot indicators
  - `.isu-image-slider-no-motion` - Set automatically when `prefers-reduced-motion: reduce`
  - Arrow keys, Home, End - Keyboard navigation; autoplay pauses on hover/focus/hidden tab

### Button System
- `.isu-button` - Base button component
- `.isu-button-sm/md/lg/xl` - Size variants
- `.isu-button-primary/secondary/ghost/outline/success/warning/error` - Color variants
- `.isu-button-loading` - Loading state (shows inline spinner, blocks pointer events)
- `.isu-button-group`, `.isu-button-group-vertical` - Button grouping utility
- `.isu-toggle-group` - Segmented control (radio semantics, single/multiple modes). **Use Tabs for switching panels, ToggleGroup for storing a value.**
  - `.isu-toggle-group-vertical` - Vertical orientation
  - `.isu-toggle-group-item` - Each toggle button (composes with `.isu-button`)
  - `[aria-checked="true"]` / `[aria-pressed="true"]` - Selected state (single / multiple mode)
- `.isu-icon-button` - Icon-only button
  - `.isu-icon-button-sm/md/lg` - Size variants
  - `.isu-icon-button-primary/outline/ghost/danger` - Color variants
  - `.isu-icon-button-circle` - Circular shape modifier
  - `.active` - Active / pressed state
- `.isu-fab` - Floating Action Button
  - `.isu-fab-sm/md/lg` - Size variants
  - `.isu-fab-secondary/success/error` - Color variants
  - `.isu-fab-extended` - Pill shape with label
  - `.isu-fab-fixed` - Fixed position at bottom-right

### Utility Classes
- `.isu-sr-only` - Screen reader only content
- `.isu-focus-ring` - Accessible focus indicators (WCAG2 AA compliant)
- `.isu-skip-link` - Skip to main content link (WCAG2 AA)
- `.isu-focus-visible` - Visible focus indicators for all interactive elements
- `.isu-scroll` - Custom scrollbar styling
- `.isu-text-truncate`, `.isu-text-multiline` - Text truncation utilities
- `.isu-aspect-*` - Aspect ratio utilities
- `.isu-animate-fade-in`, `.isu-animate-slide-up`, etc. - Animation utilities
- `prefers-reduced-motion` - Reduced motion support via media query (WCAG2 AA)

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

### Accessibility (WCAG2 AA Compliance)
The design system is built with accessibility in mind and follows WCAG2 AA standards:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Visible focus states with minimum 3:1 contrast ratio
- **ARIA Attributes**: Proper ARIA labels, roles, and live regions
- **Screen Reader Support**: Semantic HTML and screen reader only content utilities
- **Skip Links**: Skip to main content functionality
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **Color Contrast**: All text meets WCAG2 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)

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
- **Navigation Link**: Navigation link with active state
- **Toast**: Toast notifications with multiple variants
- **Status Badge**: Status badges with various states
- **Organization Tree**: Expandable tree component
- **Footer**: Responsive footer component with logo, contact info, and links
- **Form Step**: Multi-step form component
- **Language Button**: Language selector button

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

---

Development contribution: [Adem Aydemir](https://github.com/ademaydemir)
