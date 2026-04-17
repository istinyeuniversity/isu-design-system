import { createCopyLink } from './CopyLink.js';

export default {
  title: 'Components/CopyLink',
  argTypes: {
    url: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'inline-radio' }, options: ['default', 'subtle', 'inverse'] },
    showIcon: { control: 'boolean' },
    showOpen: { control: 'boolean' },
    copyLabel: { control: 'text' },
    copiedLabel: { control: 'text' },
    resetDelay: { control: { type: 'number', min: 0, max: 10000, step: 500 } },
    onCopy: { action: 'copied' },
    onOpen: { action: 'opened' },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.style.maxWidth = '36rem';

  if (args.variant === 'inverse') {
    wrap.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
    wrap.style.borderRadius = '0.75rem';
  }

  wrap.appendChild(createCopyLink(args));
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  url: 'https://design.istinye.edu.tr/components/accordion',
  label: 'Share this page',
  size: 'md',
  variant: 'default',
  showIcon: true,
  showOpen: false,
  copyLabel: 'Copy',
  copiedLabel: 'Copied',
  resetDelay: 2000,
};

export const WithOpenAndDescription = Template.bind({});
WithOpenAndDescription.args = {
  url: 'https://app.istinye.edu.tr/invite/7f3a9c2e-4b1d-48ae-9f02-8cd1e4b0aa17',
  label: 'Invite link',
  description: 'Expires in 24 hours. Do not share publicly.',
  showOpen: true,
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  url: 'npm install isu-design-system',
  label: 'Install command',
  size: 'sm',
  showIcon: false,
  copyLabel: 'Copy',
};

export const Large = Template.bind({});
Large.args = {
  url: 'https://istinye.edu.tr',
  label: 'Main website',
  description: 'Opens the Istinye University homepage.',
  size: 'lg',
  showOpen: true,
};

export const Subtle = Template.bind({});
Subtle.args = {
  url: 'https://api.istinye.edu.tr/v2/courses',
  label: 'API endpoint',
  variant: 'subtle',
  showOpen: true,
};

export const Inverse = Template.bind({});
Inverse.args = {
  url: 'https://design.istinye.edu.tr',
  label: 'Design system website',
  variant: 'inverse',
  showOpen: true,
};

export const ProgrammaticCopy = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.style.maxWidth = '36rem';
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.gap = '0.75rem';

  const cl = createCopyLink({
    url: 'https://design.istinye.edu.tr',
    label: 'Copy via external button',
    showOpen: true,
  });
  wrap.appendChild(cl);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'isu-button isu-button-primary isu-button-sm';
  btn.textContent = 'Trigger copy from outside';
  btn.style.alignSelf = 'flex-start';
  btn.addEventListener('click', () => cl.copy());
  wrap.appendChild(btn);

  return wrap;
};
ProgrammaticCopy.parameters = { controls: { disable: true }, actions: { disable: true } };
