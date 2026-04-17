let sliderUid = 0;
const genSliderId = () => `isu-slider-${++sliderUid}`;

export function createSlider({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  label = '',
  ariaLabel,
  showValue = true,
  formatValue,
  size = 'md',
  disabled = false,
  name = '',
  id,
  onChange,
  onInput,
} = {}) {
  const sizeClass = {
    sm: 'isu-slider-sm',
    md: '',
    lg: 'isu-slider-lg',
  }[size] || '';

  const group = document.createElement('div');
  group.className = 'isu-slider-group';

  const fmt = typeof formatValue === 'function' ? formatValue : (v) => v;
  const inputId = id || genSliderId();

  let valueEl = null;
  if (label || showValue) {
    const header = document.createElement('div');
    header.className = 'isu-slider-header';

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'isu-slider-label';
      labelEl.textContent = label;
      labelEl.setAttribute('for', inputId);
      header.appendChild(labelEl);
    } else {
      header.appendChild(document.createElement('span'));
    }

    if (showValue) {
      valueEl = document.createElement('span');
      valueEl.className = 'isu-slider-value';
      valueEl.setAttribute('aria-hidden', 'true');
      valueEl.textContent = fmt(value);
      header.appendChild(valueEl);
    }
    group.appendChild(header);
  }

  const input = document.createElement('input');
  input.type = 'range';
  input.className = ['isu-slider', sizeClass].filter(Boolean).join(' ');
  input.min = min;
  input.max = max;
  input.step = step;
  input.value = value;
  input.disabled = disabled;
  input.id = inputId;
  if (name) input.name = name;

  if (ariaLabel) input.setAttribute('aria-label', ariaLabel);
  else if (!label) input.setAttribute('aria-label', 'Slider');

  const updateProgress = () => {
    const v = Number(input.value);
    const lo = Number(input.min);
    const hi = Number(input.max);
    const pct = hi === lo ? 0 : ((v - lo) / (hi - lo)) * 100;
    input.style.setProperty('--isu-slider-progress', `${pct}%`);
    if (valueEl) valueEl.textContent = fmt(v);
  };

  input.addEventListener('input', (e) => {
    updateProgress();
    if (typeof onInput === 'function') onInput(Number(input.value), e);
  });
  input.addEventListener('change', (e) => {
    if (typeof onChange === 'function') onChange(Number(input.value), e);
  });

  requestAnimationFrame(updateProgress);
  group.appendChild(input);

  group.getValue = () => Number(input.value);
  group.setValue = (v) => {
    input.value = v;
    updateProgress();
  };

  return group;
}
