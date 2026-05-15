export function createImageSlider({
  slides = [],
  startIndex = 0,
  autoplay = false,
  interval = 5000,
  loop = true,
  showArrows = true,
  showIndicators = true,
  ariaLabel = 'Image slider',
  onChange,
} = {}) {
  const root = document.createElement('div');
  root.className = 'isu-image-slider';
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'carousel');
  root.setAttribute('aria-label', ariaLabel);
  root.tabIndex = 0;

  const viewport = document.createElement('div');
  viewport.className = 'isu-image-slider-viewport';

  const track = document.createElement('ul');
  track.className = 'isu-image-slider-track';

  const slideEls = [];

  slides.forEach((slide, i) => {
    const item = document.createElement('li');
    item.className = 'isu-image-slider-slide';
    item.setAttribute('role', 'group');
    item.setAttribute('aria-roledescription', 'slide');
    item.setAttribute('aria-label', `${i + 1} / ${slides.length}`);

    if (slide instanceof Element) {
      item.appendChild(slide.cloneNode(true));
    } else if (typeof slide === 'string') {
      item.innerHTML = slide;
    } else if (slide && typeof slide === 'object') {
      const img = document.createElement('img');
      img.className = 'isu-image-slider-image';
      img.src = slide.src || '';
      img.alt = slide.alt || '';
      if (slide.loading) img.loading = slide.loading;
      item.appendChild(img);
      if (slide.caption) {
        const cap = document.createElement('div');
        cap.className = 'isu-image-slider-caption';
        if (slide.caption instanceof Element) cap.appendChild(slide.caption.cloneNode(true));
        else cap.innerHTML = slide.caption;
        item.appendChild(cap);
      }
    }
    track.appendChild(item);
    slideEls.push(item);
  });

  viewport.appendChild(track);
  root.appendChild(viewport);

  let prevBtn = null;
  let nextBtn = null;
  const indicators = [];

  if (showArrows && slides.length > 1) {
    prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'isu-image-slider-prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.innerHTML = '<span aria-hidden="true">‹</span>';
    prevBtn.addEventListener('click', () => prev());
    root.appendChild(prevBtn);

    nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'isu-image-slider-next';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.innerHTML = '<span aria-hidden="true">›</span>';
    nextBtn.addEventListener('click', () => next());
    root.appendChild(nextBtn);
  }

  if (showIndicators && slides.length > 1) {
    const dots = document.createElement('div');
    dots.className = 'isu-image-slider-indicators';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Slide selection');
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'isu-image-slider-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dots.appendChild(dot);
      indicators.push(dot);
    });
    root.appendChild(dots);
  }

  const reduceMotion = typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) root.classList.add('isu-image-slider-no-motion');

  let current = clamp(startIndex);
  let timer = null;
  let userPaused = false;

  function clamp(i) {
    const n = slides.length;
    if (n === 0) return 0;
    if (loop) return ((i % n) + n) % n;
    return Math.max(0, Math.min(n - 1, i));
  }

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    indicators.forEach((dot, i) => {
      const sel = i === current;
      dot.setAttribute('aria-selected', String(sel));
      dot.classList.toggle('isu-image-slider-dot-active', sel);
      dot.tabIndex = sel ? 0 : -1;
    });
    slideEls.forEach((el, i) => {
      el.setAttribute('aria-hidden', String(i !== current));
    });
    if (!loop) {
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === slides.length - 1;
    }
  }

  function goTo(i) {
    const target = clamp(i);
    const changed = target !== current;
    current = target;
    render();
    if (changed && typeof onChange === 'function') onChange(current);
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function play() {
    if (timer || !autoplay || reduceMotion || slides.length < 2) return;
    timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      goTo(current + 1);
    }, interval);
  }
  function pause() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', () => { if (!userPaused) play(); });
  root.addEventListener('focusin', pause);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget) && !userPaused) play();
  });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
  });

  render();
  play();

  root.goTo = goTo;
  root.next = next;
  root.prev = prev;
  root.play = () => { userPaused = false; play(); };
  root.pause = () => { userPaused = true; pause(); };
  root.getIndex = () => current;

  return root;
}
