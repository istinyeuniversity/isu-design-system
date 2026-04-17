import { createSwitch } from './Switch.js';

export default {
  title: 'Components/Switch',
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
    },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => createSwitch(args);

export const Default = Template.bind({});
Default.args = {
  label: 'Enable notifications',
  description: '',
  checked: false,
  disabled: false,
  size: 'md',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  label: 'Email alerts',
  description: 'Receive daily digest emails about activity.',
  checked: true,
  disabled: false,
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Compact toggle',
  checked: true,
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Prominent toggle',
  checked: true,
  size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled toggle',
  disabled: true,
  checked: false,
};
