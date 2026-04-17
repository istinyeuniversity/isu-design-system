const LINK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

const COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

const EXTERNAL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall through to legacy path
    }
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'absolute';
  ta.style.left = '-9999px';
  ta.style.top = '0';
  document.body.appendChild(ta);
  const sel = document.getSelection();
  const prev = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (_) {
    ok = false;
  }
  document.body.removeChild(ta);
  if (prev && sel) {
    sel.removeAllRanges();
    sel.addRange(prev);
  }
  return ok;
}

export function createCopyLink({
  url = '',
  label = '',
  description = '',
  size = 'md',
  variant = 'default',
  showIcon = true,
  showOpen = false,
  openTarget = '_blank',
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  failedLabel = 'Copy failed',
  openLabel = 'Open link in new tab',
  ariaLabel,
  onCopy,
  onOpen,
  resetDelay = 2000,
} = {}) {
  const sizeClass = {
    sm: 'isu-copy-link-sm',
    md: '',
    lg: 'isu-copy-link-lg',
  }[size] || '';

  const variantClass = {
    default: '',
    subtle: 'isu-copy-link-subtle',
    inverse: 'isu-copy-link-inverse',
  }[variant] || '';

  const root = document.createElement('div');
  root.className = ['isu-copy-link', sizeClass, variantClass].filter(Boolean).join(' ');

  if (label) {
    const labelEl = document.createElement('div');
    labelEl.className = 'isu-copy-link-label';
    labelEl.textContent = label;
    root.appendChild(labelEl);
  }

  const field = document.createElement('div');
  field.className = 'isu-copy-link-field';

  if (showIcon) {
    const iconWrap = document.createElement('span');
    iconWrap.className = 'isu-copy-link-icon';
    iconWrap.setAttribute('aria-hidden', 'true');
    iconWrap.innerHTML = LINK_ICON;
    field.appendChild(iconWrap);
  }

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'isu-copy-link-input';
  input.value = url;
  input.readOnly = true;
  input.spellcheck = false;
  input.setAttribute('aria-label', ariaLabel || label || 'Link');
  input.addEventListener('focus', () => input.select());
  input.addEventListener('click', () => input.select());
  field.appendChild(input);

  if (showOpen && url) {
    const openBtn = document.createElement('a');
    openBtn.className = 'isu-copy-link-open';
    openBtn.href = url;
    openBtn.target = openTarget;
    if (openTarget === '_blank') openBtn.rel = 'noopener noreferrer';
    openBtn.setAttribute('aria-label', openLabel);
    openBtn.innerHTML = EXTERNAL_ICON;
    openBtn.addEventListener('click', (e) => {
      if (typeof onOpen === 'function') onOpen(url, e);
    });
    field.appendChild(openBtn);
  }

  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'isu-copy-link-copy';
  copyBtn.setAttribute('aria-label', `${copyLabel}: ${url || 'link'}`);

  const copyIconWrap = document.createElement('span');
  copyIconWrap.className = 'isu-copy-link-copy-icon';
  copyIconWrap.setAttribute('aria-hidden', 'true');
  copyIconWrap.innerHTML = COPY_ICON;
  copyBtn.appendChild(copyIconWrap);

  const copyText = document.createElement('span');
  copyText.className = 'isu-copy-link-copy-text';
  copyText.textContent = copyLabel;
  copyBtn.appendChild(copyText);

  field.appendChild(copyBtn);

  const liveRegion = document.createElement('span');
  liveRegion.className = 'isu-sr-only';
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', 'polite');

  root.appendChild(field);

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'isu-copy-link-description';
    descEl.textContent = description;
    root.appendChild(descEl);
  }

  root.appendChild(liveRegion);

  let resetTimer = null;
  const setState = (state) => {
    root.dataset.state = state;
    if (state === 'copied') {
      copyIconWrap.innerHTML = CHECK_ICON;
      copyText.textContent = copiedLabel;
      liveRegion.textContent = `${copiedLabel}: ${root.getValue()}`;
    } else if (state === 'failed') {
      copyText.textContent = failedLabel;
      liveRegion.textContent = failedLabel;
    } else {
      copyIconWrap.innerHTML = COPY_ICON;
      copyText.textContent = copyLabel;
      liveRegion.textContent = '';
    }
  };

  const triggerCopy = async () => {
    const value = root.getValue();
    if (!value) return false;
    const ok = await copyToClipboard(value);
    setState(ok ? 'copied' : 'failed');
    if (typeof onCopy === 'function') onCopy(value, ok);
    clearTimeout(resetTimer);
    if (resetDelay > 0) {
      resetTimer = setTimeout(() => setState('idle'), resetDelay);
    }
    return ok;
  };

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerCopy();
  });

  root.getValue = () => input.value;
  root.setValue = (v) => {
    input.value = v != null ? String(v) : '';
    copyBtn.setAttribute('aria-label', `${copyLabel}: ${input.value || 'link'}`);
  };
  root.copy = triggerCopy;
  root.focus = () => input.focus();

  setState('idle');

  return root;
}
