let uidCounter = 0;
const uid = () => `isu-menu-${++uidCounter}`;

export function createMenu({
  trigger,
  items = [],
  placement = 'bottom-start',
  ariaLabel = 'Menu',
  closeOnSelect = true,
  onOpenChange,
} = {}) {
  const root = document.createElement('div');
  root.className = 'isu-menu-root';

  const triggerEl = trigger instanceof Element ? trigger : buildDefaultTrigger(trigger);
  triggerEl.setAttribute('aria-haspopup', 'menu');
  triggerEl.setAttribute('aria-expanded', 'false');
  const menuId = uid();

  const placementClass = {
    'bottom-start': 'isu-menu-bottom-start',
    'bottom-end': 'isu-menu-bottom-end',
    'top-start': 'isu-menu-top-start',
    'top-end': 'isu-menu-top-end',
  }[placement] || 'isu-menu-bottom-start';

  const menu = document.createElement('div');
  menu.className = ['isu-menu', placementClass].join(' ');
  menu.id = menuId;
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', ariaLabel);
  triggerEl.setAttribute('aria-controls', menuId);

  const itemButtons = [];
  items.forEach((item, idx) => {
    if (item.divider) {
      const hr = document.createElement('hr');
      hr.className = 'isu-menu-divider';
      hr.setAttribute('role', 'separator');
      menu.appendChild(hr);
      return;
    }
    if (item.label && item.type === 'label') {
      const label = document.createElement('div');
      label.className = 'isu-menu-label';
      label.textContent = item.label;
      menu.appendChild(label);
      return;
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = ['isu-menu-item', item.danger ? 'isu-menu-item-danger' : ''].filter(Boolean).join(' ');
    btn.setAttribute('role', 'menuitem');
    btn.tabIndex = -1;
    if (item.disabled) btn.disabled = true;

    if (item.icon) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'isu-menu-item-icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      if (item.icon instanceof Element) iconWrap.appendChild(item.icon.cloneNode(true));
      else iconWrap.innerHTML = item.icon;
      btn.appendChild(iconWrap);
    }

    const labelEl = document.createElement('span');
    labelEl.className = 'isu-menu-item-label';
    labelEl.textContent = item.label || '';
    btn.appendChild(labelEl);

    if (item.shortcut) {
      const sc = document.createElement('span');
      sc.className = 'isu-menu-item-shortcut';
      sc.textContent = item.shortcut;
      btn.appendChild(sc);
    }

    btn.addEventListener('click', (e) => {
      if (typeof item.onClick === 'function') item.onClick(e);
      if (closeOnSelect && !e.defaultPrevented) close({ returnFocus: true });
    });
    btn.addEventListener('mouseenter', () => setActive(itemButtons.indexOf(btn)));
    menu.appendChild(btn);
    itemButtons.push(btn);
  });

  root.appendChild(triggerEl);
  root.appendChild(menu);

  let isOpen = false;
  let activeIndex = -1;

  function setActive(idx) {
    activeIndex = idx;
    itemButtons.forEach((b, i) => {
      if (i === idx) b.setAttribute('data-active', 'true');
      else b.removeAttribute('data-active');
    });
  }

  function focusActive() {
    if (activeIndex >= 0 && itemButtons[activeIndex]) {
      itemButtons[activeIndex].focus();
    }
  }

  function firstEnabled(start = 0, dir = 1) {
    const n = itemButtons.length;
    if (!n) return -1;
    for (let i = 0; i < n; i++) {
      const idx = ((start + dir * i) % n + n) % n;
      if (!itemButtons[idx].disabled) return idx;
    }
    return -1;
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    menu.classList.add('is-open');
    triggerEl.setAttribute('aria-expanded', 'true');
    setActive(firstEnabled(0, 1));
    setTimeout(focusActive, 0);
    document.addEventListener('click', onDocClick, true);
    document.addEventListener('keydown', onDocKey, true);
    if (typeof onOpenChange === 'function') onOpenChange(true);
  }

  function close({ returnFocus = false } = {}) {
    if (!isOpen) return;
    isOpen = false;
    menu.classList.remove('is-open');
    triggerEl.setAttribute('aria-expanded', 'false');
    setActive(-1);
    document.removeEventListener('click', onDocClick, true);
    document.removeEventListener('keydown', onDocKey, true);
    if (returnFocus && typeof triggerEl.focus === 'function') {
      triggerEl.focus();
    }
    if (typeof onOpenChange === 'function') onOpenChange(false);
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function onDocClick(e) {
    if (!root.contains(e.target)) close();
  }

  function onDocKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close({ returnFocus: true }); return; }
    if (e.key === 'Tab') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(firstEnabled(activeIndex + 1, 1));
      focusActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(firstEnabled(activeIndex - 1, -1));
      focusActive();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(firstEnabled(0, 1));
      focusActive();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(firstEnabled(itemButtons.length - 1, -1));
      focusActive();
    }
  }

  triggerEl.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });
  triggerEl.addEventListener('keydown', (e) => {
    if (isOpen) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      open();
      setActive(firstEnabled(itemButtons.length - 1, -1));
      focusActive();
    }
  });

  root.open = open;
  root.close = close;
  root.toggle = toggle;
  root.isOpen = () => isOpen;

  return root;
}

function buildDefaultTrigger(config) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'isu-button isu-button-md isu-button-outline';
  btn.textContent = typeof config === 'string' ? config : (config && config.label) || 'Menu';
  return btn;
}
