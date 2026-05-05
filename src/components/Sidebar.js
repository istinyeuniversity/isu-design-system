import { createDrawer, openDrawer, closeDrawer } from './Drawer.js';

const CHEVRON_ICON = `
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="6 8 10 12 14 8"></polyline>
  </svg>
`;

const SIDEBAR_COLLAPSE_ICON = `
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="12 4 6 10 12 16"></polyline>
  </svg>
`;

const SIDEBAR_EXPAND_ICON = `
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="8 4 14 10 8 16"></polyline>
  </svg>
`;

function appendContent(target, content) {
  if (!content) return;
  if (content instanceof Element) {
    target.appendChild(content);
    return;
  }
  if (typeof content === 'string') {
    target.innerHTML = content;
  }
}

function cloneIcon(icon) {
  if (!icon) return null;
  if (icon instanceof Element) return icon.cloneNode(true);
  const wrap = document.createElement('span');
  wrap.innerHTML = icon;
  return wrap.firstElementChild || wrap;
}

function normalizeSections({ sections, items }) {
  if (Array.isArray(sections) && sections.length > 0) return sections;
  if (Array.isArray(items) && items.length > 0) return [{ items }];
  return [];
}

function createLinkInner(item) {
  const left = document.createElement('span');
  left.className = 'isu-sidebar-link-main';

  const icon = cloneIcon(item.icon);
  if (icon) {
    const iconWrap = document.createElement('span');
    iconWrap.className = 'isu-sidebar-link-icon';
    iconWrap.setAttribute('aria-hidden', 'true');
    iconWrap.appendChild(icon);
    left.appendChild(iconWrap);
  }

  const label = document.createElement('span');
  label.className = 'isu-sidebar-link-label';
  label.textContent = item.label || '';
  left.appendChild(label);

  const frag = document.createDocumentFragment();
  frag.appendChild(left);

  if (item.badge != null && item.badge !== '') {
    const badge = document.createElement('span');
    badge.className = 'isu-sidebar-badge';
    badge.textContent = String(item.badge);
    frag.appendChild(badge);
  }

  return frag;
}

function setGroupOpenState(group, open) {
  const trigger = group.querySelector('.isu-sidebar-group-trigger');
  const body = group.querySelector('.isu-sidebar-group-items');
  if (!trigger || !body) return;

  group.classList.toggle('is-open', open);
  trigger.setAttribute('aria-expanded', String(open));
  if (open) body.removeAttribute('hidden');
  else body.setAttribute('hidden', '');
}

function enhanceSidebarInteractions(sidebarRoot, onNavigate) {
  const groups = sidebarRoot.querySelectorAll('.isu-sidebar-group');
  groups.forEach((group) => {
    const trigger = group.querySelector('.isu-sidebar-group-trigger');
    if (!trigger) return;

    const initialOpen = group.getAttribute('data-open') === 'true';
    setGroupOpenState(group, initialOpen);

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      setGroupOpenState(group, !isOpen);
    });

    trigger.addEventListener('keydown', (e) => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setGroupOpenState(group, !isOpen);
      } else if (e.key === 'ArrowRight' && !isOpen) {
        e.preventDefault();
        setGroupOpenState(group, true);
      } else if (e.key === 'ArrowLeft' && isOpen) {
        e.preventDefault();
        setGroupOpenState(group, false);
      }
    });
  });

  const links = sidebarRoot.querySelectorAll('.isu-sidebar-link[href], .isu-sidebar-child-link[href]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (typeof onNavigate === 'function') {
        onNavigate(
          {
            href: link.getAttribute('href') || '#',
            label: link.getAttribute('data-label') || link.textContent.trim(),
          },
          e
        );
      }
    });
  });
}

function buildSidebarBrand(brand) {
  const header = document.createElement('div');
  header.className = 'isu-sidebar-header';

  if (!brand) return header;
  if (brand instanceof Element) {
    header.appendChild(brand);
    return header;
  }

  const brandObj = typeof brand === 'string' ? { label: brand } : brand;
  const brandEl = document.createElement('a');
  brandEl.className = 'isu-sidebar-brand';
  brandEl.href = brandObj.href || '#';

  if (brandObj.logo instanceof Element) {
    const logoWrap = document.createElement('span');
    logoWrap.className = 'isu-sidebar-brand-logo';
    logoWrap.setAttribute('aria-hidden', 'true');
    logoWrap.appendChild(brandObj.logo);
    brandEl.appendChild(logoWrap);
  } else if (typeof brandObj.logo === 'string') {
    const logoWrap = document.createElement('span');
    logoWrap.className = 'isu-sidebar-brand-logo';
    logoWrap.setAttribute('aria-hidden', 'true');
    logoWrap.innerHTML = brandObj.logo;
    brandEl.appendChild(logoWrap);
  }

  const label = document.createElement('span');
  label.className = 'isu-sidebar-brand-text';
  label.textContent = brandObj.label || 'Navigation';
  brandEl.appendChild(label);
  header.appendChild(brandEl);

  return header;
}

