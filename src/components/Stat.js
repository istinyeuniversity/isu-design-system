const TREND_UP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`;
const TREND_DOWN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`;
const TREND_NEUTRAL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

export function createStat({
  label = '',
  value = '',
  unit = '',
  description = '',
  trend,
  trendLabel,
  icon,
  size = 'md',
} = {}) {
  const sizeClass = {
    sm: 'isu-stat-sm',
    md: '',
    lg: 'isu-stat-lg',
    xl: 'isu-stat-xl',
  }[size] || '';

  const el = document.createElement('div');
  el.className = ['isu-stat', sizeClass].filter(Boolean).join(' ');

  if (label || icon) {
    const header = document.createElement('div');
    header.className = 'isu-stat-header';

    if (icon) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'isu-stat-icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      if (icon instanceof Element) iconWrap.appendChild(icon.cloneNode(true));
      else iconWrap.innerHTML = icon;
      header.appendChild(iconWrap);
    }

    if (label) {
      const labelEl = document.createElement('span');
      labelEl.className = 'isu-stat-label';
      labelEl.textContent = label;
      header.appendChild(labelEl);
    }

    el.appendChild(header);
  }

  const valueEl = document.createElement('p');
  valueEl.className = 'isu-stat-value';
  if (value instanceof Element) {
    valueEl.appendChild(value.cloneNode(true));
  } else {
    valueEl.textContent = String(value);
  }
  if (unit) {
    const unitEl = document.createElement('span');
    unitEl.className = 'isu-stat-value-unit';
    unitEl.textContent = unit;
    valueEl.appendChild(unitEl);
  }
  el.appendChild(valueEl);

  const hasTrend = trend && (trend.direction || trend.value != null);
  if (hasTrend || description) {
    const footer = document.createElement('div');
    footer.className = 'isu-stat-footer';

    if (hasTrend) {
      const direction = trend.direction || inferDirection(trend.value);
      const trendClass = {
        up: 'isu-stat-trend-up',
        down: 'isu-stat-trend-down',
        neutral: 'isu-stat-trend-neutral',
      }[direction] || 'isu-stat-trend-neutral';
      const badge = document.createElement('span');
      badge.className = `isu-stat-trend ${trendClass}`;

      const iconWrap = document.createElement('span');
      iconWrap.className = 'isu-stat-trend-icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      iconWrap.innerHTML = direction === 'up' ? TREND_UP : direction === 'down' ? TREND_DOWN : TREND_NEUTRAL;
      badge.appendChild(iconWrap);

      const text = document.createElement('span');
      text.textContent = formatTrendValue(trend);
      badge.appendChild(text);

      if (trendLabel) badge.setAttribute('aria-label', trendLabel);
      footer.appendChild(badge);
    }

    if (description) {
      const desc = document.createElement('span');
      desc.className = 'isu-stat-description';
      desc.textContent = description;
      footer.appendChild(desc);
    }

    el.appendChild(footer);
  }

  return el;
}

export function createStatCard({
  accent = false,
  accentVariant = 'primary',
  hover = false,
  ...rest
} = {}) {
  const stat = createStat(rest);
  const accentClass = accent && accentVariant !== 'primary'
    ? {
        success: 'isu-stat-card-success',
        warning: 'isu-stat-card-warning',
        error: 'isu-stat-card-error',
        info: 'isu-stat-card-info',
      }[accentVariant] || ''
    : '';
  const card = document.createElement('div');
  card.className = [
    'isu-stat-card',
    hover ? 'isu-stat-card-hover' : '',
    accent ? 'isu-stat-card-accent' : '',
    accentClass,
  ].filter(Boolean).join(' ');
  card.appendChild(stat);
  return card;
}

export function createStatGroup({ stats = [] } = {}) {
  const group = document.createElement('div');
  group.className = 'isu-stat-group';
  stats.forEach((s) => {
    if (s instanceof Element) group.appendChild(s);
  });
  return group;
}

function inferDirection(val) {
  if (val == null) return 'neutral';
  const n = Number(val);
  if (Number.isNaN(n)) return 'neutral';
  if (n > 0) return 'up';
  if (n < 0) return 'down';
  return 'neutral';
}

function formatTrendValue(trend) {
  if (typeof trend.text === 'string') return trend.text;
  if (trend.value == null) return '';
  const n = Number(trend.value);
  if (Number.isNaN(n)) return String(trend.value);
  const sign = n > 0 ? '+' : '';
  const suffix = trend.suffix || '%';
  return `${sign}${n}${suffix}`;
}
