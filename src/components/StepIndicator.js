export function createStepIndicator({ steps = [] }) {
  const indicator = document.createElement('div');
  indicator.className = 'isu-step-indicator';

  steps.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = `isu-step ${step.status || 'pending'}`;

    const circle = document.createElement('div');
    circle.className = 'isu-step-circle';
    circle.textContent = step.number || index + 1;
    stepEl.appendChild(circle);

    if (step.label) {
      const label = document.createElement('div');
      label.className = 'isu-step-label';
      label.textContent = step.label;
      stepEl.appendChild(label);
    }

    indicator.appendChild(stepEl);
  });

  return indicator;
}