function buildSidebarItem(item) {
  if (item.divider) {
    const divider = document.createElement('hr');
    divider.className = 'isu-sidebar-divider';
    return divider;
  }

  if (Array.isArray(item.children) && item.children.length > 0) {
    const group = document.createElement('div');
    group.className = 'isu-sidebar-group';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'isu-sidebar-group-trigger';
    trigger.setAttribute('aria-label', item.label || 'Sidebar group');
    if (item.label) trigger.setAttribute('title', item.label);
    trigger.appendChild(createLinkInner(item));

    const chevron = document.createElement('span');
    chevron.className = 'isu-sidebar-group-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.innerHTML = CHEVRON_ICON;
    trigger.appendChild(chevron);
    group.appendChild(trigger);

    const childrenWrap = document.createElement('div');
    childrenWrap.className = 'isu-sidebar-group-items';

    item.children.forEach((child) => {
      if (child.divider) {
        const divider = document.createElement('hr');
        divider.className = 'isu-sidebar-divider';
        childrenWrap.appendChild(divider);
        return;
      }

      const childLink = document.createElement('a');
      childLink.className = child.active ? 'isu-sidebar-child-link isu-sidebar-link-active' : 'isu-sidebar-child-link';
      childLink.href = child.disabled ? '#' : (child.href || '#');
      childLink.setAttribute('data-label', child.label || '');
      childLink.setAttribute('aria-label', child.label || '');
      if (child.label) childLink.setAttribute('title', child.label);
      childLink.textContent = child.label || '';

      if (child.active) {
        childLink.setAttribute('aria-current', 'page');
      }
      if (child.disabled) {
        childLink.classList.add('is-disabled');
        childLink.setAttribute('aria-disabled', 'true');
        childLink.addEventListener('click', (e) => e.preventDefault());
      }

      childrenWrap.appendChild(childLink);
    });

    group.appendChild(childrenWrap);
    group.setAttribute('data-open', String(Boolean(item.active || item.children.some((child) => child.active) || item.open)));
    return group;
  }

  const link = document.createElement('a');
  link.className = item.active ? 'isu-sidebar-link isu-sidebar-link-active' : 'isu-sidebar-link';
  link.href = item.disabled ? '#' : (item.href || '#');
  link.setAttribute('data-label', item.label || '');
  link.setAttribute('aria-label', item.label || '');
  if (item.label) link.setAttribute('title', item.label);
  link.appendChild(createLinkInner(item));

  if (item.active) link.setAttribute('aria-current', 'page');
  if (item.disabled) {
    link.classList.add('is-disabled');
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', (e) => e.preventDefault());
  }

  return link;
}

export function createSidebar({
  sections = [],
  items = [],
  ariaLabel = 'Primary navigation',
  brand,
  footer,
  onNavigate,
} = {}) {
  const resolvedSections = normalizeSections({ sections, items });

  const root = document.createElement('aside');
  root.className = 'isu-sidebar';

  const header = buildSidebarBrand(brand);
  if (header.children.length > 0) root.appendChild(header);

  const content = document.createElement('div');
  content.className = 'isu-sidebar-content isu-scroll';

  const nav = document.createElement('nav');
  nav.className = 'isu-sidebar-nav';
  nav.setAttribute('aria-label', ariaLabel);

  resolvedSections.forEach((section) => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'isu-sidebar-section';

    if (section.title) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'isu-sidebar-section-title';
      titleEl.textContent = section.title;
      sectionEl.appendChild(titleEl);
    }

    (section.items || []).forEach((item) => {
      sectionEl.appendChild(buildSidebarItem(item));
    });

    nav.appendChild(sectionEl);
  });

  content.appendChild(nav);
  root.appendChild(content);

  if (footer) {
    const footerEl = document.createElement('div');
    footerEl.className = 'isu-sidebar-footer';
    appendContent(footerEl, footer);
    root.appendChild(footerEl);
  }

  enhanceSidebarInteractions(root, onNavigate);

  root.__isuSidebarConfig = {
    sections: resolvedSections,
    ariaLabel,
    brand,
    footer,
    onNavigate,
  };

  return root;
}

function resolveSidebarElement(sidebar) {
  if (sidebar instanceof Element) return sidebar;
  return createSidebar(sidebar || {});
}

