export function createButton({ label, variant = 'primary', size = 'md', disabled = false }) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.disabled = disabled;

  // Base classes
  const baseClasses = ['isu-button'];

  // Variant classes
  const variantClasses = {
    primary: 'isu-button-primary',
    secondary: 'isu-button-secondary',
    outline: 'isu-button-outline',
    ghost: 'isu-button-ghost',
    success: 'isu-button-success',
    warning: 'isu-button-warning',
    error: 'isu-button-error',
  };

  // Size classes
  const sizeClasses = {
    sm: 'isu-button-sm',
    md: 'isu-button-md',
    lg: 'isu-button-lg',
    xl: 'isu-button-xl',
  };

  btn.className = [
    ...baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
  ].join(' ');

  if (disabled) {
    btn.setAttribute('disabled', 'true');
  }

  return btn;
}
