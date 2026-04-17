const DEFAULT_USER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

function getInitials(name) {
  if (!name) return '';
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0)).join('').toUpperCase();
}

export function createAvatar({
  src = '',
  alt = '',
  name = '',
  initials,
  icon,
  size = 'md',
  shape = 'circle',
  variant = 'default',
  status,
  statusLabel,
  ariaLabel,
} = {}) {
  const sizeClass = {
    xs: 'isu-avatar-xs',
    sm: 'isu-avatar-sm',
    md: 'isu-avatar-md',
    lg: 'isu-avatar-lg',
    xl: 'isu-avatar-xl',
    '2xl': 'isu-avatar-2xl',
  }[size] || 'isu-avatar-md';

  const shapeClass = {
    circle: '',
    rounded: 'isu-avatar-rounded',
    square: 'isu-avatar-square',
  }[shape] || '';

  const variantClass = {
    default: '',
    primary: 'isu-avatar-primary',
    secondary: 'isu-avatar-secondary',
    success: 'isu-avatar-success',
    warning: 'isu-avatar-warning',
    error: 'isu-avatar-error',
    info: 'isu-avatar-info',
  }[variant] || '';

  const el = document.createElement('span');
  el.className = ['isu-avatar', sizeClass, shapeClass, variantClass].filter(Boolean).join(' ');
  el.setAttribute('role', 'img');
  const computedLabel = ariaLabel || alt || name || 'Avatar';
  el.setAttribute('aria-label', computedLabel);

  if (src) {
    const img = document.createElement('img');
    img.className = 'isu-avatar-image';
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      img.remove();
      renderFallback();
    });
    el.appendChild(img);
  } else {
    renderFallback();
  }

  function renderFallback() {
    const resolvedInitials = initials != null ? initials : getInitials(name);
    if (resolvedInitials) {
      const span = document.createElement('span');
      span.className = 'isu-avatar-initials';
      span.textContent = resolvedInitials;
      el.appendChild(span);
      return;
    }
    const iconWrap = document.createElement('span');
    iconWrap.className = 'isu-avatar-icon';
    iconWrap.setAttribute('aria-hidden', 'true');
    if (icon instanceof Element) {
      iconWrap.appendChild(icon.cloneNode(true));
    } else {
      iconWrap.innerHTML = icon || DEFAULT_USER_ICON;
    }
    el.appendChild(iconWrap);
  }

  if (status) {
    const statusClass = {
      online: 'isu-avatar-status-online',
      offline: 'isu-avatar-status-offline',
      busy: 'isu-avatar-status-busy',
      away: 'isu-avatar-status-away',
    }[status];
    if (statusClass) {
      const dot = document.createElement('span');
      dot.className = `isu-avatar-status ${statusClass}`;
      const label = statusLabel || status;
      dot.setAttribute('role', 'status');
      dot.setAttribute('aria-label', label);
      el.appendChild(dot);
    }
  }

  return el;
}

export function createAvatarGroup({
  avatars = [],
  max = 0,
  size = 'md',
  ariaLabel = 'Avatar group',
} = {}) {
  const group = document.createElement('div');
  group.className = 'isu-avatar-group';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', ariaLabel);

  const items = Array.isArray(avatars) ? avatars : [];
  const limit = max > 0 && items.length > max ? max : items.length;

  for (let i = 0; i < limit; i++) {
    const item = items[i];
    const node = item instanceof Element ? item : createAvatar({ size, ...(item || {}) });
    group.appendChild(node);
  }

  const hidden = items.length - limit;
  if (hidden > 0) {
    const more = createAvatar({
      initials: `+${hidden}`,
      size,
      ariaLabel: `${hidden} more`,
    });
    more.classList.add('isu-avatar-group-more');
    group.appendChild(more);
  }

  return group;
}
