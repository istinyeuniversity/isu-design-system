import { createIconButton } from './IconButton.js';

const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`;

export default {
  title: 'Components/IconButton',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'outline-solid', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: { type: 'inline-radio' },
      options: ['square', 'circle'],
    },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) =>
  createIconButton({ icon: editIcon, ariaLabel: 'Edit', ...args });

export const Default = Template.bind({});
Default.args = { variant: 'default', size: 'md', shape: 'square' };

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', size: 'md', shape: 'circle' };

export const Variants = () => {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.gap = '0.75rem';
  wrap.style.alignItems = 'center';
  ['default', 'primary', 'outline-solid', 'ghost', 'danger'].forEach((v) => {
    wrap.appendChild(
      createIconButton({ icon: editIcon, ariaLabel: `${v} edit`, variant: v })
    );
  });
  return wrap;
};
