# Button Component

Buttons are used to trigger actions, submit forms, or navigate users through your application.

## 🎮 Live Demo

<div style="border: 1px solid #e5e7eb; border-radius: 8px; margin: 1rem 0; overflow: hidden;">
  <iframe src="/demo.html#buttons" width="100%" height="400" frameborder="0" style="border: none;"></iframe>
</div>

## Basic Usage

```html
<button class="isu-btn-primary">Primary Button</button>
<button class="isu-btn-secondary">Secondary Button</button>
<button class="isu-btn-ghost">Ghost Button</button>
<button class="isu-btn-outline">Outline Button</button>
```

## Button Variants

### Primary Buttons
Used for main actions and call-to-action buttons.

```html
<button class="isu-btn-primary">Save Changes</button>
<button class="isu-btn-primary isu-button-lg">Get Started</button>
```

### Secondary Buttons
Used for secondary actions that are less important.

```html
<button class="isu-btn-secondary">Cancel</button>
<button class="isu-btn-secondary isu-button-sm">Skip</button>
```

### Ghost Buttons
Used for subtle actions or in card layouts.

```html
<button class="isu-btn-ghost">Learn More</button>
<button class="isu-btn-ghost">Edit Profile</button>
```

### Outline Buttons
Used for less prominent actions or in form contexts.

```html
<button class="isu-btn-outline">Preview</button>
<button class="isu-btn-outline">Download</button>
```

## Button Sizes

```html
<button class="isu-btn-primary isu-button-sm">Small</button>
<button class="isu-btn-primary isu-button-md">Medium</button>
<button class="isu-btn-primary isu-button-lg">Large</button>
<button class="isu-btn-primary isu-button-xl">Extra Large</button>
```

## Button with Icons

```html
<button class="isu-btn-primary isu-button-icon">
  <svg class="isu-button-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 5L7 10.5 4.5 8l.71-.71L7 9.08l4.29-4.29.71.71z"/>
  </svg>
  Save
</button>
```

## Loading State

```html
<button class="isu-btn-primary isu-button-loading" disabled>
  <span class="isu-button-text">Processing...</span>
</button>
```

## Button Group

```html
<div class="isu-button-group">
  <button class="isu-btn-secondary">Left</button>
  <button class="isu-btn-secondary">Middle</button>
  <button class="isu-btn-primary">Right</button>
</div>
```

## Floating Action Button

```html
<button class="isu-fab">
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  </svg>
</button>
```

## Accessibility

- Always use semantic `<button>` elements
- Include descriptive text or `aria-label` for icon-only buttons
- Use appropriate `type` attribute (`submit`, `button`, `reset`)
- Ensure sufficient color contrast (minimum 4.5:1 ratio)

## CSS Variables

Buttons use the following CSS custom properties:

```css
:root {
  --color-primary: #007fff;
  --color-primary-dark: #003eff;
}
```

## JavaScript Integration

For dynamic button states:

```javascript
// Disable button
button.setAttribute('disabled', 'true');
button.classList.add('isu-button-loading');

// Enable button
button.removeAttribute('disabled');
button.classList.remove('isu-button-loading');
```

## Common Use Cases

- **Primary Actions**: Save, Submit, Create
- **Secondary Actions**: Cancel, Skip, Back
- **Tertiary Actions**: Edit, Settings, More Options
- **Danger Actions**: Delete, Remove (with warning colors)
- **Success Actions**: Complete, Finish, Confirm
