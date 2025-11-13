export function createStepIndicator({ steps = [], ariaLabel = 'Form adımları' }) {
  const indicator = document.createElement('div');
  indicator.className = 'isu-step-indicator';
  indicator.setAttribute('role', 'progressbar');
  indicator.setAttribute('aria-label', ariaLabel);
  indicator.setAttribute('aria-valuemin', '0');
  indicator.setAttribute('aria-valuemax', steps.length.toString());
  
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const activeStepIndex = steps.findIndex(s => s.status === 'active');
  const currentValue = activeStepIndex >= 0 ? activeStepIndex + 1 : completedSteps;
  indicator.setAttribute('aria-valuenow', currentValue.toString());

  steps.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = `isu-step ${step.status || 'pending'}`;
    stepEl.setAttribute('role', 'listitem');
    
    if (step.status === 'active') {
      stepEl.setAttribute('aria-current', 'step');
    }

    const circle = document.createElement('div');
    circle.className = 'isu-step-circle';
    circle.textContent = step.number || index + 1;
    circle.setAttribute('aria-hidden', 'true');
    stepEl.appendChild(circle);

    if (step.label) {
      const label = document.createElement('div');
      label.className = 'isu-step-label';
      label.textContent = step.label;
      label.setAttribute('aria-label', `Adım ${index + 1}: ${step.label}`);
      stepEl.appendChild(label);
    }

    indicator.appendChild(stepEl);
  });

  return indicator;
}

