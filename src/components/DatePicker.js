const LOCALES = {
  tr: {
    months: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ],
    weekdaysShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    weekStartsOn: 1,
    format: 'DD.MM.YYYY',
    todayLabel: 'Bugün',
    clearLabel: 'Temizle',
    openCalendarLabel: 'Takvimi aç',
    prevMonthLabel: 'Önceki ay',
    nextMonthLabel: 'Sonraki ay',
    placeholderHint: 'GG.AA.YYYY',
  },
  en: {
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weekStartsOn: 1,
    format: 'DD/MM/YYYY',
    todayLabel: 'Today',
    clearLabel: 'Clear',
    openCalendarLabel: 'Open calendar',
    prevMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
    placeholderHint: 'DD/MM/YYYY',
  },
};

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function isSameDay(a, b) {
  return !!(a && b
    && a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate());
}
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function addMonths(d, n) {
  const r = new Date(d);
  const targetMonth = r.getMonth() + n;
  r.setDate(1);
  r.setMonth(targetMonth);
  return r;
}

function formatDate(date, fmt) {
  const tokens = {
    YYYY: String(date.getFullYear()),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    M: String(date.getMonth() + 1),
    D: String(date.getDate()),
  };
  return fmt.replace(/YYYY|MM|DD|M|D/g, (m) => tokens[m]);
}

function parseDate(str, fmt) {
  if (!str) return null;
  const tokens = [];
  let pattern = '';
  let i = 0;
  while (i < fmt.length) {
    if (fmt.startsWith('YYYY', i)) { tokens.push('Y'); pattern += '(\\d{4})'; i += 4; }
    else if (fmt.startsWith('MM', i)) { tokens.push('M'); pattern += '(\\d{1,2})'; i += 2; }
    else if (fmt.startsWith('DD', i)) { tokens.push('D'); pattern += '(\\d{1,2})'; i += 2; }
    else { pattern += fmt[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); i++; }
  }
  const re = new RegExp('^' + pattern + '$');
  const m = String(str).trim().match(re);
  if (!m) return null;
  let y = 0, mo = 0, d = 0;
  tokens.forEach((t, idx) => {
    const v = parseInt(m[idx + 1], 10);
    if (t === 'Y') y = v;
    else if (t === 'M') mo = v;
    else if (t === 'D') d = v;
  });
  if (!y || !mo || !d) return null;
  const result = new Date(y, mo - 1, d);
  if (result.getFullYear() !== y || result.getMonth() !== mo - 1 || result.getDate() !== d) {
    return null;
  }
  return result;
}

let uidCounter = 0;
const uid = () => `isu-date-picker-${++uidCounter}`;

