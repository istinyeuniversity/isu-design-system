export function createSwitch({
  label = '',
  description = '',
  checked = false,
  disabled = false,
  size = 'md',
  name = '',
  value = '',
  id,
  onChange,
} = {}) {
  const sizeClass = {
    sm: 'isu-switch-sm',
    md: '',
    lg: 'isu-switch-lg',
  }[size] || '';

  const wrapper = document.createElement('label');
  wrapper.className = ['isu-switch', sizeClass].filter(Boolean).join(' ');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'isu-switch-input';
  input.checked = !!checked;
  input.disabled = !!disabled;
  input.setAttribute('role', 'switch');
  if (name) input.name = name;
  if (value) input.value = value;
  if (id) input.id = id;

  const track = document.createElement('span');
  track.className = 'isu-switch-track';
  const thumb = document.createElement('span');
  thumb.className = 'isu-switch-thumb';
  track.appendChild(thumb);

  wrapper.appendChild(input);
  wrapper.appendChild(track);

  if (label || description) {
    const textWrap = document.createElement('span');
    textWrap.className = 'isu-switch-text';

    if (label) {
      const labelEl = document.createElement('span');
      labelEl.className = 'isu-switch-label';
      labelEl.textContent = label;
      textWrap.appendChild(labelEl);
    }

    if (description) {
      const descEl = document.createElement('span');
      descEl.className = 'isu-switch-description';
      descEl.textContent = description;
      textWrap.appendChild(descEl);
    }

    wrapper.appendChild(textWrap);
  }

  if (typeof onChange === 'function') {
    input.addEventListener('change', (e) => onChange(e.target.checked, e));
  }

  return wrapper;
}
