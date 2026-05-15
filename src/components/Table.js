import { createSearchbar } from './Searchbar.js';
import { createEmptyState } from './EmptyState.js';

export function createTable({ headers = [], rows = [], caption = '', ariaLabel = '' }) {
  const table = document.createElement('table');
  table.className = 'isu-table';
  
  if (ariaLabel) {
    table.setAttribute('aria-label', ariaLabel);
  }

  // Add caption if provided
  if (caption) {
    const captionEl = document.createElement('caption');
    captionEl.textContent = caption;
    table.appendChild(captionEl);
  }

  // Create header
  if (headers.length > 0) {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach((header, index) => {
      const th = document.createElement('th');
      th.textContent = header;
      th.setAttribute('scope', 'col');
      if (index === 0) {
        th.setAttribute('id', `header-${index}`);
      }
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);
  }

  // Create body
  if (rows.length > 0) {
    const tbody = document.createElement('tbody');

    rows.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      
      if (Array.isArray(row)) {
        row.forEach((cell, cellIndex) => {
          const td = document.createElement('td');
          td.textContent = cell;
          if (cellIndex === 0 && headers.length > 0) {
            td.setAttribute('headers', `header-0`);
          }
          tr.appendChild(td);
        });
      } else if (typeof row === 'object') {
        headers.forEach((header, headerIndex) => {
          const td = document.createElement('td');
          td.textContent = row[header] || '';
          if (headerIndex === 0 && headers.length > 0) {
            td.setAttribute('headers', `header-0`);
          }
          tr.appendChild(td);
        });
      }

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
  }

  return table;
}

const DEFAULT_DATA_TABLE_LABELS = {
  search: 'Tabloda ara…',
  emptyTitle: 'Sonuç bulunamadı',
  emptyDescription: 'Arama kriterinize uyan kayıt yok.',
  noDataTitle: 'Veri yok',
  noDataDescription: 'Henüz hiç kayıt bulunmuyor.',
  rowsPerPage: 'Sayfa başına',
  range: (from, to, total) => `${from}-${to} / ${total}`,
  prev: 'Önceki sayfa',
  next: 'Sonraki sayfa',
  selectAll: 'Tümünü seç',
  selectRow: 'Satırı seç',
};

let dataTableUid = 0;

export function createDataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  sortable = true,
  searchable = false,
  searchFn,
  pageSize = 0,
  pageSizeOptions = [10, 20, 50],
  selectable = false,
  stickyHeader = false,
  density = 'comfortable',
  resizable = false,
  caption = '',
  ariaLabel = '',
  emptyState,
  defaultSort = null,
  defaultPage = 1,
  defaultSearch = '',
  defaultSelected = [],
  labels,
  onSort,
  onPageChange,
  onSearch,
  onSelectionChange,
  onRowClick,
  onColumnResize,
} = {}) {
  const L = { ...DEFAULT_DATA_TABLE_LABELS, ...(labels || {}) };
  const uid = ++dataTableUid;

  const root = document.createElement('div');
  root.className = [
    'isu-data-table',
    density === 'compact' ? 'isu-data-table-compact' : '',
  ].filter(Boolean).join(' ');

  let currentSort = defaultSort ? { ...defaultSort } : null;
  let currentPage = defaultPage;
  let currentPageSize = pageSize || 0;
  let currentSearch = defaultSearch;
  const selected = new Set(defaultSelected.map(String));

  const rowIdMap = new Map();
  rows.forEach((row, idx) => {
    const id = typeof rowKey === 'function'
      ? rowKey(row, idx)
      : (row && row[rowKey] != null ? row[rowKey] : idx);
    rowIdMap.set(row, String(id));
  });
  const idFor = (row) => rowIdMap.get(row);

  function defaultSearchFn(row, query) {
    const q = query.toLowerCase();
    return columns.some((col) => {
      const v = row[col.key];
      return v != null && String(v).toLowerCase().includes(q);
    });
  }

  function getFilteredSortedRows() {
    let result = rows.slice();
    if (currentSearch.trim()) {
      const filter = searchFn || defaultSearchFn;
      result = result.filter((row) => filter(row, currentSearch.trim()));
    }
    if (currentSort) {
      const { key, dir } = currentSort;
      const col = columns.find((c) => c.key === key);
      const sortFn = col && typeof col.sortFn === 'function' ? col.sortFn : null;
      result.sort((a, b) => {
        if (sortFn) return sortFn(a, b, dir);
        const av = a[key];
        const bv = b[key];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === 'number' && typeof bv === 'number') {
          return dir === 'asc' ? av - bv : bv - av;
        }
        const cmp = String(av).localeCompare(String(bv), 'tr');
        return dir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }

  function getPagedRows(allRows) {
    if (!currentPageSize) {
      return {
        rows: allRows,
        total: allRows.length,
        from: allRows.length ? 1 : 0,
        to: allRows.length,
        page: 1,
        pageCount: 1,
      };
    }
    const total = allRows.length;
    const pageCount = Math.max(1, Math.ceil(total / currentPageSize));
    const page = Math.max(1, Math.min(currentPage, pageCount));
    const start = (page - 1) * currentPageSize;
    const end = Math.min(start + currentPageSize, total);
    return {
      rows: allRows.slice(start, end),
      total,
      from: total ? start + 1 : 0,
      to: end,
      page,
      pageCount,
    };
  }

  let searchbarEl = null;
  if (searchable) {
    const toolbar = document.createElement('div');
    toolbar.className = 'isu-data-table-toolbar';
    searchbarEl = createSearchbar({
      placeholder: L.search,
      value: currentSearch,
      debounce: 200,
      ariaLabel: L.search,
      onInput: (val) => {
        currentSearch = val;
        currentPage = 1;
        renderBody();
        renderFooter();
        if (typeof onSearch === 'function') onSearch(val);
      },
      onClear: () => {
        currentSearch = '';
        currentPage = 1;
        renderBody();
        renderFooter();
        if (typeof onSearch === 'function') onSearch('');
      },
    });
    toolbar.appendChild(searchbarEl);
    root.appendChild(toolbar);
  }

  const scrollWrap = document.createElement('div');
  scrollWrap.className = 'isu-data-table-scroll';

  const table = document.createElement('table');
  table.className = [
    'isu-data-table-table',
    stickyHeader ? 'isu-data-table-sticky' : '',
    resizable ? 'isu-data-table-resizable' : '',
  ].filter(Boolean).join(' ');
  if (ariaLabel) table.setAttribute('aria-label', ariaLabel);
  if (caption) {
    const cap = document.createElement('caption');
    cap.textContent = caption;
    table.appendChild(cap);
  }

  const columnWidths = new Map();
  columns.forEach((col) => {
    if (col.width && /^\d+px$/i.test(String(col.width))) {
      columnWidths.set(col.key, parseInt(String(col.width), 10));
    }
  });

  let colgroupEl = null;
  if (resizable) {
    colgroupEl = document.createElement('colgroup');
    if (selectable) {
      const cSel = document.createElement('col');
      cSel.dataset.colKey = '__select';
      cSel.style.width = '2.25rem';
      colgroupEl.appendChild(cSel);
    }
    columns.forEach((col) => {
      const cEl = document.createElement('col');
      cEl.dataset.colKey = col.key;
      if (columnWidths.has(col.key)) {
        cEl.style.width = `${columnWidths.get(col.key)}px`;
      } else if (col.width) {
        cEl.style.width = col.width;
      }
      colgroupEl.appendChild(cEl);
    });
    table.appendChild(colgroupEl);
  }

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  scrollWrap.appendChild(table);
  root.appendChild(scrollWrap);

  let widthsLocked = false;
  function lockAllColumnWidths() {
    if (widthsLocked || !colgroupEl) return;
    const headerRow = thead.querySelector('tr');
    if (!headerRow) return;
    const ths = headerRow.querySelectorAll(':scope > th');
    const cols = colgroupEl.querySelectorAll('col');
    let anyMeasured = false;
    ths.forEach((thEl, idx) => {
      const cEl = cols[idx];
      if (!cEl) return;
      const w = thEl.getBoundingClientRect().width;
      if (w > 0) {
        cEl.style.width = `${Math.round(w)}px`;
        anyMeasured = true;
        const key = cEl.dataset.colKey;
        if (key && key !== '__select') {
          columnWidths.set(key, Math.round(w));
        }
      }
    });
    if (anyMeasured) {
      // Switch table to natural width so growing one column doesn't shrink others.
      table.style.width = 'auto';
      widthsLocked = true;
    }
  }

  function attachResize(handle, col, th) {
    let startX = 0;
    let startWidth = 0;

    function move(clientX) {
      const minW = col.minWidth || 60;
      const newWidth = Math.max(minW, startWidth + (clientX - startX));
      columnWidths.set(col.key, newWidth);
      if (colgroupEl) {
        const cEl = colgroupEl.querySelector(`col[data-col-key="${col.key}"]`);
        if (cEl) cEl.style.width = `${newWidth}px`;
      }
    }

    function onMouseMove(e) { move(e.clientX); }
    function onTouchMove(e) {
      if (e.touches[0]) {
        move(e.touches[0].clientX);
        e.preventDefault();
      }
    }
    function finish() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', finish);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', finish);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      root.classList.remove('isu-data-table-resizing');
      const finalWidth = columnWidths.get(col.key);
      if (finalWidth != null && finalWidth !== startWidth
        && typeof onColumnResize === 'function') {
        onColumnResize(col.key, finalWidth);
      }
    }
    function start(clientX, e) {
      e.preventDefault();
      e.stopPropagation();
      lockAllColumnWidths();
      startX = clientX;
      startWidth = th.getBoundingClientRect().width;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      root.classList.add('isu-data-table-resizing');
    }

    handle.addEventListener('mousedown', (e) => {
      start(e.clientX, e);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', finish);
    });
    handle.addEventListener('touchstart', (e) => {
      if (!e.touches[0]) return;
      start(e.touches[0].clientX, e);
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', finish);
    }, { passive: false });
    // Swallow click so it doesn't bubble to sort button
    handle.addEventListener('click', (e) => e.stopPropagation());
  }

  const emptyHost = document.createElement('div');
  emptyHost.className = 'isu-data-table-empty';
  emptyHost.hidden = true;
  root.appendChild(emptyHost);

  let footerEl = null;
  if (pageSize) {
    footerEl = document.createElement('div');
    footerEl.className = 'isu-data-table-footer';
    root.appendChild(footerEl);
  }

  function getSelectedRows() {
    return rows.filter((row) => selected.has(idFor(row)));
  }

  function renderHead() {
    thead.innerHTML = '';
    const tr = document.createElement('tr');

    if (selectable === 'multiple') {
      const th = document.createElement('th');
      th.className = 'isu-data-table-checkbox-col';
      th.scope = 'col';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.setAttribute('aria-label', L.selectAll);
      const visibleRows = getFilteredSortedRows();
      const visibleIds = visibleRows.map(idFor);
      const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selected.has(id));
      const someSelected = visibleIds.some((id) => selected.has(id));
      cb.checked = allSelected;
      cb.indeterminate = !allSelected && someSelected;
      cb.addEventListener('change', () => {
        if (cb.checked) visibleIds.forEach((id) => selected.add(id));
        else visibleIds.forEach((id) => selected.delete(id));
        renderHead();
        renderBody();
        if (typeof onSelectionChange === 'function') {
          onSelectionChange(getSelectedRows());
        }
      });
      th.appendChild(cb);
      tr.appendChild(th);
    } else if (selectable === 'single') {
      const th = document.createElement('th');
      th.className = 'isu-data-table-checkbox-col';
      th.scope = 'col';
      th.setAttribute('aria-hidden', 'true');
      tr.appendChild(th);
    }

    columns.forEach((col) => {
      const th = document.createElement('th');
      th.scope = 'col';
      if (col.align) th.classList.add(`isu-data-table-align-${col.align}`);
      // Width is owned by <colgroup> when resizable; otherwise apply to th.
      if (!resizable && col.width) th.style.width = col.width;
      const canResize = resizable && col.resizable !== false;
      if (canResize) th.classList.add('isu-data-table-th-resizable');

      const canSort = sortable && col.sortable === true;

      if (canSort) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'isu-data-table-sort';
        const isCurrent = currentSort && currentSort.key === col.key;
        if (isCurrent) {
          btn.classList.add(currentSort.dir === 'asc'
            ? 'isu-data-table-sort-asc'
            : 'isu-data-table-sort-desc');
          th.setAttribute('aria-sort',
            currentSort.dir === 'asc' ? 'ascending' : 'descending');
        } else {
          th.setAttribute('aria-sort', 'none');
        }
        const labelSpan = document.createElement('span');
        labelSpan.textContent = col.label;
        const arrow = document.createElement('span');
        arrow.className = 'isu-data-table-sort-icon';
        arrow.setAttribute('aria-hidden', 'true');
        if (isCurrent) {
          arrow.textContent = currentSort.dir === 'asc' ? '↑' : '↓';
        } else {
          arrow.textContent = '⇅';
        }
        btn.appendChild(labelSpan);
        btn.appendChild(arrow);
        btn.addEventListener('click', () => {
          if (!currentSort || currentSort.key !== col.key) {
            currentSort = { key: col.key, dir: 'asc' };
          } else if (currentSort.dir === 'asc') {
            currentSort = { key: col.key, dir: 'desc' };
          } else {
            currentSort = null;
          }
          currentPage = 1;
          renderHead();
          renderBody();
          renderFooter();
          if (typeof onSort === 'function') onSort(currentSort);
        });
        th.appendChild(btn);
      } else {
        const labelSpan = document.createElement('span');
        labelSpan.textContent = col.label;
        th.appendChild(labelSpan);
      }

      if (canResize) {
        const handle = document.createElement('div');
        handle.className = 'isu-data-table-resize-handle';
        handle.setAttribute('aria-hidden', 'true');
        handle.title = 'Genişliği değiştirmek için sürükleyin';
        attachResize(handle, col, th);
        th.appendChild(handle);
      }

      tr.appendChild(th);
    });
    thead.appendChild(tr);
  }

  function renderBody() {
    tbody.innerHTML = '';
    const allRows = getFilteredSortedRows();
    const { rows: pageRows, total } = getPagedRows(allRows);

    if (total === 0) {
      scrollWrap.style.display = 'none';
      if (footerEl) footerEl.style.display = 'none';
      emptyHost.hidden = false;
      emptyHost.innerHTML = '';
      const isFiltered = currentSearch.trim().length > 0;
      const opts = emptyState || {};
      emptyHost.appendChild(createEmptyState({
        icon: opts.icon || '📋',
        title: opts.title || (isFiltered ? L.emptyTitle : L.noDataTitle),
        description: opts.description || (isFiltered ? L.emptyDescription : L.noDataDescription),
        actions: opts.actions,
      }));
      return;
    }
    scrollWrap.style.display = '';
    if (footerEl) footerEl.style.display = '';
    emptyHost.hidden = true;

    pageRows.forEach((row) => {
      const rowId = idFor(row);
      const tr = document.createElement('tr');
      if (selected.has(rowId)) tr.classList.add('isu-data-table-row-selected');

      if (selectable) {
        const td = document.createElement('td');
        td.className = 'isu-data-table-checkbox-col';
        const cb = document.createElement('input');
        cb.type = selectable === 'single' ? 'radio' : 'checkbox';
        if (selectable === 'single') cb.name = `isu-data-table-radio-${uid}`;
        cb.checked = selected.has(rowId);
        cb.setAttribute('aria-label', L.selectRow);
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          if (selectable === 'single') {
            selected.clear();
            if (cb.checked) selected.add(rowId);
          } else if (cb.checked) {
            selected.add(rowId);
          } else {
            selected.delete(rowId);
          }
          renderHead();
          renderBody();
          if (typeof onSelectionChange === 'function') {
            onSelectionChange(getSelectedRows());
          }
        });
        td.appendChild(cb);
        tr.appendChild(td);
      }

      columns.forEach((col) => {
        const td = document.createElement('td');
        if (col.align) td.classList.add(`isu-data-table-align-${col.align}`);
        if (typeof col.render === 'function') {
          const content = col.render(row);
          if (content instanceof Element) td.appendChild(content);
          else if (content != null) td.textContent = String(content);
        } else {
          const v = row[col.key];
          td.textContent = v == null ? '' : String(v);
        }
        tr.appendChild(td);
      });

      if (typeof onRowClick === 'function') {
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', (e) => {
          if (e.target.closest('input, button, a, .isu-data-table-sort')) return;
          onRowClick(row, rowId);
        });
      }

      tbody.appendChild(tr);
    });
  }

  function renderFooter() {
    if (!footerEl) return;
    footerEl.innerHTML = '';
    const allRows = getFilteredSortedRows();
    const { total, from, to, page, pageCount } = getPagedRows(allRows);

    if (pageSizeOptions && pageSizeOptions.length > 1) {
      const sizeWrap = document.createElement('label');
      sizeWrap.className = 'isu-data-table-page-size';
      const sizeLabel = document.createElement('span');
      sizeLabel.textContent = L.rowsPerPage;
      const select = document.createElement('select');
      pageSizeOptions.forEach((opt) => {
        const o = document.createElement('option');
        o.value = String(opt);
        o.textContent = String(opt);
        if (opt === currentPageSize) o.selected = true;
        select.appendChild(o);
      });
      select.addEventListener('change', () => {
        currentPageSize = parseInt(select.value, 10);
        currentPage = 1;
        renderBody();
        renderFooter();
      });
      sizeWrap.appendChild(sizeLabel);
      sizeWrap.appendChild(select);
      footerEl.appendChild(sizeWrap);
    }

    const summary = document.createElement('span');
    summary.className = 'isu-data-table-summary';
    summary.textContent = L.range(from, to, total);
    footerEl.appendChild(summary);

    const ctrls = document.createElement('div');
    ctrls.className = 'isu-data-table-page-controls';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'isu-data-table-page-btn';
    prevBtn.setAttribute('aria-label', L.prev);
    prevBtn.innerHTML = '<span aria-hidden="true">‹</span>';
    prevBtn.disabled = page <= 1;
    prevBtn.addEventListener('click', () => {
      currentPage = Math.max(1, page - 1);
      renderBody();
      renderFooter();
      if (typeof onPageChange === 'function') onPageChange(currentPage);
    });
    ctrls.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'isu-data-table-page-btn';
    nextBtn.setAttribute('aria-label', L.next);
    nextBtn.innerHTML = '<span aria-hidden="true">›</span>';
    nextBtn.disabled = page >= pageCount;
    nextBtn.addEventListener('click', () => {
      currentPage = Math.min(pageCount, page + 1);
      renderBody();
      renderFooter();
      if (typeof onPageChange === 'function') onPageChange(currentPage);
    });
    ctrls.appendChild(nextBtn);

    footerEl.appendChild(ctrls);
  }

  renderHead();
  renderBody();
  renderFooter();

  root.getSelectedRows = getSelectedRows;
  root.clearSelection = () => {
    selected.clear();
    renderHead();
    renderBody();
  };
  root.getSort = () => (currentSort ? { ...currentSort } : null);
  root.setSort = (s) => {
    currentSort = s ? { ...s } : null;
    currentPage = 1;
    renderHead();
    renderBody();
    renderFooter();
  };
  root.getPage = () => currentPage;
  root.setPage = (p) => {
    currentPage = p;
    renderBody();
    renderFooter();
  };
  root.getColumnWidths = () => {
    const out = {};
    columnWidths.forEach((v, k) => { out[k] = v; });
    return out;
  };
  root.setColumnWidth = (key, width) => {
    if (!colgroupEl) return;
    lockAllColumnWidths();
    const w = Math.max(20, Number(width) || 0);
    columnWidths.set(key, w);
    const cEl = colgroupEl.querySelector(`col[data-col-key="${key}"]`);
    if (cEl) cEl.style.width = `${w}px`;
  };
  root.getSearch = () => currentSearch;
  root.setSearch = (q) => {
    currentSearch = q;
    currentPage = 1;
    if (searchbarEl) {
      const input = searchbarEl.querySelector('.isu-searchbar-input');
      if (input) input.value = q;
      searchbarEl.classList.toggle('has-value', !!q);
    }
    renderBody();
    renderFooter();
  };

  return root;
}
