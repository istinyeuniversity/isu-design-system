export function createInlineEdit({
  value = '',
  placeholder = '',
  type = 'text',
  commitOn = 'blur',
  validate,
  onCommit,
  onCancel,
  disabled = false,
  ariaLabel,
  maxLength,
} = {}) {
  const root = document.createElement('span');
  root.className = 'isu-inline-edit';
  if (disabled) root.classList.add('isu-inline-edit-disabled');

  let current = String(value);
  let isDisabled = disabled;
  let editing = false;

  const display = document.createElement('span');
  display.className = 'isu-inline-edit-display';
  display.setAttribute('role', 'button');
  display.tabIndex = isDisabled ? -1 : 0;
  if (ariaLabel) display.setAttribute('aria-label', ariaLabel);

  const valueSpan = document.createElement('span');
  valueSpan.className = 'isu-inline-edit-value';

  const editIcon = document.createElement('span');
  editIcon.className = 'isu-inline-edit-icon';
  editIcon.setAttribute('aria-hidden', 'true');
  editIcon.innerHTML = '✎';

  function renderDisplay() {
    if (current) {
      valueSpan.textContent = current;
      valueSpan.classList.remove('isu-inline-edit-placeholder');
    } else {
      valueSpan.textContent = placeholder || '—';
      valueSpan.classList.add('isu-inline-edit-placeholder');
    }
  }
  renderDisplay();
  display.appendChild(valueSpan);
  display.appendChild(editIcon);

  function startEdit() {
    if (isDisabled || editing) return;
    editing = true;
    const editor = type === 'textarea'
      ? document.createElement('textarea')
      : document.createElement('input');
    if (type !== 'textarea') editor.type = 'text';
    editor.className = type === 'textarea'
      ? 'isu-inline-edit-textarea'
      : 'isu-inline-edit-input';
    editor.value = current;
    if (placeholder) editor.placeholder = placeholder;
    if (maxLength) editor.maxLength = maxLength;
    if (ariaLabel) editor.setAttribute('aria-label', ariaLabel);

    function stopEdit() {
      editing = false;
      if (editor.parentNode) editor.replaceWith(display);
    }

    function commit() {
      if (!editing) return;
      const next = editor.value;
      const result = typeof validate === 'function' ? validate(next) : true;
      if (result !== true && result !== undefined) {
        editor.setAttribute('aria-invalid', 'true');
        if (typeof result === 'string') editor.title = result;
        editor.focus();
        return;
      }
      const prev = current;
      current = next;
      stopEdit();
      renderDisplay();
      if (prev !== current && typeof onCommit === 'function') onCommit(current, prev);
    }

    function cancel() {
      if (!editing) return;
      stopEdit();
      renderDisplay();
      if (typeof onCancel === 'function') onCancel();
    }

    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && type !== 'textarea') {
        e.preventDefault();
        commit();
      } else if (e.key === 'Enter' && type === 'textarea' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cancel();
      }
    });
    editor.addEventListener('blur', () => {
      if (!editing) return;
      if (commitOn === 'blur') commit();
      else cancel();
    });

    display.replaceWith(editor);
    editor.focus();
    if (type !== 'textarea' && typeof editor.select === 'function') editor.select();
  }

  display.addEventListener('click', startEdit);
  display.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startEdit();
    }
  });

  root.appendChild(display);

  root.getValue = () => current;
  root.setValue = (v) => { current = String(v); renderDisplay(); };
  root.startEdit = startEdit;
  root.disable = () => {
    isDisabled = true;
    display.tabIndex = -1;
    root.classList.add('isu-inline-edit-disabled');
  };
  root.enable = () => {
    isDisabled = false;
    display.tabIndex = 0;
    root.classList.remove('isu-inline-edit-disabled');
  };

  return root;
}
