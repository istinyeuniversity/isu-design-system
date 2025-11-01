export function createCard({ title = '', content = '', footer = '', hover = false }) {
  const card = document.createElement('div');
  card.className = hover ? 'isu-card-hover' : 'isu-card';

  if (title) {
    const titleEl = document.createElement('h3');
    titleEl.className = 'isu-heading-4 mb-3';
    titleEl.textContent = title;
    card.appendChild(titleEl);
  }

  if (content) {
    const contentEl = document.createElement('p');
    contentEl.className = 'isu-body';
    contentEl.textContent = content;
    card.appendChild(contentEl);
  }

  if (footer) {
    const footerEl = document.createElement('div');
    footerEl.className = 'mt-4 pt-4 border-t border-neutral/20';
    footerEl.innerHTML = footer;
    card.appendChild(footerEl);
  }

  return card;
}

export function createGrid({ columns = 3, children = [] }) {
  const grid = document.createElement('div');

  const gridClasses = {
    2: 'isu-grid-2',
    3: 'isu-grid-3',
    4: 'isu-grid-4'
  };

  grid.className = gridClasses[columns] || 'isu-grid-3';

  children.forEach(child => {
    if (child instanceof Element) {
      grid.appendChild(child);
    }
  });

  return grid;
}

export function createContainer({ children = [] }) {
  const container = document.createElement('div');
  container.className = 'isu-container';

  children.forEach(child => {
    if (child instanceof Element) {
      container.appendChild(child);
    }
  });

  return container;
}

export function createFlex({ justify = 'start', align = 'center', children = [] }) {
  const flex = document.createElement('div');

  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around'
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch'
  };

  flex.className = `isu-flex ${justifyClasses[justify] || 'justify-start'} ${alignClasses[align] || 'items-center'}`;

  children.forEach(child => {
    if (child instanceof Element) {
      flex.appendChild(child);
    }
  });

  return flex;
}
