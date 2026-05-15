export function createSplitter({
  orientation = 'horizontal',
  panels = [{}, {}],
  ariaLabel,
} = {}) {
  const isHorizontal = orientation === 'horizontal';
  const root = document.createElement('div');
  root.className = [
    'isu-splitter',
    isHorizontal ? 'isu-splitter-horizontal' : 'isu-splitter-vertical',
  ].join(' ');
  if (ariaLabel) root.setAttribute('aria-label', ariaLabel);

  const [p1Opts = {}, p2Opts = {}] = panels;

  const panel1 = document.createElement('div');
  panel1.className = 'isu-splitter-panel';
  if (p1Opts.content instanceof Element) panel1.appendChild(p1Opts.content);
  else if (typeof p1Opts.content === 'string') panel1.innerHTML = p1Opts.content;

  const panel2 = document.createElement('div');
  panel2.className = 'isu-splitter-panel';
  if (p2Opts.content instanceof Element) panel2.appendChild(p2Opts.content);
  else if (typeof p2Opts.content === 'string') panel2.innerHTML = p2Opts.content;

  const handle = document.createElement('div');
  handle.className = 'isu-splitter-handle';
  handle.setAttribute('role', 'separator');
  handle.setAttribute('aria-orientation', isHorizontal ? 'vertical' : 'horizontal');
  handle.setAttribute('aria-label', isHorizontal ? 'Sütun ayırıcısı' : 'Satır ayırıcısı');
  handle.tabIndex = 0;

  let ratio = typeof p1Opts.defaultSize === 'number' ? p1Opts.defaultSize : 50;

  function applyRatio() {
    panel1.style.flexBasis = `${ratio}%`;
    panel2.style.flexBasis = `${100 - ratio}%`;
    handle.setAttribute('aria-valuenow', String(Math.round(ratio)));
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
  }
  applyRatio();

  let dragging = false;

  function clampRatio(pct) {
    const rect = root.getBoundingClientRect();
    const total = isHorizontal ? rect.width : rect.height;
    if (total <= 0) return pct;
    const minP1 = p1Opts.minSize || 0;
    const minP2 = p2Opts.minSize || 0;
    const minP1Pct = (minP1 / total) * 100;
    const minP2Pct = (minP2 / total) * 100;
    return Math.max(minP1Pct, Math.min(100 - minP2Pct, Math.max(0, Math.min(100, pct))));
  }

  function startDrag(e) {
    dragging = true;
    handle.classList.add('isu-splitter-handle-dragging');
    document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  }

  function moveDrag(clientX, clientY) {
    if (!dragging) return;
    const rect = root.getBoundingClientRect();
    const total = isHorizontal ? rect.width : rect.height;
    if (total <= 0) return;
    const pos = isHorizontal ? clientX - rect.left : clientY - rect.top;
    ratio = clampRatio((pos / total) * 100);
    applyRatio();
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('isu-splitter-handle-dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  handle.addEventListener('mousedown', startDrag);
  const onMouseMove = (e) => moveDrag(e.clientX, e.clientY);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', endDrag);

  handle.addEventListener('touchstart', (e) => {
    startDrag(e);
  }, { passive: false });
  const onTouchMove = (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    if (t) {
      moveDrag(t.clientX, t.clientY);
      e.preventDefault();
    }
  };
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', endDrag);

  handle.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 5 : 1;
    let delta = 0;
    if (isHorizontal) {
      if (e.key === 'ArrowLeft') delta = -step;
      else if (e.key === 'ArrowRight') delta = step;
    } else {
      if (e.key === 'ArrowUp') delta = -step;
      else if (e.key === 'ArrowDown') delta = step;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      ratio = clampRatio(0);
      applyRatio();
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      ratio = clampRatio(100);
      applyRatio();
      return;
    }
    if (delta !== 0) {
      e.preventDefault();
      ratio = clampRatio(ratio + delta);
      applyRatio();
    }
  });

  root.appendChild(panel1);
  root.appendChild(handle);
  root.appendChild(panel2);

  root.getRatio = () => ratio;
  root.setRatio = (r) => { ratio = clampRatio(r); applyRatio(); };
  root.getPanels = () => [panel1, panel2];
  root.destroy = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', endDrag);
  };

  return root;
}