function createMobileSidebarFrom(sidebarEl, drawer, drawerTitle) {
  const config = sidebarEl.__isuSidebarConfig;
  if (config) {
    return createSidebar({
      ...config,
      ariaLabel: drawerTitle ? `${drawerTitle} navigation` : config.ariaLabel,
      onNavigate: (item, e) => {
        if (typeof config.onNavigate === 'function') config.onNavigate(item, e);
        closeDrawer(drawer);
      },
    });
  }

  const clone = sidebarEl.cloneNode(true);
  const links = clone.querySelectorAll('a[href]');
  links.forEach((link) => {
    link.addEventListener('click', () => closeDrawer(drawer));
  });
  return clone;
}

export function createSidebarShell({
  sidebar,
  content,
  mobileTriggerLabel = 'Menu',
  drawerTitle = 'Navigation',
  desktopCollapsible = false,
  defaultCollapsed = false,
  collapseLabel = 'Collapse sidebar',
  expandLabel = 'Expand sidebar',
} = {}) {
  const sidebarEl = resolveSidebarElement(sidebar);

  const shell = document.createElement('div');
  shell.className = 'isu-layout-shell';

  const sidebarWrap = document.createElement('div');
  sidebarWrap.className = 'isu-layout-sidebar';
  sidebarWrap.appendChild(sidebarEl);

  let sidebarToggle = null;
  if (desktopCollapsible) {
    sidebarToggle = document.createElement('button');
    sidebarToggle.type = 'button';
    sidebarToggle.className = 'isu-sidebar-rail-toggle';
    sidebarWrap.appendChild(sidebarToggle);
  }

  const mainWrap = document.createElement('main');
  mainWrap.className = 'isu-layout-main';

  const mobileBar = document.createElement('div');
  mobileBar.className = 'isu-layout-mobile-bar';

  const mobileTrigger = document.createElement('button');
  mobileTrigger.type = 'button';
  mobileTrigger.className = 'isu-sidebar-mobile-trigger';
  mobileTrigger.textContent = mobileTriggerLabel;

  mobileTrigger.addEventListener('click', () => {
    const drawer = createDrawer({
      title: drawerTitle,
      side: 'left',
      size: 'md',
      closeOnBackdrop: true,
      closeOnEscape: true,
      content: '',
    });
    const drawerBody = drawer.querySelector('.isu-drawer-body');
    if (drawerBody) {
      drawerBody.innerHTML = '';
      const mobileSidebar = createMobileSidebarFrom(sidebarEl, drawer, drawerTitle);
      drawerBody.appendChild(mobileSidebar);
    }
    openDrawer(drawer);
  });
  mobileBar.appendChild(mobileTrigger);

  const contentWrap = document.createElement('div');
  contentWrap.className = 'isu-layout-content';
  appendContent(contentWrap, content);

  mainWrap.appendChild(mobileBar);
  mainWrap.appendChild(contentWrap);

  shell.appendChild(sidebarWrap);
  shell.appendChild(mainWrap);

  function setCollapsed(collapsed) {
    shell.classList.toggle('is-sidebar-collapsed', collapsed);
    if (sidebarToggle) {
      sidebarToggle.setAttribute('aria-label', collapsed ? expandLabel : collapseLabel);
      sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
      sidebarToggle.innerHTML = collapsed ? SIDEBAR_EXPAND_ICON : SIDEBAR_COLLAPSE_ICON;
    }
  }

  if (desktopCollapsible && sidebarToggle) {
    shell.classList.add('is-sidebar-collapsible');
    setCollapsed(Boolean(defaultCollapsed));
    sidebarToggle.addEventListener('click', () => {
      const collapsed = !shell.classList.contains('is-sidebar-collapsed');
      setCollapsed(collapsed);
    });

    // In collapsed rail mode, clicking a group trigger should first expand
    // the sidebar so nested links become visible and usable.
    sidebarEl.addEventListener('click', (e) => {
      const trigger = e.target.closest('.isu-sidebar-group-trigger');
      if (!trigger || !sidebarEl.contains(trigger)) return;
      if (shell.classList.contains('is-sidebar-collapsed')) {
        setCollapsed(false);
      }
    });

    sidebarEl.addEventListener('keydown', (e) => {
      const trigger = e.target.closest('.isu-sidebar-group-trigger');
      if (!trigger || !sidebarEl.contains(trigger)) return;
      if (!shell.classList.contains('is-sidebar-collapsed')) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        setCollapsed(false);
      }
    });
  }

  shell.isSidebarCollapsed = () => shell.classList.contains('is-sidebar-collapsed');
  shell.setSidebarCollapsed = (collapsed) => setCollapsed(Boolean(collapsed));

  return shell;
}
