export function createBreadcrumb({ items = [] }) {
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'isu-breadcrumb';

  items.forEach((item, index) => {
    if (index > 0) {
      const separator = document.createElement('span');
      separator.className = 'isu-breadcrumb-separator';
      separator.textContent = '/';
      breadcrumb.appendChild(separator);
    }

    if (item.href) {
      const link = document.createElement('a');
      link.className = 'isu-breadcrumb-link';
      link.href = item.href;
      link.textContent = item.label;
      breadcrumb.appendChild(link);
    } else {
      const span = document.createElement('span');
      span.className = 'text-gray-900';
      span.textContent = item.label;
      breadcrumb.appendChild(span);
    }
  });

  return breadcrumb;
}

export function createPagination({ current = 1, total = 10, showPrevNext = true }) {
  const pagination = document.createElement('nav');
  pagination.className = 'isu-pagination';

  const pages = [];
  const maxVisible = 5;

  // Previous button
  if (showPrevNext && current > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'isu-pagination-prev';
    prevBtn.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      <span class="sr-only">Previous</span>
    `;
    prevBtn.onclick = () => console.log('Go to page:', current - 1);
    pagination.appendChild(prevBtn);
  }

  // Page numbers
  let startPage = Math.max(1, current - Math.floor(maxVisible / 2));
  let endPage = Math.min(total, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  // First page + ellipsis if needed
  if (startPage > 1) {
    const firstLink = createPageLink(1, current === 1);
    pagination.appendChild(firstLink);

    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'isu-pagination-item text-gray-400';
      ellipsis.textContent = '...';
      pagination.appendChild(ellipsis);
    }
  }

  // Visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    const pageLink = createPageLink(i, current === i);
    pagination.appendChild(pageLink);
  }

  // Last page + ellipsis if needed
  if (endPage < total) {
    if (endPage < total - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'isu-pagination-item text-gray-400';
      ellipsis.textContent = '...';
      pagination.appendChild(ellipsis);
    }

    const lastLink = createPageLink(total, current === total);
    pagination.appendChild(lastLink);
  }

  // Next button
  if (showPrevNext && current < total) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'isu-pagination-next';
    nextBtn.innerHTML = `
      <span class="sr-only">Next</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    `;
    nextBtn.onclick = () => console.log('Go to page:', current + 1);
    pagination.appendChild(nextBtn);
  }

  return pagination;
}

function createPageLink(page, isActive) {
  const link = document.createElement('a');
  link.href = '#';
  link.className = isActive ? 'isu-pagination-link active' : 'isu-pagination-link';
  link.textContent = page;
  link.onclick = (e) => {
    e.preventDefault();
    console.log('Go to page:', page);
  };
  return link;
}

export function createTabs({ tabs = [], activeTab = 0 }) {
  const container = document.createElement('div');

  // Tab navigation
  const tabNav = document.createElement('div');
  tabNav.className = 'border-b border-neutral/20 mb-4';

  const nav = document.createElement('nav');
  nav.className = 'isu-flex';

  tabs.forEach((tab, index) => {
    const tabButton = document.createElement('button');
    tabButton.className = index === activeTab
      ? 'isu-nav-link active px-4 py-2 border-b-2 border-primary'
      : 'isu-nav-link px-4 py-2';
    tabButton.textContent = tab.label;
    tabButton.onclick = () => console.log('Switch to tab:', index, tab.label);
    nav.appendChild(tabButton);
  });

  tabNav.appendChild(nav);
  container.appendChild(tabNav);

  // Tab content
  const tabContent = document.createElement('div');
  tabContent.className = 'isu-card';
  tabContent.innerHTML = `
    <h4 class="isu-heading-4">${tabs[activeTab]?.label || 'Tab Content'}</h4>
    <p class="isu-body">${tabs[activeTab]?.content || 'Tab content goes here...'}</p>
  `;
  container.appendChild(tabContent);

  return container;
}

export function createNavBar({ brand = 'ISU Design System', links = [] }) {
  const nav = document.createElement('nav');
  nav.className = 'isu-nav';

  const container = document.createElement('div');
  container.className = 'isu-nav-container';

  // Brand
  const brandLink = document.createElement('a');
  brandLink.className = 'isu-nav-brand';
  brandLink.href = '/';
  brandLink.innerHTML = `
    <img src="/assets/logos/en/logo-blue.svg" alt="ISU Logo" class="h-8 w-auto">
    <span>${brand}</span>
  `;
  container.appendChild(brandLink);

  // Desktop menu
  const menu = document.createElement('div');
  menu.className = 'isu-nav-menu';

  links.forEach(link => {
    const linkEl = document.createElement('a');
    linkEl.className = link.active ? 'isu-nav-link active' : 'isu-nav-link';
    linkEl.href = link.href || '#';
    linkEl.textContent = link.label;
    menu.appendChild(linkEl);
  });

  container.appendChild(menu);

  // Mobile menu button
  const mobileBtn = document.createElement('button');
  mobileBtn.className = 'isu-nav-mobile-btn';
  mobileBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  `;
  container.appendChild(mobileBtn);

  nav.appendChild(container);

  // Mobile menu (hidden by default)
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'isu-nav-mobile';
  mobileMenu.innerHTML = '<div class="isu-nav-mobile-menu"></div>';
  nav.appendChild(mobileMenu);

  return nav;
}
