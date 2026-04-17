export function createFab({
  icon,
  label = '',
  ariaLabel,
  variant = 'primary',
  size = 'md',
  extended = false,
  fixed = false,
  disabled = false,
  type = 'button',
  onClick,
}) {
  const btn = document.createElement('button');
  btn.type = type;
  btn.disabled = disabled;

  const variantClasses = {
    primary: '',
    secondary: 'isu-fab-secondary',
    success: 'isu-fab-success',
    error: 'isu-fab-error',
  };

  const sizeClasses = {
    sm: 'isu-fab-sm',
    md: 'isu-fab-md',
    lg: 'isu-fab-lg',
  };

  const classes = ['isu-fab'];
  if (!extended) classes.push(sizeClasses[size] || sizeClasses.md);
  if (variant !== 'primary') classes.push(variantClasses[variant] || '');
  if (extended) classes.push('isu-fab-extended');
  if (fixed) classes.push('isu-fab-fixed');

  btn.className = classes.filter(Boolean).join(' ');

  const computedAriaLabel = ariaLabel || label || 'Floating action button';
  btn.setAttribute('aria-label', computedAriaLabel);

  if (icon) {
    const iconWrap = document.createElement('span');
    iconWrap.className = 'isu-fab-icon';
    iconWrap.setAttribute('aria-hidden', 'true');
    if (icon instanceof Element) iconWrap.appendChild(icon.cloneNode(true));
    else iconWrap.innerHTML = icon;
    btn.appendChild(iconWrap);
  }

  if (extended && label) {
    const labelEl = document.createElement('span');
    labelEl.className = 'isu-fab-label';
    labelEl.textContent = label;
    btn.appendChild(labelEl);
  }

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  return btn;
}
