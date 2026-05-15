import { createButton, createButtonGroup, createToggleGroup } from './Button.js';

export default {
  title: 'Components/Button',
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline-solid', 'ghost', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
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

export const Loading = Template.bind({});
Loading.args = {
  label: 'Saving...',
  variant: 'primary',
  size: 'md',
  loading: true,
};

export const ButtonGroup = () =>
  createButtonGroup({
    ariaLabel: 'Text alignment',
    buttons: [
      { label: 'Left',   variant: 'secondary' },
      { label: 'Center', variant: 'secondary' },
      { label: 'Right',  variant: 'secondary' },
    ],
  });
ButtonGroup.storyName = 'Button Group';

const ToggleGroupTemplate = (args) => createToggleGroup(args);

const toggleGroupArgTypes = {
  variant: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'outline', 'ghost'],
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg', 'xl'],
  },
  mode: {
    control: { type: 'select' },
    options: ['single', 'multiple'],
  },
  vertical: { control: 'boolean' },
  disabled: { control: 'boolean' },
  label: { table: { disable: true } },
  loading: { table: { disable: true } },
};

export const ToggleGroupSingle = ToggleGroupTemplate.bind({});
ToggleGroupSingle.storyName = 'Toggle Group — single (segmented control)';
ToggleGroupSingle.args = {
  ariaLabel: 'View mode',
  mode: 'single',
  size: 'md',
  variant: 'outline',
  vertical: false,
  disabled: false,
  value: 'grid',
  items: [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'kanban', label: 'Kanban' },
  ],
};
ToggleGroupSingle.argTypes = toggleGroupArgTypes;
ToggleGroupSingle.parameters = {
  docs: {
    description: {
      story:
        'Use when a single value must be chosen (radio semantics). Unlike `Tabs`, this does not switch a content panel — ' +
        'it stores a form/filter value. Keyboard: Arrow keys / Home / End.',
    },
  },
};

export const ToggleGroupMultiple = ToggleGroupTemplate.bind({});
ToggleGroupMultiple.storyName = 'Toggle Group — multiple';
ToggleGroupMultiple.args = {
  ariaLabel: 'Text style',
  mode: 'multiple',
  size: 'md',
  variant: 'outline',
  vertical: false,
  disabled: false,
  values: ['bold'],
  items: [
    { value: 'bold', label: 'B' },
    { value: 'italic', label: 'I' },
    { value: 'underline', label: 'U' },
  ],
};
ToggleGroupMultiple.argTypes = toggleGroupArgTypes;

export const ToggleGroupVertical = ToggleGroupTemplate.bind({});
ToggleGroupVertical.storyName = 'Toggle Group — vertical';
ToggleGroupVertical.args = {
  ariaLabel: 'Density',
  mode: 'single',
  size: 'md',
  variant: 'outline',
  vertical: true,
  disabled: false,
  value: 'comfortable',
  items: [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'spacious', label: 'Spacious' },
  ],
};
ToggleGroupVertical.argTypes = toggleGroupArgTypes;
