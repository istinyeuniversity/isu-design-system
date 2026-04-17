import { createFab } from './Fab.js';

const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

export default {
  title: 'Components/Fab',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    extended: { control: 'boolean' },
    fixed: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

const Template = (args) =>
  createFab({ icon: plusIcon, ariaLabel: 'Create new item', ...args });

export const Default = Template.bind({});
Default.args = { variant: 'primary', size: 'md' };

export const Extended = Template.bind({});
Extended.args = {
  variant: 'primary',
  label: 'Create',
  extended: true,
};

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary', size: 'md' };
