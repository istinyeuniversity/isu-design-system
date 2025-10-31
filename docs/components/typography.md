# Typography

Typography components provide consistent text styling and hierarchy throughout the design system.

## Heading Hierarchy

Use semantic heading classes for proper document structure and SEO.

### H1 - Main Page Title
```html
<h1 class="isu-heading-1">Main Page Title</h1>
```
Reserved for the primary page title. Used sparingly, typically once per page.

### H2 - Section Title
```html
<h2 class="isu-heading-2">Section Title</h2>
```
Used for major section divisions within a page.

### H3 - Subsection Title
```html
<h3 class="isu-heading-3">Subsection Title</h3>
```
Used for subsections within major sections.

### H4 - Component Title
```html
<h4 class="isu-heading-4">Component Title</h4>
```
Used for card titles, component headers, or minor subsections.

### H5 - Small Component Title
```html
<h5 class="isu-heading-5">Small Component Title</h5>
```
Used for small component headers or secondary titles.

### H6 - Smallest Heading
```html
<h6 class="isu-heading-6">Smallest Heading</h6>
```
Used for the smallest heading level or metadata titles.

## Body Text

Different body text styles for various content types.

### Regular Body Text
```html
<p class="isu-body">
  This is regular body text with comfortable line height and readable font size.
  It provides good readability for long-form content and general website text.
</p>
```

### Small Body Text
```html
<p class="isu-body-sm">
  This is smaller body text, suitable for captions, secondary information,
  or dense content areas. It maintains readability while taking up less space.
</p>
```

### Large Body Text
```html
<p class="isu-body-lg">
  This is larger body text, perfect for lead paragraphs or emphasized content sections.
  It provides better visual hierarchy and draws attention to important information.
</p>
```

### Lead Text
```html
<p class="isu-lead">
  This is lead text, designed for introductory paragraphs or featured content.
  It uses a larger font size with lighter weight for elegant presentation.
</p>
```

## Links

Styled link components for navigation and references.

### Primary Links
```html
<p class="isu-body">
  Visit our <a href="#" class="isu-link">main website</a> for more information.
</p>
```

### Subtle Links
```html
<p class="isu-body">
  You can also check our <a href="#" class="isu-link-subtle">academic calendar</a>.
</p>
```

## Captions

Small text for metadata, footnotes, or secondary information.

### Regular Caption
```html
<p class="isu-body">Main content text here.</p>
<p class="isu-caption">This is a regular caption providing additional context.</p>
```

### Small Caption
```html
<p class="isu-body">More main content.</p>
<p class="isu-caption-sm">This is a smaller caption for fine print or metadata.</p>
```

## Quotes

Blockquote styling for testimonials, highlights, or references.

```html
<blockquote class="isu-quote">
  "Education is not the filling of a pail, but the lighting of a fire."
</blockquote>
<cite class="isu-quote-author">William Butler Yeats</cite>
```

## Font Information

### Primary Font Family
- **Font**: Poppins
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Usage**: Body text, UI elements, headings

### Heading Font Family
- **Font**: Space Grotesk
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Usage**: All heading levels (H1-H6)

## Responsive Typography

All typography components are responsive and scale appropriately:

```css
/* Example scaling */
.isu-heading-1 {
  font-size: 2.25rem; /* 36px on mobile */
}

@media (min-width: 768px) {
  .isu-heading-1 {
    font-size: 3rem; /* 48px on tablet+ */
  }
}

@media (min-width: 1024px) {
  .isu-heading-1 {
    font-size: 3.75rem; /* 60px on desktop+ */
  }
}
```

## Color Usage

Typography uses semantic color variables for consistency:

```css
.isu-heading-1 {
  color: var(--color-neutral-dark); /* Dark neutral for contrast */
}

.isu-body {
  color: var(--color-neutral-dark); /* Readable body text */
}

.isu-link {
  color: var(--color-primary); /* Primary brand color */
}
```

## Accessibility

### Color Contrast
- Headings: Minimum 4.5:1 contrast ratio
- Body text: Minimum 4.5:1 contrast ratio
- Links: Minimum 4.5:1 contrast ratio with focus states

### Semantic Structure
- Use proper heading hierarchy (H1 → H2 → H3, etc.)
- Avoid skipping heading levels
- Use semantic `<cite>` for quote attribution

### Focus States
```css
.isu-link:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## CSS Classes Reference

| Class | Description | Font Size | Line Height |
|-------|-------------|-----------|-------------|
| `.isu-heading-1` | Main page title | 2.25rem → 3.75rem | 2.5rem → 4rem |
| `.isu-heading-2` | Section title | 1.875rem → 3rem | 2.25rem → 3.5rem |
| `.isu-heading-3` | Subsection title | 1.5rem → 2.25rem | 2rem → 2.75rem |
| `.isu-heading-4` | Component title | 1.25rem → 1.875rem | 1.75rem → 2.5rem |
| `.isu-heading-5` | Small component title | 1.125rem → 1.5rem | 1.75rem → 2rem |
| `.isu-heading-6` | Smallest heading | 1rem → 1.25rem | 1.5rem → 1.75rem |
| `.isu-body` | Regular body text | 1rem | 1.5rem |
| `.isu-body-sm` | Small body text | 0.875rem | 1.25rem |
| `.isu-body-lg` | Large body text | 1.125rem | 1.75rem |
| `.isu-lead` | Lead paragraph | 1.25rem | 1.75rem |
| `.isu-caption` | Regular caption | 0.875rem | 1.25rem |
| `.isu-caption-sm` | Small caption | 0.75rem | 1rem |
| `.isu-link` | Primary link | inherit | inherit |
| `.isu-link-subtle` | Subtle link | inherit | inherit |
| `.isu-quote` | Blockquote | 1.25rem | 1.75rem |
| `.isu-quote-author` | Quote attribution | 0.875rem | 1.25rem |

## Best Practices

1. **Maintain Hierarchy**: Use heading classes in proper order (H1 → H2 → H3)
2. **Consistent Spacing**: Use section spacing with headings for rhythm
3. **Readable Contrast**: Ensure sufficient color contrast for accessibility
4. **Responsive Scaling**: Test typography across all screen sizes
5. **Semantic HTML**: Use appropriate heading tags with classes
