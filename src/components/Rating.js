const STAR_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export function createRating({
  value = 0,
  max = 5,
  precision = 1,
  size = 'md',
  readonly = false,
  disabled = false,
  showValue = false,
  formatValue,
  ariaLabel = 'Rating',
  onChange,
} = {}) {
  const sizeClass = { sm: 'isu-rating-sm', md: '', lg: 'isu-rating-lg' }[size] || '';
  const allowHalf = precision === 0.5;
  const isInteractive = !readonly && !disabled;

  const wrap = document.createElement('div');
  wrap.className = [
    'isu-rating',
    sizeClass,
    !isInteractive ? 'isu-rating-readonly' : '',
  ].filter(Boolean).join(' ');

  wrap.setAttribute('role', isInteractive ? 'slider' : 'img');
  wrap.setAttribute('aria-label', ariaLabel);
  if (isInteractive) {
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-valuemin', '0');
    wrap.setAttribute('aria-valuemax', String(max));
  }
  if (disabled) {
    wrap.setAttribute('aria-disabled', 'true');
    wrap.style.opacity = '0.5';
  }

  let currentValue = clamp(Number(value) || 0, 0, max);
  let previewValue = null;

  const buttons = [];
  for (let i = 1; i <= max; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'isu-rating-button';
    btn.setAttribute('aria-label', `${i} ${i === 1 ? 'star' : 'stars'}`);
    btn.tabIndex = -1;
    if (!isInteractive) btn.disabled = true;

    const starWrap = document.createElement('span');
    starWrap.className = 'isu-rating-star-wrap';

    const empty = document.createElement('span');
    empty.className = 'isu-rating-star-empty';
    empty.innerHTML = STAR_SVG;

    const filled = document.createElement('span');
    filled.className = 'isu-rating-star-filled';
    filled.innerHTML = STAR_SVG;

    starWrap.appendChild(empty);
    starWrap.appendChild(filled);
    btn.appendChild(starWrap);

    if (isInteractive) {
      const computeVal = (e) => {
        if (!allowHalf) return i;
        const rect = btn.getBoundingClientRect();
        const half = (e.clientX - rect.left) <= rect.width / 2;
        return half ? i - 0.5 : i;
      };
      btn.addEventListener('mousemove', (e) => setPreview(computeVal(e)));
      btn.addEventListener('mouseenter', (e) => setPreview(computeVal(e)));
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setValue(computeVal(e));
      });
    }

    wrap.appendChild(btn);
    buttons.push(btn);
  }

  if (isInteractive) {
    wrap.addEventListener('mouseleave', () => setPreview(null));
    wrap.addEventListener('keydown', (e) => {
      const step = precision;
      let next = currentValue;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          next = clamp(currentValue - step, 0, max);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          next = clamp(currentValue + step, 0, max);
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      setValue(next);
    });
  }

  let labelEl = null;
  if (showValue) {
    labelEl = document.createElement('span');
    labelEl.className = 'isu-rating-label';
    wrap.appendChild(labelEl);
  }

  function render() {
    const v = previewValue != null ? previewValue : currentValue;
    buttons.forEach((btn, idx) => {
      const pos = idx + 1;
      let fill = 'empty';
      if (v >= pos) fill = 'full';
      else if (v >= pos - 0.5) fill = 'half';
      btn.setAttribute('data-fill', fill);
    });
    wrap.setAttribute('aria-valuenow', String(currentValue));
    wrap.setAttribute('aria-valuetext', `${currentValue} of ${max}`);
    if (labelEl) {
      labelEl.textContent = typeof formatValue === 'function'
        ? formatValue(currentValue, max)
        : `${currentValue}/${max}`;
    }
  }

  function setPreview(v) {
    previewValue = v;
    render();
  }

  function setValue(v) {
    const next = clamp(Number(v) || 0, 0, max);
    const changed = next !== currentValue;
    currentValue = next;
    render();
    if (changed && typeof onChange === 'function') onChange(currentValue);
  }

  render();

  wrap.getValue = () => currentValue;
  wrap.setValue = setValue;

  return wrap;
}
