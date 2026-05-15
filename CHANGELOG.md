# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.5.0](https://github.com/istinyeuniversity/isu-design-system/compare/v2.4.0...v2.5.0) (2026-05-15)


### Features

* add **DatePicker** component (`createDatePicker`) — input + popover calendar with Turkish locale by default (`DD.MM.YYYY`, Pzt-Paz, Ocak-Aralık), `min` / `max` bounds, custom `disableDates(date)` callback, manual typed entry, "Bugün" / "Temizle" footer buttons, and full keyboard navigation (Arrow keys / PageUp-Down for months / Shift+PageUp-Down for years / Home-End / Enter / Esc) using the combobox ARIA pattern
* add **ImageSlider** component (`createImageSlider`) for image carousels in a distinct `.isu-image-slider-*` namespace (separate from the form-input `.isu-slider-*`); supports autoplay with pause on hover / focus / hidden tab, loop or bounded mode, prev/next arrows, dot indicators, keyboard navigation, and `prefers-reduced-motion`
* add **ToggleGroup** factory (`createToggleGroup` in Button.js) — semantic segmented control with single (radiogroup) and multiple (aria-pressed) modes, vertical orientation, arrow-key navigation; visually similar to `Tabs` pills but stores a form value instead of switching panels
* add **Tree** component (`createTree`) with full ARIA tree pattern — recursive nesting, expand/collapse with chevron toggle, selection state with roving tabindex, optional icon and badge slots, and keyboard navigation (Arrow keys / Home-End / Enter / Space); extends existing `.isu-tree-*` CSS with `.isu-tree-row`, `.isu-tree-row-selected`, `.isu-tree-icon`, `.isu-tree-badge`, `.isu-tree-toggle-empty`
* add **DescriptionList** component (`createDescriptionList`) — semantic `<dl>` for label-value pairs (profile pages, order summaries) with horizontal and stacked layouts and sm/md/lg sizes; supports Element-valued items so badges / avatars / inline-edits can be embedded
* add **InlineEdit** component (`createInlineEdit`) — click-to-edit text field with Enter commit / Esc cancel, optional validation callback, textarea mode (Ctrl+Enter to commit), edit-affordance icon on hover/focus, and disabled state
* add **Splitter** component (`createSplitter`) — drag-resizable two-panel layout (horizontal or vertical) with mouse + touch + keyboard (Arrow keys, Shift+Arrow = 5%, Home/End) support, per-panel `minSize`, `defaultSize`, and `role="separator"` semantics
* add **DataTable** factory (`createDataTable` in Table.js) alongside the existing `createTable` — sortable headers with three-state cycle (asc → desc → none), debounced global search via embedded `createSearchbar`, client-side pagination with page-size selector, single/multi row selection (checkbox + select-all with indeterminate state), sticky header, comfortable/compact density, custom `column.render(row)`, embedded empty state via `createEmptyState`, and resizable columns with Excel-like behavior (per-column width snapshot on first drag, `<colgroup>`-managed widths, table grows wider than container with horizontal scroll). Lives under `.isu-data-table-*` namespace — existing `createTable` and `.isu-table-*` are fully untouched and backward compatible
* add **NumberInput** component (`createNumberInput`) — numeric input with `−` / `+` stepper buttons, `min` / `max` / `step` / `precision` (decimals), configurable `width`, ARIA `spinbutton` semantics, and keyboard navigation (Arrow keys step, PageUp/Down ×10, Home/End jump to bounds)
* add **PinInput** component (`createPinInput`) — N-box OTP / verification code input with auto-advance between boxes, backspace-back, left/right arrow navigation, paste-distribute (entire pasted code spreads across the boxes), numeric or alphanumeric modes, optional masking, and `onComplete` callback fired when all boxes are filled
* add **Banner** component (`createBanner` in Feedback.js) — page-level alert strip filling the gap between inline `Alert` and transient `Toast`; info/success/warning/error variants with left-border accent, optional action button slot, dismissible by default, and `sticky` mode for pinning to the top of scrolling content
* add Storybook stories for every new component using İstinye Üniversitesi reference data (öğretim üyeleri, fakülteler, bölümler, ders kodları, OBS senaryoları) so consumers can see realistic dataset shapes
* add Turkish locale strings as defaults across new components (DatePicker month / weekday / button labels, DataTable footer / empty-state / pagination labels, Banner content samples, NumberInput / PinInput aria-labels)
* add `CLAUDE.md` documenting project rules (CSS `isu-` namespace policy, factory signature conventions, accessibility requirements, idempotent declarative-API registration, version-bump locations) and high-level architecture for future contributors


### Improvements

* visible custom scrollbars on `.isu-data-table-scroll` for both light and dark themes (12px always-visible thumb instead of macOS auto-hide; matching `scrollbar-color` for Firefox)
* always-visible column resize handles on `.isu-data-table` headers — 2px neutral vertical bar at each cell's right edge, thicker and primary-colored on hover or during drag
* sticky-header background applied to `.isu-data-table-sticky thead th` so body rows do not bleed through during scroll
* `.isu-data-table` and `.isu-data-table-scroll` now flex-fill a height-constrained parent (`flex: 1 1 auto; min-height: 0`), which is required for sticky thead to engage; inert in non-flex parents so existing usage is not affected
* expose every new factory on the global `window.ISU` object and via named exports: `createDatePicker`, `createImageSlider`, `createToggleGroup`, `createTree`, `createDescriptionList`, `createInlineEdit`, `createSplitter`, `createDataTable`, `createNumberInput`, `createPinInput`, `createBanner`


### Fixes

* **css**: a stray leading token in `src/css/isu.css` caused `dist/isu.css` to be unparseable by PostCSS — Storybook failed pre-transform with "Unknown word yap" on the first `@import`; cleaned the source so the Tailwind v4 pipeline produces valid output again

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
