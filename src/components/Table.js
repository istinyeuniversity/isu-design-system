export function createTable({ headers = [], rows = [] }) {
  const table = document.createElement('table');
  table.className = 'isu-table';

  // Create header
  if (headers.length > 0) {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);
  }

  // Create body
  if (rows.length > 0) {
    const tbody = document.createElement('tbody');

    rows.forEach(row => {
      const tr = document.createElement('tr');
      
      if (Array.isArray(row)) {
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
      } else if (typeof row === 'object') {
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = row[header] || '';
          tr.appendChild(td);
        });
      }

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
  }

  return table;
}

