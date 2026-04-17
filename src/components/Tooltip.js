function hasAccessibleName(el) {
  if (el.hasAttribute('aria-label') && el.getAttribute('aria-label').trim()) return true;
  if (el.hasAttribute('aria-labelledby')) return true;
  if (el.hasAttribute('title')) return true;
  const text = (el.textContent || '').trim();
  if (text) return true;
  const labelled = el.querySelector('[aria-label], img[alt]');
  if (labelled) return true;
  return false;
}

function isFocusable(el) {
  const tag = el.tagName.toLowerCase();
  if (['a', 'button', 'input', 'select', 'textarea'].includes(tag)) return true;
  if (el.hasAttribute('tabindex')) return true;
  return false;
}

export function attachTooltip(el, text, placement = 'top') {
  if (!(el instanceof Element)) return el;
  el.setAttribute('data-tooltip', text);
  el.setAttribute('data-tooltip-placement', placement);

  if (!isFocusable(el)) {
    el.setAttribute('tabindex', '0');
  }

  if (!hasAccessibleName(el)) {
    el.setAttribute('aria-label', text);
    el.dataset.isuTooltipLabelled = '1';
  }

  return el;
}

export function removeTooltip(el) {
  if (!(el instanceof Element)) return el;
  el.removeAttribute('data-tooltip');
  el.removeAttribute('data-tooltip-placement');
  if (el.dataset.isuTooltipLabelled === '1') {
    el.removeAttribute('aria-label');
    delete el.dataset.isuTooltipLabelled;
  }
  return el;
}

export function createTooltipWrapper({ text, placement = 'top', child }) {
  const wrapper = document.createElement('span');
  wrapper.style.display = 'inline-block';
  if (child instanceof Element) wrapper.appendChild(child);
  attachTooltip(wrapper, text, placement);
  return wrapper;
}
