import { createRating } from './Rating.js';

export default {
  title: 'Components/Rating',
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    precision: { control: { type: 'inline-radio' }, options: [1, 0.5] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(createRating(args));
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  value: 3,
  max: 5,
  precision: 1,
  size: 'md',
  readonly: false,
  disabled: false,
  showValue: false,
};

export const HalfStar = Template.bind({});
HalfStar.args = {
  value: 3.5,
  max: 5,
  precision: 0.5,
  size: 'md',
  showValue: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  value: 4.5,
  max: 5,
  precision: 0.5,
  readonly: true,
  showValue: true,
};

export const Large = Template.bind({});
Large.args = {
  value: 2,
  max: 5,
  size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 3,
  disabled: true,
};
