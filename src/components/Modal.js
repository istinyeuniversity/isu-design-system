const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let openModalsStack = [];
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

export function createModal({
  title = '',
  description = '',
  content = '',
  footer = null,
  size = 'md',
  closable = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  onClose,
} = {}) {
  const sizeClass = {
    sm: 'isu-modal-sm',
    md: 'isu-modal-md',
    lg: 'isu-modal-lg',
    xl: 'isu-modal-xl',
    full: 'isu-modal-full',
  }[size] || 'isu-modal-md';

  const modal = document.createElement('div');
  modal.className = `isu-modal ${sizeClass}`;
  modal.setAttribute('aria-hidden', 'true');

  const backdrop = document.createElement('div');
  backdrop.className = 'isu-modal-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  modal.appendChild(backdrop);

  const dialog = document.createElement('div');
  dialog.className = 'isu-modal-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.tabIndex = -1;
  modal.appendChild(dialog);

  if (title || description || closable) {
    const header = document.createElement('div');
    header.className = 'isu-modal-header';

    const titleBlock = document.createElement('div');
    if (title) {
      const titleId = `isu-modal-title-${Math.random().toString(36).slice(2, 8)}`;
      const titleEl = document.createElement('h2');
      titleEl.className = 'isu-modal-title';
      titleEl.id = titleId;
      titleEl.textContent = title;
      titleBlock.appendChild(titleEl);
      dialog.setAttribute('aria-labelledby', titleId);
    }
    if (description) {
      const descId = `isu-modal-desc-${Math.random().toString(36).slice(2, 8)}`;
      const descEl = document.createElement('p');
      descEl.className = 'isu-modal-description';
      descEl.id = descId;
      descEl.textContent = description;
      titleBlock.appendChild(descEl);
      dialog.setAttribute('aria-describedby', descId);
    }
    header.appendChild(titleBlock);

    if (closable) {
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'isu-modal-close';
      closeBtn.setAttribute('aria-label', 'Close dialog');
      closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
      closeBtn.addEventListener('click', () => closeModal(modal));
      header.appendChild(closeBtn);
    }

    dialog.appendChild(header);
  }

  const body = document.createElement('div');
  body.className = 'isu-modal-body';
  if (content instanceof Element) {
    body.appendChild(content);
  } else if (typeof content === 'string') {
    body.innerHTML = content;
  }
  dialog.appendChild(body);

  if (footer) {
    const footerEl = document.createElement('div');
    footerEl.className = 'isu-modal-footer';
    if (footer instanceof Element) {
      footerEl.appendChild(footer);
    } else if (Array.isArray(footer)) {
      footer.forEach((node) => {
        if (node instanceof Element) footerEl.appendChild(node);
      });
    } else if (typeof footer === 'string') {
      footerEl.innerHTML = footer;
    }
    dialog.appendChild(footerEl);
  }

  // Stash config for open/close handlers
  modal.__isuModal = { closeOnBackdrop, closeOnEscape, onClose };

  // Backdrop click
  backdrop.addEventListener('click', () => {
    if (modal.__isuModal.closeOnBackdrop) closeModal(modal);
  });

  return modal;
}

export function openModal(modal) {
  if (!modal || !(modal instanceof Element)) return;
  if (!modal.isConnected) {
    document.body.appendChild(modal);
  }

  const cfg = modal.__isuModal || {};
  const previouslyFocused = document.activeElement;
  modal.__isuPrevFocus = previouslyFocused;

  // Defer to next frame so transition runs
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  });

  lockScroll();

  const dialog = modal.querySelector('.isu-modal-dialog');
  const focusables = getFocusable(dialog);
  (focusables[0] || dialog).focus({ preventScroll: true });

  const keyHandler = (e) => {
    if (e.key === 'Escape' && cfg.closeOnEscape !== false) {
      e.stopPropagation();
      closeModal(modal);
    } else if (e.key === 'Tab') {
      trapFocus(e, dialog);
    }
  };
  modal.__isuKeyHandler = keyHandler;
  document.addEventListener('keydown', keyHandler);

  openModalsStack.push(modal);
  return modal;
}

export function closeModal(modal) {
  if (!modal || !(modal instanceof Element)) return;
  if (modal.__isuClosing) return;
  modal.__isuClosing = true;
  const cfg = modal.__isuModal || {};

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');

  if (modal.__isuKeyHandler) {
    document.removeEventListener('keydown', modal.__isuKeyHandler);
    modal.__isuKeyHandler = null;
  }

  unlockScroll();
  openModalsStack = openModalsStack.filter((m) => m !== modal);

  const prev = modal.__isuPrevFocus;
  const transitionMs = 220;
  setTimeout(() => {
    if (modal.parentNode) modal.parentNode.removeChild(modal);
    if (prev && typeof prev.focus === 'function') {
      prev.focus({ preventScroll: true });
    }
    if (typeof cfg.onClose === 'function') cfg.onClose();
  }, transitionMs);
}

export function confirmModal({
  title = 'Confirm',
  message = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
} = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const settle = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'isu-button isu-button-secondary isu-button-md';
    cancelBtn.textContent = cancelLabel;

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = `isu-button isu-button-${variant} isu-button-md`;
    confirmBtn.textContent = confirmLabel;

    const modal = createModal({
      title,
      content: message,
      footer: [cancelBtn, confirmBtn],
      size: 'sm',
      onClose: () => settle(false),
    });

    cancelBtn.addEventListener('click', () => {
      settle(false);
      closeModal(modal);
    });
    confirmBtn.addEventListener('click', () => {
      settle(true);
      closeModal(modal);
    });

    openModal(modal);
  });
}
