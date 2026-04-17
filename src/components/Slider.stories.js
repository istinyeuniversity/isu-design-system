import { createSlider } from './Slider.js';

export default {
  title: 'Components/Slider',
  argTypes: {
    label: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'number' },
    showValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
    },
    onInput: { action: 'input' },
    onChange: { action: 'change' },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = '24rem';
  wrap.appendChild(createSlider(args));
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Volume',
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  showValue: true,
  size: 'md',
  disabled: false,
};

export const Percentage = Template.bind({});
Percentage.args = {
  label: 'Completion',
  min: 0,
  max: 100,
  step: 5,
  value: 75,
  showValue: true,
  size: 'md',
};
Percentage.argTypes = {};

export const Small = Template.bind({});
Small.args = {
  label: 'Brightness',
  min: 0,
  max: 100,
  value: 30,
  size: 'sm',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Locked',
  value: 50,
  disabled: true,
};
