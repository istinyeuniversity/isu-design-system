export function createSkeleton({
  type = 'text',
  width,
  height,
  size,
  lines = 1,
  lastLineWidth = '65%',
  ariaLabel = 'Loading',
} = {}) {
  if (type === 'text' && lines > 1) {
    const wrap = document.createElement('div');
    wrap.className = 'isu-skeleton-text-group';
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-label', ariaLabel);
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '0.5rem';
    for (let i = 0; i < lines; i++) {
      const line = buildSingle({ type, width, height, size });
      if (i === lines - 1 && lastLineWidth) {
        line.style.width = typeof lastLineWidth === 'number' ? `${lastLineWidth}px` : lastLineWidth;
      }
      wrap.appendChild(line);
    }
    return wrap;
  }

  const el = buildSingle({ type, width, height, size });
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', ariaLabel);
  el.removeAttribute('aria-hidden');
  return el;
}

function buildSingle({ type, width, height, size }) {
  const typeClass = {
    text: 'isu-skeleton-text',
    heading: 'isu-skeleton-heading',
    circle: 'isu-skeleton-circle',
    rect: 'isu-skeleton-rect',
    button: 'isu-skeleton-button',
  }[type] || 'isu-skeleton-text';

  let sizeClass = '';
  if (type === 'text') {
    sizeClass = { sm: 'isu-skeleton-text-sm', lg: 'isu-skeleton-text-lg' }[size] || '';
  }

  const el = document.createElement('span');
  el.className = ['isu-skeleton', typeClass, sizeClass].filter(Boolean).join(' ');
  el.setAttribute('aria-hidden', 'true');

  if (width != null) el.style.width = typeof width === 'number' ? `${width}px` : width;
  if (height != null) el.style.height = typeof height === 'number' ? `${height}px` : height;

  return el;
}
