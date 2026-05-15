# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project rules

1. **CSS class names must start with `isu-`.** No exceptions — this is the namespace that prevents collisions with host applications.
2. **Class names must be meaningful and consistent.** Follow the existing scale: `isu-<component>` for the root, `isu-<component>-<part>` for internal parts, `isu-<component>-<variant>` for variants (e.g. `-primary`, `-sm`, `-lg`). Do not invent a new pattern when an existing one fits.
3. **Class names must not collide.** Before adding a new class, grep `src/css/` and `src/components/` to confirm the name isn't reused with a different meaning.
4. **Component names must be meaningful.** Use the noun that describes the UI element (`Drawer`, `Stat`, `EmptyState`) — not the implementation (`Wrapper`, `Container`, `Box`). The file name, factory name (`create<Name>`), root class (`isu-<name>`), and story title must all match.
5. **If a component needs JS to function, you must write it.** Pure-CSS components (badges, alerts, layout) are fine as classes alone. But any component with state, focus management, keyboard navigation, open/close behavior, or dynamic content needs a `create<Name>` factory in `src/components/<Name>.js` — do not ship CSS-only and leave wiring to the consumer.
6. **Factory signature is consistent.** All factories accept a single options object with destructured defaults: `createX({ size = 'md', variant = 'primary', ... } = {})`. No positional arguments.
7. **Factories return a DOM Element, not an HTML string.** Build with `document.createElement` and `appendChild`. Do not produce components by interpolating into a template string and assigning to `innerHTML`.
8. **Declarative API requires `auto-init.js` registration.** If a component has a server-rendered usage pattern (HTML configured via `data-*` and/or a `<template>`), add an `initXxx(root)` function in `src/js/auto-init.js` and call it from `initAuto`. Init must be idempotent — guard with the `data-isu-initialized` flag (`isInit`/`markInit` helpers).
9. **Accessibility (WCAG2 AA) is not optional.** Interactive components must include appropriate ARIA attributes, keyboard navigation (Arrow / Home / End / Esc / Enter / Space where applicable), focus trapping for overlays, and respect `prefers-reduced-motion`. Use `Drawer.js`, `Accordion.js`, and `Tabs.js` as references.
10. **Variants and sizes are selected via lookup objects, not `if`/`else` chains.** Follow the `Button.js` pattern: `const variantClasses = { primary: 'isu-button-primary', ... }; classes.push(variantClasses[variant] || variantClasses.primary);`.
11. **Adding a new component requires updating three places together:** `src/js/index.js` (named export, default export, and the `ISU` object); `src/js/auto-init.js` if it has a declarative API; and the "Available Components" section in `README.md`.
12. **Dark theme must be verified manually.** Every new component is checked in Storybook with `data-theme="dark"` before merge — there is no automated visual or contrast testing.
13. **`src/styles/tokens.css` is generated, never hand-edited.** It is the Style Dictionary output. To change a color token, edit `tokens/colors.json` and run `npm run tokens`. Keep `tailwind-preset.js` color values in sync manually.
14. **Version bumps update three locations.** `package.json#version`, the `--banner:js` strings in the `build:js` / `build:esm` scripts, and the `version` field on the `ISU` object in `src/js/index.js`. All three must move together.

## Common commands

```bash
npm run tokens          # Style Dictionary: tokens/colors.json → src/styles/tokens.css
npm run build:css       # Tailwind v4 CLI: src/css/isu.css → dist/isu.css (minified)
npm run build:js        # esbuild IIFE bundle (window.ISU) → dist/isu.js
npm run build:esm       # esbuild ESM bundle              → dist/isu.esm.js
npm run build           # tokens + all three bundles (runs on prepublishOnly)
npm run dev             # tokens + tailwind --watch on dist/isu.css

npm run storybook       # Storybook dev server on :6006
npm run build-storybook # Static export → storybook-static/

npm run release         # standard-version (conventional commits → version + CHANGELOG)
```

There is **no test suite** and **no linter** wired into npm scripts. CI (`.github/workflows/build.yml`) only runs `npm run build` on push to `main`. Verification is manual via Storybook.

Node ≥ 18 (see `engines` in `package.json`).

## Architecture

