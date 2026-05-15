export function createButton({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  iconLeft,
  iconRight,
  ariaLabel,
}) {
  const btn = document.createElement('button');
  btn.type = type;

  const variantClasses = {
    primary: 'isu-button-primary',
    secondary: 'isu-button-secondary',
    outline: 'isu-button-outline',
    ghost: 'isu-button-ghost',
    success: 'isu-button-success',
    warning: 'isu-button-warning',
    error: 'isu-button-error',
  };

  const sizeClasses = {
    sm: 'isu-button-sm',
    md: 'isu-button-md',
    lg: 'isu-button-lg',
    xl: 'isu-button-xl',
  };

  const classes = [
    'isu-button',
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
  ];

  if (loading) {
    classes.push('isu-button-loading');
    btn.setAttribute('aria-busy', 'true');
    btn.dataset.loadingSize = size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md';
  }

  btn.className = classes.join(' ');
  btn.disabled = disabled || loading;

  if (ariaLabel) {
    btn.setAttribute('aria-label', ariaLabel);
  }

  const wrapIcon = (icon, side) => {
    if (!icon) return null;
    const span = document.createElement('span');
    span.className = `isu-button-icon isu-button-icon-${side}`;
    span.setAttribute('aria-hidden', 'true');
    if (icon instanceof Element) span.appendChild(icon.cloneNode(true));
    else span.innerHTML = icon;
    return span;
  };

  const leftIcon = wrapIcon(iconLeft, 'left');
  if (leftIcon) btn.appendChild(leftIcon);

  if (label) {
    const labelSpan = document.createElement('span');
    labelSpan.className = 'isu-button-label';
    labelSpan.textContent = label;
    btn.appendChild(labelSpan);
  }

  const rightIcon = wrapIcon(iconRight, 'right');
  if (rightIcon) btn.appendChild(rightIcon);

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  return btn;
}

export function createButtonGroup({ buttons = [], vertical = false, ariaLabel = 'Button group' }) {
  const group = document.createElement('div');
  group.className = vertical ? 'isu-button-group isu-button-group-vertical' : 'isu-button-group';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', ariaLabel);

  buttons.forEach((btn) => {
    if (btn instanceof Element) {
      group.appendChild(btn);
    } else if (btn && typeof btn === 'object') {
      group.appendChild(createButton(btn));
    }
  });

  return group;
}

export function createToggleGroup({
  items = [],
  value,
  values,
  mode = 'single',
  size = 'md',
  variant = 'outline',
  vertical = false,
  disabled = false,
  ariaLabel = 'Toggle group',
  onChange,
} = {}) {
  const multiple = mode === 'multiple';

  const root = document.createElement('div');
  root.className = ['isu-toggle-group', vertical ? 'isu-toggle-group-vertical' : '']
    .filter(Boolean)
    .join(' ');
  root.setAttribute('role', multiple ? 'group' : 'radiogroup');
  root.setAttribute('aria-label', ariaLabel);
  if (vertical) root.setAttribute('aria-orientation', 'vertical');

  const variantClasses = {
    primary: 'isu-button-primary',
    secondary: 'isu-button-secondary',
    outline: 'isu-button-outline',
    ghost: 'isu-button-ghost',
  };
  const sizeClasses = {
    sm: 'isu-button-sm',
    md: 'isu-button-md',
    lg: 'isu-button-lg',
    xl: 'isu-button-xl',
  };

  let single = value;
  const multi = new Set(Array.isArray(values) ? values : []);
  const buttons = [];

  items.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = [
      'isu-button',
      variantClasses[variant] || variantClasses.outline,
      sizeClasses[size] || sizeClasses.md,
      'isu-toggle-group-item',
    ].join(' ');
    btn.dataset.value = item.value;
    btn.disabled = disabled || !!item.disabled;
    if (item.ariaLabel) btn.setAttribute('aria-label', item.ariaLabel);

    if (item.icon) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'isu-button-icon isu-button-icon-left';
      iconWrap.setAttribute('aria-hidden', 'true');
      if (item.icon instanceof Element) iconWrap.appendChild(item.icon.cloneNode(true));
      else iconWrap.innerHTML = item.icon;
      btn.appendChild(iconWrap);
    }
    if (item.label != null) {
      const labelSpan = document.createElement('span');
      labelSpan.className = 'isu-button-label';
      labelSpan.textContent = item.label;
      btn.appendChild(labelSpan);
    }

    if (multiple) {
      btn.setAttribute('aria-pressed', String(multi.has(item.value)));
    } else {
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', String(single === item.value));
      btn.tabIndex = single === item.value ? 0 : -1;
    }

    btn.addEventListener('click', () => toggle(item.value));
    buttons.push(btn);
    root.appendChild(btn);
  });

  if (!multiple && single == null && buttons.length) {
    const first = buttons.find((b) => !b.disabled);
    if (first) first.tabIndex = 0;
  }

  function toggle(v) {
    if (multiple) {
      if (multi.has(v)) multi.delete(v);
      else multi.add(v);
      sync();
      if (typeof onChange === 'function') onChange([...multi]);
    } else {
      if (single === v) return;
      single = v;
      sync();
      if (typeof onChange === 'function') onChange(single);
    }
  }

  function sync() {
    buttons.forEach((btn) => {
      const v = btn.dataset.value;
      if (multiple) {
        btn.setAttribute('aria-pressed', String(multi.has(v)));
      } else {
        const sel = single === v;
        btn.setAttribute('aria-checked', String(sel));
        btn.tabIndex = sel ? 0 : -1;
      }
    });
  }

  function findEnabled(start, dir) {
    const n = buttons.length;
    for (let i = 0; i < n; i++) {
      const idx = ((start + dir * i) % n + n) % n;
      if (!buttons[idx].disabled) return idx;
    }
    return 0;
  }

  root.addEventListener('keydown', (e) => {
    const idx = buttons.indexOf(document.activeElement);
    if (idx === -1) return;
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    let nextIdx = idx;
    if (e.key === nextKey) nextIdx = findEnabled(idx + 1, 1);
    else if (e.key === prevKey) nextIdx = findEnabled(idx - 1, -1);
    else if (e.key === 'Home') nextIdx = findEnabled(0, 1);
    else if (e.key === 'End') nextIdx = findEnabled(buttons.length - 1, -1);
    else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle(buttons[idx].dataset.value);
      return;
    } else return;
    e.preventDefault();
    if (nextIdx !== idx) {
      buttons[nextIdx].focus();
      if (!multiple) toggle(buttons[nextIdx].dataset.value);
    }
  });

  root.getValue = () => (multiple ? [...multi] : single);
  root.setValue = (v) => {
    if (multiple) {
      multi.clear();
      (Array.isArray(v) ? v : []).forEach((x) => multi.add(x));
    } else {
      single = v;
    }
    sync();
  };

  return root;
}
