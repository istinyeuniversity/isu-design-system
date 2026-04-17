const CHEVRON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;

let uidCounter = 0;
const uid = () => `isu-acc-${++uidCounter}`;

export function createAccordion({
  items = [],
  type = 'single',
  defaultValue,
  collapsible = true,
  ghost = false,
  headingLevel = 3,
  ariaLabel = 'Accordion',
  onChange,
} = {}) {
  const hLevel = Math.min(6, Math.max(1, Number(headingLevel) || 3));
  const root = document.createElement('div');
  root.className = ['isu-accordion', ghost ? 'isu-accordion-ghost' : ''].filter(Boolean).join(' ');
  root.setAttribute('role', 'region');
  root.setAttribute('aria-label', ariaLabel);

  const isMultiple = type === 'multiple';
  let openValues = new Set(
    isMultiple
      ? Array.isArray(defaultValue) ? defaultValue : []
      : defaultValue != null ? [defaultValue] : []
  );

  const triggers = [];
  const entries = items.map((item, idx) => {
    const value = item.value != null ? item.value : String(idx);
    const itemEl = document.createElement('div');
    itemEl.className = 'isu-accordion-item';
    itemEl.dataset.value = value;

    const triggerId = uid();
    const panelId = uid();

    const heading = document.createElement(`h${hLevel}`);
    heading.className = 'isu-accordion-heading';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'isu-accordion-trigger';
    trigger.id = triggerId;
    trigger.setAttribute('aria-controls', panelId);
    trigger.disabled = !!item.disabled;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'isu-accordion-title';
    if (item.title instanceof Element) titleSpan.appendChild(item.title.cloneNode(true));
    else titleSpan.textContent = item.title || '';
    trigger.appendChild(titleSpan);

    const iconWrap = document.createElement('span');
    iconWrap.className = 'isu-accordion-icon';
    iconWrap.innerHTML = CHEVRON_ICON;
    trigger.appendChild(iconWrap);

    const content = document.createElement('div');
    content.className = 'isu-accordion-content';
    content.id = panelId;
    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', triggerId);

    const inner = document.createElement('div');
    inner.className = 'isu-accordion-content-inner';
    const body = document.createElement('div');
    body.className = 'isu-accordion-body';
    if (item.content instanceof Element) body.appendChild(item.content.cloneNode(true));
    else body.innerHTML = item.content || '';
    inner.appendChild(body);
    content.appendChild(inner);

    heading.appendChild(trigger);
    itemEl.appendChild(heading);
    itemEl.appendChild(content);
    root.appendChild(itemEl);

    trigger.addEventListener('click', () => toggle(value));
    triggers.push(trigger);

    return { value, trigger, content };
  });

  function findEnabled(start, dir) {
    const n = triggers.length;
    for (let i = 0; i < n; i++) {
      const idx = ((start + dir * i) % n + n) % n;
      if (!triggers[idx].disabled) return idx;
    }
    return start;
  }

  root.addEventListener('keydown', (e) => {
    const idx = triggers.indexOf(document.activeElement);
    if (idx === -1) return;
    let next = idx;
    switch (e.key) {
      case 'ArrowDown': next = findEnabled(idx + 1, 1); break;
      case 'ArrowUp':   next = findEnabled(idx - 1, -1); break;
      case 'Home':      next = findEnabled(0, 1); break;
      case 'End':       next = findEnabled(triggers.length - 1, -1); break;
      default: return;
    }
    e.preventDefault();
    if (next !== idx) triggers[next].focus();
  });

  function setOpen(values) {
    openValues = new Set(values);
    entries.forEach(({ value, trigger, content }) => {
      const isOpen = openValues.has(value);
      trigger.setAttribute('aria-expanded', String(isOpen));
      content.setAttribute('data-state', isOpen ? 'open' : 'closed');
    });
  }

  function toggle(value) {
    const wasOpen = openValues.has(value);
    let next;
    if (isMultiple) {
      next = new Set(openValues);
      wasOpen ? next.delete(value) : next.add(value);
    } else {
      next = new Set();
      if (!wasOpen) next.add(value);
      else if (!collapsible) next.add(value);
    }
    setOpen(next);
    if (typeof onChange === 'function') {
      onChange(isMultiple ? Array.from(next) : (Array.from(next)[0] ?? null));
    }
  }

  setOpen(openValues);

  root.getValue = () => isMultiple ? Array.from(openValues) : (Array.from(openValues)[0] ?? null);
  root.setValue = (val) => {
    const values = isMultiple ? (Array.isArray(val) ? val : []) : (val != null ? [val] : []);
    setOpen(values);
  };

  return root;
}
