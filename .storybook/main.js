/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // Disable cursor integration to avoid ENOENT error
  features: {
    cursor: false,
  },
  // Static files directory for assets
  // Maps src/assets to /assets and .storybook/static to / in Storybook
  staticDirs: ['../src/assets', './static'],
};

export default config;
