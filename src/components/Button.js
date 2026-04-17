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
