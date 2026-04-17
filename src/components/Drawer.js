const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let scrollLockCount = 0;

function lockScroll() {
  scrollLockCount += 1;
  document.body.classList.add('isu-no-scroll');
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.classList.remove('isu-no-scroll');
  }
}

function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((el) => el.offsetParent !== null || el === document.activeElement);
}

function trapFocus(e, dialog) {
  if (e.key !== 'Tab') return;
  const focusables = getFocusable(dialog);
  if (focusables.length === 0) {
    e.preventDefault();
    dialog.focus();
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function createDrawer({
  title = '',
  content = '',
  footer = null,
  side = 'right',
  size = 'md',
  closable = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  onClose,
} = {}) {
  const sideClass = {
    left: 'isu-drawer-left',
    right: 'isu-drawer-right',
    top: 'isu-drawer-top',
    bottom: 'isu-drawer-bottom',
  }[side] || 'isu-drawer-right';

  const sizeClass = {
    sm: 'isu-drawer-sm',
    md: 'isu-drawer-md',
    lg: 'isu-drawer-lg',
    xl: 'isu-drawer-xl',
  }[size] || 'isu-drawer-md';

  const root = document.createElement('div');
  root.className = 'isu-drawer-root';
  root.setAttribute('aria-hidden', 'true');

  const backdrop = document.createElement('div');
  backdrop.className = 'isu-drawer-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  root.appendChild(backdrop);

  const drawer = document.createElement('aside');
  drawer.className = `isu-drawer ${sideClass} ${sizeClass}`;
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.tabIndex = -1;
  root.appendChild(drawer);

  if (title || closable) {
    const header = document.createElement('div');
    header.className = 'isu-drawer-header';

    if (title) {
      const titleId = `isu-drawer-title-${Math.random().toString(36).slice(2, 8)}`;
      const titleEl = document.createElement('h2');
      titleEl.className = 'isu-drawer-title';
      titleEl.id = titleId;
      titleEl.textContent = title;
      header.appendChild(titleEl);
      drawer.setAttribute('aria-labelledby', titleId);
    } else {
      header.appendChild(document.createElement('div'));
    }

    if (closable) {
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'isu-drawer-close';
      closeBtn.setAttribute('aria-label', 'Close drawer');
      closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
      closeBtn.addEventListener('click', () => closeDrawer(root));
      header.appendChild(closeBtn);
    }

    drawer.appendChild(header);
  }

  const body = document.createElement('div');
  body.className = 'isu-drawer-body';
  if (content instanceof Element) {
    body.appendChild(content);
  } else if (typeof content === 'string') {
    body.innerHTML = content;
  }
  drawer.appendChild(body);

  if (footer) {
    const footerEl = document.createElement('div');
    footerEl.className = 'isu-drawer-footer';
    if (footer instanceof Element) {
      footerEl.appendChild(footer);
    } else if (Array.isArray(footer)) {
      footer.forEach((n) => n instanceof Element && footerEl.appendChild(n));
    } else if (typeof footer === 'string') {
      footerEl.innerHTML = footer;
    }
    drawer.appendChild(footerEl);
  }

  root.__isuDrawer = { closeOnBackdrop, closeOnEscape, onClose };

  backdrop.addEventListener('click', () => {
    if (root.__isuDrawer.closeOnBackdrop) closeDrawer(root);
  });

  return root;
}

export function openDrawer(root) {
  if (!root || !(root instanceof Element)) return;
  if (!root.isConnected) document.body.appendChild(root);

  const cfg = root.__isuDrawer || {};
  root.__isuPrevFocus = document.activeElement;

  requestAnimationFrame(() => {
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
  });

  lockScroll();

  const drawer = root.querySelector('.isu-drawer');
  const focusables = getFocusable(drawer);
  (focusables[0] || drawer).focus({ preventScroll: true });

  const keyHandler = (e) => {
    if (e.key === 'Escape' && cfg.closeOnEscape !== false) {
      e.stopPropagation();
      closeDrawer(root);
    } else if (e.key === 'Tab') {
      trapFocus(e, drawer);
    }
  };
  root.__isuKeyHandler = keyHandler;
  document.addEventListener('keydown', keyHandler);

  return root;
}

export function closeDrawer(root) {
  if (!root || !(root instanceof Element)) return;
  if (root.__isuClosing) return;
  root.__isuClosing = true;
  const cfg = root.__isuDrawer || {};

  root.classList.remove('is-open');
  root.setAttribute('aria-hidden', 'true');

  if (root.__isuKeyHandler) {
    document.removeEventListener('keydown', root.__isuKeyHandler);
    root.__isuKeyHandler = null;
  }

  unlockScroll();

  const prev = root.__isuPrevFocus;
  const transitionMs = 260;
  setTimeout(() => {
    if (root.parentNode) root.parentNode.removeChild(root);
    if (prev && typeof prev.focus === 'function') {
      prev.focus({ preventScroll: true });
    }
    if (typeof cfg.onClose === 'function') cfg.onClose();
  }, transitionMs);
}
