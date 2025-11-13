export function createLogo({ variant = 'blue', size = 'md', className = '' }) {
  const logo = document.createElement('img');

  // Detect if we're in Storybook
  const isStorybook = typeof window !== 'undefined' && 
    (window.location.href.includes('localhost:6006') || 
     window.location.href.includes('storybook') ||
     window.location.pathname.includes('iframe.html'));

  // Logo paths - Storybook uses /logos/... (from .storybook/static)
  // Production uses /assets/logos/... (from src/assets)
  const logoPaths = isStorybook ? {
    'blue': '/logos/en/logo-blue.svg',
    'white': '/logos/en/logo-white.svg',
    'blue-tr': '/logos/tr/logo-blue.svg',
    'white-tr': '/logos/tr/logo-white.svg'
  } : {
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
  
  // Add error handler to help debug
  logo.onerror = function() {
    console.warn(`Logo not found: ${logo.src}. Expected path: ${logoPaths[variant]}`);
  };

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
