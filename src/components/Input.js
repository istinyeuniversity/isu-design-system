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

export function createNumberInput({
  value = 0,
  min,
  max,
  step = 1,
  precision,
  size = 'md',
  width,
  disabled = false,
  required = false,
  name = '',
  id,
  ariaLabel,
  placeholder = '',
  onChange,
} = {}) {
  const sizeClass = size === 'sm'
    ? 'isu-number-input-sm'
    : size === 'lg'
      ? 'isu-number-input-lg'
      : '';
  const root = document.createElement('div');
  root.className = ['isu-number-input', sizeClass].filter(Boolean).join(' ');
  if (disabled) root.classList.add('isu-number-input-disabled');
  if (width != null) {
    root.style.width = typeof width === 'number' ? `${width}px` : String(width);
  }

  const decBtn = document.createElement('button');
  decBtn.type = 'button';
  decBtn.className = 'isu-number-input-btn isu-number-input-decrement';
  decBtn.setAttribute('aria-label', 'Azalt');
  decBtn.innerHTML = '<span aria-hidden="true">−</span>';
  decBtn.disabled = disabled;
  decBtn.tabIndex = -1;

  const input = document.createElement('input');
  input.type = 'text';
  input.inputMode = 'decimal';
  input.className = 'isu-number-input-field';
  if (id) input.id = id;
  if (name) input.name = name;
  if (ariaLabel) input.setAttribute('aria-label', ariaLabel);
  if (placeholder) input.placeholder = placeholder;
  if (required) input.required = true;
  if (disabled) input.disabled = true;
  input.setAttribute('role', 'spinbutton');
  if (min != null) input.setAttribute('aria-valuemin', String(min));
  if (max != null) input.setAttribute('aria-valuemax', String(max));

  const incBtn = document.createElement('button');
  incBtn.type = 'button';
  incBtn.className = 'isu-number-input-btn isu-number-input-increment';
  incBtn.setAttribute('aria-label', 'Arttır');
  incBtn.innerHTML = '<span aria-hidden="true">+</span>';
  incBtn.disabled = disabled;
  incBtn.tabIndex = -1;

  let current = Number(value);
  if (!isFinite(current)) current = 0;

  function clamp(v) {
    if (min != null && v < min) return min;
    if (max != null && v > max) return max;
    return v;
  }
  function format(v) {
    if (precision != null) return Number(v).toFixed(precision);
    return String(v);
  }
  function render() {
    input.value = format(current);
    input.setAttribute('aria-valuenow', String(current));
    decBtn.disabled = disabled || (min != null && current <= min);
    incBtn.disabled = disabled || (max != null && current >= max);
  }
  function setValue(v, fire = true) {
    const num = Number(v);
    if (!isFinite(num)) return;
    const next = clamp(num);
    const changed = next !== current;
    current = next;
    render();
    if (changed && fire && typeof onChange === 'function') onChange(current);
  }
  function bump(delta) { setValue(current + delta); }

  decBtn.addEventListener('click', () => bump(-step));
  incBtn.addEventListener('click', () => bump(step));

  input.addEventListener('input', () => {
    const raw = input.value.replace(',', '.');
    if (raw === '' || raw === '-' || raw === '.') return;
    const num = Number(raw);
    if (isFinite(num)) {
      current = num;
      input.setAttribute('aria-valuenow', String(current));
      if (typeof onChange === 'function') onChange(current);
    }
  });
  input.addEventListener('blur', () => {
    const raw = input.value.replace(',', '.');
    const num = Number(raw);
    if (raw === '' || !isFinite(num)) {
      setValue(min != null ? min : 0);
    } else {
      setValue(num);
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); bump(step); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); bump(-step); }
    else if (e.key === 'PageUp') { e.preventDefault(); bump(step * 10); }
    else if (e.key === 'PageDown') { e.preventDefault(); bump(-step * 10); }
    else if (e.key === 'Home' && min != null) { e.preventDefault(); setValue(min); }
    else if (e.key === 'End' && max != null) { e.preventDefault(); setValue(max); }
  });

  root.appendChild(decBtn);
  root.appendChild(input);
  root.appendChild(incBtn);

  render();

  root.getValue = () => current;
  root.setValue = (v) => setValue(v);
  root.focus = () => input.focus();

  return root;
}

