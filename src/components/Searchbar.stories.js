import { createSearchbar } from './Searchbar.js';

export default {
  title: 'Components/Searchbar',
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    debounce: { control: { type: 'number', min: 0, step: 50 } },
    onSearch: { action: 'search' },
    onInput: { action: 'input' },
    onClear: { action: 'clear' },
    onSubmit: { action: 'submit' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Search input with leading icon and auto-hiding clear button. Emits `onSearch` on every keystroke (optionally debounced) and `onSubmit` on Enter.',
      },
    },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = '24rem';
  wrap.appendChild(createSearchbar(args));
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search courses, instructors, students…',
  value: '',
  size: 'md',
  disabled: false,
  debounce: 0,
};

export const Debounced = Template.bind({});
Debounced.args = {
  placeholder: 'Debounced by 300ms',
  size: 'md',
  debounce: 300,
};

export const Small = Template.bind({});
Small.args = {
  placeholder: 'Small search',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  placeholder: 'Large search',
  size: 'lg',
};