This is a **vanilla-JS component library** consumed as plain CSS + an optional JS bundle. There is no React/Vue runtime — components are factory functions that build and return `HTMLElement`s.

### Three artifacts, three pipelines

1. **`dist/isu.css`** — Tailwind v4 compiled from `src/css/isu.css`. Most components are pure CSS (class-based). Source uses Tailwind v4 `@utility` / `@theme` / `@custom-variant` directives plus generated tokens from `src/styles/tokens.css`.
2. **`dist/isu.js`** (IIFE) — Bundles `src/js/index.js`. When loaded in a browser it:
   - exposes every factory on `window.ISU`,
   - on `DOMContentLoaded` calls `initAuto(document)` which scans for `data-isu-*` attributes and upgrades them (declarative API).
3. **`dist/isu.esm.js`** — Same entry, ESM format, for bundler-based consumers who `import { createX } from 'isu-design-system'`.

`package.json#exports` also publishes individual components under `./src/components/*` so consumers can tree-shake.

### Component pattern

Every file under `src/components/` follows the same shape:

```js
export function createX({ ...options }) {
  const el = document.createElement('...');
  el.className = 'isu-x isu-x-<variant>';
  // wire ARIA, keyboard handlers, sub-elements
  return el;
}
```

`*.stories.js` files alongside each component drive Storybook (HTML framework, `@storybook/html-vite`). Stories render with the compiled `dist/isu.css` (see `.storybook/preview.js`), so **you must run `npm run build:css` (or `npm run dev`) before Storybook can show new CSS changes**.

### Declarative `data-isu-*` API

`src/js/auto-init.js` is the bridge between server-rendered HTML and the JS factories. It currently handles **Drawer, Modal, Accordion, Tabs, Tooltip, Switch**. The pattern: find elements by `data-isu-<component>`, read configuration from `data-*` attributes (often from a `<template>` for overlay content), call the factory, replace the placeholder. Initialization is **idempotent** — guarded by `data-isu-initialized`. For HTMX / partial-render flows, consumers call `ISU.init(newRoot)` after DOM swaps.

If you add a new component with a declarative API, register an `initXxx(root)` function in `auto-init.js` and call it from `initAuto`.

### Adding a component (checklist)

1. `src/components/<Name>.js` — export one or more `create<Name>(...)` factories.
2. `src/components/<Name>.stories.js` — Storybook stories using `@storybook/html` defaults.
3. CSS: either pure Tailwind `class` strings inside the factory, or add `@utility isu-<name>` blocks in `src/css/isu.css` / `src/css/utilities.css`.
4. Register the factory in **both** named and default exports of `src/js/index.js` (this is what populates `window.ISU.*`).
5. If declarative, wire it into `src/js/auto-init.js`.
6. Rebuild: `npm run build` (CSS bundle must be regenerated for Storybook).

### Design tokens

`tokens/colors.json` is the **only** source of truth for color tokens. `build-tokens.js` runs Style Dictionary to emit `src/styles/tokens.css` (CSS custom properties), which `src/css/isu.css` imports at `layer(base)`. Editing `src/styles/tokens.css` directly will be overwritten — edit the JSON and run `npm run tokens`.

Tailwind preset (`tailwind-preset.js`) is **separate** from the CSS pipeline — it's published for downstream consumers using Tailwind in their own projects. Keep its color values in sync with `tokens/colors.json` manually.

### Theming

Dark mode is toggled via `data-theme="dark"` on `<html>`. The CSS uses Tailwind v4's `@custom-variant dark (&:is([data-theme="dark"] *))` so any utility class can be dark-themed via the `dark:` prefix. The Tailwind preset mirrors this with `darkMode: ['class', '[data-theme="dark"]']`.

### Release & publish

`prepublishOnly` runs `npm run build`, so published packages always contain a fresh `dist/`. Versioning uses `standard-version` driven by conventional commits (`feat:`, `fix:`, `BREAKING CHANGE:`). NPM publish is automated via `.github/workflows/publish.yml` on GitHub release.

Bumping the version: update `package.json#version` **and** the `--banner:js` strings in `build:js` / `build:esm` scripts **and** the `version` field on the `ISU` object in `src/js/index.js` — these are three separate places the version is hard-coded.
