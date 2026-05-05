import { createSidebar, createSidebarShell } from './Sidebar.js';
import { createTable } from './Table.js';
import { createSearchbar } from './Searchbar.js';
import { createButton } from './Button.js';
import { createEmptyState } from './EmptyState.js';

const ICON_HOME = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9.5 10 3l7.5 6.5V17a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 2.5 17z"></path><path d="M7.5 18.5v-5h5v5"></path></svg>`;
const ICON_LIST = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="5" x2="17" y2="5"></line><line x1="7" y1="10" x2="17" y2="10"></line><line x1="7" y1="15" x2="17" y2="15"></line><circle cx="4" cy="5" r="1"></circle><circle cx="4" cy="10" r="1"></circle><circle cx="4" cy="15" r="1"></circle></svg>`;
const ICON_FORM = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2.5" width="14" height="15" rx="1.5"></rect><line x1="6" y1="6.5" x2="14" y2="6.5"></line><line x1="6" y1="10.5" x2="14" y2="10.5"></line><line x1="6" y1="14.5" x2="11" y2="14.5"></line></svg>`;

function createSidebarData() {
  return createSidebar({
    brand: { label: 'ISU Admin', href: '#' },
    sections: [
      {
        title: 'Workspace',
        items: [
          { label: 'Overview', href: '#overview', icon: ICON_HOME, active: true },
          { label: 'Applications', href: '#applications', icon: ICON_LIST, badge: '24' },
          {
            label: 'Operations',
            icon: ICON_FORM,
            children: [
              { label: 'Approval Queue', href: '#approval-queue' },
              { label: 'Department Forms', href: '#department-forms' },
              { label: 'Audit Log', href: '#audit-log' },
            ],
          },
        ],
      },
    ],
    footer: `<span class="isu-caption">Academic Year 2025-26</span>`,
    onNavigate: (_, e) => e.preventDefault(),
  });
}

function createShellContent(title, description) {
  const content = document.createElement('div');
  content.className = 'isu-section-sm';
  content.innerHTML = `
    <div class="isu-container">
      <h1 class="isu-heading-3">${title}</h1>
      <p class="isu-body mb-4">${description}</p>
    </div>
  `;
  return content;
}

export default {
  title: 'Components/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
};

function withStoryFrame(shell) {
  const frame = document.createElement('div');
  frame.style.height = '100dvh';
  frame.style.padding = '1rem';
  frame.style.boxSizing = 'border-box';
  shell.style.height = '100%';
  shell.style.maxHeight = '100%';
  frame.appendChild(shell);
  return frame;
}

export const AppShell = () => {
  const content = createShellContent(
    'Faculty Dashboard',
    'Reusable app shell with sticky desktop sidebar and mobile drawer trigger.'
  );
  return withStoryFrame(createSidebarShell({
    sidebar: createSidebarData(),
    content,
    mobileTriggerLabel: 'Open navigation',
    drawerTitle: 'Menu',
    desktopCollapsible: true,
  }));
};

export const DataTableLayout = () => {
  const content = createShellContent(
    'Application List',
    'Sidebar + toolbar + table layout for data-heavy administrative screens.'
  );

  const container = content.querySelector('.isu-container');
  const toolbar = document.createElement('div');
  toolbar.className = 'isu-flex-between mb-4';
  toolbar.appendChild(createSearchbar({ placeholder: 'Search applicant...', size: 'sm' }));
  toolbar.appendChild(createButton({ label: 'Export CSV', variant: 'outline' }));
  container.appendChild(toolbar);

  container.appendChild(
    createTable({
      headers: ['Applicant', 'Department', 'Status', 'Updated'],
      rows: [
        ['Ayse Demir', 'Medicine', 'Pending', '2026-05-03'],
        ['Mert Kaya', 'Engineering', 'Approved', '2026-05-02'],
        ['Elif Cinar', 'Architecture', 'Review', '2026-05-01'],
      ],
    })
  );

  return withStoryFrame(createSidebarShell({
    sidebar: createSidebarData(),
    content,
    mobileTriggerLabel: 'Filters & menu',
    drawerTitle: 'Navigation',
    desktopCollapsible: true,
  }));
};

export const FormWorkspace = () => {
  const content = createShellContent(
    'Department Form Workspace',
    'Form-focused workspace pattern with detail sections and action footer.'
  );

  const container = content.querySelector('.isu-container');
  const card = document.createElement('div');
  card.className = 'isu-card';
  card.innerHTML = `
    <div class="isu-form-group">
      <label class="isu-form-label">Department Name</label>
      <input class="isu-input" value="Computer Engineering" />
    </div>
    <div class="isu-form-group">
      <label class="isu-form-label">Coordinator Notes</label>
      <textarea class="isu-textarea" rows="4">Curriculum update in progress.</textarea>
    </div>
  `;
  const actions = document.createElement('div');
  actions.className = 'isu-flex-between mt-4';
  actions.appendChild(createButton({ label: 'Cancel', variant: 'ghost' }));
  actions.appendChild(createButton({ label: 'Save Changes', variant: 'primary' }));
  card.appendChild(actions);
  container.appendChild(card);

  return withStoryFrame(createSidebarShell({
    sidebar: createSidebarData(),
    content,
    mobileTriggerLabel: 'Menu',
    drawerTitle: 'Form Navigation',
    desktopCollapsible: true,
  }));
};

export const MobileDrawer = () => {
  const content = createShellContent(
    'Mobile Navigation Demo',
    'Use the menu button to open the sidebar inside a left drawer.'
  );
  const container = content.querySelector('.isu-container');
  container.appendChild(
    createEmptyState({
      title: 'No records selected',
      description: 'Open the mobile menu and navigate to any section to continue.',
      size: 'sm',
    })
  );

  return withStoryFrame(createSidebarShell({
    sidebar: createSidebarData(),
    content,
    mobileTriggerLabel: 'Open mobile sidebar',
    drawerTitle: 'Mobile Sidebar',
    desktopCollapsible: true,
  }));
};

export const CollapsedRail = () => {
  const content = createShellContent(
    'Collapsed Rail',
    'Desktop sidebar starts in compact rail mode and can be expanded with the toggle.'
  );

  return withStoryFrame(createSidebarShell({
    sidebar: createSidebarData(),
    content,
    mobileTriggerLabel: 'Open sidebar',
    drawerTitle: 'Navigation',
    desktopCollapsible: true,
    defaultCollapsed: true,
  }));
};
