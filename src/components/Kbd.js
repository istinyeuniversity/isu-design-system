const KEY_MAP = {
  cmd: '⌘',
  command: '⌘',
  meta: '⌘',
  ctrl: 'Ctrl',
  control: 'Ctrl',
  alt: 'Alt',
  option: '⌥',
  opt: '⌥',
  shift: '⇧',
  enter: '↵',
  return: '↵',
  esc: 'Esc',
  escape: 'Esc',
  tab: 'Tab',
  space: 'Space',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  delete: '⌫',
  backspace: '⌫',
};

function normalizeKey(key) {
  const k = String(key).toLowerCase().trim();
  return KEY_MAP[k] || (key.length === 1 ? key.toUpperCase() : key);
}

export function createKbd({
  keys,
  label = '',
  size = 'md',
  separator = '+',
} = {}) {
  const sizeClass = { sm: 'isu-kbd-sm', md: '', lg: 'isu-kbd-lg' }[size] || '';

  if (Array.isArray(keys) && keys.length > 0) {
    const group = document.createElement('span');
    group.className = 'isu-kbd-group';
    const aria = `Keyboard shortcut: ${keys.join(' ' + separator + ' ')}`;
    group.setAttribute('aria-label', aria);

    keys.forEach((k, i) => {
      if (i > 0) {
        const plus = document.createElement('span');
        plus.className = 'isu-kbd-plus';
        plus.setAttribute('aria-hidden', 'true');
        plus.textContent = separator;
        group.appendChild(plus);
      }
      const kbd = document.createElement('kbd');
      kbd.className = ['isu-kbd', sizeClass].filter(Boolean).join(' ');
      kbd.textContent = normalizeKey(k);
      group.appendChild(kbd);
    });

    return group;
  }

  const kbd = document.createElement('kbd');
  kbd.className = ['isu-kbd', sizeClass].filter(Boolean).join(' ');
  kbd.textContent = label ? normalizeKey(label) : '';
  return kbd;
}
