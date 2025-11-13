export function createScoreDisplay({ value = 0, label = 'Puan', max = 100 }) {
  const display = document.createElement('div');
  display.className = 'isu-score-display';
  display.setAttribute('role', 'status');
  display.setAttribute('aria-label', `${label}: ${value} / ${max}`);

  const valueEl = document.createElement('div');
  valueEl.className = 'isu-score-value';
  valueEl.textContent = value;
  valueEl.setAttribute('aria-hidden', 'true');
  display.appendChild(valueEl);

  const labelEl = document.createElement('div');
  labelEl.className = 'isu-score-label';
  labelEl.textContent = label;
  display.appendChild(labelEl);

  const maxEl = document.createElement('div');
  maxEl.className = 'isu-score-max';
  maxEl.textContent = `/ ${max}`;
  maxEl.setAttribute('aria-hidden', 'true');
  display.appendChild(maxEl);

  return display;
}

