import { createButton } from './Button.js';

export default {
  title: 'Components/Button',
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
  },
};

const Template = ({ label, ...args }) => {
  return createButton({ label, ...args });
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
  size: 'md',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
  size: 'md',
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Outline Button',
  variant: 'outline',
  size: 'md',
};

export const Ghost = Template.bind({});
Ghost.args = {
  label: 'Ghost Button',
  variant: 'ghost',
  size: 'md',
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success Button',
  variant: 'success',
  size: 'md',
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Warning Button',
  variant: 'warning',
  size: 'md',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Error Button',
  variant: 'error',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Button',
  variant: 'primary',
  size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Button',
  variant: 'primary',
  size: 'sm',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  variant: 'primary',
  size: 'md',
  disabled: true,
};