export function createPinInput({
  length = 6,
  value = '',
  type = 'numeric',
  mask = false,
  size = 'md',
  disabled = false,
  autoFocus = false,
  name = '',
  ariaLabel = 'Doğrulama kodu',
  onChange,
  onComplete,
} = {}) {
  const sizeClass = size === 'sm'
    ? 'isu-pin-input-sm'
    : size === 'lg'
      ? 'isu-pin-input-lg'
      : '';
  const root = document.createElement('div');
  root.className = ['isu-pin-input', sizeClass].filter(Boolean).join(' ');
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', ariaLabel);

  const isNumeric = type === 'numeric';
  const charRe = isNumeric ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;

  const inputs = [];
  for (let i = 0; i < length; i++) {
    const inp = document.createElement('input');
    inp.type = mask ? 'password' : 'text';
    inp.className = 'isu-pin-input-box';
    inp.maxLength = 1;
    inp.inputMode = isNumeric ? 'numeric' : 'text';
    inp.autocomplete = i === 0 ? 'one-time-code' : 'off';
    if (name) inp.name = `${name}-${i + 1}`;
    inp.setAttribute('aria-label', `Hane ${i + 1} / ${length}`);
    if (disabled) inp.disabled = true;
    inputs.push(inp);
    root.appendChild(inp);
  }

  if (value) {
    String(value).split('').slice(0, length).forEach((ch, i) => {
      if (charRe.test(ch)) inputs[i].value = ch;
    });
  }

  function getValue() { return inputs.map((i) => i.value).join(''); }
  function fire() {
    const v = getValue();
    if (typeof onChange === 'function') onChange(v);
    if (v.length === length && v.split('').every(Boolean)
      && typeof onComplete === 'function') onComplete(v);
  }

  inputs.forEach((inp, idx) => {
    inp.addEventListener('input', () => {
      const v = inp.value;
      if (v && !charRe.test(v)) {
        inp.value = '';
        return;
      }
      if (v && idx < length - 1) {
        inputs[idx + 1].focus();
        inputs[idx + 1].select();
      }
      fire();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && idx > 0) {
        inputs[idx - 1].focus();
        inputs[idx - 1].select();
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        inputs[idx - 1].focus();
        inputs[idx - 1].select();
      } else if (e.key === 'ArrowRight' && idx < length - 1) {
        e.preventDefault();
        inputs[idx + 1].focus();
        inputs[idx + 1].select();
      }
    });
    inp.addEventListener('focus', () => inp.select());
    inp.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const clean = pasted.split('').filter((c) => charRe.test(c)).slice(0, length - idx);
      clean.forEach((c, i) => {
        if (inputs[idx + i]) inputs[idx + i].value = c;
      });
      const lastIdx = Math.min(idx + clean.length - 1, length - 1);
      const focusIdx = lastIdx + 1 < length ? lastIdx + 1 : lastIdx;
      inputs[focusIdx].focus();
      fire();
    });
  });

  if (autoFocus && !disabled) {
    setTimeout(() => inputs[0].focus(), 0);
  }

  root.getValue = getValue;
  root.setValue = (v) => {
    const chars = String(v).split('').slice(0, length);
    inputs.forEach((inp, i) => {
      inp.value = chars[i] && charRe.test(chars[i]) ? chars[i] : '';
    });
    fire();
  };
  root.clear = () => {
    inputs.forEach((inp) => { inp.value = ''; });
    inputs[0].focus();
    fire();
  };
  root.focus = () => {
    const empty = inputs.find((i) => !i.value) || inputs[0];
    empty.focus();
  };

  return root;
}
