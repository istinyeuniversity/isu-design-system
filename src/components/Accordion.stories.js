import { createAccordion } from './Accordion.js';
import { createCopyLink } from './CopyLink.js';

const sampleItems = [
  {
    value: 'what',
    title: 'What is ISU Design System?',
    content: 'A component library and design tokens for Istinye University products, built on Tailwind and vanilla JS.',
  },
  {
    value: 'install',
    title: 'How do I install it?',
    content: 'Run <code>npm install isu-design-system</code> and import the CSS or individual components.',
  },
  {
    value: 'theme',
    title: 'Does it support dark mode?',
    content: 'Yes — toggle the <code>data-theme="dark"</code> attribute on the root element.',
  },
];

const disabledItems = [
  { value: 'a', title: 'Section A', content: 'Content A' },
  { value: 'b', title: 'Section B (disabled)', content: 'You cannot open me', disabled: true },
  { value: 'c', title: 'Section C', content: 'Content C' },
];

const buildCopyLinkBody = ({ intro, url, description, size }) => {
  const body = document.createElement('div');
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.gap = '0.75rem';

  const p = document.createElement('p');
  p.style.margin = '0';
  p.style.color = 'var(--text-secondary)';
  p.style.fontSize = '0.875rem';
  p.textContent = intro;
  body.appendChild(p);

  body.appendChild(
    createCopyLink({
      url,
      description,
      size: size || 'md',
      showOpen: true,
    })
  );

  return body;
};

const copyLinkItems = [
  {
    value: 'share',
    title: 'Share this page',
    content: buildCopyLinkBody({
      intro: 'Copy the link below to share the current page with colleagues.',
      url: 'https://design.istinye.edu.tr/components/accordion',
      description: 'Link opens in a new tab when clicking the arrow icon.',
    }),
  },
  {
    value: 'invite',
    title: 'Invite link (expires in 24h)',
    content: buildCopyLinkBody({
      intro: 'Send this temporary invite to a new team member.',
      url: 'https://app.istinye.edu.tr/invite/7f3a9c2e-4b1d-48ae-9f02-8cd1e4b0aa17',
      description: 'This link will expire automatically and cannot be reused.',
      size: 'sm',
    }),
  },
  {
    value: 'api',
    title: 'API endpoint',
    content: buildCopyLinkBody({
      intro: 'Production API endpoint for the courses service.',
      url: 'https://api.istinye.edu.tr/v2/courses',
      description: 'Requires an authorization bearer token.',
      size: 'lg',
    }),
  },
];

export default {
  title: 'Components/Accordion',
  argTypes: {
    type: { control: { type: 'inline-radio' }, options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
    ghost: { control: 'boolean' },
    headingLevel: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3, 4, 5, 6],
    },
    ariaLabel: { control: 'text' },
    items: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.style.maxWidth = '40rem';
  wrap.appendChild(createAccordion(args));
  return wrap;
};

export const Single = Template.bind({});
Single.args = {
  items: sampleItems,
  type: 'single',
  defaultValue: 'what',
  collapsible: true,
  headingLevel: 3,
};

export const Multiple = Template.bind({});
Multiple.args = {
  items: sampleItems,
  type: 'multiple',
  defaultValue: ['what', 'theme'],
  headingLevel: 3,
};

export const Ghost = Template.bind({});
Ghost.args = {
  items: sampleItems,
  type: 'single',
  ghost: true,
  defaultValue: 'install',
  headingLevel: 3,
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  items: disabledItems,
  type: 'single',
  headingLevel: 3,
};

export const WithCopyLink = Template.bind({});
WithCopyLink.args = {
  items: copyLinkItems,
  type: 'single',
  defaultValue: 'share',
  headingLevel: 3,
};
