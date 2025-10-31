export default {
  title: 'Typography/Typography',
};

export const Headings = () => `
  <div class="isu-container py-8">
    <h1 class="isu-heading-1 mb-6">Heading 1 - Main Page Title</h1>
    <h2 class="isu-heading-2 mb-4">Heading 2 - Section Title</h2>
    <h3 class="isu-heading-3 mb-3">Heading 3 - Subsection Title</h3>
    <h4 class="isu-heading-4 mb-2">Heading 4 - Component Title</h4>
    <h5 class="isu-heading-5 mb-2">Heading 5 - Small Component Title</h5>
    <h6 class="isu-heading-6 mb-4">Heading 6 - Smallest Heading</h6>
  </div>
`;

export const BodyText = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Body Text Variants</h2>

    <div class="isu-card mb-6">
      <h3 class="isu-heading-4 mb-4">Regular Body Text</h3>
      <p class="isu-body mb-4">
        This is regular body text with comfortable line height and readable font size.
        It provides good readability for long-form content and general website text.
      </p>
      <p class="isu-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <div class="isu-card mb-6">
      <h3 class="isu-heading-4 mb-4">Small Body Text</h3>
      <p class="isu-body-sm mb-4">
        This is smaller body text, suitable for captions, secondary information, or dense content areas.
        It maintains readability while taking up less space.
      </p>
    </div>

    <div class="isu-card mb-6">
      <h3 class="isu-heading-4 mb-4">Large Body Text</h3>
      <p class="isu-body-lg mb-4">
        This is larger body text, perfect for lead paragraphs or emphasized content sections.
        It provides better visual hierarchy and draws attention to important information.
      </p>
    </div>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Lead Text</h3>
      <p class="isu-lead mb-4">
        This is lead text, designed for introductory paragraphs or featured content.
        It uses a larger font size with lighter weight for elegant presentation.
      </p>
    </div>
  </div>
`;

export const Links = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Link Styles</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Link Variants</h3>
      <p class="isu-body mb-4">
        Visit our <a href="#" class="isu-link">main website</a> for more information about our programs and services.
        You can also check our <a href="#" class="isu-link-subtle">academic calendar</a> for important dates.
      </p>
    </div>
  </div>
`;

export const Quotes = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Quote Component</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Blockquote</h3>
      <blockquote class="isu-quote mb-4">
        "Education is not the filling of a pail, but the lighting of a fire."
      </blockquote>
      <cite class="isu-quote-author">William Butler Yeats</cite>
    </div>
  </div>
`;

export const Captions = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Caption Styles</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Caption Examples</h3>
      <p class="isu-body mb-2">Main content text here.</p>
      <p class="isu-caption mb-4">This is a regular caption providing additional context.</p>
      <p class="isu-body mb-2">More main content.</p>
      <p class="isu-caption-sm">This is a smaller caption for fine print or metadata.</p>
    </div>
  </div>
`;
