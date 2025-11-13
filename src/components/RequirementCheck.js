export function createRequirementCheck({ met = false, text = '' }) {
  const check = document.createElement('div');
  check.className = `isu-requirement-check ${met ? 'met' : 'not-met'}`;

  const icon = document.createElement('div');
  icon.className = 'isu-requirement-icon';
  icon.setAttribute('aria-hidden', 'true');
  check.appendChild(icon);

  const textEl = document.createElement('div');
  textEl.className = 'isu-requirement-text';
  textEl.textContent = text;
  check.appendChild(textEl);

  return check;
}

