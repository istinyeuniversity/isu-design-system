export function createIconButton({
  icon,
  ariaLabel,
  variant = 'default',
  size = 'md',
  shape = 'square',
  disabled = false,
  active = false,
  pressed,
  type = 'button',
  onClick,
}) {
  const btn = document.createElement('button');
  btn.type = type;
  btn.disabled = disabled;

  const variantClasses = {
    default: '',
    primary: 'isu-icon-button-primary',
    outline: 'isu-icon-button-outline',
    ghost: 'isu-icon-button-ghost',
    danger: 'isu-icon-button-danger',
  };

  const sizeClasses = {
    sm: 'isu-icon-button-sm',
    md: 'isu-icon-button-md',
    lg: 'isu-icon-button-lg',
  };

  const isPressedDefined = typeof pressed === 'boolean';
  const isActive = isPressedDefined ? pressed : active;

  const classes = [
    'isu-icon-button',
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || '',
    shape === 'circle' ? 'isu-icon-button-circle' : '',
    isActive ? 'active' : '',
  ].filter(Boolean);

  btn.className = classes.join(' ');

  if (!ariaLabel) {
    console.warn('[ISU] createIconButton: "ariaLabel" is required for accessibility.');
    btn.setAttribute('aria-label', 'Icon button');
  } else {
    btn.setAttribute('aria-label', ariaLabel);
  }

  if (isPressedDefined) {
    btn.setAttribute('aria-pressed', String(isActive));
  } else if (isActive) {
    btn.setAttribute('aria-pressed', 'true');
  }

  const iconWrap = document.createElement('span');
  iconWrap.className = 'isu-icon-button-icon';
  iconWrap.setAttribute('aria-hidden', 'true');
  if (icon instanceof Element) iconWrap.appendChild(icon.cloneNode(true));
  else if (typeof icon === 'string') iconWrap.innerHTML = icon;
  btn.appendChild(iconWrap);

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  return btn;
}
