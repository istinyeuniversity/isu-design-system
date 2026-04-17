const DEFAULT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;

export function createEmptyState({
  icon,
  title = '',
  description = '',
  actions,
  size = 'md',
} = {}) {
  const wrap = document.createElement('div');
  wrap.className = ['isu-empty-state', size === 'sm' ? 'isu-empty-state-sm' : ''].filter(Boolean).join(' ');

  if (icon !== false) {
    const iconEl = document.createElement('div');
    iconEl.className = 'isu-empty-state-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    if (icon instanceof Element) {
      iconEl.appendChild(icon.cloneNode(true));
    } else {
      iconEl.innerHTML = icon || DEFAULT_ICON;
    }
    wrap.appendChild(iconEl);
  }

  if (title) {
    const h = document.createElement('h3');
    h.className = 'isu-empty-state-title';
    h.textContent = title;
    wrap.appendChild(h);
  }

  if (description) {
    const p = document.createElement('p');
    p.className = 'isu-empty-state-description';
    p.textContent = description;
    wrap.appendChild(p);
  }

  if (actions) {
    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'isu-empty-state-actions';
    const list = Array.isArray(actions) ? actions : [actions];
    list.forEach((a) => {
      if (a instanceof Element) actionsWrap.appendChild(a);
    });
    if (actionsWrap.children.length > 0) wrap.appendChild(actionsWrap);
  }

  return wrap;
}
