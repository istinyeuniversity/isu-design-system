import { createLogo, createLogoLink, createLogoWithText } from './Logo.js';

export default {
  title: 'Components/Logo',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['blue', 'white', 'blue-tr', 'white-tr'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

const LogoTemplate = ({ variant, size }) => {
  return createLogo({ variant, size });
};

const LogoLinkTemplate = ({ variant, size, href }) => {
  return createLogoLink({ variant, size, href });
};

const LogoWithTextTemplate = ({ variant, size, text }) => {
  return createLogoWithText({ variant, size, text });
};

// Logo Stories
export const LogoBlue = LogoTemplate.bind({});
LogoBlue.args = {
  variant: 'blue',
  size: 'md',
};

export const LogoWhite = LogoTemplate.bind({});
LogoWhite.args = {
  variant: 'white',
  size: 'md',
};
LogoWhite.parameters = {
  backgrounds: { default: 'dark' },
};

export const LogoBlueTR = LogoTemplate.bind({});
LogoBlueTR.args = {
  variant: 'blue-tr',
  size: 'md',
};

export const LogoWhiteTR = LogoTemplate.bind({});
LogoWhiteTR.args = {
  variant: 'white-tr',
  size: 'md',
};
LogoWhiteTR.parameters = {
  backgrounds: { default: 'dark' },
};

// Size Variations
export const LogoSmall = LogoTemplate.bind({});
LogoSmall.args = {
  variant: 'blue',
  size: 'sm',
};

export const LogoMedium = LogoTemplate.bind({});
LogoMedium.args = {
  variant: 'blue',
  size: 'md',
};

export const LogoLarge = LogoTemplate.bind({});
LogoLarge.args = {
  variant: 'blue',
  size: 'lg',
};

export const LogoExtraLarge = LogoTemplate.bind({});
LogoExtraLarge.args = {
  variant: 'blue',
  size: 'xl',
};

// Logo Link Stories
export const LogoLink = LogoLinkTemplate.bind({});
LogoLink.args = {
  variant: 'blue',
  size: 'md',
  href: '#',
};

// Logo with Text Stories
export const LogoWithText = LogoWithTextTemplate.bind({});
LogoWithText.args = {
  variant: 'blue',
  size: 'md',
  text: 'Istinye University',
};

export const LogoWithTextTR = LogoWithTextTemplate.bind({});
LogoWithTextTR.args = {
  variant: 'blue-tr',
  size: 'md',
  text: 'Istanbul University',
};

// Showcase
export const LogoShowcase = () => {
  const container = document.createElement('div');
  container.className = 'space-y-8';

  // Standard logos
  const standardSection = document.createElement('div');
  standardSection.innerHTML = '<h3 class="isu-heading-4 mb-4">Standard Logos</h3>';

  const logos = [
    createLogo({ variant: 'blue', size: 'md' }),
    createLogo({ variant: 'blue-tr', size: 'md' }),
  ];

  const logosContainer = document.createElement('div');
  logosContainer.className = 'isu-flex gap-6';
  logos.forEach(logo => logosContainer.appendChild(logo));

  standardSection.appendChild(logosContainer);
  container.appendChild(standardSection);

  // Logo with text
  const textSection = document.createElement('div');
  textSection.innerHTML = '<h3 class="isu-heading-4 mb-4">Logo with Text</h3>';

  const     logoWithText = createLogoWithText({
    variant: 'blue',
    size: 'lg',
    text: 'Istinye University'
  });
  textSection.appendChild(logoWithText);
  container.appendChild(textSection);

  // Size comparison
  const sizeSection = document.createElement('div');
  sizeSection.innerHTML = '<h3 class="isu-heading-4 mb-4">Size Comparison</h3>';

  const sizes = ['sm', 'md', 'lg', 'xl'];
  const sizeContainer = document.createElement('div');
  sizeContainer.className = 'isu-flex items-end gap-4';

  sizes.forEach(size => {
    const sizeDiv = document.createElement('div');
    sizeDiv.className = 'isu-flex flex-col items-center gap-2';
    sizeDiv.innerHTML = `<span class="isu-body-sm text-gray-500">${size.toUpperCase()}</span>`;
    sizeDiv.appendChild(createLogo({ variant: 'blue', size }));
    sizeContainer.appendChild(sizeDiv);
  });

  sizeSection.appendChild(sizeContainer);
  container.appendChild(sizeSection);

  return container;
};
