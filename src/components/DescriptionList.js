export function createDescriptionList({
  items = [],
  layout = 'horizontal',
  size = 'md',
  ariaLabel,
} = {}) {
  const dl = document.createElement('dl');
  const layoutClass = layout === 'stacked' ? 'isu-description-list-stacked' : '';
  const sizeClass = size === 'sm'
    ? 'isu-description-list-sm'
    : size === 'lg'
      ? 'isu-description-list-lg'
      : '';
  dl.className = ['isu-description-list', layoutClass, sizeClass].filter(Boolean).join(' ');
  if (ariaLabel) dl.setAttribute('aria-label', ariaLabel);

  items.forEach((item) => {
    const group = document.createElement('div');
    group.className = 'isu-description-list-item';

    const dt = document.createElement('dt');
    dt.className = 'isu-description-list-label';
    dt.textContent = item.label || '';
    group.appendChild(dt);

    const dd = document.createElement('dd');
    dd.className = 'isu-description-list-value';
    if (item.value instanceof Element) {
      dd.appendChild(item.value);
    } else if (item.value != null) {
      dd.textContent = String(item.value);
    }
    group.appendChild(dd);

    if (item.hint) {
      const hint = document.createElement('div');
      hint.className = 'isu-description-list-hint';
      hint.textContent = item.hint;
      group.appendChild(hint);
    }

    dl.appendChild(group);
  });

  return dl;
}
