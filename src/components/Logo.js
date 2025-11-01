export function createLogo({ variant = 'blue', size = 'md', className = '' }) {
  const logo = document.createElement('img');

  // Logo variants and paths
  const logoPaths = {
    'blue': '/assets/logos/en/logo-blue.svg',
    'white': '/assets/logos/en/logo-white.svg',
    'blue-tr': '/assets/logos/tr/logo-blue.svg',
    'white-tr': '/assets/logos/tr/logo-white.svg'
  };

  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto'
  };

  logo.src = logoPaths[variant] || logoPaths.blue;
  logo.alt = 'Istinye University Logo';
  logo.className = `${sizeClasses[size] || sizeClasses.md} ${className}`.trim();

  return logo;
}

export function createLogoLink({ variant = 'blue', size = 'md', href = '/', className = '' }) {
  const link = document.createElement('a');
  link.href = href;
  link.className = 'isu-logo-link';

  const logo = createLogo({ variant, size, className });
  link.appendChild(logo);

  return link;
}

export function createLogoWithText({ variant = 'blue', size = 'md', text = 'Istinye University', className = '' }) {
  const container = document.createElement('div');
  container.className = `isu-flex items-center space-x-3 ${className}`.trim();

  const logo = createLogo({ variant, size });
  const textSpan = document.createElement('span');
  textSpan.className = 'isu-heading-4 text-gray-900';
  textSpan.textContent = text;

  container.appendChild(logo);
  container.appendChild(textSpan);

  return container;
}
