const SEARCH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;

const CLEAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export function createSearchbar({
  placeholder = 'Search…',
  value = '',
  size = 'md',
  disabled = false,
  name = '',
  id,
  ariaLabel = 'Search',
  debounce = 0,
  onSearch,
  onInput,
  onClear,
  onSubmit,
} = {}) {
  const sizeClass = {
    sm: 'isu-searchbar-sm',
    md: '',
    lg: 'isu-searchbar-lg',
  }[size] || '';

  const form = document.createElement('form');
  form.className = ['isu-searchbar', sizeClass].filter(Boolean).join(' ');
  form.setAttribute('role', 'search');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') onSubmit(input.value, e);
  });

  const iconSpan = document.createElement('span');
  iconSpan.className = 'isu-searchbar-icon';
  iconSpan.setAttribute('aria-hidden', 'true');
  iconSpan.innerHTML = SEARCH_ICON;
  form.appendChild(iconSpan);

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'isu-searchbar-input';
  input.placeholder = placeholder;
  input.value = value;
  input.disabled = disabled;
  input.setAttribute('aria-label', ariaLabel);
  input.autocomplete = 'off';
  if (name) input.name = name;
  if (id) input.id = id;
  form.appendChild(input);

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'isu-searchbar-clear';
  clearBtn.setAttribute('aria-label', 'Clear search');
  clearBtn.innerHTML = CLEAR_ICON;
  clearBtn.addEventListener('click', () => {
    input.value = '';
    form.classList.remove('has-value');
    input.focus();
    if (typeof onClear === 'function') onClear();
    if (typeof onSearch === 'function') onSearch('');
  });
  form.appendChild(clearBtn);

  const updateHasValue = () => form.classList.toggle('has-value', !!input.value);
  updateHasValue();

  let debounceTimer = null;
  input.addEventListener('input', (e) => {
    updateHasValue();
    if (typeof onInput === 'function') onInput(input.value, e);
    if (typeof onSearch === 'function') {
      if (debounce > 0) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => onSearch(input.value, e), debounce);
      } else {
        onSearch(input.value, e);
      }
    }
  });

  // Expose helpers on the element
  form.getValue = () => input.value;
  form.setValue = (v) => {
    input.value = v != null ? String(v) : '';
    updateHasValue();
  };
  form.focus = () => input.focus();

  return form;
}
