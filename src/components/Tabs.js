let uidCounter = 0;
const uid = () => `isu-tabs-${++uidCounter}`;

export function createTabs({
  tabs = [],
  defaultValue,
  orientation = 'horizontal',
  variant = 'line',
  size = 'md',
  activateOnFocus = true,
  ariaLabel = 'Tabs',
  onChange,
} = {}) {
  const isVertical = orientation === 'vertical';

  const root = document.createElement('div');
  root.className = [
    'isu-tabs',
    isVertical ? 'isu-tabs-vertical' : '',
    variant === 'pills' ? 'isu-tabs-pills' : '',
    size === 'sm' ? 'isu-tabs-sm' : '',
    size === 'lg' ? 'isu-tabs-lg' : '',
  ].filter(Boolean).join(' ');

  const list = document.createElement('div');
  list.className = 'isu-tabs-list';
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', ariaLabel);
  if (isVertical) list.setAttribute('aria-orientation', 'vertical');

  const panels = document.createElement('div');
  panels.className = 'isu-tabs-panels';

  const values = tabs.map((t, i) => (t.value != null ? t.value : String(i)));
  const firstEnabledIdx = tabs.findIndex((t) => !t.disabled);
  const defaultIdx = values.indexOf(defaultValue);
  let current;
  if (defaultIdx >= 0 && !tabs[defaultIdx].disabled) {
    current = defaultValue;
  } else if (firstEnabledIdx >= 0) {
    current = values[firstEnabledIdx];
  } else {
    current = values[0];
  }

  const triggers = [];
  const panelEls = [];

  tabs.forEach((tab, i) => {
    const value = values[i];
    const tabId = uid();
    const panelId = uid();

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'isu-tabs-trigger';
    btn.id = tabId;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', panelId);
    btn.dataset.value = value;
    btn.disabled = !!tab.disabled;

    if (tab.icon) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'isu-tabs-trigger-icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      if (tab.icon instanceof Element) iconWrap.appendChild(tab.icon.cloneNode(true));
      else iconWrap.innerHTML = tab.icon;
      btn.appendChild(iconWrap);
    }

    const label = document.createElement('span');
    label.className = 'isu-tabs-trigger-label';
    if (tab.label instanceof Element) label.appendChild(tab.label.cloneNode(true));
    else label.textContent = tab.label || '';
    btn.appendChild(label);

    btn.addEventListener('click', () => activate(value));

    list.appendChild(btn);
    triggers.push(btn);

    const panel = document.createElement('div');
    panel.className = 'isu-tabs-panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.tabIndex = 0;
    if (tab.content instanceof Element) panel.appendChild(tab.content.cloneNode(true));
    else panel.innerHTML = tab.content || '';
    panels.appendChild(panel);
    panelEls.push(panel);
  });

  list.addEventListener('keydown', (e) => {
    const idx = triggers.indexOf(document.activeElement);
    if (idx === -1) return;
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    let nextIdx = idx;
    if (e.key === nextKey) nextIdx = findEnabled(idx + 1, 1);
    else if (e.key === prevKey) nextIdx = findEnabled(idx - 1, -1);
    else if (e.key === 'Home') nextIdx = findEnabled(0, 1);
    else if (e.key === 'End') nextIdx = findEnabled(triggers.length - 1, -1);
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate(triggers[idx].dataset.value);
      return;
    } else return;
    e.preventDefault();
    if (nextIdx !== idx) {
      triggers[nextIdx].focus();
      if (activateOnFocus) activate(triggers[nextIdx].dataset.value);
    }
  });

  function findEnabled(start, dir) {
    const n = triggers.length;
    for (let i = 0; i < n; i++) {
      const idx = ((start + dir * i) % n + n) % n;
      if (!triggers[idx].disabled) return idx;
    }
    return 0;
  }

  function activate(value) {
    const idx = values.indexOf(value);
    if (idx === -1) return;
    if (tabs[idx].disabled) return;
    const changed = value !== current;
    current = value;
    triggers.forEach((btn, i) => {
      const selected = values[i] === current;
      btn.setAttribute('aria-selected', String(selected));
      btn.tabIndex = selected ? 0 : -1;
    });
    panelEls.forEach((panel, i) => {
      panel.hidden = values[i] !== current;
    });
    if (changed && typeof onChange === 'function') onChange(current);
  }

  activate(current);

  if (isVertical) {
    root.appendChild(list);
    root.appendChild(panels);
  } else {
    root.appendChild(list);
    root.appendChild(panels);
  }

  root.getValue = () => current;
  root.setValue = (v) => activate(v);

  return root;
}
