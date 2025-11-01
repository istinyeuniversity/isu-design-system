import {
  createInput,
  createTextarea,
  createSelect,
  createCheckbox,
  createRadio,
  createFormGroup
} from './Input.js';

export default {
  title: 'Components/Form Elements',
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

const InputTemplate = ({ type, placeholder, value, disabled, error }) => {
  return createInput({ type, placeholder, value, disabled, error });
};

const TextareaTemplate = ({ placeholder, value, disabled, rows }) => {
  return createTextarea({ placeholder, value, disabled, rows });
};

const SelectTemplate = ({ disabled, value }) => {
  return createSelect({ disabled, value });
};

const CheckboxTemplate = ({ label, checked, disabled, name }) => {
  return createCheckbox({ label, checked, disabled, name });
};

const RadioTemplate = ({ label, checked, disabled, name, value }) => {
  return createRadio({ label, checked, disabled, name, value });
};

const FormGroupTemplate = ({ label, help, error, childrenType }) => {
  let children = [];

  switch (childrenType) {
    case 'input':
      children = [createInput({ placeholder: 'Enter text...' })];
      break;
    case 'textarea':
      children = [createTextarea({ placeholder: 'Enter description...' })];
      break;
    case 'select':
      children = [createSelect({})];
      break;
    case 'checkbox':
      children = [createCheckbox({ label: 'Accept terms', name: 'terms' })];
      break;
    case 'radio':
      children = [
        createRadio({ label: 'Option 1', name: 'radio-group', value: '1' }),
        createRadio({ label: 'Option 2', name: 'radio-group', value: '2' }),
        createRadio({ label: 'Option 3', name: 'radio-group', value: '3' })
      ];
      break;
  }

  return createFormGroup({ label, help, error, children });
};

// Input Stories
export const TextInput = InputTemplate.bind({});
TextInput.args = {
  type: 'text',
  placeholder: 'Enter your name',
  value: '',
  disabled: false,
  error: false,
};

export const EmailInput = InputTemplate.bind({});
EmailInput.args = {
  type: 'email',
  placeholder: 'your@email.com',
  value: '',
  disabled: false,
  error: false,
};

export const PasswordInput = InputTemplate.bind({});
PasswordInput.args = {
  type: 'password',
  placeholder: 'Enter password',
  value: '',
  disabled: false,
  error: false,
};

export const DisabledInput = InputTemplate.bind({});
DisabledInput.args = {
  type: 'text',
  placeholder: 'Disabled input',
  value: 'This is disabled',
  disabled: true,
  error: false,
};

export const ErrorInput = InputTemplate.bind({});
ErrorInput.args = {
  type: 'text',
  placeholder: 'Error input',
  value: 'Invalid value',
  disabled: false,
  error: true,
};

// Textarea Stories
export const Textarea = TextareaTemplate.bind({});
Textarea.args = {
  placeholder: 'Enter your message...',
  value: '',
  disabled: false,
  rows: 4,
};

export const DisabledTextarea = TextareaTemplate.bind({});
DisabledTextarea.args = {
  placeholder: 'Disabled textarea',
  value: 'This textarea is disabled',
  disabled: true,
  rows: 4,
};

// Select Stories
export const Select = SelectTemplate.bind({});
Select.args = {
  disabled: false,
  value: '',
};

export const DisabledSelect = SelectTemplate.bind({});
DisabledSelect.args = {
  disabled: true,
  value: 'option1',
};

// Checkbox Stories
export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {
  label: 'Accept terms and conditions',
  checked: false,
  disabled: false,
  name: 'terms',
};

export const CheckedCheckbox = CheckboxTemplate.bind({});
CheckedCheckbox.args = {
  label: 'I agree to the terms',
  checked: true,
  disabled: false,
  name: 'agreement',
};

export const DisabledCheckbox = CheckboxTemplate.bind({});
DisabledCheckbox.args = {
  label: 'Disabled checkbox',
  checked: true,
  disabled: true,
  name: 'disabled',
};

// Radio Stories
export const RadioGroup = () => {
  const container = document.createElement('div');
  container.className = 'space-y-3';

  const radios = [
    createRadio({ label: 'Option 1', name: 'radio-example', value: '1', checked: true }),
    createRadio({ label: 'Option 2', name: 'radio-example', value: '2' }),
    createRadio({ label: 'Option 3', name: 'radio-example', value: '3' })
  ];

  radios.forEach(radio => container.appendChild(radio));
  return container;
};

export const DisabledRadio = RadioTemplate.bind({});
DisabledRadio.args = {
  label: 'Disabled option',
  checked: false,
  disabled: true,
  name: 'disabled-radio',
  value: 'disabled',
};

// Form Group Stories
export const FormGroupInput = FormGroupTemplate.bind({});
FormGroupInput.args = {
  label: 'Full Name',
  help: 'Please enter your full name',
  error: '',
  childrenType: 'input',
};

export const FormGroupWithError = FormGroupTemplate.bind({});
FormGroupWithError.args = {
  label: 'Email Address',
  help: '',
  error: 'Please enter a valid email address',
  childrenType: 'input',
};

export const FormGroupTextarea = FormGroupTemplate.bind({});
FormGroupTextarea.args = {
  label: 'Message',
  help: 'Maximum 500 characters',
  error: '',
  childrenType: 'textarea',
};

export const FormGroupSelect = FormGroupTemplate.bind({});
FormGroupSelect.args = {
  label: 'Department',
  help: 'Select your department',
  error: '',
  childrenType: 'select',
};

export const FormGroupCheckbox = FormGroupTemplate.bind({});
FormGroupCheckbox.args = {
  label: 'Preferences',
  help: 'Select your preferences',
  error: '',
  childrenType: 'checkbox',
};

export const FormGroupRadio = FormGroupTemplate.bind({});
FormGroupRadio.args = {
  label: 'Account Type',
  help: 'Choose your account type',
  error: '',
  childrenType: 'radio',
};
