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

