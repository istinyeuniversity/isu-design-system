export function createRequirementCheck({ met = false, text = '' }) {
  const check = document.createElement('div');
  check.className = `isu-requirement-check ${met ? 'met' : 'not-met'}`;
  check.setAttribute('role', 'status');
  check.setAttribute('aria-live', 'polite');
  check.setAttribute('aria-label', met ? `Şart sağlandı: ${text}` : `Şart sağlanmadı: ${text}`);

  const icon = document.createElement('div');
  icon.className = `isu-check-icon ${met ? 'met' : 'not-met'}`;
  icon.setAttribute('aria-hidden', 'true');
  check.appendChild(icon);

  const textEl = document.createElement('span');
  textEl.textContent = text;
  check.appendChild(textEl);

  return check;
}

