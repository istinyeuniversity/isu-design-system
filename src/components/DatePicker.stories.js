import { createDatePicker } from './DatePicker.js';

export default {
  title: 'Components/DatePicker',
  parameters: {
    docs: {
      description: {
        component:
          'Date picker input with popover calendar. Combobox ARIA pattern. ' +
          'Turkish locale by default (`DD.MM.YYYY`, week starts Monday). ' +
          'Keyboard: ArrowDown opens; in grid Arrow keys / PageUp-Down (months) / Shift+PageUp-Down (years) / Home-End / Enter / Esc.',
      },
    },
  },
};

const wrap = (el) => {
  const box = document.createElement('div');
  box.style.minHeight = '440px';
  box.appendChild(el);
  return box;
};

const Template = (args) => wrap(createDatePicker(args));

const argTypes = {
  locale: {
    control: { type: 'select' },
    options: ['tr', 'en'],
  },
  disabled: { control: 'boolean' },
  showToday: { control: 'boolean' },
  showClear: { control: 'boolean' },
  required: { control: 'boolean' },
  placeholder: { control: 'text' },
  format: { control: 'text' },
  name: { control: 'text' },
  ariaLabel: { control: 'text' },
};

export const Default = Template.bind({});
Default.args = {
  locale: 'tr',
  showToday: true,
  showClear: true,
};
Default.argTypes = argTypes;

export const WithInitialValue = Template.bind({});
WithInitialValue.storyName = 'With initial value';
WithInitialValue.args = {
  locale: 'tr',
  value: new Date(),
  showToday: true,
  showClear: true,
};
WithInitialValue.argTypes = argTypes;

export const English = Template.bind({});
English.args = {
  locale: 'en',
  showToday: true,
  showClear: true,
};
English.argTypes = argTypes;

export const WithMinMax = Template.bind({});
WithMinMax.storyName = 'With min/max bounds';
WithMinMax.args = {
  locale: 'tr',
  min: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  max: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0),
  placeholder: 'Bu ay veya gelecek ay',
};
WithMinMax.argTypes = argTypes;

export const DisableWeekends = Template.bind({});
DisableWeekends.storyName = 'Disable weekends';
DisableWeekends.args = {
  locale: 'tr',
  disableDates: (d) => d.getDay() === 0 || d.getDay() === 6,
};
DisableWeekends.argTypes = argTypes;

export const NoFooter = Template.bind({});
NoFooter.storyName = 'Without footer buttons';
NoFooter.args = {
  locale: 'tr',
  showToday: false,
  showClear: false,
};
NoFooter.argTypes = argTypes;

export const Disabled = Template.bind({});
Disabled.args = {
  locale: 'tr',
  disabled: true,
  value: new Date(),
};
Disabled.argTypes = argTypes;

export const CustomFormat = Template.bind({});
CustomFormat.storyName = 'Custom format (YYYY-MM-DD)';
CustomFormat.args = {
  locale: 'tr',
  format: 'YYYY-MM-DD',
  placeholder: '2026-03-15',
};
CustomFormat.argTypes = argTypes;
