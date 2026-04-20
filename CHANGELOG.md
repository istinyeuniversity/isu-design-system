# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.4.0](https://github.com/istinyeuniversity/isu-design-system/compare/v2.3.0...v2.4.0) (2026-04-20)


### Features

* ship a bundled IIFE JS distribution at `dist/isu.js` that exposes a global `window.ISU` API with every factory function (`createDrawer`, `createModal`, `createAccordion`, `createTabs`, `attachTooltip`, `createSwitch`, ...)
* ship an ESM bundle at `dist/isu.esm.js` for module-based consumers
* add declarative **data-attribute auto-init** (`data-isu-drawer-target`, `data-isu-modal-target`, `data-isu-accordion`, `data-isu-tabs`, `data-isu-tooltip`, `data-isu-switch`) so interactive components work in server-rendered apps (e.g. ASP.NET MVC Razor) with zero hand-written JavaScript
* include `src/` sources in the published tarball so individual modules (`isu-design-system/src/components/Drawer.js`) can be imported in bundler-based projects


### Fixes

* **package**: the published npm tarball previously only contained `dist/isu.css`; interactive components (Drawer, Accordion, Modal, Tabs, Tooltip, Switch) were unusable via plain HTML. They now work out-of-the-box by adding a single `<script src=".../dist/isu.js" defer></script>` tag.

## [2.3.0](https://github.com/istinyeuniversity/isu-design-system/compare/v2.2.2...v2.3.0) (2026-04-17)


### Features

* extend component library and harden accessibility ([1d7232c](https://github.com/istinyeuniversity/isu-design-system/commit/1d7232c3d47bc02471e1973d4d3341f96e0f4a1d))

## [2.2.0](https://github.com/istinyeuniversity/isu-design-system/compare/v2.1.1...v2.2.0) (2025-11-13)

### Features

* add components required for Akademik Atama ve Yükseltme project
* add Timeline component for process tracking with completed/active/pending states
* add Step Indicator component for multi-step forms with responsive design
* add File Upload component with drag & drop support and keyboard accessibility
* add Requirement Check component for validation display (met/not-met states)
* add Score Display component with gradient background for metrics
* add Table component with hover effects and responsive design
* add Card variants: hover-lift and stat-card for enhanced card displays
* add Navigation Link component with active state support
* add Toast Notification component with success/error/info/warning variants
* add Status Badge variants (in-progress, pending, hr, completed, rejected)
* add Organization Tree component with expand/collapse functionality
* add Card Header component
* add View Container component with fade-in animation
* add Stat Card internal components (icon, content, label, value)
* add Icon Placeholder component
* add Footer component with responsive grid layout (JavaScript component and Storybook stories)
* add App Wrapper component for sticky footer layout
* add Form Step component for multi-step forms
* add Language Button component for language selection
* add prefix-less class aliases for all components (backward compatibility)
* add comprehensive dark mode support for all new components
* add Storybook stories for all new components with multiple examples
* add WCAG2 AA accessibility compliance (ARIA attributes, focus states, keyboard navigation)

### Improvements

* enhance Card component with variant support (hover-lift, stat-card)
* improve responsive design for Step Indicator (vertical layout on mobile)
* add accessibility features: focus states, keyboard navigation, ARIA attributes
* add WCAG2 AA compliance: skip links, reduced motion support, visible focus indicators
* update README.md with comprehensive documentation for new components
* add animation effects (pulse-glow) for active states in Timeline and Step Indicator
* fix Storybook logo asset paths with staticDirs configuration
* update Storybook to version 8.6.14 for better addon compatibility
* add error handling for logo loading

## [2.1.0](https://github.com/istinyeuniversity/isu-design-system/compare/v2.0.0...v2.1.0) (2025-11-01)

### Features

* add comprehensive dark theme system with semantic colors and smooth transitions
* add Tailwind preset for easy integration
* add theme toggle functionality to demo page
* add modern package.json exports and engine requirements
* update project structure with better organization

### Improvements

* update .gitignore for better IDE file handling
* clean up project structure by removing unnecessary files
* enhance component library with all UI elements
* improve documentation and examples

## [2.0.0](https://github.com/istinyeuniversity/isu-design-system/compare/v1.1.0...v2.0.0) (2025-10-31)

### ⚠ BREAKING CHANGES

* Component structure reorganized into modular system

### Features

* add comprehensive component library ([04102af](https://github.com/istinyeuniversity/isu-design-system/commit/04102af13619740bddf50c7d1a0f4ef0d97b2275))

## 1.1.0 (2025-10-31)

### Features

* add standard-version for automated semantic versioning ([15f611d](https://github.com/istinyeuniversity/isu-design-system/commit/15f611d2742134a4193432adb6a51e3d98579a82))
