import { createSidebar } from './Sidebar.js';
import { createButton } from './Button.js';

const ICON_DASHBOARD = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.25"></rect><rect x="11" y="2.5" width="6.5" height="4.25" rx="1.25"></rect><rect x="11" y="9" width="6.5" height="8.5" rx="1.25"></rect><rect x="2.5" y="11" width="6.5" height="6.5" rx="1.25"></rect></svg>`;
const ICON_USERS = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="6.5" r="2.5"></circle><path d="M2.5 15c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4"></path><circle cx="14.5" cy="7" r="2"></circle><path d="M12.25 15c.3-1.6 1.7-2.9 3.5-2.9 1.2 0 2.2.5 3 1.4"></path></svg>`;
const ICON_REPORTS = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2.5h8l4 4V17a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 17V4A1.5 1.5 0 0 1 4.5 2.5z"></path><path d="M12 2.5V7h4"></path><path d="M6.5 11h7"></path><path d="M6.5 14h7"></path></svg>`;
const ICON_SETTINGS = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="2.75"></circle><path d="M16.5 10a6.5 6.5 0 0 0-.08-1l1.85-1.45-1.8-3.1-2.25.6a6.6 6.6 0 0 0-1.75-1L12.1 1.8H7.9l-.38 2.25a6.6 6.6 0 0 0-1.75 1l-2.25-.6-1.8 3.1L3.57 9a6.5 6.5 0 0 0 0 2l-1.85 1.45 1.8 3.1 2.25-.6a6.6 6.6 0 0 0 1.75 1l.38 2.25h4.2l.37-2.25a6.6 6.6 0 0 0 1.75-1l2.25.6 1.8-3.1L16.42 11c.06-.32.08-.66.08-1z"></path></svg>`;

const defaultSections = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', href: '#dashboard', icon: ICON_DASHBOARD, active: true },
      { label: 'Students', href: '#students', icon: ICON_USERS, badge: '12' },
      {
        label: 'Reports',
        icon: ICON_REPORTS,
        children: [
          { label: 'Admission Reports', href: '#admission-reports' },
          { label: 'Faculty Reports', href: '#faculty-reports' },
          { label: 'Finance Reports', href: '#finance-reports', badge: 'New' },
        ],
      },
    ],
  },
  {
    title: 'Administration',
    items: [
      { label: 'Settings', href: '#settings', icon: ICON_SETTINGS },
      { divider: true },
      { label: 'Audit Trail', href: '#audit-trail' },
      { label: 'Archived', href: '#archived', disabled: true },
    ],
  },
];

export default {
  title: 'Components/Sidebar',
  argTypes: {
    withFooter: { control: 'boolean' },
  },
};

const Template = ({ withFooter }) => {
  const frame = document.createElement('div');
  frame.style.width = '18rem';
  frame.style.height = '38rem';
  frame.style.border = '1px solid var(--border-primary)';
  frame.style.borderRadius = '0.75rem';
  frame.style.overflow = 'hidden';

  const footer = withFooter
    ? (() => {
      const wrap = document.createElement('div');
      wrap.className = 'isu-flex-between';
      const meta = document.createElement('div');
      meta.className = 'isu-caption';
      meta.textContent = 'Signed in as Admin';
      wrap.appendChild(meta);
      wrap.appendChild(createButton({ label: 'Logout', variant: 'ghost', size: 'sm' }));
      return wrap;
    })()
    : null;

  frame.appendChild(
    createSidebar({
      brand: {
        label: 'ISU Portal',
        href: '#',
      },
      sections: defaultSections,
      footer,
      onNavigate: (item, e) => {
        e.preventDefault();
        console.log('navigate:', item.href);
      },
    })
  );
  return frame;
};

export const Default = Template.bind({});
Default.args = {
  withFooter: true,
};

export const NoFooter = Template.bind({});
NoFooter.args = {
  withFooter: false,
};
