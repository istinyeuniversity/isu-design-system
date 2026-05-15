import {
  createInput,
  createTextarea,
  createSelect,
  createCheckbox,
  createRadio,
  createFormGroup,
  createNumberInput,
  createPinInput,
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

// ============================================
// createNumberInput — +/− stepper
// ============================================

const wrapField = (label, el) => {
  const box = document.createElement('div');
  box.style.cssText = 'margin: 0.5rem 0; display: flex; align-items: center; gap: 1rem;';
  const lbl = document.createElement('span');
  lbl.textContent = label;
  lbl.style.cssText = 'font-size: 0.875rem; color: #525252; min-width: 12rem;';
  box.appendChild(lbl);
  box.appendChild(el);
  return box;
};

const numberInputArgTypes = {
  fieldLabel: { control: 'text' },
  value: { control: 'number' },
  min: { control: 'number' },
  max: { control: 'number' },
  step: { control: 'number' },
  precision: { control: 'number' },
  size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  width: { control: 'text' },
  placeholder: { control: 'text' },
  ariaLabel: { control: 'text' },
  disabled: { control: 'boolean' },
  required: { control: 'boolean' },
  error: { table: { disable: true } },
};

const NumberInputTemplate = ({ fieldLabel, ...args }) =>
  wrapField(fieldLabel, createNumberInput(args));

export const NumberInput_Credits = NumberInputTemplate.bind({});
NumberInput_Credits.storyName = 'NumberInput — credits (1-6)';
NumberInput_Credits.args = {
  fieldLabel: 'Kredi sayısı',
  value: 3,
  min: 1,
  max: 6,
  step: 1,
  size: 'md',
  ariaLabel: 'Kredi sayısı',
  disabled: false,
  required: false,
};
NumberInput_Credits.argTypes = numberInputArgTypes;

export const NumberInput_RetakeCount = NumberInputTemplate.bind({});
NumberInput_RetakeCount.storyName = 'NumberInput — retake count (0-5)';
NumberInput_RetakeCount.args = {
  fieldLabel: 'Ders tekrarı (devam)',
  value: 0,
  min: 0,
  max: 5,
  step: 1,
  size: 'md',
  ariaLabel: 'Ders tekrarı sayısı',
  disabled: false,
  required: false,
};
NumberInput_RetakeCount.argTypes = numberInputArgTypes;

export const NumberInput_Tuition = NumberInputTemplate.bind({});
NumberInput_Tuition.storyName = 'NumberInput — tuition (large, step:500)';
NumberInput_Tuition.args = {
  fieldLabel: 'Eğitim ücreti (TL)',
  value: 145000,
  min: 0,
  step: 500,
  size: 'lg',
  width: '12rem',
  ariaLabel: 'Eğitim ücreti',
  disabled: false,
  required: false,
};
NumberInput_Tuition.argTypes = numberInputArgTypes;

export const NumberInput_Decimal = NumberInputTemplate.bind({});
NumberInput_Decimal.storyName = 'NumberInput — decimal (GPA, precision:2)';
NumberInput_Decimal.args = {
  fieldLabel: 'GANO',
  value: 3.42,
  min: 0,
  max: 4,
  step: 0.01,
  precision: 2,
  size: 'md',
  ariaLabel: 'GANO',
  disabled: false,
  required: false,
};
NumberInput_Decimal.argTypes = numberInputArgTypes;

export const NumberInput_Sizes = () => {
  const box = document.createElement('div');
  box.style.cssText = 'display: flex; flex-direction: column; gap: 0.75rem;';
  box.appendChild(wrapField('sm', createNumberInput({ value: 1, min: 0, max: 10, size: 'sm' })));
  box.appendChild(wrapField('md', createNumberInput({ value: 1, min: 0, max: 10, size: 'md' })));
  box.appendChild(wrapField('lg', createNumberInput({ value: 1, min: 0, max: 10, size: 'lg' })));
  return box;
};
NumberInput_Sizes.storyName = 'NumberInput — sizes';
NumberInput_Sizes.parameters = { controls: { hideNoControlsWarning: true } };

// ============================================
// createPinInput — OTP / verification code
// ============================================

const pinInputArgTypes = {
  fieldLabel: { control: 'text' },
  length: { control: { type: 'number', min: 2, max: 12 } },
  value: { control: 'text' },
  type: { control: { type: 'select' }, options: ['numeric', 'alphanumeric'] },
  mask: { control: 'boolean' },
  size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  disabled: { control: 'boolean' },
  autoFocus: { control: 'boolean' },
  ariaLabel: { control: 'text' },
  required: { table: { disable: true } },
  error: { table: { disable: true } },
};

const PinInputTemplate = ({ fieldLabel, ...args }) =>
  wrapField(fieldLabel, createPinInput(args));

export const PinInput_OBS = PinInputTemplate.bind({});
PinInput_OBS.storyName = 'PinInput — OBS 2FA (6 digits)';
PinInput_OBS.args = {
  fieldLabel: 'OBS 2FA kodu',
  length: 6,
  type: 'numeric',
  mask: false,
  size: 'md',
  autoFocus: false,
  disabled: false,
  ariaLabel: 'OBS giriş doğrulama kodu',
};
PinInput_OBS.argTypes = pinInputArgTypes;

export const PinInput_EmailVerify = PinInputTemplate.bind({});
PinInput_EmailVerify.storyName = 'PinInput — email verification (4 digits)';
PinInput_EmailVerify.args = {
  fieldLabel: 'E-posta doğrulama',
  length: 4,
  type: 'numeric',
  mask: false,
  size: 'md',
  autoFocus: false,
  disabled: false,
  ariaLabel: 'E-posta doğrulama kodu',
};
PinInput_EmailVerify.argTypes = pinInputArgTypes;

export const PinInput_Masked = PinInputTemplate.bind({});
PinInput_Masked.storyName = 'PinInput — masked';
PinInput_Masked.args = {
  fieldLabel: 'Güvenlik PIN\'i',
  length: 6,
  type: 'numeric',
  mask: true,
  size: 'md',
  autoFocus: false,
  disabled: false,
  ariaLabel: 'Güvenlik PIN',
};
PinInput_Masked.argTypes = pinInputArgTypes;

export const PinInput_Alphanumeric = PinInputTemplate.bind({});
PinInput_Alphanumeric.storyName = 'PinInput — alphanumeric';
PinInput_Alphanumeric.args = {
  fieldLabel: 'Lisans aktivasyon kodu',
  length: 6,
  type: 'alphanumeric',
  mask: false,
  size: 'md',
  autoFocus: false,
  disabled: false,
  ariaLabel: 'Lisans kodu',
};
PinInput_Alphanumeric.argTypes = pinInputArgTypes;

export const PinInput_Prefilled = PinInputTemplate.bind({});
PinInput_Prefilled.storyName = 'PinInput — prefilled value';
PinInput_Prefilled.args = {
  fieldLabel: 'Önceden dolu',
  length: 6,
  type: 'numeric',
  mask: false,
  size: 'md',
  value: '482931',
  autoFocus: false,
  disabled: false,
  ariaLabel: 'Doğrulama kodu',
};
PinInput_Prefilled.argTypes = pinInputArgTypes;
