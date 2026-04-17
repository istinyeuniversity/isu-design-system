import { createKbd } from './Kbd.js';

export default {
  title: 'Components/Kbd',
  argTypes: {
    label: { control: 'text' },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(createKbd(args));
  return wrap;
};

export const SingleKey = Template.bind({});
SingleKey.args = { label: 'Enter', size: 'md' };

export const Shortcut = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(createKbd({ keys: ['cmd', 'k'] }));
  return wrap;
};
Shortcut.parameters = { controls: { disable: true }, actions: { disable: true } };

export const Sizes = () => {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '1rem';
  wrap.style.padding = '1rem';
  ['sm', 'md', 'lg'].forEach((size) => {
    wrap.appendChild(createKbd({ keys: ['ctrl', 'shift', 'p'], size }));
  });
  return wrap;
};
Sizes.parameters = { controls: { disable: true }, actions: { disable: true } };

export const InSentence = () => {
  const p = document.createElement('p');
  p.style.padding = '1rem';
  p.style.fontFamily = 'var(--font-body, sans-serif)';
  p.style.color = 'var(--text-primary)';
  p.append('Press ');
  p.appendChild(createKbd({ keys: ['cmd', 'k'] }));
  p.append(' to open the command palette or ');
  p.appendChild(createKbd({ label: 'Esc' }));
  p.append(' to close it.');
  return p;
};
InSentence.parameters = { controls: { disable: true }, actions: { disable: true } };