export function createDatePicker({
  value = null,
  min,
  max,
  locale = 'tr',
  format,
  placeholder,
  disableDates,
  showToday = true,
  showClear = true,
  disabled = false,
  required = false,
  name,
  id,
  ariaLabel,
  onChange,
  onOpen,
  onClose,
} = {}) {
  const L = typeof locale === 'object'
    ? { ...LOCALES.tr, ...locale }
    : (LOCALES[locale] || LOCALES.tr);
  const fmt = format || L.format;
  const placeholderText = placeholder || L.placeholderHint;
  const minDate = min ? startOfDay(new Date(min)) : null;
  const maxDate = max ? startOfDay(new Date(max)) : null;

  let selected = value ? startOfDay(new Date(value)) : null;
  let view = selected ? new Date(selected) : new Date();
  view.setDate(1);
  let isOpen = false;
  let focusedDate = selected ? new Date(selected) : startOfDay(new Date());

  const root = document.createElement('div');
  root.className = 'isu-date-picker';
  const rootId = id || uid();
  const popoverId = `${rootId}-popover`;
  const monthLabelId = `${rootId}-label`;

  const inputWrap = document.createElement('div');
  inputWrap.className = 'isu-date-picker-input-wrap';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'isu-date-picker-input';
  input.id = rootId;
  input.placeholder = placeholderText;
  input.autocomplete = 'off';
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-haspopup', 'dialog');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', popoverId);
  if (name) input.name = name;
  if (required) input.required = true;
  if (disabled) input.disabled = true;
  if (ariaLabel) input.setAttribute('aria-label', ariaLabel);
  if (selected) input.value = formatDate(selected, fmt);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'isu-date-picker-trigger';
  trigger.setAttribute('aria-label', L.openCalendarLabel);
  trigger.tabIndex = -1;
  trigger.innerHTML = '<span aria-hidden="true">📅</span>';
  if (disabled) trigger.disabled = true;

  inputWrap.appendChild(input);
  inputWrap.appendChild(trigger);
  root.appendChild(inputWrap);

  const popover = document.createElement('div');
  popover.className = 'isu-date-picker-popover';
  popover.id = popoverId;
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-label', L.openCalendarLabel);
  popover.hidden = true;

  const header = document.createElement('div');
  header.className = 'isu-date-picker-header';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'isu-date-picker-prev';
  prevBtn.setAttribute('aria-label', L.prevMonthLabel);
  prevBtn.innerHTML = '<span aria-hidden="true">‹</span>';

  const monthLabel = document.createElement('div');
  monthLabel.className = 'isu-date-picker-month-year';
  monthLabel.setAttribute('aria-live', 'polite');
  monthLabel.id = monthLabelId;

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'isu-date-picker-next';
  nextBtn.setAttribute('aria-label', L.nextMonthLabel);
  nextBtn.innerHTML = '<span aria-hidden="true">›</span>';

  header.appendChild(prevBtn);
  header.appendChild(monthLabel);
  header.appendChild(nextBtn);
  popover.appendChild(header);

  const weekdaysRow = document.createElement('div');
  weekdaysRow.className = 'isu-date-picker-weekdays';
  weekdaysRow.setAttribute('role', 'row');
  for (let i = 0; i < 7; i++) {
    const cell = document.createElement('div');
    cell.className = 'isu-date-picker-weekday';
    cell.setAttribute('role', 'columnheader');
    cell.textContent = L.weekdaysShort[i];
    weekdaysRow.appendChild(cell);
  }
  popover.appendChild(weekdaysRow);

  const grid = document.createElement('div');
  grid.className = 'isu-date-picker-grid';
  grid.setAttribute('role', 'grid');
  grid.setAttribute('aria-labelledby', monthLabelId);
  popover.appendChild(grid);

  let todayBtn = null;
  let clearBtn = null;
  if (showToday || showClear) {
    const footer = document.createElement('div');
    footer.className = 'isu-date-picker-footer';
    if (showToday) {
      todayBtn = document.createElement('button');
      todayBtn.type = 'button';
      todayBtn.className = 'isu-date-picker-today-btn';
      todayBtn.textContent = L.todayLabel;
      footer.appendChild(todayBtn);
    }
    if (showClear) {
      clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'isu-date-picker-clear-btn';
      clearBtn.textContent = L.clearLabel;
      footer.appendChild(clearBtn);
    }
    popover.appendChild(footer);
  }

  root.appendChild(popover);

  function isDateDisabled(date) {
    const d = startOfDay(date);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    if (typeof disableDates === 'function' && disableDates(new Date(d))) return true;
    return false;
  }

  function renderHeader() {
    monthLabel.textContent = `${L.months[view.getMonth()]} ${view.getFullYear()}`;
  }

  function renderGrid() {
    grid.innerHTML = '';
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startOffset = (first.getDay() - L.weekStartsOn + 7) % 7;
    let day = addDays(first, -startOffset);
    const today = startOfDay(new Date());

    for (let r = 0; r < 6; r++) {
      const row = document.createElement('div');
      row.className = 'isu-date-picker-row';
      row.setAttribute('role', 'row');
      for (let c = 0; c < 7; c++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'isu-date-picker-day';
        cell.setAttribute('role', 'gridcell');
        cell.textContent = String(day.getDate());
        cell.dataset.year = day.getFullYear();
        cell.dataset.month = day.getMonth();
        cell.dataset.date = day.getDate();
        const outside = day.getMonth() !== view.getMonth();
        if (outside) cell.classList.add('isu-date-picker-day-outside');
        if (isSameDay(day, today)) cell.classList.add('isu-date-picker-day-today');
        const isSel = isSameDay(day, selected);
        if (isSel) cell.classList.add('isu-date-picker-day-selected');
        const dis = isDateDisabled(day);
        if (dis) {
          cell.classList.add('isu-date-picker-day-disabled');
          cell.setAttribute('aria-disabled', 'true');
          cell.disabled = true;
        }
        cell.setAttribute('aria-selected', String(isSel));
        cell.setAttribute('aria-label', formatDate(day, fmt));
        const isFocused = isSameDay(day, focusedDate);
        cell.tabIndex = isFocused ? 0 : -1;
        row.appendChild(cell);
        day = addDays(day, 1);
      }
      grid.appendChild(row);
    }
  }

  function render() {
    renderHeader();
    renderGrid();
  }

  function open() {
    if (isOpen || disabled) return;
    isOpen = true;
    if (selected) {
      focusedDate = new Date(selected);
    } else {
      focusedDate = startOfDay(new Date());
    }
    view = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1);
    render();
    popover.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      const focusable = grid.querySelector('[tabindex="0"]');
      if (focusable) focusable.focus();
    });
    if (typeof onOpen === 'function') onOpen();
  }

  function close({ returnFocus = true } = {}) {
    if (!isOpen) return;
    isOpen = false;
    popover.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    if (returnFocus) input.focus();
    if (typeof onClose === 'function') onClose();
  }

  function setValue(d, { fire = true } = {}) {
    const newDate = d ? startOfDay(new Date(d)) : null;
    if (newDate && isDateDisabled(newDate)) return false;
    const prev = selected ? selected.getTime() : null;
    const next = newDate ? newDate.getTime() : null;
    const changed = prev !== next;
    selected = newDate;
    input.value = selected ? formatDate(selected, fmt) : '';
    if (selected) {
      focusedDate = new Date(selected);
      view = new Date(selected.getFullYear(), selected.getMonth(), 1);
    }
    if (isOpen) render();
    if (changed && fire && typeof onChange === 'function') onChange(selected);
    return true;
  }

  function moveFocus(newDate) {
    focusedDate = startOfDay(newDate);
    if (focusedDate.getMonth() !== view.getMonth()
      || focusedDate.getFullYear() !== view.getFullYear()) {
      view = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1);
    }
    render();
    requestAnimationFrame(() => {
      const focusable = grid.querySelector('[tabindex="0"]');
      if (focusable) focusable.focus();
    });
  }

  trigger.addEventListener('click', () => {
    if (isOpen) close({ returnFocus: false });
    else open();
  });
  prevBtn.addEventListener('click', () => {
    view = addMonths(view, -1);
    render();
  });
  nextBtn.addEventListener('click', () => {
    view = addMonths(view, 1);
    render();
  });

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      const today = startOfDay(new Date());
      if (!isDateDisabled(today)) {
        setValue(today);
        close();
      } else {
        view = new Date(today.getFullYear(), today.getMonth(), 1);
        focusedDate = today;
        render();
      }
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      setValue(null);
      close();
    });
  }

  grid.addEventListener('click', (e) => {
    const cell = e.target.closest('.isu-date-picker-day');
    if (!cell || cell.disabled) return;
    const y = parseInt(cell.dataset.year, 10);
    const m = parseInt(cell.dataset.month, 10);
    const d = parseInt(cell.dataset.date, 10);
    setValue(new Date(y, m, d));
    close();
  });

  grid.addEventListener('keydown', (e) => {
    let next = null;
    if (e.key === 'ArrowLeft') next = addDays(focusedDate, -1);
    else if (e.key === 'ArrowRight') next = addDays(focusedDate, 1);
    else if (e.key === 'ArrowUp') next = addDays(focusedDate, -7);
    else if (e.key === 'ArrowDown') next = addDays(focusedDate, 7);
    else if (e.key === 'PageUp') next = addMonths(focusedDate, e.shiftKey ? -12 : -1);
    else if (e.key === 'PageDown') next = addMonths(focusedDate, e.shiftKey ? 12 : 1);
    else if (e.key === 'Home') {
      const dow = (focusedDate.getDay() - L.weekStartsOn + 7) % 7;
      next = addDays(focusedDate, -dow);
    } else if (e.key === 'End') {
      const dow = (focusedDate.getDay() - L.weekStartsOn + 7) % 7;
      next = addDays(focusedDate, 6 - dow);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isDateDisabled(focusedDate)) {
        setValue(focusedDate);
        close();
      }
      return;
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    } else if (e.key === 'Tab') {
      return; // allow default tab behavior
    } else {
      return;
    }
    e.preventDefault();
    if (next) moveFocus(next);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitInputText();
      close();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      open();
    } else if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      close();
    }
  });

  function commitInputText() {
    const raw = input.value.trim();
    if (raw === '') {
      setValue(null);
      return;
    }
    const parsed = parseDate(raw, fmt);
    if (parsed && !isDateDisabled(parsed)) {
      setValue(parsed);
    } else {
      input.value = selected ? formatDate(selected, fmt) : '';
    }
  }

  input.addEventListener('blur', () => {
    setTimeout(() => {
      if (root.contains(document.activeElement)) return;
      commitInputText();
    }, 150);
  });

  popover.addEventListener('mousedown', (e) => {
    if (!e.target.closest('button')) {
      e.preventDefault();
    }
  });

  function onDocMouseDown(e) {
    if (!isOpen) return;
    if (root.contains(e.target)) return;
    close({ returnFocus: false });
  }
  document.addEventListener('mousedown', onDocMouseDown);

  render();

  root.getValue = () => (selected ? new Date(selected) : null);
  root.setValue = (d) => setValue(d);
  root.open = open;
  root.close = () => close();
  root.disable = () => {
    input.disabled = true;
    trigger.disabled = true;
    if (isOpen) close({ returnFocus: false });
  };
  root.enable = () => {
    input.disabled = false;
    trigger.disabled = false;
  };
  root.destroy = () => {
    document.removeEventListener('mousedown', onDocMouseDown);
  };

  return root;
}
