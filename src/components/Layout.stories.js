export default {
  title: 'Layout/Layout',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Container = () => `
  <div class="isu-container bg-gray-50 py-8">
    <div class="isu-card">
      <h2 class="isu-heading-3 mb-4">Container Component</h2>
      <p class="isu-body">This content is centered with responsive padding using the isu-container class.</p>
    </div>
  </div>
`;

export const GridSystem = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Grid System</h2>

    <div class="mb-8">
      <h3 class="isu-heading-4 mb-4">2 Column Grid</h3>
      <div class="isu-grid-2">
        <div class="isu-card">
          <p class="isu-body">Column 1</p>
        </div>
        <div class="isu-card">
          <p class="isu-body">Column 2</p>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="isu-heading-4 mb-4">3 Column Grid</h3>
      <div class="isu-grid-3">
        <div class="isu-card">
          <p class="isu-body">Column 1</p>
        </div>
        <div class="isu-card">
          <p class="isu-body">Column 2</p>
        </div>
        <div class="isu-card">
          <p class="isu-body">Column 3</p>
        </div>
      </div>
    </div>
  </div>
`;

export const FlexUtilities = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Flex Utilities</h2>

    <div class="isu-card mb-6">
      <h3 class="isu-heading-4 mb-4">Flex Between</h3>
      <div class="isu-flex-between p-4 bg-gray-50 rounded">
        <span class="isu-body">Left content</span>
        <span class="isu-body">Right content</span>
      </div>
    </div>

    <div class="isu-card mb-6">
      <h3 class="isu-heading-4 mb-4">Flex Center</h3>
      <div class="isu-flex-center p-8 bg-gray-50 rounded">
        <span class="isu-body">Centered content</span>
      </div>
    </div>
  </div>
`;

export const Card = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Card Component</h2>

    <div class="isu-grid-2">
      <div class="isu-card">
        <h3 class="isu-heading-4 mb-2">Regular Card</h3>
        <p class="isu-body mb-4">This is a regular card component with default styling.</p>
        <button class="isu-button-primary">Action</button>
      </div>

      <div class="isu-card-hover">
        <h3 class="isu-heading-4 mb-2">Hover Card</h3>
        <p class="isu-body mb-4">This card has hover effects and is interactive.</p>
        <button class="isu-button-secondary">Action</button>
      </div>
    </div>
  </div>
`;
