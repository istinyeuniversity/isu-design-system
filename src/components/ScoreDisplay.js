export function createScoreDisplay({ value = 0, label = 'Puan', max = 100 }) {
  const display = document.createElement('div');
  display.className = 'isu-score-display';

  const valueEl = document.createElement('div');
  valueEl.className = 'isu-score-value';
  valueEl.textContent = value;
  display.appendChild(valueEl);

  const labelEl = document.createElement('div');
  labelEl.className = 'isu-score-label';
  labelEl.textContent = label;
  display.appendChild(labelEl);

  const maxEl = document.createElement('div');
  maxEl.className = 'isu-score-max';
  maxEl.textContent = `/ ${max}`;
  display.appendChild(maxEl);

  return display;
}

