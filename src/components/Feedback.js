export function createAlert({ type = 'info', title = '', description = '', dismissible = false }) {
  const alert = document.createElement('div');

  const typeClasses = {
    success: 'isu-alert-success',
    error: 'isu-alert-error',
    warning: 'isu-alert-warning',
    info: 'isu-alert-info'
  };

  alert.className = `isu-alert ${typeClasses[type] || 'isu-alert-info'}`;

  const content = document.createElement('div');
  content.className = 'isu-alert-icon';

  // Icon
  const icon = document.createElement('div');
  icon.className = 'isu-alert-icon';
  icon.innerHTML = getAlertIcon(type);
  content.appendChild(icon);

  // Text content
  const textContent = document.createElement('div');
  textContent.className = 'isu-alert-content';

  if (title) {
    const titleEl = document.createElement('h4');
    titleEl.className = 'isu-alert-title';
    titleEl.textContent = title;
    textContent.appendChild(titleEl);
  }

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'isu-alert-description';
    descEl.textContent = description;
    textContent.appendChild(descEl);
  }

  content.appendChild(textContent);

  // Dismiss button
  if (dismissible) {
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'ml-4 text-current opacity-60 hover:opacity-100';
    dismissBtn.innerHTML = '×';
    dismissBtn.onclick = () => alert.remove();
    content.appendChild(dismissBtn);
  }

  alert.appendChild(content);
  return alert;
}

function getAlertIcon(type) {
  const icons = {
    success: `<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>`,
    error: `<svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>`,
    warning: `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>`,
    info: `<svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
    </svg>`
  };

  return icons[type] || icons.info;
}

export function createBadge({ text = '', variant = 'primary', size = 'sm' }) {
  const badge = document.createElement('span');

  const variantClasses = {
    primary: 'isu-badge-primary',
    secondary: 'isu-badge-secondary',
    success: 'isu-badge-success',
    warning: 'isu-badge-warning',
    error: 'isu-badge-error'
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  badge.className = `isu-badge ${variantClasses[variant] || 'isu-badge-primary'} ${sizeClasses[size] || 'text-xs px-2.5 py-0.5'}`;
  badge.textContent = text;

  return badge;
}

export function createSpinner({ size = 'md' }) {
  const spinner = document.createElement('div');

  const sizeClasses = {
    sm: 'isu-spinner-sm',
    md: 'isu-spinner-md',
    lg: 'isu-spinner-lg'
  };

  spinner.className = `isu-spinner ${sizeClasses[size] || 'isu-spinner-md'}`;

  return spinner;
}

export function createProgressBar({ value = 0, max = 100, showLabel = true }) {
  const container = document.createElement('div');

  if (showLabel) {
    const label = document.createElement('div');
    label.className = 'isu-flex justify-between items-center mb-2';
    label.innerHTML = `
      <span class="isu-body-sm">Progress</span>
      <span class="isu-body-sm text-primary">${Math.round((value / max) * 100)}%</span>
    `;
    container.appendChild(label);
  }

  const progressContainer = document.createElement('div');
  progressContainer.className = 'isu-progress';

  const progressBar = document.createElement('div');
  progressBar.className = 'isu-progress-bar';
  progressBar.style.width = `${(value / max) * 100}%`;

  progressContainer.appendChild(progressBar);
  container.appendChild(progressContainer);

  return container;
}

export function createToast({ type = 'info', title = '', message = '', duration = 5000 }) {
  const toast = document.createElement('div');

  const typeClasses = {
    success: 'isu-toast-success',
    error: 'isu-toast-error',
    warning: 'isu-toast-warning',
    info: 'isu-toast-info'
  };

  toast.className = `isu-toast-item ${typeClasses[type] || 'isu-toast-info'}`;

  const content = document.createElement('div');
  content.className = 'isu-flex items-start space-x-3';

  // Icon
  const iconDiv = document.createElement('div');
  iconDiv.innerHTML = getAlertIcon(type);
  content.appendChild(iconDiv);

  // Text
  const textDiv = document.createElement('div');
  textDiv.className = 'flex-1';

  if (title) {
    const titleEl = document.createElement('h4');
    titleEl.className = 'font-medium';
    titleEl.textContent = title;
    textDiv.appendChild(titleEl);
  }

  if (message) {
    const messageEl = document.createElement('p');
    messageEl.className = 'text-sm';
    messageEl.textContent = message;
    textDiv.appendChild(messageEl);
  }

  content.appendChild(textDiv);
  toast.appendChild(content);

  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, duration);
  }

  return toast;
}

export function createLoadingOverlay({ text = 'Loading...' }) {
  const overlay = document.createElement('div');
  overlay.className = 'isu-loading-overlay';

  const content = document.createElement('div');
  content.className = 'isu-flex items-center';

  const spinner = createSpinner({ size: 'lg' });
  const textEl = document.createElement('span');
  textEl.className = 'isu-loading-text';
  textEl.textContent = text;

  content.appendChild(spinner);
  content.appendChild(textEl);
  overlay.appendChild(content);

  return overlay;
}
