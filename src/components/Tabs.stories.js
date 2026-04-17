import { createTabs } from './Tabs.js';

const sampleTabs = [
  { value: 'overview', label: 'Overview', content: '<p style="margin:0;color:var(--text-secondary)">Overview panel content.</p>' },
  { value: 'details',  label: 'Details',  content: '<p style="margin:0;color:var(--text-secondary)">Details panel content.</p>' },
  { value: 'history',  label: 'History',  content: '<p style="margin:0;color:var(--text-secondary)">History panel content.</p>' },
];

export default {
  title: 'Components/Tabs',
  argTypes: {
    orientation: { control: { type: 'inline-radio' }, options: ['horizontal', 'vertical'] },
    variant: { control: { type: 'inline-radio' }, options: ['line', 'pills'] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    activateOnFocus: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.style.maxWidth = '36rem';
  wrap.appendChild(createTabs({ tabs: sampleTabs, ...args }));
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'overview',
  orientation: 'horizontal',
  variant: 'line',
  size: 'md',
  activateOnFocus: true,
};

export const Pills = Template.bind({});
Pills.args = {
  defaultValue: 'overview',
  variant: 'pills',
  size: 'md',
};

export const Vertical = Template.bind({});
Vertical.args = {
  defaultValue: 'overview',
  orientation: 'vertical',
  variant: 'line',
};

export const WithDisabled = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.style.maxWidth = '36rem';
  wrap.appendChild(
    createTabs({
      defaultValue: 'a',
      tabs: [
        { value: 'a', label: 'Active', content: 'Active panel' },
        { value: 'b', label: 'Disabled', content: '—', disabled: true },
        { value: 'c', label: 'Another', content: 'Another panel' },
      ],
    })
  );
  return wrap;
};
WithDisabled.parameters = { controls: { disable: true }, actions: { disable: true } };
