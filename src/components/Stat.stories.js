import { createStat, createStatCard, createStatGroup } from './Stat.js';

const ICON_USERS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const ICON_BOOK  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const ICON_CHART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`;

export default {
  title: 'Components/Stat',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    description: { control: 'text' },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg', 'xl'] },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.appendChild(createStat(args));
  return wrap;
};

export const Plain = Template.bind({});
Plain.args = {
  label: 'Total students',
  value: '12,480',
  description: 'Enrolled in 2026',
  size: 'md',
};

export const WithTrend = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.appendChild(
    createStat({
      label: 'Applications',
      value: '3,254',
      trend: { value: 12.4 },
      description: 'vs last month',
    })
  );
  return wrap;
};
WithTrend.parameters = { controls: { disable: true }, actions: { disable: true } };

export const CardVariants = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = 'repeat(auto-fit, minmax(16rem, 1fr))';
  wrap.style.gap = '1rem';

  wrap.appendChild(
    createStatCard({
      label: 'Enrolled students',
      value: '12,480',
      icon: ICON_USERS,
      trend: { value: 8.2 },
      hover: true,
    })
  );
  wrap.appendChild(
    createStatCard({
      label: 'Courses offered',
      value: '428',
      icon: ICON_BOOK,
      trend: { value: -2.1 },
      description: 'This semester',
      accent: true,
      accentVariant: 'warning',
    })
  );
  wrap.appendChild(
    createStatCard({
      label: 'Average GPA',
      value: '3.42',
      unit: '/ 4.0',
      icon: ICON_CHART,
      trend: { value: 0 },
      accent: true,
      accentVariant: 'success',
    })
  );

  return wrap;
};
CardVariants.parameters = { controls: { disable: true }, actions: { disable: true } };

export const Group = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.appendChild(
    createStatGroup({
      stats: [
        createStatCard({ label: 'Students', value: '12,480', trend: { value: 5.2 } }),
        createStatCard({ label: 'Faculty',  value: '845',    trend: { value: 1.1 } }),
        createStatCard({ label: 'Courses',  value: '428',    trend: { value: -2.1 } }),
        createStatCard({ label: 'Alumni',   value: '38,204', trend: { value: 0 } }),
      ],
    })
  );
  return wrap;
};
Group.parameters = { controls: { disable: true }, actions: { disable: true } };

export const Sizes = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1.5rem';
  wrap.style.display = 'flex';
  wrap.style.gap = '2rem';
  wrap.style.flexWrap = 'wrap';
  ['sm', 'md', 'lg', 'xl'].forEach((size) => {
    wrap.appendChild(createStat({ label: `Size ${size}`, value: '1,234', size }));
  });
  return wrap;
};
Sizes.parameters = { controls: { disable: true }, actions: { disable: true } };
