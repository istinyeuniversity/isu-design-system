export function createInput({ type = 'text', placeholder = '', value = '', disabled = false, error = false, required = false }) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  input.disabled = disabled;
  input.required = required;

  const classes = ['isu-input'];
  if (error) classes.push('error');

  input.className = classes.join(' ');

  return input;
}

export function createTextarea({ placeholder = '', value = '', disabled = false, required = false, rows = 3 }) {
  const textarea = document.createElement('textarea');
  textarea.placeholder = placeholder;
  textarea.value = value;
  textarea.disabled = disabled;
  textarea.required = required;
  textarea.rows = rows;

  textarea.className = 'isu-textarea';

  return textarea;
}

export function createSelect({ options = [], value = '', disabled = false, required = false }) {
  const select = document.createElement('select');
  select.disabled = disabled;
  select.required = required;
  select.value = value;

  select.className = 'isu-select';

    // Add default option
  if (options.length === 0) {
    options = [
      { value: '', label: 'Choose...' },
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ];
  }

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    if (option.value === value) opt.selected = true;
    select.appendChild(opt);
  });

  return select;
}

export function createCheckbox({ label = '', checked = false, disabled = false, name = '' }) {
  const labelEl = document.createElement('label');
  labelEl.className = 'isu-flex items-center space-x-3 cursor-pointer';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.disabled = disabled;
  checkbox.name = name;
  checkbox.className = 'isu-checkbox';

  const span = document.createElement('span');
  span.className = 'isu-body-sm';
  span.textContent = label;

  labelEl.appendChild(checkbox);
  labelEl.appendChild(span);

  return labelEl;
}

export function createRadio({ label = '', checked = false, disabled = false, name = 'radio-group', value = '' }) {
  const labelEl = document.createElement('label');
  labelEl.className = 'isu-flex items-center space-x-3 cursor-pointer';

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.checked = checked;
  radio.disabled = disabled;
  radio.name = name;
  radio.value = value;
  radio.className = 'isu-radio';

  const span = document.createElement('span');
  span.className = 'isu-body-sm';
  span.textContent = label;

  labelEl.appendChild(radio);
  labelEl.appendChild(span);

  return labelEl;
}

export function createFormGroup({ label = '', help = '', error = '', children = [] }) {
  const group = document.createElement('div');
  group.className = 'isu-form-group';

  if (label) {
    const labelEl = document.createElement('label');
    labelEl.className = 'isu-form-label';
    labelEl.textContent = label;
    group.appendChild(labelEl);
  }

  children.forEach(child => {
    group.appendChild(child);
  });

  if (help) {
    const helpEl = document.createElement('p');
    helpEl.className = 'isu-form-help';
    helpEl.textContent = help;
    group.appendChild(helpEl);
  }

  if (error) {
    const errorEl = document.createElement('p');
    errorEl.className = 'isu-form-error';
    errorEl.textContent = error;
    group.appendChild(errorEl);
  }

  return group;
}
