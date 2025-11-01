import {
  createBreadcrumb,
  createPagination,
  createTabs,
  createNavBar
} from './Navigation.js';

export default {
  title: 'Components/Navigation',
};

const BreadcrumbTemplate = ({ items }) => {
  return createBreadcrumb({ items });
};

const PaginationTemplate = ({ current, total, showPrevNext }) => {
  return createPagination({ current, total, showPrevNext });
};

const TabsTemplate = ({ tabs, activeTab }) => {
  return createTabs({ tabs, activeTab });
};

const NavbarTemplate = ({ brand, links }) => {
  return createNavBar({ brand, links });
};

// Breadcrumb Stories
export const SimpleBreadcrumb = BreadcrumbTemplate.bind({});
SimpleBreadcrumb.args = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Navigation', href: '/components/navigation' },
    { label: 'Breadcrumb' }
  ],
};

export const ShortBreadcrumb = BreadcrumbTemplate.bind({});
ShortBreadcrumb.args = {
  items: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' }
  ],
};

export const LongBreadcrumb = BreadcrumbTemplate.bind({});
LongBreadcrumb.args = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Academics', href: '/academics' },
    { label: 'Departments', href: '/academics/departments' },
    { label: 'Computer Science', href: '/academics/departments/cs' },
    { label: 'Courses', href: '/academics/departments/cs/courses' },
    { label: 'Advanced Programming' }
  ],
};

// Pagination Stories
export const PaginationStart = PaginationTemplate.bind({});
PaginationStart.args = {
  current: 1,
  total: 10,
  showPrevNext: true,
};

export const PaginationMiddle = PaginationTemplate.bind({});
PaginationMiddle.args = {
  current: 5,
  total: 10,
  showPrevNext: true,
};

export const PaginationEnd = PaginationTemplate.bind({});
PaginationEnd.args = {
  current: 10,
  total: 10,
  showPrevNext: true,
};

export const PaginationLarge = PaginationTemplate.bind({});
PaginationLarge.args = {
  current: 15,
  total: 50,
  showPrevNext: true,
};

export const PaginationSmall = PaginationTemplate.bind({});
PaginationSmall.args = {
  current: 2,
  total: 5,
  showPrevNext: true,
};

export const PaginationWithoutControls = PaginationTemplate.bind({});
PaginationWithoutControls.args = {
  current: 3,
  total: 8,
  showPrevNext: false,
};

// Tabs Stories
export const BasicTabs = TabsTemplate.bind({});
BasicTabs.args = {
  tabs: [
    { label: 'Overview', content: 'This is the overview tab content.' },
    { label: 'Details', content: 'Here are the detailed information.' },
    { label: 'Settings', content: 'Configure your preferences here.' }
  ],
  activeTab: 0,
};

export const TabsSecondActive = TabsTemplate.bind({});
TabsSecondActive.args = {
  tabs: [
    { label: 'Profile', content: 'User profile information.' },
    { label: 'Security', content: 'Security settings and options.' },
    { label: 'Notifications', content: 'Notification preferences.' }
  ],
  activeTab: 1,
};

export const ManyTabs = TabsTemplate.bind({});
ManyTabs.args = {
  tabs: [
    { label: 'General', content: 'General settings.' },
    { label: 'Account', content: 'Account information.' },
    { label: 'Privacy', content: 'Privacy settings.' },
    { label: 'Notifications', content: 'Notification settings.' },
    { label: 'Billing', content: 'Billing information.' }
  ],
  activeTab: 0,
};

// Navbar Stories
export const BasicNavbar = NavbarTemplate.bind({});
BasicNavbar.args = {
  brand: 'ISU Design System',
  links: [
    { label: 'Home', href: '/', active: true },
    { label: 'Components', href: '/components' },
    { label: 'Documentation', href: '/docs' },
    { label: 'About', href: '/about' }
  ],
};

export const NavbarWithManyLinks = NavbarTemplate.bind({});
NavbarWithManyLinks.args = {
  brand: 'University Portal',
  links: [
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Courses', href: '/courses' },
    { label: 'Grades', href: '/grades' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Resources', href: '/resources' },
    { label: 'Support', href: '/support' }
  ],
};

export const SimpleNavbar = NavbarTemplate.bind({});
SimpleNavbar.args = {
  brand: 'Student Portal',
  links: [
    { label: 'Home', href: '/', active: true },
    { label: 'Profile', href: '/profile' },
    { label: 'Logout', href: '/logout' }
  ],
};
